import React from "react";

const EventsLoading = () => {
  return (
    <div className="container mx-auto">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Date box */}
              <div className="h-20 w-20 bg-gray-300 rounded animate-pulse flex-shrink-0"></div>
              
              <div className="flex-grow">
                {/* Event title */}
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                
                {/* Event details */}
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                
                {/* Location */}
                <div className="flex items-center mt-2">
                  <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse mr-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsLoading;