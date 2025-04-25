import React from "react";

const GhostDropLink = ({ id }) => {
  const url = `${window.location.origin}/ghost/${id}`;
  return (
    <div className="mt-4">
      <p className="text-sm text-gray-500">Share this reflection:</p>
      <input
        type="text"
        value={url}
        readOnly
        className="w-full border p-2 rounded text-sm bg-gray-100"
        onClick={(e) => e.target.select()}
      />
    </div>
  );
};

export default GhostDropLink;