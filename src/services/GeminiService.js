import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
}

export const GeminiService = {
    /**
     * @param {Object} personalKernel The user's JSON report
     * @param {Function} onChunk Callback for streaming text chunks
     * @returns {Promise<string>} The full text when complete
     */
    generateFutureLogStream: async (personalKernel, onChunk) => {
        if (!genAI) {
            const errorMsg = "ERROR: SYSTEM VECTOR [VITE_GEMINI_API_KEY] IS MISSING OR CORRUPTED. UNABLE TO ESTABLISH LINK WITH FUTURE TIMELINE.";
            onChunk(errorMsg);
            return errorMsg;
        }

        try {
            // Using a model that supports streaming, like gemini-1.5-flash or gemini-pro
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

            const result = await model.generateContentStream(prompt);

            let fullText = "";
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                fullText += chunkText;
                if (onChunk) {
                    onChunk(chunkText);
                }
            }

            return fullText;

        } catch (error) {
            console.error("Gemini API Error:", error);
            const errorMsg = "\n[CRITICAL ERROR: TIMELINE SYNCHRONIZATION FAILED. CAUSALITY BREACH DETECTED.]\n" + error.message;
            if (onChunk) onChunk(errorMsg);
            return errorMsg;
        }
    }
};
