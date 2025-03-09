import React from 'react';

const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* Spinner */}
        <div className="animate-spin rounded-full border-4 border-t-transparent border-red-600 w-12 h-12"></div>
      </div>
    );
};

export default LoadingSpinner;