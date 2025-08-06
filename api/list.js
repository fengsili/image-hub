import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export default async function handler(req, res) {
  try {
    const owner = process.env.REPO_OWNER;
    const repo = process.env.REPO_NAME;
    const path = 'public/images';
    
    // 获取目录内容
    const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path,
    });
    
    // 构造图片URL
    const cdnBase = `https://${process.env.EDGEONE_DOMAIN}`;
    
    const images = data
      .filter(item => item.type === 'file')
      .map(file => ({
        id: file.sha,
        name: file.name,
        url: `${cdnBase}/images/${file.name}`,
        path: file.path,
      }));
      
    res.status(200).json(images);
    
  } catch (error) {
    console.error('List images error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}