import React, { useState } from 'react';
import URLInput from './components/URLInput';
import SEOScore from './components/SEOScore';
import TagBreakdown from './components/TagBreakdown';
import GooglePreview from './components/GooglePreview';
import SocialPreview from './components/SocialPreview';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalysis = (data) => {
    setAnalysisData(data);
    setError(null);
  };

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setAnalysisData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            SEO Tag Visualizer MVP
          </h1>
          <p className="text-lg text-gray-600 mb-3">
            Analyze and visualize SEO meta tags for any website
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-2xl mx-auto">
            <p className="text-sm text-blue-800">
              💡 <strong>Demo Mode:</strong> Try analyzing "https://www.lonelyoctopus.com/" to see the full interface in action!
            </p>
          </div>
        </div>

        {/* URL Input */}
        <URLInput
          onAnalysis={handleAnalysis}
          onLoading={handleLoading}
          onError={handleError}
        />

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && <ErrorMessage message={error} />}

        {/* Results */}
        {analysisData && !loading && (
          <div className="space-y-6">
            {/* Score and Tag Breakdown Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* SEO Score */}
              <div className="lg:col-span-1">
                <SEOScore score={analysisData.score} />
              </div>

              {/* Tag Breakdown */}
              <div className="lg:col-span-2">
                <TagBreakdown tags={analysisData.tags} />
              </div>
            </div>

            {/* Google Search Preview */}
            <GooglePreview preview={analysisData.previews.google} />

            {/* Social Media Preview */}
            <SocialPreview preview={analysisData.previews.social} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
