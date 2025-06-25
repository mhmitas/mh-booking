"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function EnhancedContactButton() {
  const [showBubble, setShowBubble] = useState(true);

  const handleCloseBubble = () => {
    setShowBubble(false);
  };

  return (
    <div className="fixed bottom-12 right-8 z-50 flex flex-col items-end space-y-2">
      {/* Conditional Speech Bubble */}
      {showBubble && (
        <div className="relative opacity-100 translate-y-0 scale-100 transition-all duration-300 ease-out transform">
          <div className="bg-white text-black font-medium p-2 rounded-lg shadow-lg border border-gray-100 relative">
            <button
              onClick={handleCloseBubble}
              className="absolute -top-1 -right-1 w-4 h-4 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
              aria-label="Close message"
            >
              <X className="w-2.5 h-2.5 text-gray-600" />
            </button>
            <p className="text-sm">Hi there! How can I help you?</p>
          </div>

          <div className="absolute bottom-0 right-4 transform translate-y-1/2">
            <div className="w-2 h-2 bg-white border-r border-b border-gray-100 transform rotate-45"></div>
          </div>
        </div>
      )}

      {/* Robot Button wrapped with Link */}
      <div className="relative">
        <Link
          href="/assistant"
          target="_blank"
          aria-label="Contact us"
          className="text-3xl bg-white px-2 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-110 cursor-pointer flex items-center justify-center"
        >
          🤖
        </Link>

        <div className="absolute inset-0 rounded-full bg-blue-500 opacity-20 animate-ping pointer-events-none"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce pointer-events-none"></div>
      </div>
    </div>
  );
}
