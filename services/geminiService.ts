import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const explainConcept = async (topic: string, context: string): Promise<string> => {
  const client = getClient();
  if (!client) return "老师正在休息，请稍后再试。（缺少API Key）";

  try {
    const prompt = `
      你是一位亲切幽默的C++编程老师，正在给小学三年级的学生讲解质数（素数）和密码学。
      
      当前情境: ${context}
      学生的操作: ${topic}

      请用极其简单、充满童趣的语言解释。
      
      核心概念（必须包含）：
      1. 合数（Composite）像是有很多把手或裂缝的积木，黑客可以通过找到它的"因数"（Factors）来猜出它是谁，所以作为密码比较"脆弱"。
      2. 质数（Prime）是一个光滑的铁球，除了1和它自己，找不到任何因数，黑客无从下手，所以是"最强"的密码材料。
      
      要求：
      1. 字数控制在80字以内。
      2. 语气要鼓励和夸奖。
    `;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "老师正在思考...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "老师的网络有点卡，请检查网络连接。";
  }
};

export const getCodeSnippetExplanation = async (): Promise<string> => {
    const client = getClient();
    if (!client) return "";

    try {
        const prompt = `
            写一段简单的C++代码，演示如何判断一个数是否为质数（试除法）。
            并注释说明：如果能被整除，说明它不是质数（有弱点）。
            格式要求：markdown代码块包裹代码。
        `;
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text || "";
    } catch (e) {
        return "";
    }
}