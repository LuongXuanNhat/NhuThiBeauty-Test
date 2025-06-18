"use client";

import React from "react";

const LoadingComponent: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="loader"></div>
        </div>
        <h2 className="text-2xl text-gray-700 animate-pulse">
          Đang tải nội dung...
        </h2>
        <p className="text-gray-500 mt-2 font-light">
          Khám phá thế giới spa & beauty ngay sau giây lát
        </p>
      </div>
    </div>
  );
};

export default LoadingComponent;
