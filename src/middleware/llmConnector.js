const OpenAI = require('openai');

require('dotenv').config();

async function genAIResponse(query) {
  if (query == null) throw new Error('Query cannot be null or undefined.');

  const prompt = process.env.PROMPT_TEMPLATE;
  const token = process.env.TOKEN;
  const endpoint = process.env.ENDPOINT;
  const model = process.env.MODEL;

  if (!prompt || !token || !endpoint || !model) {
    throw new Error('One or more environment variables are missing. Please check your .env file.');
  }
  
  const client = new OpenAI({ baseURL: endpoint, apiKey: token, dangerouslyAllowBrowser: true });

  const response = await client.chat.completions.create({
    messages: [
        { role:"system", content: prompt },
        { role:"user", content: query }
      ],
      temperature: 1,
      top_p: 1,
      model: model
    });

  return response.choices[0].message.content;
}

module.exports = { genAIResponse };