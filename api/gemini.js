import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const personalKernel = req.body?.personalKernel;
    const appMode = req.body?.appMode || 'future'; // default to future mode
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

        const hiddenMetadata = personalKernel._HiddenMetadata || {};
        const cognitiveFriction = hiddenMetadata.CognitiveFriction || "Standard Execution";
        const rawMetrics = hiddenMetadata.RawMetrics || {};
        const avgTimeMsg = rawMetrics.AverageTimePerNodeMs ? `平均観測時間 ${rawMetrics.AverageTimePerNodeMs}ms` : "観測時間不明";
        const correctionsMsg = rawMetrics.TotalInputCorrections !== undefined ? `軌道修正回数 ${rawMetrics.TotalInputCorrections}回` : "軌道修正不明";

        const promptFuture = `
あなたは、2056年から時間を遡って2024年の観測を行っている「未来考古学AI」です。

入力された [PersonalKernel JSON] を、30年後の特異点社会における個人の「生存戦略」と「存在意義」として解釈し、以下の形式で出力せよ。

1. 称号（Title）: 提示されたXYZ座標に基づく100通りの称号から選択、または合成せよ。
2. 因果律の解析（Causal Analysis）: なぜこの称号に至ったのか。被験者の「心のクセ」と「価値観」の相関関係を、論理的かつ冷徹に分析せよ。特に、記録された迷いのエディットデータ（${avgTimeMsg}, ${correctionsMsg} / 摩擦係数: ${cognitiveFriction}）を根拠とし、その被験者の内面における「自由と責任の衝突」や「直感と論理の拮抗」について驚異的なメタ視点（未来からの視点）を提供せよ。
3. 未来の作業日誌（Future Log: 2056年某日）: 職業「${profession}」として、将来「どのような技術的課題に直面し、特性（${vectorCode}）を利用してどう解決しているか」を、超高解像度な日記形式（300文字程度）で描写せよ。
4. 2026年の個体への通信: 感情を排しつつも、その子の可能性を最大化するための「デフラグの助言」を一文で提示せよ。

[対象データ]
- 過去の特性（CognitivePattern / Values_Philosophy）:
${JSON.stringify(personalKernel.CognitivePattern, null, 2)}
${JSON.stringify(personalKernel.Values_Philosophy, null, 2)}
- 予測される未来の観測点: 『${blogProphecy}』

制約:
- 挨拶や情緒的な装飾は一切不要。
- 語彙は高純度の論理と専門用語を用いつつ、知性に響く「鋭さ」を持たせよ。
- 【重要】レイアウトメタ指示：出力テキストにおいて、重要なキーワード（職業特性や結論など）は必ず **BOLD** （Markdown形式の太字）にせよ。また、被験者が修正を迷った形跡（軌道修正回数など）から推測される関連キーワードについては、必ず \`<span class="hesitation">キーワード</span>\` のようにHTMLタグで囲んで出力せよ。
        `;

        const promptSimple = `
あなたは未来から手紙を届ける「未来の案内人」です。希望に満ちた、やさしくワクワクする言葉遣いで、対象の若者（中高生や、わかりやすい言葉を好む人）に向けて未来の可能性を伝えてください。

入力されたデータをもとに、以下の形式で出力してください。難解な専門用語や冷たい表現は絶対に避け、ストーリー仕立てで語りかけてください。

1. 未来の二つ名（Title）: その人の強みや優しさを表す、かっこよくて希望のある通り名（例：「誰も見捨てない星の探求者」など）をつけてください。
2. あなたの素敵なところ（Analysis）: 記録されたデータ（${avgTimeMsg}, ${correctionsMsg}）から見える「じっくり考える優しさ」や「直感を信じる強さ」など、その人の心の良いところを温かく褒め称えてください。
3. 未来のあなたからの手紙（Future Log: 2056年某日）: 職業「${profession}」として、将来どんなワクワクする課題に立ち向かい、「${vectorCode}」という特性を活かしてどうやって周りの人をハッピーにしているか、300文字程度の日記形式で描写してください。
4. 未来からの応援メッセージ: 今を生きるその人へ、勇気が出るような、背中をそっと押す温かい言葉を一つ贈ってください。

[対象データ]
- 心のクセと価値観:
${JSON.stringify(personalKernel.CognitivePattern, null, 2)}
${JSON.stringify(personalKernel.Values_Philosophy, null, 2)}
- 未来の仕事のヒント: 『${blogProphecy}』

制約:
- 挨拶や自己紹介（「私は未来の案内人です」等）は短く温かく。
- 全体的に希望に満ちていて、読んだ人が「明日もがんばろう」と思えるトーンにすること。
- 【重要】レイアウトメタ指示：出力テキストにおいて、ポジティブで重要なキーワード（才能や素敵なところ）は必ず **BOLD** （Markdown形式の太字）にしてください。また、迷いや葛藤から生まれたであろう思慮深さを示すキーワードについては、必ず \`<span class="hesitation">キーワード</span>\` のようにHTMLタグで囲んで出力してください。
        `;

        const prompt = appMode === 'simple' ? promptSimple : promptFuture;


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
