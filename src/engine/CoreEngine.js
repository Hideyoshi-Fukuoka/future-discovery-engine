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
                const isDeep = num > 4;
                const baseNum = isDeep ? num - 4 : num;
                const weight = isDeep ? 2 : 1;

                if (qNum >= 1 && qNum <= 7) {
                    x += (baseNum <= 2 ? weight : -weight); // 1,2は論理寄り
                } else if (qNum >= 8 && qNum <= 13) {
                    y += (baseNum % 2 === 1 ? weight : -weight); // 奇数は構造寄り
                } else if (qNum >= 21 && qNum <= 25) { // Updated to exactly capture Q21-25 as intended
                    z += (baseNum === 1 || baseNum === 3 ? weight : -weight); // 1,3は仮想/電脳寄り
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
            vectorCode: `X${idxX}Y${idxY}Z${idxZ}`,
            rawIndices: { idxX, idxY, idxZ }
        };
    }

    /**
     * 現実世界の職業クリエイター (Phase 7)
     * X, Y, Z のベクトルから、全く方向性の異なる3つの「実在する職業」を導出する。
     * 1. 堅実な未来 (Solid Path): 最も適性の高い、王道のアプローチ
     * 2. 先進的な未来 (Pioneering Path): より技術/概念の先端へ向かうアプローチ
     * 3. 意外な未来 (Divergent Path): 隠れた適性（パラメーターの2番手）を活かすアプローチ
     */
    static generateRealCareers(idxX, idxY, idxZ) {
        // X: 0=直感/感性, 4=論理/分析
        // Y: 0=拡散/創造, 4=構造/規律
        // Z: 0=物理/対人, 3=仮想/電脳

        const isLogical = idxX >= 2;
        const isStructured = idxY >= 2;
        const isVirtual = idxZ >= 1;

        const careers = [];

        // 1. 堅実な未来 (Core Match)
        if (isLogical && isStructured && isVirtual) careers.push("データサイエンティスト", "システムアーキテクト");
        else if (isLogical && !isStructured && isVirtual) careers.push("セキュリティエンジニア", "アルゴリズム研究者");
        else if (!isLogical && isStructured && isVirtual) careers.push("UI/UXデザイナー", "テクニカルライター");
        else if (!isLogical && !isStructured && isVirtual) careers.push("VR/ARクリエイター", "デジタルアーティスト");
        else if (isLogical && isStructured && !isVirtual) careers.push("経営コンサルタント", "財務アナリスト");
        else if (isLogical && !isStructured && !isVirtual) careers.push("フィールドリサーチャー", "ビジネスデベロッパー");
        else if (!isLogical && isStructured && !isVirtual) careers.push("プロジェクトマネージャー", "人事考課ストラテジスト");
        else careers.push("クリエイティブディレクター", "コミュニティマネージャー");

        // 2. 先進的な未来 (Pioneering Match - Z軸やX軸を極端に解釈)
        if (idxX === 4) careers.push("量子コンピューティング研究者", "AIアライメント専門家");
        else if (idxX === 0) careers.push("感情拡張インタラクション設計者", "ニューロエステティクス研究者");
        else if (idxZ === 3) careers.push("フルダイブ空間設計士", "仮想経済ストラテジスト");
        else if (idxY === 4) careers.push("ブロックチェーン合意形成アーキテクト", "スマートシティインフラ統括者");
        else careers.push("人間拡張デバイスエンジニア", "テクノロジーエバンジェリスト");

        // 3. 意外な未来 (Divergent Match - 反対の適性をあえて活用)
        if (isLogical) careers.push("サイエンスコミュニケーター", "ハイテク法務アドバイザー");
        else careers.push("データビジュアライザ", "ユーザーテスト心理分析官");

        if (isVirtual) careers.push("スマートアグリカルチャー技師", "テック系フィジカルセラピスト");
        else careers.push("クラウドコミュニティオーガナイザー", "リモートファントムワーカー");

        // Fisher-Yates shuffle for variety within the deterministic pools
        const shuffle = (array) => array.sort(() => Math.random() - 0.5);

        // Select one from each category ensuring uniqueness
        const selected = [
            careers[0],
            careers[2] || careers[3],
            careers[4] || careers[5] || careers[6]
        ].filter(Boolean);

        // Fallback cleanup if logic missed somehow
        const uniqueSelected = [...new Set(selected)];
        while (uniqueSelected.length < 3) {
            const fallback = ["プロンプトエンジニア", "AIプロダクトマネージャー", "XRストラテジスト"];
            const next = fallback.find(f => !uniqueSelected.includes(f));
            if (next) uniqueSelected.push(next);
            else break;
        }

        return uniqueSelected.slice(0, 3);
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

        // Determine SF Title using the 100-Title generator
        const titleData = CoreEngine.generateFutureTitle(answers);

        // Determine 3 Real-World Careers based on vectors
        const realCareers = CoreEngine.generateRealCareers(titleData.rawIndices.idxX, titleData.rawIndices.idxY, titleData.rawIndices.idxZ);

        // Map the title generation back to our JSON schema
        jsonOutput.PersonalKernel.CareerMapping.TopClusters = [titleData.title];
        jsonOutput.PersonalKernel.CareerMapping.RealCareers = realCareers;
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
