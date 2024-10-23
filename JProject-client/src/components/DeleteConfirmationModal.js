import React from 'react';

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm, listTitle }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-800 border border-gray-700 rounded-md shadow-lg p-6 w-1/3">
        <h2 className="text-xl text-white mb-4">Delete List</h2>
        <p className="text-white mb-4">Are you sure you want to delete the list "<strong>{listTitle}</strong>"? This action cannot be undone.</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
