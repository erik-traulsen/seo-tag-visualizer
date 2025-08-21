# SEO Tag Visualizer MVP

A web application that analyzes and visualizes SEO meta tags for any website, providing immediate insights into SEO optimization with Google search and social media previews.

## 🚀 **Quick Start Guide**

### **Windows Users (Recommended)**
1. Double-click `start-app.bat` 
2. Wait ~30 seconds for servers to start
3. Browser opens automatically at `http://localhost:3000`

### **Manual Start**
1. **Backend**: `cd backend && python simple_server.py`
2. **Frontend**: `npm start` (in new terminal)
3. **Access**: `http://localhost:3000`

### **URLs**
- **Application**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

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

### 🚀 **Option 1: One-Click Startup (Recommended)**

**For Windows users, use the automated startup scripts:**

#### **Method A: Batch File (Easiest)**
1. Double-click `start-app.bat`
2. Wait for both servers to start
3. Browser opens automatically at `http://localhost:3000`

#### **Method B: PowerShell Script (Advanced)**
```powershell
powershell -ExecutionPolicy Bypass -File start-app.ps1
```

### 🔧 **Option 2: Manual Startup**

#### **Step 1: Install Dependencies**
```bash
# Install Node.js dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt
```

#### **Step 2: Start Backend Server**
```bash
cd backend
python simple_server.py
```
✅ Backend will be available at `http://localhost:8000`

#### **Step 3: Start Frontend Server (New Terminal)**
```bash
# In a new terminal window
npm start
```
✅ Frontend will open at `http://localhost:3000`

### 🎯 **What You'll See When Running:**

**Backend Terminal:**
```
✅ SEO Analyzer imported successfully
🚀 Starting SEO Tag Visualizer Backend Server...
📡 Server running at: http://localhost:8000
✅ Server started successfully on port 8000
```

**Frontend Terminal:**
```
Compiled successfully!
You can now view seo-tag-visualizer in the browser.
Local: http://localhost:3000
```

## Usage

1. **Access the Application**: Open `http://localhost:3000` in your browser
2. **Enter a URL**: Type any website URL (e.g., `https://www.google.com`)
3. **Analyze**: Click the "Analyze" button
4. **View Results**:
   - ✅ **SEO Score**: 0-100 rating with color-coded feedback
   - ✅ **Tag Breakdown**: Visual checklist of all SEO elements
   - ✅ **Google Preview**: See how your page appears in search results
   - ✅ **Social Preview**: View Facebook/Twitter card appearance

### 🎯 **Demo Mode**
- Try `https://www.lonelyoctopus.com/` for a pre-loaded demo
- Works even without the backend server running

## 🔧 **Troubleshooting**

### **"This site can't be reached" Error**

**Problem**: `localhost:3000` or `localhost:8000` not accessible

**Solutions**:
1. **Check if servers are running**:
   ```bash
   # Check if ports are in use
   netstat -an | findstr :3000
   netstat -an | findstr :8000
   ```

2. **Restart the application**:
   - Close all terminal windows
   - Run `start-app.bat` or use manual startup

3. **Port conflicts**:
   - Kill existing processes: `taskkill /f /im node.exe /im python.exe`
   - Restart your application

### **Backend Import Errors**

**Problem**: `No module named 'fastapi'` or similar

**Solution**:
```bash
# Install Python dependencies
pip install -r requirements.txt

# Or if using virtual environment
pip install fastapi uvicorn requests beautifulsoup4 pydantic
```

### **Frontend Won't Start**

**Problem**: `npm start` fails

**Solutions**:
1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Clear cache**:
   ```bash
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```

3. **Check Node.js version**:
   ```bash
   node --version  # Should be 16+
   ```

### **Virtual Environment Issues**

**Problem**: Running in `.venv` without dependencies

**Solutions**:
1. **Install in virtual environment**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Or deactivate virtual environment**:
   ```bash
   deactivate
   cd backend
   python simple_server.py
   ```

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
│   ├── main.py              # FastAPI application (original)
│   └── simple_server.py     # Simplified HTTP server
├── src/
│   ├── components/          # React components
│   ├── App.js              # Main React application
│   └── index.js            # React entry point
├── public/                 # Static assets
├── start-app.bat           # Windows startup script (easy)
├── start-app.ps1           # PowerShell startup script (advanced)
├── requirements.txt        # Python dependencies
├── package.json           # Node.js dependencies
└── README.md              # This file
```

### 📁 **Startup Scripts**

- **`start-app.bat`**: Simple double-click startup for Windows
- **`start-app.ps1`**: Advanced PowerShell script with error checking
- **`simple_server.py`**: Lightweight backend server (no FastAPI/uvicorn dependency issues)

### Adding New Features

1. **Backend**: Add new analysis logic in `backend/simple_server.py`
2. **Frontend**: Create new components in `src/components/`
3. **Styling**: Use Tailwind CSS classes for consistent design

## 🎯 **Production Deployment**

For production deployment:
1. Build the frontend: `npm run build`
2. Use the FastAPI version: `backend/main.py` with proper production server
3. Configure environment variables and security settings

## License

This project is created for educational purposes as an MVP demonstration.
