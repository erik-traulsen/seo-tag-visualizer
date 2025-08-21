import React from 'react';

const TagBreakdown = ({ tags }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'valid':
        return <span className="text-seo-green text-xl">✓</span>;
      case 'warning':
        return <span className="text-seo-yellow text-xl">⚠</span>;
      case 'missing':
        return <span className="text-seo-red text-xl">✗</span>;
      default:
        return <span className="text-gray-400 text-xl">?</span>;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'valid':
        return 'text-seo-green';
      case 'warning':
        return 'text-seo-yellow';
      case 'missing':
        return 'text-seo-red';
      default:
        return 'text-gray-500';
    }
  };

  const tagDisplayNames = {
    title: 'Title',
    meta_description: 'Meta Desc',
    robots: 'Robots',
    og_title: 'OG Title',
    og_description: 'OG Desc',
    og_image: 'OG Image',
    twitter_title: 'Twitter Title',
    twitter_description: 'Twitter Desc',
    twitter_image: 'Twitter Image'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Tag Breakdown</h2>
      <div className="space-y-3">
        {Object.entries(tags).map(([tagName, tagData]) => (
          <div key={tagName} className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {getStatusIcon(tagData.status)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">
                    {tagDisplayNames[tagName] || tagName}
                  </span>
                  {tagData.status === 'missing' && (
                    <span className="text-seo-red">✗</span>
                  )}
                </div>
                {tagData.value && (
                  <div className="text-sm text-gray-600 truncate max-w-md">
                    {tagData.value}
                  </div>
                )}
                <div className={`text-xs ${getStatusColor(tagData.status)}`}>
                  {tagData.message}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagBreakdown;
