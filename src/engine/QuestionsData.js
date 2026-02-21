export const QUESTIONS_DATA = [
    // P1: 心のクセ
    {
        id: "Q1", phase: "P1", text: "Q1: テストで悪い点数を取った時", textSimple: "Q1: テストで悪い点数を取った時", options: [
            { label: "次を練る", labelSimple: "どうすれば次は上手くいくか考える", tags: { CognitivePattern: { StressResponse: "Strategic" } } },
            { label: "分析", labelSimple: "どこを間違えたか調べる", tags: { CognitivePattern: { StressResponse: "Analytical" } } },
            { label: "落ち込む", labelSimple: "すごく落ち込む", tags: { CognitivePattern: { StressResponse: "Emotional" } } },
            { label: "切替", labelSimple: "すぐに気分を切り替える", tags: { CognitivePattern: { StressResponse: "Resilient" } } }
        ]
    },
    {
        id: "Q2", phase: "P1", text: "Q2: 友達と意見が分かれた時", textSimple: "Q2: 友達と意見がちがう時", options: [
            { label: "理屈", labelSimple: "しっかり理由を説明する", tags: { CognitivePattern: { DecisionMaking: "Logical" } } },
            { label: "合わせる", labelSimple: "相手の意見に合わせる", tags: { CognitivePattern: { DecisionMaking: "Harmonious" } } },
            { label: "別案", labelSimple: "まったく別の面白いアイデアを出す", tags: { CognitivePattern: { DecisionMaking: "Creative" } } },
            { label: "他力", labelSimple: "他の人にどうするか任せる", tags: { CognitivePattern: { DecisionMaking: "Delegating" } } }
        ]
    },
    {
        id: "Q3", phase: "P1", text: "Q3: 新しいゲームの遊び方", textSimple: "Q3: 新しいゲームを遊ぶ時", options: [
            { label: "説明書", labelSimple: "説明書をしっかり読む", tags: { CognitivePattern: { AutomaticThoughts: "Methodical" } } },
            { label: "即動かす", labelSimple: "とりあえず動かしてみる", tags: { CognitivePattern: { AutomaticThoughts: "Action-Oriented" } } },
            { label: "マネ", labelSimple: "上手い人のマネをする", tags: { CognitivePattern: { AutomaticThoughts: "Observational" } } },
            { label: "予想", labelSimple: "ルールを予想しながら遊ぶ", tags: { CognitivePattern: { AutomaticThoughts: "Predictive" } } }
        ]
    },
    {
        id: "Q4", phase: "P1", text: "Q4: 忘れ物に気づいた時", textSimple: "Q4: 大事な忘れ物に気づいた時", options: [
            { label: "代替案", labelSimple: "今あるもので何とかする", tags: { CognitivePattern: { StressResponse: "Resourceful" } } },
            { label: "恐怖", labelSimple: "どうしようとパニックになる", tags: { CognitivePattern: { StressResponse: "Anxious" } } },
            { label: "理由特定", labelSimple: "なぜ忘れたのか原因を考える", tags: { CognitivePattern: { StressResponse: "Root-Cause" } } },
            { label: "楽観", labelSimple: "まあいっかと気にしない", tags: { CognitivePattern: { StressResponse: "Optimistic" } } }
        ]
    },
    {
        id: "Q5", phase: "P1", text: "Q5: 宿題をやる気が起きない時", textSimple: "Q5: 宿題をやる気が起きない時", options: [
            { label: "報酬", labelSimple: "終わった後のご褒美を考える", tags: { Values_Philosophy: { Frameworks: "Incentive-Driven" } } },
            { label: "後を想像", labelSimple: "やらなかった時のヤバい未来を想像する", tags: { Values_Philosophy: { Frameworks: "Future-Oriented" } } },
            { label: "無心", labelSimple: "何も考えずにただ机に向かう", tags: { Values_Philosophy: { Frameworks: "Zen" } } },
            { label: "誰かと", labelSimple: "友達や家族と一緒にやる", tags: { Values_Philosophy: { Frameworks: "Collaborative" } } }
        ]
    },
    {
        id: "Q6", phase: "P1", text: "Q6: 道に迷った時", textSimple: "Q6: 知らない場所で道に迷った時", options: [
            { label: "地図", labelSimple: "スマホの地図アプリを調べる", tags: { CognitivePattern: { AutomaticThoughts: "Spatial-Logic" } } },
            { label: "聞く", labelSimple: "近くの人に道を聞く", tags: { CognitivePattern: { AutomaticThoughts: "Social-Query" } } },
            { label: "推理", labelSimple: "周りの景色を見て推理する", tags: { CognitivePattern: { AutomaticThoughts: "Deductive" } } },
            { label: "感覚", labelSimple: "自分のカンを信じて進む", tags: { CognitivePattern: { AutomaticThoughts: "Intuitive" } } }
        ]
    },
    {
        id: "Q7", phase: "P1", text: "Q7: 秘密を打ち明けられた時", textSimple: "Q7: 絶対ナイショの話を聞いた時", options: [
            { label: "嬉しい", labelSimple: "頼られて嬉しい気持ちになる", tags: { Values_Philosophy: { CoreBeliefs: "Trust-Valuing" } } },
            { label: "ワクワク", labelSimple: "知らなかった話にドキドキする", tags: { Values_Philosophy: { CoreBeliefs: "Curious" } } },
            { label: "重み", labelSimple: "誰にも言えない責任を感じる", tags: { Values_Philosophy: { CoreBeliefs: "Responsible" } } },
            { label: "無関心", labelSimple: "すぐ忘れてしまう", tags: { Values_Philosophy: { CoreBeliefs: "Detached" } } }
        ]
    },

    // P2: 伝え方
    {
        id: "Q8", phase: "P2", text: "Q8: LINEやチャットを送る時", textSimple: "Q8: スマホでメッセージを送る時", options: [
            { label: "短文", labelSimple: "短い文をポンポン送る", tags: { WritingStyle: { Rhythm: "Staccato" } } },
            { label: "丁寧", labelSimple: "ていねいな言葉を使う", tags: { WritingStyle: { Tone: "Polite" } } },
            { label: "用件のみ", labelSimple: "必要なことだけを送る", tags: { WritingStyle: { Tone: "Direct" } } },
            { label: "感情", labelSimple: "スタンプや絵文字をたくさん使う", tags: { WritingStyle: { Vocabulary: "Expressive" } } }
        ]
    },
    {
        id: "Q9", phase: "P2", text: "Q9: 面白い話をする時", textSimple: "Q9: おもしろい話をする時", options: [
            { label: "結論から", labelSimple: "「実はね…」と一番すごい所から", tags: { WritingStyle: { Rhythm: "Bottom-Line-First" } } },
            { label: "実況", labelSimple: "その場の様子をくわしく", tags: { WritingStyle: { Tone: "Descriptive" } } },
            { label: "気持ち", labelSimple: "自分がどう思ったかを熱く", tags: { WritingStyle: { Vocabulary: "Emotive" } } },
            { label: "擬音", labelSimple: "「バーン！」など効果音をつける", tags: { WritingStyle: { Vocabulary: "Onomatopoeic" } } }
        ]
    },
    {
        id: "Q10", phase: "P2", text: "Q10: 人前で発表する時", textSimple: "Q10: 人の前で発表する時", options: [
            { label: "図解", labelSimple: "絵や写真を見せながら", tags: { WritingStyle: { Tone: "Visual" } } },
            { label: "文章", labelSimple: "きれいに並べた文章で", tags: { WritingStyle: { Rhythm: "Structured" } } },
            { label: "実演", labelSimple: "体を使って実際にやってみる", tags: { WritingStyle: { Tone: "Kinesthetic" } } },
            { label: "スピーチ", labelSimple: "カッコいい言葉を使って", tags: { WritingStyle: { Tone: "Oratorical" } } }
        ]
    },
    {
        id: "Q11", phase: "P2", text: "Q11: 好きなものを話す時", textSimple: "Q11: 大好きなものの話をする時", options: [
            { label: "高速", labelSimple: "早口で一気にしゃべる", tags: { WritingStyle: { Rhythm: "Rapid-Fire" } } },
            { label: "じっくり", labelSimple: "ゆっくり、ていねいに", tags: { WritingStyle: { Rhythm: "Measured" } } },
            { label: "相手見つつ", labelSimple: "相手の反応を見ながら", tags: { WritingStyle: { Tone: "Adaptive" } } },
            { label: "最小限", labelSimple: "聞かれたことだけ答える", tags: { WritingStyle: { Tone: "Minimalist" } } }
        ]
    },
    {
        id: "Q12", phase: "P2", text: "Q12: 文章を書く時", textSimple: "Q12: 文章や作文を書く時", options: [
            { label: "正しさ", labelSimple: "まちがいのない正しい言葉で", tags: { WritingStyle: { Vocabulary: "Precise" } } },
            { label: "面白さ", labelSimple: "読んだ人が笑うように", tags: { WritingStyle: { Tone: "Engaging" } } },
            { label: "読みやすさ", labelSimple: "誰が読んでもわかりやすいように", tags: { WritingStyle: { Tone: "Accessible" } } },
            { label: "こだわり", labelSimple: "自分だけのこだわりを入れる", tags: { WritingStyle: { Vocabulary: "Idiosyncratic" } } }
        ]
    },
    {
        id: "Q13", phase: "P2", text: "Q13: アドバイスを受けた時", textSimple: "Q13: 「こうしたら？」とアドバイスされたら？", options: [
            { label: "試す", labelSimple: "とりあえず試してみる", tags: { CognitivePattern: { DecisionMaking: "Experimental" } } },
            { label: "質問攻め", labelSimple: "「なんで？」とくわしく聞く", tags: { CognitivePattern: { DecisionMaking: "Interrogative" } } },
            { label: "比較", labelSimple: "自分のやり方と比べる", tags: { CognitivePattern: { DecisionMaking: "Comparative" } } },
            { label: "聞き流す", labelSimple: "「ふーん」と流して基本変えない", tags: { CognitivePattern: { DecisionMaking: "Independent" } } }
        ]
    },

    // P3: 価値観
    {
        id: "Q14", phase: "P3", text: "Q14: 魔法の杖を使う時", textSimple: "Q14: もし魔法が使えるなら？", options: [
            { label: "知力", labelSimple: "世界の知識を知る", tags: { Values_Philosophy: { CoreBeliefs: "Knowledge-Seeker" } } },
            { label: "愛", labelSimple: "みんなを笑顔にする", tags: { Values_Philosophy: { CoreBeliefs: "Connection" } } },
            { label: "未来操作", labelSimple: "未来を自由に変える", tags: { Values_Philosophy: { CoreBeliefs: "Control" } } },
            { label: "時間", labelSimple: "時間を止める", tags: { Values_Philosophy: { CoreBeliefs: "Efficiency" } } }
        ]
    },
    {
        id: "Q15", phase: "P3", text: "Q15: かっこいい大人に憧れる時", textSimple: "Q15: どんな大人にあこがれる？", options: [
            { label: "賢い", labelSimple: "すごく頭がいい", tags: { Values_Philosophy: { CoreBeliefs: "Wisdom" } } },
            { label: "優しい", labelSimple: "誰にでも優しい", tags: { Values_Philosophy: { CoreBeliefs: "Empathy" } } },
            { label: "強い", labelSimple: "とても強くて頼もしい", tags: { Values_Philosophy: { CoreBeliefs: "Resilience" } } },
            { label: "自由", labelSimple: "自由に飛び回っている", tags: { Values_Philosophy: { CoreBeliefs: "Autonomy" } } }
        ]
    },
    {
        id: "Q16", phase: "P3", text: "Q16: チームで役割を選ぶ時", textSimple: "Q16: グループワークでの役割は？", options: [
            { label: "リーダー", labelSimple: "みんなをまとめる", tags: { Values_Philosophy: { Frameworks: "Leadership" } } },
            { label: "サポート", labelSimple: "目立たず手伝う", tags: { Values_Philosophy: { Frameworks: "Support" } } },
            { label: "アイデア", labelSimple: "面白い意見を出す", tags: { Values_Philosophy: { Frameworks: "Ideation" } } },
            { label: "分析", labelSimple: "冷静に調べる", tags: { Values_Philosophy: { Frameworks: "Analysis" } } }
        ]
    },
    {
        id: "Q17", phase: "P3", text: "Q17: どうしても許せない時", textSimple: "Q17: どんなことが許せない？", options: [
            { label: "嘘", labelSimple: "嘘をつかれること", tags: { Values_Philosophy: { CoreBeliefs: "Truthfulness" } } },
            { label: "仲間外れ", labelSimple: "仲間はずれにされること", tags: { Values_Philosophy: { CoreBeliefs: "Inclusivity" } } },
            { label: "不公平", labelSimple: "ズルくて不公平なこと", tags: { Values_Philosophy: { CoreBeliefs: "Justice" } } },
            { label: "笑う", labelSimple: "真剣な話を笑われること", tags: { Values_Philosophy: { CoreBeliefs: "Respect" } } }
        ]
    },
    {
        id: "Q18", phase: "P3", text: "Q18: 幸せを感じる時", textSimple: "Q18: どんな時に幸せを感じる？", options: [
            { label: "発見", labelSimple: "新しい発見をした時", tags: { Values_Philosophy: { CoreBeliefs: "Exploration" } } },
            { label: "感謝", labelSimple: "「ありがとう」と言われた時", tags: { Values_Philosophy: { CoreBeliefs: "Gratitude" } } },
            { label: "目標達成", labelSimple: "目標を達成した時", tags: { Values_Philosophy: { CoreBeliefs: "Achievement" } } },
            { label: "のんびり", labelSimple: "のんびりしている時", tags: { Values_Philosophy: { CoreBeliefs: "Peace" } } }
        ]
    },
    {
        id: "Q19", phase: "P3", text: "Q19: 心を持つロボットに接する時", textSimple: "Q19: 心を持つロボットがいたら？", options: [
            { label: "人間扱い", labelSimple: "人間のように接する", tags: { Values_Philosophy: { Frameworks: "Personification" } } },
            { label: "道具", labelSimple: "便利な道具として扱う", tags: { Values_Philosophy: { Frameworks: "Utilitarian" } } },
            { label: "研究対象", labelSimple: "どう動くか研究する", tags: { Values_Philosophy: { Frameworks: "Academic" } } },
            { label: "友達", labelSimple: "最高の相棒にする", tags: { Values_Philosophy: { Frameworks: "Relational" } } }
        ]
    },
    {
        id: "Q20", phase: "P3", text: "Q20: 今の自分に足りないと思う時", textSimple: "Q20: 今の自分に足りないと思うのは？", options: [
            { label: "知識", labelSimple: "もっとたくさんの知識", tags: { Values_Philosophy: { CoreBeliefs: "Intellect-Focus" } } },
            { label: "勇気", labelSimple: "前に進む勇気", tags: { Values_Philosophy: { CoreBeliefs: "Action-Focus" } } },
            { label: "根気", labelSimple: "諦めない粘り強さ", tags: { Values_Philosophy: { CoreBeliefs: "Persistence-Focus" } } },
            { label: "仲間", labelSimple: "一緒に頑張れる仲間", tags: { Values_Philosophy: { CoreBeliefs: "Community-Focus" } } }
        ]
    },

    // P4: フィールド
    {
        id: "Q21", phase: "P4", text: "Q21: 自由な日の行き先を決める時", textSimple: "Q21: 休みの日に行きたい場所は？", options: [
            { label: "図書/博", labelSimple: "図書館・博物館", tags: { Values_Philosophy: { Frameworks: "Academic-Space" } } },
            { label: "自然", labelSimple: "自然や公園", tags: { Values_Philosophy: { Frameworks: "Nature-Space" } } },
            { label: "電脳", labelSimple: "ネットの世界", tags: { Values_Philosophy: { Frameworks: "Digital-Space" } } },
            { label: "街", labelSimple: "街やショッピング", tags: { Values_Philosophy: { Frameworks: "Urban-Space" } } }
        ]
    },
    {
        id: "Q22", phase: "P4", text: "Q22: ニュースに興味を持つ時", textSimple: "Q22: どんなニュースに興味がある？", options: [
            { label: "科学", labelSimple: "科学や宇宙", tags: { Values_Philosophy: { Frameworks: "Science-Interest" } } },
            { label: "社会", labelSimple: "社会や世界の動き", tags: { Values_Philosophy: { Frameworks: "Society-Interest" } } },
            { label: "エンタメ", labelSimple: "ゲームやエンタメ", tags: { Values_Philosophy: { Frameworks: "Entertainment-Interest" } } },
            { label: "趣味", labelSimple: "自分の趣味のこと", tags: { Values_Philosophy: { Frameworks: "Niche-Interest" } } }
        ]
    },
    {
        id: "Q23", phase: "P4", text: "Q23: 何かを学びたい時", textSimple: "Q23: 何かを学びたい時、どうする？", options: [
            { label: "読書", labelSimple: "本や文章を読む", tags: { CognitivePattern: { AutomaticThoughts: "Text-Learning" } } },
            { label: "動画", labelSimple: "動画で見る", tags: { CognitivePattern: { AutomaticThoughts: "Visual-Learning" } } },
            { label: "体験", labelSimple: "実際にやってみる", tags: { CognitivePattern: { AutomaticThoughts: "Kinesthetic-Learning" } } },
            { label: "人から", labelSimple: "人に教わる", tags: { CognitivePattern: { AutomaticThoughts: "Social-Learning" } } }
        ]
    },
    {
        id: "Q24", phase: "P4", text: "Q24: 働きたい場所を想像する時", textSimple: "Q24: 将来、どこで働きたい？", options: [
            { label: "研究室", labelSimple: "静かな研究室", tags: { Values_Philosophy: { Frameworks: "Lab-Environment" } } },
            { label: "オフィス", labelSimple: "きれいなオフィス", tags: { Values_Philosophy: { Frameworks: "Corporate-Environment" } } },
            { label: "現場", labelSimple: "外や体を動かす現場", tags: { Values_Philosophy: { Frameworks: "Field-Environment" } } },
            { label: "自宅", labelSimple: "家や好きな場所", tags: { Values_Philosophy: { Frameworks: "Remote-Environment" } } }
        ]
    },
    {
        id: "Q25", phase: "P4", text: "Q25: 負けないジャンルを選ぶ時", textSimple: "Q25: 自分の得意なジャンルは？", options: [
            { label: "論理", labelSimple: "筋道を立てて考えること", tags: { CognitivePattern: { DecisionMaking: "Logic-Dominant" } } },
            { label: "言葉", labelSimple: "言葉で伝えること", tags: { CognitivePattern: { DecisionMaking: "Verbal-Dominant" } } },
            { label: "観察", labelSimple: "周りをよく観察すること", tags: { CognitivePattern: { DecisionMaking: "Observation-Dominant" } } },
            { label: "調整", labelSimple: "みんなの意見をまとめること", tags: { CognitivePattern: { DecisionMaking: "Mediation-Dominant" } } }
        ]
    }
];
