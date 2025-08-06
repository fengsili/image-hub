const API_BASE = process.env.REACT_APP_API_BASE;

export const uploadImage = async (formData) => {
  const response = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData
  });
  
  if (!response.ok) {
    throw new Error('上传失败');
  }
  
  return response.json();
};

export const listImages = async () => {
  const response = await fetch(`${API_BASE}/list`);
  if (!response.ok) {
    throw new Error('获取图片列表失败');
  }
  return response.json();
};