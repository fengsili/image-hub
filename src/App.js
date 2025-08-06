import React, { useState, useEffect } from 'react';
import ImageUploader from './components/ImageUploader';
import ImageGallery from './components/ImageGallery';
import './styles/main.css';

// 获取随机背景图片
const getRandomBackground = (images) => {
  if (!images || images.length === 0) return '';
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex].url;
};

function App() {
  const [images, setImages] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    // 初始化加载图片列表
    const fetchImages = async () => {
      const response = await fetch('/api/list');
      const data = await response.json();
      setImages(data);
      setBackgroundImage(getRandomBackground(data));
    };
    fetchImages();
  }, []);

  return (
    <div 
      className="app-container" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="content-wrapper">
        <h1>ImageHub Gallery</h1>
        <ImageUploader onUploadSuccess={(newImage) => setImages([newImage, ...images])} />
        <ImageGallery images={images} />
      </div>
    </div>
  );
}

export default App;