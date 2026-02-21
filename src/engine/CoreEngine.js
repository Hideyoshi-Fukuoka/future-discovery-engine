import { QUESTIONS_DATA } from './QuestionsData';

export const PHASES = {
    INITIATION: 0,
    DIAGNOSIS: 1,
    VERIFICATION: 2,
    RESULT: 3,
};

export class CoreEngine {
    /**
     * Parse comma separated input string to an array of valid numbers
     */
    static parseAnswerInput(inputStr, optionCount) {
        if (!inputStr) return [];
        const clean = inputStr.toString().trim().replace(/[^0-9,]/g, '');
        if (!clean) return [];

        const parts = clean.split(',').map(n => parseInt(n)).filter(n => !isNaN(n));
        const validIndices = parts.filter(n => n > 0 && n <= optionCount);

        // Remove duplicates and sort
        return [...new Set(validIndices)].sort((a, b) => a - b);
    }

    /**
     * Calculate current entropy based on hesitation metrics
     * Returns a float 0.0 to 1.0 representing system instability.
     */
    static calculateEntropy(metrics) {
        if (!metrics || Object.keys(metrics).length === 0) return 0;

        let totalCorrections = 0;
        let totalDuration = 0;
        let count = 0;

        Object.values(metrics).forEach(m => {
            totalCorrections += (m.corrections || 0);
            totalDuration += (m.durationMs || 0);
            count++;
        });

        if (count === 0) return 0;

        // Base entropy from corrections (each correction adds 0.05, max 0.5)
        const correctionEntropy = Math.min(0.5, totalCorrections * 0.05);

        // Time entropy (average time over 8s starts adding entropy, max 0.5)
        const avgDuration = totalDuration / count;
        const timeEntropy = Math.max(0, Math.min(0.5, (avgDuration - 8000) / 10000));

        return Math.min(1.0, correctionEntropy + timeEntropy);
    }

    /**
     * Detect Logical Paradox based on contrasting answers.
     * Example: Extreme logic in early questions vs extreme emotion in late ones.
     * Returns a boolean indicating if a paradox glitch should fire and the severity.
     */
    static detectParadox(answers) {
        // Find Q1 (Logic vs Strategic) and Q14 (Magic Wand - Emotional vs Practical)
        const q1 = answers["Q1"];
        const q14 = answers["Q14"];

        if (q1 && q14) {
            // Q1: 1 (Strategic/Logic), 4 (Emotional/Panic)
            // Q14: 1 (Logical Rule), 4 (Emotional Empathy)
            if ((q1.includes(1) && q14.includes(4)) || (q1.includes(4) && q14.includes(1))) {
                return { isParadox: true, severity: 0.8, message: "因果律の不整合（感情と論理の極端な乖離）を検知。" };
            }
        }

        // Add more paradox checks if needed here...
        return { isParadox: false, severity: 0, message: "" };
    }

    /**
     * Translates current answers into an abstract X,Y weight vector for UI visual physics
     */
    static calculateWeights(answers) {
        let logicScore = 0;
        let creativeScore = 0;
        let socialScore = 0;

        Object.entries(answers).forEach(([qId, selectedIndices]) => {
            const question = QUESTIONS_DATA.find(q => q.id === qId);
            if (!question) return;

            selectedIndices.forEach(idx => {
                const option = question.options[idx - 1];
                if (option && option.tags) {
                    const stringified = JSON.stringify(option.tags);
                    if (stringified.includes('Logic') || stringified.includes('Analy')) logicScore++;
                    if (stringified.includes('Creati') || stringified.includes('Visual')) creativeScore++;
                    if (stringified.includes('Social') || stringified.includes('Harmon')) socialScore++;
                }
            });
        });

        // Arbitrary vector mapping for visual flair
        // X leans towards Logic vs Creativity
        // Y leans towards Social vs Introverted(Logic+Creativity)
        return {
            x: (logicScore - creativeScore) * 0.1,
            y: (socialScore - (logicScore + creativeScore) * 0.5) * 0.1
        };
    }

    /**
     * 未来発見エンジン：100通りの称号生成ロジック
     * 5 (接頭辞) x 5 (核心概念) x 4 (役割) = 100通りの組み合わせ
     */
    static generateFutureTitle(answers) {
        let x = 0; // 認知演算 (論理 <-> 直感)
        let y = 0; // 情報密度 (構造 <-> 拡散)
        let z = 0; // 干渉領域 (仮想 <-> 物理)

        Object.entries(answers).forEach(([qId, selectedIndices]) => {
            // Extract the numerical portion of the ID, e.g. "Q21" -> 21
            const qNum = parseInt(qId.replace('Q', ''), 10);
            if (isNaN(qNum)) return;

            selectedIndices.forEach(num => {
                if (qNum >= 1 && qNum <= 7) {
                    x += (num <= 2 ? 1 : -1); // 1,2は論理寄り
                } else if (qNum >= 8 && qNum <= 13) {
                    y += (num % 2 === 1 ? 1 : -1); // 奇数は構造寄り
                } else if (qNum >= 21 && qNum <= 25) { // Updated to exactly capture Q21-25 as intended
                    z += (num === 1 || num === 3 ? 1 : -1); // 1,3は仮想/電脳寄り
                }
            });
        });

        const normalize = (val, max) => {
            const clamped = Math.max(-10, Math.min(10, val));
            return Math.floor(((clamped + 10) / 21) * max);
        };

        const idxX = normalize(x, 5); // 0-4
        const idxY = normalize(y, 5); // 0-4
        const idxZ = normalize(z, 4); // 0-3

        const Components = {
            Prefix: ["精密な", "広域の", "流動的な", "深層の", "擬似的な"], // Y軸
            Core: ["因果", "論理", "生命", "感情", "空間"],            // X軸
            Role: ["設計者", "観測者", "修復者", "統合者"]             // Z軸
        };

        const BlogContexts = ["フルダイブVR空間での", "シンギュラリティ以後の", "ブレイン・マシン・インターフェースを通じた", "テラフォーミング初期段階における"]; // Z軸
        const BlogThemes = ["量子暗号システム", "人工共感エンジン", "生体演算ネットワーク", "自律型感情AI", "多次元データ構造"]; // X軸
        const BlogActions = ["のハッキング手法", "を用いた認知バイパス構造", "と倫理的プロトコルの衝突", "による現実拡張の限界", "の最適化プロセス"]; // Y軸

        const mainTitle = `${Components.Prefix[idxY] || "未知の"}${Components.Core[idxX] || "領域"}${Components.Role[idxZ] || "干渉者"}`;
        const futureBlogTitle = `2036年の備忘録: ${BlogContexts[idxZ] || "未定義世界線の"}${BlogThemes[idxX] || "アーティファクト"}${BlogActions[idxY] || "の観測結果"}`;

        // 特異点（次元脱出）の判定ロジック
        const isOutlier = Math.abs(x) > 8 && Math.abs(y) > 8 && Math.abs(z) > 8;

        return {
            title: isOutlier ? "次元脱出支援エージェント" : mainTitle,
            blogTitle: isOutlier ? "2036年の備忘録: 観測可能宇宙の外側からの通信ログ" : futureBlogTitle,
            coordinates: { x, y, z },
            vectorCode: `X${idxX}Y${idxY}Z${idxZ}`
        };
    }

    /**
     * Generate structured JSON and Career report based on answers and metrics
     */
    static generateReport(answers, metrics = {}) {
        const jsonOutput = {
            PersonalKernel: {
                WritingStyle: { Tone: [], Rhythm: [], Vocabulary: [] },
                CognitivePattern: { AutomaticThoughts: [], DecisionMaking: [], StressResponse: [] },
                Values_Philosophy: { CoreBeliefs: [], Frameworks: [] },
                CareerMapping: { TopClusters: [], LogicPath: "", VectorCode: "", FutureBlogProphecy: "" },
                _HiddenMetadata: {}
            }
        };

        // ... existing aggregation logic ...
        Object.entries(answers).forEach(([qId, selectedIndices]) => {
            const question = QUESTIONS_DATA.find(q => q.id === qId);
            if (!question) return;

            selectedIndices.forEach(idx => {
                const option = question.options[idx - 1]; // user input is 1-based
                if (option && option.tags) {
                    ['WritingStyle', 'CognitivePattern', 'Values_Philosophy'].forEach(category => {
                        if (option.tags[category]) {
                            Object.entries(option.tags[category]).forEach(([subCat, val]) => {
                                jsonOutput.PersonalKernel[category][subCat].push(val);
                            });
                        }
                    });
                }
            });
        });

        // Deduplicate and limit to top 3 tags per category
        ['WritingStyle', 'CognitivePattern', 'Values_Philosophy'].forEach(category => {
            Object.keys(jsonOutput.PersonalKernel[category]).forEach(subCat => {
                const arr = jsonOutput.PersonalKernel[category][subCat];
                jsonOutput.PersonalKernel[category][subCat] = [...new Set(arr)].slice(0, 3);
            });
        });

        // Determine Career Path using the new 100-Title generator
        const titleData = CoreEngine.generateFutureTitle(answers);

        // Map the title generation back to our JSON schema
        jsonOutput.PersonalKernel.CareerMapping.TopClusters = [titleData.title];
        jsonOutput.PersonalKernel.CareerMapping.LogicPath = `Vector Analysis Complete. [${titleData.vectorCode}] Coordinate mapping locked. Result derived from intersecting parameters of X(${titleData.coordinates.x}), Y(${titleData.coordinates.y}), Z(${titleData.coordinates.z}).`;
        jsonOutput.PersonalKernel.CareerMapping.VectorCode = titleData.vectorCode;
        jsonOutput.PersonalKernel.CareerMapping.FutureBlogProphecy = titleData.blogTitle;

        // --- Hesitation Metrics Processing ---
        if (Object.keys(metrics).length > 0) {
            let totalDurationMs = 0;
            let totalCorrections = 0;

            Object.values(metrics).forEach(m => {
                totalDurationMs += m.durationMs || 0;
                totalCorrections += m.corrections || 0;
            });

            const avgDurationMs = totalDurationMs / 25; // Assuming 25 questions
            let frictionType = "Standard-Processing";

            if (totalCorrections > 10) {
                frictionType = "High-Correction (Analytical Hesitation)";
            } else if (avgDurationMs > 8000) {
                frictionType = "Deep-Processing (Deliberate Pacing)";
            } else if (avgDurationMs < 2000 && totalCorrections === 0) {
                frictionType = "Instant-Execution (Intuitive Drive)";
            }

            jsonOutput.PersonalKernel._HiddenMetadata = {
                CognitiveFriction: frictionType,
                RawMetrics: {
                    TotalInputTimeMs: totalDurationMs,
                    TotalInputCorrections: totalCorrections,
                    AverageTimePerNodeMs: Math.round(avgDurationMs)
                }
            };
        }

        return jsonOutput;
    }
}
