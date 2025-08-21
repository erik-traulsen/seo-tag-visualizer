import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <div className="inline-flex items-center space-x-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="text-lg text-gray-700">Analyzing URL...</span>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Fetching and parsing SEO tags
      </div>
    </div>
  );
};

export default LoadingSpinner;
