import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <span className="text-red-500 text-xl">⚠️</span>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Analysis Error
          </h3>
          <div className="mt-1 text-sm text-red-700">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
