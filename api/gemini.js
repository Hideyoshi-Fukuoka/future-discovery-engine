import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const personalKernel = req.body?.personalKernel;
    if (!personalKernel) {
        return res.status(400).json({ error: 'Missing personalKernel data in request body.' });
    }

    // Use VITE_ prefix for local dev compatibility, but standard GEMINI_API_KEY for Vercel backend
    const API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!API_KEY) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' });
        res.write("ERROR: SYSTEM VECTOR [GEMINI_API_KEY] IS MISSING OR CORRUPTED. UNABLE TO ESTABLISH LINK WITH FUTURE TIMELINE.");
        return res.end();
    }

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const profession = personalKernel.CareerMapping.TopClusters[0];
        const blogProphecy = personalKernel.CareerMapping.FutureBlogProphecy;
        const vectorCode = personalKernel.CareerMapping.VectorCode;

        const prompt = `
            あなたは30年後の未来（シンギュラリティ到達後）を生きるプロフェッショナルです。
            現在のあなたの職業は「${profession}」です。
            
            過去に以下のような個人特性（Personal Kernel）を持っていました:
            ${JSON.stringify(personalKernel.CognitivePattern, null, 2)}
            ${JSON.stringify(personalKernel.Values_Philosophy, null, 2)}
            
            現在、あなたは以下のブログ記事を執筆しています:
            タイトル: 『${blogProphecy}』
            
            【指示】
            上記の情報を元に、この記事の本文（約1000文字）を執筆してください。
            出力は文章のみとし、挨拶や説明は不要です。
            
            【条件】
            - 文体: サイバーパンク、ハードSF的、専門用語を多用するが、知性や悲哀、あるいは狂気が滲み出るような独特のトーン。
            - 内容: 30年後のその世界特有の具体的な「技術的問題」と、あなたの特性ベクトル（${vectorCode}）を活かした「解決策」、そして最後に「過去の自分（2024年のユーザー）への暗号めいたメッセージ」を含めてください。
            `;

        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8',
            'Transfer-Encoding': 'chunked',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        const result = await model.generateContentStream(prompt);

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            res.write(chunkText);
        }

        res.end();

    } catch (error) {
        console.error("Gemini Serverless API Error:", error);
        if (!res.headersSent) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' });
        }
        res.write("\n[CRITICAL ERROR: TIMELINE SYNCHRONIZATION FAILED. CAUSALITY BREACH DETECTED.]\n" + error.message);
        res.end();
    }
}
