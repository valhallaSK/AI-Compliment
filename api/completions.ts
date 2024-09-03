import { VercelRequest, VercelResponse } from '@vercel/node';
import { AzureOpenAI } from "openai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 确保方法是 POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // 从环境变量中获取敏感信息
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const apiVersion = "2023-03-15-preview";
  const deployment = "gpt-4o";

  // 从请求体中获取用户名
  const { username } = req.body;

  if (!username) {
    res.status(400).json({ error: 'Username is required' });
    return;
  }

  try {
    // 创建 AzureOpenAI 客户端
    const client = new AzureOpenAI({
      endpoint: endpoint!,
      apiKey: apiKey!,
      apiVersion: apiVersion!,
      deployment: deployment!,
      dangerouslyAllowBrowser: false, // 在服务器端，不需要允许浏览器
    });

    // 发起请求
    const result = await client.chat.completions.create({
      messages: [
        { role: "system", content: "你是一个极致的舔狗，根据对方提供的信息狠狠的赞美对方" },
        { role: "user", content: username },
      ],
      model: "", // 这里需要指定你要使用的模型
    });

    // 返回生成的内容
    const responseMessage = result.choices[0]?.message.content ?? "无法生成赞美内容";

    res.status(200).json({ message: responseMessage });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}