import React, { useState } from 'react';
import axios from 'axios';

const URLInput = ({ onAnalysis, onLoading, onError }) => {
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);

  const validateUrl = (urlString) => {
    try {
      const urlObj = new URL(urlString);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    
    if (value) {
      setIsValidUrl(validateUrl(value));
    } else {
      setIsValidUrl(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url || !isValidUrl) {
      onError('Please enter a valid URL (including http:// or https://)');
      return;
    }

    onLoading(true);
    onError(null);

    try {
      // For demo purposes, if analyzing Lonely Octopus, use demo data
      if (url.includes('lonelyoctopus.com')) {
        setTimeout(() => {
          const demoData = {
            url: "https://www.lonelyoctopus.com/",
            score: 80,
            tags: {
              title: {
                tag: "title",
                value: "Lonely Octopus",
                status: "warning",
                message: "Title is too short (recommended: 30-60 characters)"
              },
              meta_description: {
                tag: "meta_description",
                value: "Learn AI and Data Science with Lonely Octopus. An 8-week program offering personalized plans, mentor support, real-world projects, and hands-on experience.",
                status: "valid",
                message: "Meta description length is optimal"
              },
              robots: {
                tag: "robots",
                value: null,
                status: "missing",
                message: "robots is missing"
              },
              og_title: {
                tag: "og_title",
                value: "Lonely Octopus",
                status: "valid",
                message: "og_title is present"
              },
              og_description: {
                tag: "og_description",
                value: "Learn AI and Data Science with Lonely Octopus. An 8-week program offering personalized plans, mentor support, real-world projects, and hands-on experience.",
                status: "valid",
                message: "og_description is present"
              },
              og_image: {
                tag: "og_image",
                value: "http://static1.squarespace.com/static/645a878d9740963714b8f343/t/645da7478775900e28cbf207/1683859271455/1.png?format=1500w",
                status: "valid",
                message: "og_image is present"
              },
              twitter_title: {
                tag: "twitter_title",
                value: "Lonely Octopus",
                status: "valid",
                message: "twitter_title is present"
              },
              twitter_description: {
                tag: "twitter_description",
                value: "Learn AI and Data Science with Lonely Octopus. An 8-week program offering personalized plans, mentor support, real-world projects, and hands-on experience.",
                status: "valid",
                message: "twitter_description is present"
              },
              twitter_image: {
                tag: "twitter_image",
                value: "http://static1.squarespace.com/static/645a878d9740963714b8f343/t/645da7478775900e28cbf207/1683859271455/1.png?format=1500w",
                status: "valid",
                message: "twitter_image is present"
              }
            },
            previews: {
              google: {
                title: "Lonely Octopus",
                description: "Learn AI and Data Science with Lonely Octopus. An 8-week program offering personalized plans, mentor support, real-world projects, and hands-on experience.",
                url: "https://www.lonelyoctopus.com/",
                domain: "www.lonelyoctopus.com"
              },
              social: {
                title: "Lonely Octopus",
                description: "Learn AI and Data Science with Lonely Octopus. An 8-week program offering personalized plans, mentor support, real-world projects, and hands-on experience.",
                image: "http://static1.squarespace.com/static/645a878d9740963714b8f343/t/645da7478775900e28cbf207/1683859271455/1.png?format=1500w",
                url: "https://www.lonelyoctopus.com/",
                domain: "www.lonelyoctopus.com"
              }
            }
          };
          onAnalysis(demoData);
          onLoading(false);
        }, 2000);
        return;
      }

      const response = await axios.post('/analyze', { url });
      onAnalysis(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 
                          'Backend server not running. Try analyzing "https://www.lonelyoctopus.com/" for a demo!';
      onError(errorMessage);
    } finally {
      onLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Enter URL
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                id="url"
                value={url}
                onChange={handleInputChange}
                placeholder="https://www.lonelyoctopus.com/ (try this for a demo!)"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg ${
                  !isValidUrl ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {!isValidUrl && (
                <p className="mt-1 text-sm text-red-600">
                  Please enter a valid URL starting with http:// or https://
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={!url || !isValidUrl}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-lg"
            >
              Analyze
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default URLInput;
