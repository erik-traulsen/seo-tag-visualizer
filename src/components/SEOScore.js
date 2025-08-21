import React from 'react';

const SEOScore = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-seo-green';
    if (score >= 60) return 'text-seo-yellow';
    return 'text-seo-red';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-2 ${getScoreBackground(score)}`}>
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">SEO Score</h2>
        <div className={`text-4xl font-bold ${getScoreColor(score)} mb-2`}>
          {score}/100
        </div>
        <div className="text-sm text-gray-600">
          {score >= 80 && 'Excellent SEO optimization'}
          {score >= 60 && score < 80 && 'Good SEO, room for improvement'}
          {score < 60 && 'Needs SEO improvements'}
        </div>
      </div>
    </div>
  );
};

export default SEOScore;
