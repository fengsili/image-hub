import React, { useState } from 'react';
import { uploadImage } from '../services/api';

const ImageUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const newImage = await uploadImage(formData);
      onUploadSuccess(newImage);
      
      // 重置状态
      setFile(null);
      setPreview('');
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit}>
        <div className="preview-area">
          {preview ? (
            <img src={preview} alt="Preview" className="preview-image" />
          ) : (
            <div className="upload-prompt">
              <p>拖放或点击上传图片</p>
              <p>支持JPG/PNG格式</p>
            </div>
          )}
          <input 
            type="file" 
            accept="image/jpeg, image/png" 
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </div>
        <button 
          type="submit" 
          disabled={!file || isUploading}
          className="upload-button"
        >
          {isUploading ? '上传中...' : '上传图片'}
        </button>
      </form>
    </div>
  );
};

export default ImageUploader;