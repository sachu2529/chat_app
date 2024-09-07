import React from 'react';

const RightSidebar = () => {
  return (
    <div className="w-1/4 bg-gray-800 p-4">
      <div className="text-xl font-semibold mb-4">Chat Details</div>
      {/* Add additional details like shared files, privacy, etc. */}
      <div className="space-y-4">
        <div>
          <p className="font-medium">Shared Files</p>
          <ul className="text-sm text-gray-400">
            <li>File_1.pdf</li>
            <li>File_2.doc</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
