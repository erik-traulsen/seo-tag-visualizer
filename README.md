# SEO Tag Visualizer MVP

A web application that analyzes and visualizes SEO meta tags for any website, providing immediate insights into SEO optimization with Google search and social media previews.

## Features

- **URL Analysis**: Fetch and parse HTML from any website
- **SEO Scoring**: 0-100 score based on SEO best practices
- **Tag Breakdown**: Visual breakdown of all SEO tags with status indicators
- **Google Preview**: See how your page appears in Google search results
- **Social Preview**: Preview how your page looks when shared on social media
- **Real-time Validation**: Color-coded feedback (green = valid, yellow = warning, red = missing)

## Tech Stack

### Backend
- **FastAPI**: Lightweight Python web framework
- **Requests**: HTTP client for fetching web pages
- **BeautifulSoup4**: HTML parsing and extraction
- **Pydantic**: Data validation and serialization

### Frontend
- **React**: Interactive user interface
- **Tailwind CSS**: Modern, responsive styling
- **Axios**: HTTP client for API calls

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Start the FastAPI server:**
   ```bash
   cd backend
   python main.py
   ```
   
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

2. **Start the React development server:**
   ```bash
   npm start
   ```
   
   The application will open at `http://localhost:3000`

## Usage

1. Enter a website URL in the input field
2. Click "Analyze" to fetch and analyze the page
3. View your SEO score and detailed tag breakdown
4. Check the Google search result preview
5. See how your page appears on social media

## API Endpoints

### POST /analyze
Analyzes SEO tags for a given URL.

**Request Body:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "url": "https://example.com",
  "score": 85,
  "tags": {
    "title": {
      "tag": "title",
      "value": "Example Page Title",
      "status": "valid",
      "message": "Title length is optimal"
    }
  },
  "previews": {
    "google": {
      "title": "Example Page Title",
      "description": "Page description...",
      "url": "https://example.com",
      "domain": "example.com"
    },
    "social": {
      "title": "Example Page Title",
      "description": "Page description...",
      "image": "https://example.com/image.jpg",
      "url": "https://example.com",
      "domain": "example.com"
    }
  }
}
```

### GET /health
Health check endpoint.

## SEO Tags Analyzed

- **Title Tag**: Page title (30-60 characters recommended)
- **Meta Description**: Page description (120-160 characters recommended)
- **Robots Directive**: Indexing instructions
- **Open Graph Tags**: og:title, og:description, og:image
- **Twitter Card Tags**: twitter:title, twitter:description, twitter:image

## Scoring Algorithm

The SEO score is calculated based on:
- **Title Tag (25 points)**: Presence and optimal length
- **Meta Description (20 points)**: Presence and optimal length
- **Robots Tag (10 points)**: Proper configuration
- **Open Graph Tags (30 points)**: Social media optimization
- **Twitter Cards (15 points)**: Twitter-specific optimization

## Development

### Project Structure
```
seo-tag-visualizer/
├── backend/
│   └── main.py              # FastAPI application
├── src/
│   ├── components/          # React components
│   ├── App.js              # Main React application
│   └── index.js            # React entry point
├── public/                 # Static assets
├── requirements.txt        # Python dependencies
├── package.json           # Node.js dependencies
└── README.md              # This file
```

### Adding New Features

1. **Backend**: Add new analysis logic in `backend/main.py`
2. **Frontend**: Create new components in `src/components/`
3. **Styling**: Use Tailwind CSS classes for consistent design

## License

This project is created for educational purposes as an MVP demonstration.
