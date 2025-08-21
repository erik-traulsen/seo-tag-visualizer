import React from 'react';

const GooglePreview = ({ preview }) => {
  if (!preview) return null;

  // Truncate title if too long (Google typically shows ~60 characters)
  const truncateTitle = (title) => {
    if (title.length <= 60) return title;
    return title.substring(0, 57) + '...';
  };

  // Truncate description if too long (Google typically shows ~160 characters)
  const truncateDescription = (description) => {
    if (description.length <= 160) return description;
    return description.substring(0, 157) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Google Search Result Preview
      </h2>
      
      <div className="border border-gray-200 rounded-lg p-4 bg-white">
        {/* Google-style search result */}
        <div className="max-w-2xl">
          {/* URL breadcrumb */}
          <div className="text-sm text-gray-600 mb-1">
            <span className="text-google-blue">{preview.domain}</span>
            <span className="mx-1">›</span>
            <span>...</span>
          </div>
          
          {/* Title */}
          <div className="mb-2">
            <h3 className="text-xl text-google-blue hover:underline cursor-pointer font-normal leading-6">
              {truncateTitle(preview.title)}
            </h3>
          </div>
          
          {/* Description */}
          <div className="text-sm text-gray-700 leading-5">
            {truncateDescription(preview.description)}
          </div>
          
          {/* Additional info */}
          <div className="mt-3 text-xs text-gray-500">
            This is how your page would appear in Google search results
          </div>
        </div>
      </div>
    </div>
  );
};

export default GooglePreview;
