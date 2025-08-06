import React from 'react';

const ImageGallery = ({ images }) => {
  return (
    <div className="gallery-container">
      <h2>图片库 ({images.length})</h2>
      {images.length === 0 ? (
        <p>图库为空，请上传图片</p>
      ) : (
        <div className="image-grid">
          {images.map((img) => (
            <div key={img.id} className="image-card">
              <img 
                src={img.url} 
                alt={img.name} 
                className="gallery-image"
              />
              <div className="image-info">
                <span>{img.name}</span>
                <div className="copy-area">
                  <input 
                    type="text" 
                    value={img.url} 
                    readOnly 
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(img.url)}
                  >
                    复制链接
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;