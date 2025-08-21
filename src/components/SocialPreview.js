import React from 'react';

const SocialPreview = ({ preview }) => {
  if (!preview) return null;

  // Truncate title for social media (typically ~70 characters)
  const truncateTitle = (title) => {
    if (title.length <= 70) return title;
    return title.substring(0, 67) + '...';
  };

  // Truncate description for social media (typically ~200 characters)
  const truncateDescription = (description) => {
    if (description.length <= 200) return description;
    return description.substring(0, 197) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Social Media Card Preview
        <span className="text-sm font-normal text-gray-600 ml-2">
          (Facebook/Twitter)
        </span>
      </h2>
      
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white max-w-lg">
        {/* Social media card */}
        
        {/* Image */}
        <div className="aspect-[1.91/1] bg-gray-100 flex items-center justify-center">
          {preview.image ? (
            <img
              src={preview.image}
              alt="Social media preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className={`flex items-center justify-center w-full h-full ${preview.image ? 'hidden' : 'flex'}`}>
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">🖼️</div>
              <div className="text-sm">No image available</div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 border-t border-gray-200">
          {/* Domain */}
          <div className="text-xs text-gray-500 uppercase mb-2 font-medium">
            {preview.domain}
          </div>
          
          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-base mb-2 leading-5">
            {truncateTitle(preview.title)}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-gray-600 leading-4">
            {truncateDescription(preview.description)}
          </p>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        This is how your page would appear when shared on social media platforms
      </div>
    </div>
  );
};

export default SocialPreview;
