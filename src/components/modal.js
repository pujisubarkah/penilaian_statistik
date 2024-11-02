import React from 'react';

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-4 shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold">Indikator Penjelasan</h2>
        <p>{content}</p>
        <button 
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded" 
          onClick={onClose}
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default Modal;
