import React, { useState } from 'react';
import { FiUploadCloud, FiFile, FiX } from 'react-icons/fi';

const FileUpload = ({ label, onChange, error, accept, required }) => {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
      onChange(file);
    }
  };

  const removeFile = () => {
    setPreview(null);
    setFileName('');
    onChange(null);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className={`relative group border-2 border-dashed rounded-xl p-6 transition-all ${
        error ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-slate-700 hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-slate-800/50'
      }`}>
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={handleFileChange}
          accept={accept}
          required={required && !fileName}
        />
        
        <div className="flex flex-col items-center justify-center text-center gap-2">
          {preview ? (
            <div className="relative w-20 h-20">
              <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg shadow-md" />
              <button 
                onClick={removeFile}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow-lg z-20 hover:bg-red-600"
              >
                <FiX size={12} />
              </button>
            </div>
          ) : fileName ? (
            <div className="flex items-center gap-2 text-indigo-600">
              <FiFile size={32} />
              <span className="text-sm font-medium truncate max-w-[200px]">{fileName}</span>
            </div>
          ) : (
            <>
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-full">
                <FiUploadCloud size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-200">Click or drag to upload</p>
                <p className="text-xs text-gray-500">Supported formats: JPG, PNG, PDF (Max 5MB)</p>
              </div>
            </>
          )}
        </div>
      </div>
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default FileUpload;
