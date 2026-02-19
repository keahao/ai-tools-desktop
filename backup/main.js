const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const https = require('https');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'icon.png')
  });

  mainWindow.loadFile('index.html');
  mainWindow.setTitle('AI Tools Hub');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// 处理 AI 生成请求
ipcMain.handle('generate', async (event, { tool, input }) => {
  const prompts = {
    report: '你是一个专业的报告撰写专家。',
    video: '你是一个视频脚本创作专家。',
    novel: '你是一个小说创作助手。',
    course: '你是一个课程设计专家。',
    language: '你是一个语言学习助手。',
    business: '你是一个商业计划专家。',
    competitor: '你是一个竞争分析专家。',
    sales: '你是一个销售数据分析专家。',
    user: '你是一个用户行为分析专家。'
  };

  return new Promise((resolve) => {
    const apiKey = process.env.OPENAI_API_KEY || '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';
    
    const data = JSON.stringify({
      model: 'deepseek/deepseek-chat',
      messages: [
        { role: 'system', content: prompts[tool] || '你是一个AI助手。' },
        { role: 'user', content: input }
      ]
    });

    const options = {
      hostname: 'openrouter.ai',
      path: '/api/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://github.com/keahao/ai-tools-hub',
        'X-Title': 'AI Tools Hub'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve(json.choices?.[0]?.message?.content || '生成失败');
        } catch {
          resolve('请求失败，请检查网络');
        }
      });
    });

    req.on('error', () => resolve('网络错误'));
    req.write(data);
    req.end();
  });
});
