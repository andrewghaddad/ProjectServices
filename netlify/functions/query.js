const OpenAI = require("openai");

exports.handler = async (event) => {
  try {
    // Get query from URL (?query=hello)
    const query = event.queryStringParameters?.query;

    if (!query) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Query is required" }),
      };
    }

    // Load env variables (Netlify handles this in prod)
    const prompt = process.env.PROMPT_TEMPLATE;
    const token = process.env.TOKEN;
    const endpoint = process.env.ENDPOINT;
    const model = process.env.MODEL;

    if (!prompt || !token || !endpoint || !model) {
      throw new Error("Missing environment variables");
    }

    // Initialize OpenAI client
    const client = new OpenAI({
      baseURL: endpoint,
      apiKey: token,
    });

    // Call API
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: query },
      ],
      temperature: 1,
      top_p: 1,
      model: model,
    });

    const result = response.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ result }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message || "Something went wrong",
      }),
    };
  }
};