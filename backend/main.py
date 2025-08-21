from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
import requests
from bs4 import BeautifulSoup
import re
from typing import Optional, Dict, Any
from urllib.parse import urljoin, urlparse

app = FastAPI(title="SEO Tag Visualizer API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class URLAnalysisRequest(BaseModel):
    url: HttpUrl

class SEOTag(BaseModel):
    tag: str
    value: Optional[str]
    status: str  # "valid", "missing", "warning"
    message: str

class SEOAnalysisResponse(BaseModel):
    url: str
    score: int
    tags: Dict[str, SEOTag]
    previews: Dict[str, Dict[str, Any]]

class SEOAnalyzer:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
    
    def fetch_html(self, url: str) -> str:
        """Fetch HTML content from URL with error handling."""
        try:
            response = self.session.get(url, timeout=10, allow_redirects=True)
            response.raise_for_status()
            return response.text
        except requests.RequestException as e:
            raise HTTPException(status_code=400, detail=f"Failed to fetch URL: {str(e)}")
    
    def extract_meta_tags(self, html: str, base_url: str) -> Dict[str, Any]:
        """Extract all relevant SEO meta tags from HTML."""
        soup = BeautifulSoup(html, 'html.parser')
        
        # Extract basic tags
        title = soup.find('title')
        title_text = title.get_text().strip() if title else None
        
        meta_description = soup.find('meta', attrs={'name': 'description'})
        description_text = meta_description.get('content', '').strip() if meta_description else None
        
        robots = soup.find('meta', attrs={'name': 'robots'})
        robots_text = robots.get('content', '').strip() if robots else None
        
        # Extract Open Graph tags
        og_title = soup.find('meta', property='og:title')
        og_title_text = og_title.get('content', '').strip() if og_title else None
        
        og_description = soup.find('meta', property='og:description')
        og_description_text = og_description.get('content', '').strip() if og_description else None
        
        og_image = soup.find('meta', property='og:image')
        og_image_url = og_image.get('content', '').strip() if og_image else None
        if og_image_url and not og_image_url.startswith('http'):
            og_image_url = urljoin(base_url, og_image_url)
        
        # Extract Twitter Card tags
        twitter_title = soup.find('meta', attrs={'name': 'twitter:title'})
        twitter_title_text = twitter_title.get('content', '').strip() if twitter_title else None
        
        twitter_description = soup.find('meta', attrs={'name': 'twitter:description'})
        twitter_description_text = twitter_description.get('content', '').strip() if twitter_description else None
        
        twitter_image = soup.find('meta', attrs={'name': 'twitter:image'})
        twitter_image_url = twitter_image.get('content', '').strip() if twitter_image else None
        if twitter_image_url and not twitter_image_url.startswith('http'):
            twitter_image_url = urljoin(base_url, twitter_image_url)
        
        return {
            'title': title_text,
            'meta_description': description_text,
            'robots': robots_text,
            'og_title': og_title_text,
            'og_description': og_description_text,
            'og_image': og_image_url,
            'twitter_title': twitter_title_text,
            'twitter_description': twitter_description_text,
            'twitter_image': twitter_image_url
        }
    
    def analyze_tag(self, tag_name: str, value: Optional[str]) -> SEOTag:
        """Analyze individual SEO tag and return status."""
        if not value:
            return SEOTag(
                tag=tag_name,
                value=None,
                status="missing",
                message=f"{tag_name} is missing"
            )
        
        # Title tag analysis
        if tag_name == 'title':
            if len(value) < 30:
                return SEOTag(tag=tag_name, value=value, status="warning", 
                            message="Title is too short (recommended: 30-60 characters)")
            elif len(value) > 60:
                return SEOTag(tag=tag_name, value=value, status="warning", 
                            message="Title is too long (recommended: 30-60 characters)")
            else:
                return SEOTag(tag=tag_name, value=value, status="valid", message="Title length is optimal")
        
        # Meta description analysis
        elif tag_name == 'meta_description':
            if len(value) < 120:
                return SEOTag(tag=tag_name, value=value, status="warning", 
                            message="Meta description is too short (recommended: 120-160 characters)")
            elif len(value) > 160:
                return SEOTag(tag=tag_name, value=value, status="warning", 
                            message="Meta description is too long (recommended: 120-160 characters)")
            else:
                return SEOTag(tag=tag_name, value=value, status="valid", 
                            message="Meta description length is optimal")
        
        # Robots tag analysis
        elif tag_name == 'robots':
            if 'noindex' in value.lower():
                return SEOTag(tag=tag_name, value=value, status="warning", 
                            message="Page is set to noindex")
            else:
                return SEOTag(tag=tag_name, value=value, status="valid", message="Robots directive is set")
        
        # Default case for other tags
        else:
            return SEOTag(tag=tag_name, value=value, status="valid", message=f"{tag_name} is present")
    
    def calculate_score(self, tags: Dict[str, SEOTag]) -> int:
        """Calculate SEO score based on tag analysis."""
        score = 0
        max_score = 100
        
        # Title tag (25 points)
        if tags['title'].status == 'valid':
            score += 25
        elif tags['title'].status == 'warning':
            score += 15
        
        # Meta description (20 points)
        if tags['meta_description'].status == 'valid':
            score += 20
        elif tags['meta_description'].status == 'warning':
            score += 10
        
        # Robots tag (10 points)
        if tags['robots'].status == 'valid':
            score += 10
        elif tags['robots'].status == 'warning':
            score += 5
        
        # Open Graph tags (30 points total)
        og_score = 0
        for tag in ['og_title', 'og_description', 'og_image']:
            if tags[tag].status in ['valid', 'warning']:
                og_score += 10
        score += og_score
        
        # Twitter Card tags (15 points total)
        twitter_score = 0
        for tag in ['twitter_title', 'twitter_description', 'twitter_image']:
            if tags[tag].status in ['valid', 'warning']:
                twitter_score += 5
        score += twitter_score
        
        return min(score, max_score)
    
    def generate_previews(self, tags: Dict[str, SEOTag], url: str) -> Dict[str, Dict[str, Any]]:
        """Generate preview data for Google and social media."""
        parsed_url = urlparse(url)
        domain = parsed_url.netloc
        
        # Google Search Preview
        google_title = tags['title'].value or "No title"
        google_description = tags['meta_description'].value or "No meta description available"
        
        google_preview = {
            'title': google_title,
            'description': google_description,
            'url': url,
            'domain': domain
        }
        
        # Social Media Preview (prioritize OG tags, fallback to Twitter, then title/meta)
        social_title = (tags['og_title'].value or 
                       tags['twitter_title'].value or 
                       tags['title'].value or 
                       "No title")
        
        social_description = (tags['og_description'].value or 
                            tags['twitter_description'].value or 
                            tags['meta_description'].value or 
                            "No description available")
        
        social_image = (tags['og_image'].value or 
                       tags['twitter_image'].value or 
                       None)
        
        social_preview = {
            'title': social_title,
            'description': social_description,
            'image': social_image,
            'url': url,
            'domain': domain
        }
        
        return {
            'google': google_preview,
            'social': social_preview
        }
    
    def analyze_url(self, url: str) -> SEOAnalysisResponse:
        """Main analysis method."""
        # Fetch HTML
        html = self.fetch_html(url)
        
        # Extract meta tags
        raw_tags = self.extract_meta_tags(html, url)
        
        # Analyze each tag
        analyzed_tags = {}
        for tag_name, value in raw_tags.items():
            analyzed_tags[tag_name] = self.analyze_tag(tag_name, value)
        
        # Calculate score
        score = self.calculate_score(analyzed_tags)
        
        # Generate previews
        previews = self.generate_previews(analyzed_tags, url)
        
        return SEOAnalysisResponse(
            url=url,
            score=score,
            tags=analyzed_tags,
            previews=previews
        )

# Initialize analyzer
analyzer = SEOAnalyzer()

@app.post("/analyze", response_model=SEOAnalysisResponse)
async def analyze_url(request: URLAnalysisRequest):
    """Analyze SEO tags for a given URL."""
    return analyzer.analyze_url(str(request.url))

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
