export const QUESTIONS_DATA = [
    // P1: 心のクセ
    {
        id: "Q1", phase: "P1", text: "Q1: テストで悪い点数を取った時", options: [
            { label: "次を練る", tags: { CognitivePattern: { StressResponse: "Strategic" } } },
            { label: "分析", tags: { CognitivePattern: { StressResponse: "Analytical" } } },
            { label: "落ち込む", tags: { CognitivePattern: { StressResponse: "Emotional" } } },
            { label: "切替", tags: { CognitivePattern: { StressResponse: "Resilient" } } }
        ]
    },
    {
        id: "Q2", phase: "P1", text: "Q2: 友達と意見が分かれた時", options: [
            { label: "理屈", tags: { CognitivePattern: { DecisionMaking: "Logical" } } },
            { label: "合わせる", tags: { CognitivePattern: { DecisionMaking: "Harmonious" } } },
            { label: "別案", tags: { CognitivePattern: { DecisionMaking: "Creative" } } },
            { label: "他力", tags: { CognitivePattern: { DecisionMaking: "Delegating" } } }
        ]
    },
    {
        id: "Q3", phase: "P1", text: "Q3: 新しいゲームの遊び方", options: [
            { label: "説明書", tags: { CognitivePattern: { AutomaticThoughts: "Methodical" } } },
            { label: "即動かす", tags: { CognitivePattern: { AutomaticThoughts: "Action-Oriented" } } },
            { label: "マネ", tags: { CognitivePattern: { AutomaticThoughts: "Observational" } } },
            { label: "予想", tags: { CognitivePattern: { AutomaticThoughts: "Predictive" } } }
        ]
    },
    {
        id: "Q4", phase: "P1", text: "Q4: 忘れ物に気づいた時", options: [
            { label: "代替案", tags: { CognitivePattern: { StressResponse: "Resourceful" } } },
            { label: "恐怖", tags: { CognitivePattern: { StressResponse: "Anxious" } } },
            { label: "理由特定", tags: { CognitivePattern: { StressResponse: "Root-Cause" } } },
            { label: "楽観", tags: { CognitivePattern: { StressResponse: "Optimistic" } } }
        ]
    },
    {
        id: "Q5", phase: "P1", text: "Q5: 宿題をやる気が起きない時", options: [
            { label: "報酬", tags: { Values_Philosophy: { Frameworks: "Incentive-Driven" } } },
            { label: "後を想像", tags: { Values_Philosophy: { Frameworks: "Future-Oriented" } } },
            { label: "無心", tags: { Values_Philosophy: { Frameworks: "Zen" } } },
            { label: "誰かと", tags: { Values_Philosophy: { Frameworks: "Collaborative" } } }
        ]
    },
    {
        id: "Q6", phase: "P1", text: "Q6: 道に迷った時", options: [
            { label: "地図", tags: { CognitivePattern: { AutomaticThoughts: "Spatial-Logic" } } },
            { label: "聞く", tags: { CognitivePattern: { AutomaticThoughts: "Social-Query" } } },
            { label: "推理", tags: { CognitivePattern: { AutomaticThoughts: "Deductive" } } },
            { label: "感覚", tags: { CognitivePattern: { AutomaticThoughts: "Intuitive" } } }
        ]
    },
    {
        id: "Q7", phase: "P1", text: "Q7: 秘密を打ち明けられた時", options: [
            { label: "嬉しい", tags: { Values_Philosophy: { CoreBeliefs: "Trust-Valuing" } } },
            { label: "ワクワク", tags: { Values_Philosophy: { CoreBeliefs: "Curious" } } },
            { label: "重み", tags: { Values_Philosophy: { CoreBeliefs: "Responsible" } } },
            { label: "無関心", tags: { Values_Philosophy: { CoreBeliefs: "Detached" } } }
        ]
    },

    // P2: 伝え方
    {
        id: "Q8", phase: "P2", text: "Q8: LINEやチャットを送る時", options: [
            { label: "短文", tags: { WritingStyle: { Rhythm: "Staccato" } } },
            { label: "丁寧", tags: { WritingStyle: { Tone: "Polite" } } },
            { label: "用件のみ", tags: { WritingStyle: { Tone: "Direct" } } },
            { label: "感情", tags: { WritingStyle: { Vocabulary: "Expressive" } } }
        ]
    },
    {
        id: "Q9", phase: "P2", text: "Q9: 面白い話をする時", options: [
            { label: "結論から", tags: { WritingStyle: { Rhythm: "Bottom-Line-First" } } },
            { label: "実況", tags: { WritingStyle: { Tone: "Descriptive" } } },
            { label: "気持ち", tags: { WritingStyle: { Vocabulary: "Emotive" } } },
            { label: "擬音", tags: { WritingStyle: { Vocabulary: "Onomatopoeic" } } }
        ]
    },
    {
        id: "Q10", phase: "P2", text: "Q10: 人前で発表する時", options: [
            { label: "図解", tags: { WritingStyle: { Tone: "Visual" } } },
            { label: "文章", tags: { WritingStyle: { Rhythm: "Structured" } } },
            { label: "実演", tags: { WritingStyle: { Tone: "Kinesthetic" } } },
            { label: "スピーチ", tags: { WritingStyle: { Tone: "Oratorical" } } }
        ]
    },
    {
        id: "Q11", phase: "P2", text: "Q11: 好きなものを話す時", options: [
            { label: "高速", tags: { WritingStyle: { Rhythm: "Rapid-Fire" } } },
            { label: "じっくり", tags: { WritingStyle: { Rhythm: "Measured" } } },
            { label: "相手見つつ", tags: { WritingStyle: { Tone: "Adaptive" } } },
            { label: "最小限", tags: { WritingStyle: { Tone: "Minimalist" } } }
        ]
    },
    {
        id: "Q12", phase: "P2", text: "Q12: 文章を書く時", options: [
            { label: "正しさ", tags: { WritingStyle: { Vocabulary: "Precise" } } },
            { label: "面白さ", tags: { WritingStyle: { Tone: "Engaging" } } },
            { label: "読みやすさ", tags: { WritingStyle: { Tone: "Accessible" } } },
            { label: "こだわり", tags: { WritingStyle: { Vocabulary: "Idiosyncratic" } } }
        ]
    },
    {
        id: "Q13", phase: "P2", text: "Q13: アドバイスを受けた時", options: [
            { label: "試す", tags: { CognitivePattern: { DecisionMaking: "Experimental" } } },
            { label: "質問攻め", tags: { CognitivePattern: { DecisionMaking: "Interrogative" } } },
            { label: "比較", tags: { CognitivePattern: { DecisionMaking: "Comparative" } } },
            { label: "聞き流す", tags: { CognitivePattern: { DecisionMaking: "Independent" } } }
        ]
    },

    // P3: 価値観
    {
        id: "Q14", phase: "P3", text: "Q14: 魔法の杖を使う時", options: [
            { label: "知力", tags: { Values_Philosophy: { CoreBeliefs: "Knowledge-Seeker" } } },
            { label: "愛", tags: { Values_Philosophy: { CoreBeliefs: "Connection" } } },
            { label: "未来操作", tags: { Values_Philosophy: { CoreBeliefs: "Control" } } },
            { label: "時間", tags: { Values_Philosophy: { CoreBeliefs: "Efficiency" } } }
        ]
    },
    {
        id: "Q15", phase: "P3", text: "Q15: かっこいい大人に憧れる時", options: [
            { label: "賢い", tags: { Values_Philosophy: { CoreBeliefs: "Wisdom" } } },
            { label: "優しい", tags: { Values_Philosophy: { CoreBeliefs: "Empathy" } } },
            { label: "強い", tags: { Values_Philosophy: { CoreBeliefs: "Resilience" } } },
            { label: "自由", tags: { Values_Philosophy: { CoreBeliefs: "Autonomy" } } }
        ]
    },
    {
        id: "Q16", phase: "P3", text: "Q16: チームで役割を選ぶ時", options: [
            { label: "リーダー", tags: { Values_Philosophy: { Frameworks: "Leadership" } } },
            { label: "サポート", tags: { Values_Philosophy: { Frameworks: "Support" } } },
            { label: "アイデア", tags: { Values_Philosophy: { Frameworks: "Ideation" } } },
            { label: "分析", tags: { Values_Philosophy: { Frameworks: "Analysis" } } }
        ]
    },
    {
        id: "Q17", phase: "P3", text: "Q17: どうしても許せない時", options: [
            { label: "嘘", tags: { Values_Philosophy: { CoreBeliefs: "Truthfulness" } } },
            { label: "仲間外れ", tags: { Values_Philosophy: { CoreBeliefs: "Inclusivity" } } },
            { label: "不公平", tags: { Values_Philosophy: { CoreBeliefs: "Justice" } } },
            { label: "笑う", tags: { Values_Philosophy: { CoreBeliefs: "Respect" } } }
        ]
    },
    {
        id: "Q18", phase: "P3", text: "Q18: 幸せを感じる時", options: [
            { label: "発見", tags: { Values_Philosophy: { CoreBeliefs: "Exploration" } } },
            { label: "感謝", tags: { Values_Philosophy: { CoreBeliefs: "Gratitude" } } },
            { label: "目標達成", tags: { Values_Philosophy: { CoreBeliefs: "Achievement" } } },
            { label: "のんびり", tags: { Values_Philosophy: { CoreBeliefs: "Peace" } } }
        ]
    },
    {
        id: "Q19", phase: "P3", text: "Q19: 心を持つロボットに接する時", options: [
            { label: "人間扱い", tags: { Values_Philosophy: { Frameworks: "Personification" } } },
            { label: "道具", tags: { Values_Philosophy: { Frameworks: "Utilitarian" } } },
            { label: "研究対象", tags: { Values_Philosophy: { Frameworks: "Academic" } } },
            { label: "友達", tags: { Values_Philosophy: { Frameworks: "Relational" } } }
        ]
    },
    {
        id: "Q20", phase: "P3", text: "Q20: 今の自分に足りないと思う時", options: [
            { label: "知識", tags: { Values_Philosophy: { CoreBeliefs: "Intellect-Focus" } } },
            { label: "勇気", tags: { Values_Philosophy: { CoreBeliefs: "Action-Focus" } } },
            { label: "根気", tags: { Values_Philosophy: { CoreBeliefs: "Persistence-Focus" } } },
            { label: "仲間", tags: { Values_Philosophy: { CoreBeliefs: "Community-Focus" } } }
        ]
    },

    // P4: フィールド
    {
        id: "Q21", phase: "P4", text: "Q21: 自由な日の行き先を決める時", options: [
            { label: "図書/博", tags: { Values_Philosophy: { Frameworks: "Academic-Space" } } },
            { label: "自然", tags: { Values_Philosophy: { Frameworks: "Nature-Space" } } },
            { label: "電脳", tags: { Values_Philosophy: { Frameworks: "Digital-Space" } } },
            { label: "街", tags: { Values_Philosophy: { Frameworks: "Urban-Space" } } }
        ]
    },
    {
        id: "Q22", phase: "P4", text: "Q22: ニュースに興味を持つ時", options: [
            { label: "科学", tags: { Values_Philosophy: { Frameworks: "Science-Interest" } } },
            { label: "社会", tags: { Values_Philosophy: { Frameworks: "Society-Interest" } } },
            { label: "エンタメ", tags: { Values_Philosophy: { Frameworks: "Entertainment-Interest" } } },
            { label: "趣味", tags: { Values_Philosophy: { Frameworks: "Niche-Interest" } } }
        ]
    },
    {
        id: "Q23", phase: "P4", text: "Q23: 何かを学びたい時", options: [
            { label: "読書", tags: { CognitivePattern: { AutomaticThoughts: "Text-Learning" } } },
            { label: "動画", tags: { CognitivePattern: { AutomaticThoughts: "Visual-Learning" } } },
            { label: "体験", tags: { CognitivePattern: { AutomaticThoughts: "Kinesthetic-Learning" } } },
            { label: "人から", tags: { CognitivePattern: { AutomaticThoughts: "Social-Learning" } } }
        ]
    },
    {
        id: "Q24", phase: "P4", text: "Q24: 働きたい場所を想像する時", options: [
            { label: "研究室", tags: { Values_Philosophy: { Frameworks: "Lab-Environment" } } },
            { label: "オフィス", tags: { Values_Philosophy: { Frameworks: "Corporate-Environment" } } },
            { label: "現場", tags: { Values_Philosophy: { Frameworks: "Field-Environment" } } },
            { label: "自宅", tags: { Values_Philosophy: { Frameworks: "Remote-Environment" } } }
        ]
    },
    {
        id: "Q25", phase: "P4", text: "Q25: 負けないジャンルを選ぶ時", options: [
            { label: "論理", tags: { CognitivePattern: { DecisionMaking: "Logic-Dominant" } } },
            { label: "言葉", tags: { CognitivePattern: { DecisionMaking: "Verbal-Dominant" } } },
            { label: "観察", tags: { CognitivePattern: { DecisionMaking: "Observation-Dominant" } } },
            { label: "調整", tags: { CognitivePattern: { DecisionMaking: "Mediation-Dominant" } } }
        ]
    }
];
