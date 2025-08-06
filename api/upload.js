import { Octokit } from "@octokit/core";
import { nanoid } from "nanoid";

// 初始化GitHub客户端
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export default async function handler(req, res) {
  // 只允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const imageFile = req.body;
    const owner = process.env.REPO_OWNER;
    const repo = process.env.REPO_NAME;
    
    // 生成唯一文件名
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${nanoid(12)}.${fileExt}`;
    const filePath = `public/images/${fileName}`;
    
    // 上传到GitHub
    const { data } = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path: filePath,
      message: `Add image: ${fileName}`,
      content: imageFile.toString('base64'),
    });
    
    // 构造访问URL
    const cdnBase = `https://${process.env.EDGEONE_DOMAIN}`;
    const imageUrl = `${cdnBase}/images/${fileName}`;
    
    // 返回新图片信息
    res.status(200).json({
      id: data.content.sha,
      name: fileName,
      url: imageUrl,
      path: filePath,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}