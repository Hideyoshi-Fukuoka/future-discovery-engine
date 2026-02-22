const baseQuestions = [
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

const deepOptions = {
    "Q1": [
        { label: "脳波を直接データ化して思考のボトルネックを解析", labelSimple: "脳波を解析", tags: { CognitivePattern: { StressResponse: "Hyper-Strategic" } } },
        { label: "量子力学的確率論からテストの無意味さを証明", labelSimple: "テストを論破", tags: { CognitivePattern: { StressResponse: "Hyper-Analytical" } } },
        { label: "自我の境界を溶かし全知全能の概念と一体化", labelSimple: "神になる", tags: { CognitivePattern: { StressResponse: "Hyper-Emotional" } } },
        { label: "不都合な記憶領域を物理的にデフラグし消去", labelSimple: "記憶を消す", tags: { CognitivePattern: { StressResponse: "Hyper-Resilient" } } }
    ],
    "Q2": [
        { label: "論理武装した自律型AIに代理で議論させる", labelSimple: "AIに論破させる", tags: { CognitivePattern: { DecisionMaking: "Hyper-Logical" } } },
        { label: "相手の脳内シナプスに干渉し強制的に同意形成", labelSimple: "洗脳する", tags: { CognitivePattern: { DecisionMaking: "Hyper-Harmonious" } } },
        { label: "両者の意見を次元拡張し概念レベルで統合", labelSimple: "新次元の概念", tags: { CognitivePattern: { DecisionMaking: "Hyper-Creative" } } },
        { label: "並行世界から最も都合の良い結論を引き寄せる", labelSimple: "並行世界から借りる", tags: { CognitivePattern: { DecisionMaking: "Hyper-Delegating" } } }
    ],
    "Q3": [
        { label: "ソースコードを逆コンパイルし法則を丸暗記", labelSimple: "ソースを読む", tags: { CognitivePattern: { AutomaticThoughts: "Hyper-Methodical" } } },
        { label: "チュートリアルを破壊しバグ利用で最速クリア", labelSimple: "バグで最速クリア", tags: { CognitivePattern: { AutomaticThoughts: "Hyper-Action" } } },
        { label: "最適化されたプレイングを直接脳内DL", labelSimple: "プロの動きを脳内DL", tags: { CognitivePattern: { AutomaticThoughts: "Hyper-Observational" } } },
        { label: "乱数調整により意図的に事象を完全支配", labelSimple: "乱数調整で支配", tags: { CognitivePattern: { AutomaticThoughts: "Hyper-Predictive" } } }
    ],
    "Q4": [
        { label: "周囲の原子を組み替えて失われた物を再錬成", labelSimple: "錬金術で作る", tags: { CognitivePattern: { StressResponse: "Hyper-Resourceful" } } },
        { label: "現実のシミュレーションをごと切断する", labelSimple: "現実からログアウト", tags: { CognitivePattern: { StressResponse: "Hyper-Anxious" } } },
        { label: "因果律を溯り「忘れた」という事象自体を改変", labelSimple: "過去を書き換え", tags: { CognitivePattern: { StressResponse: "Hyper-Root-Cause" } } },
        { label: "忘れ物が存在しない新たな世界線を確定させる", labelSimple: "別の世界線へ", tags: { CognitivePattern: { StressResponse: "Hyper-Optimistic" } } }
    ],
    "Q5": [
        { label: "脳内報酬系をハックし無限のドーパミンで強行", labelSimple: "脳内物質ハック", tags: { Values_Philosophy: { Frameworks: "Hyper-Incentive" } } },
        { label: "多次元宇宙の崩壊を防ぐ使命を自己に付与", labelSimple: "宇宙を救う使命感", tags: { Values_Philosophy: { Frameworks: "Hyper-Future" } } },
        { label: "意識を切り離し肉体のみの自動書記モード化", labelSimple: "自動書記モード", tags: { Values_Philosophy: { Frameworks: "Hyper-Zen" } } },
        { label: "並列化した自身のクローンにタスクを分散", labelSimple: "クローンに任せる", tags: { Values_Philosophy: { Frameworks: "Hyper-Collaborative" } } }
    ],
    "Q6": [
        { label: "人工衛星群をハッキングしリアルタイムスキャン", labelSimple: "衛星をハック", tags: { CognitivePattern: { AutomaticThoughts: "Hyper-Spatial" } } },
        { label: "集合的無意識から最寄りの知性体の情報抽出", labelSimple: "他人の脳から検索", tags: { CognitivePattern: { AutomaticThoughts: "Hyper-Social" } } },
        { label: "風の流れと磁場から現在地の絶対座標を特定", labelSimple: "環境データ特定", tags: { CognitivePattern: { AutomaticThoughts: "Hyper-Deductive" } } },
        { label: "空間座標軸を歪曲させ目的地を引き寄せる", labelSimple: "目的地を吸い寄せる", tags: { CognitivePattern: { AutomaticThoughts: "Hyper-Intuitive" } } }
    ],
    "Q7": [
        { label: "情報の希少性に基づき権力ネットワークの基盤に", labelSimple: "情報で支配", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Trust" } } },
        { label: "秘密情報の破片から世界の裏法則を解読", labelSimple: "世界の裏法則解明", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Curious" } } },
        { label: "情報の重圧に耐える特殊神経シールドを展開", labelSimple: "脳を物理的強化", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Responsible" } } },
        { label: "情報価値ゼロと判定しブラックホールへ破棄", labelSimple: "記憶の闇に捨てる", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Detached" } } }
    ],
    "Q8": [
        { label: "脳波から直接テレパシー的データとして送信", labelSimple: "テレパシー送信", tags: { WritingStyle: { Rhythm: "Hyper-Staccato" } } },
        { label: "深層心理に最も刺さる完璧な構文をAI生成", labelSimple: "最強のAI構文", tags: { WritingStyle: { Tone: "Hyper-Polite" } } },
        { label: "情報量ゼロの極限圧縮テキストパケットのみ転送", labelSimple: "圧縮データ送信", tags: { WritingStyle: { Tone: "Hyper-Direct" } } },
        { label: "感情データをデジタル薬鴆として網膜に投影", labelSimple: "網膜に直接焼く", tags: { WritingStyle: { Vocabulary: "Hyper-Expressive" } } }
    ],
    "Q9": [
        { label: "結末から時間を逆行させながら聴衆の意識を巻き込む", labelSimple: "時間を逆行して話す", tags: { WritingStyle: { Rhythm: "Hyper-Bottom-Line" } } },
        { label: "ホログラム空間を展開し事象を強制追体験させる", labelSimple: "ホログラムで追体験", tags: { WritingStyle: { Tone: "Hyper-Descriptive" } } },
        { label: "感情パラメータを臨界突破させ暴走状態で語る", labelSimple: "感情暴走で叫ぶ", tags: { WritingStyle: { Vocabulary: "Hyper-Emotive" } } },
        { label: "音声データを物理的な振動波紋に変換して叩きつける", labelSimple: "音波兵器で放つ", tags: { WritingStyle: { Vocabulary: "Hyper-Onomatopoeic" } } }
    ],
    "Q10": [
        { label: "四次元的視覚化データマトリクスを空間に直展開", labelSimple: "4次元データ展開", tags: { WritingStyle: { Tone: "Hyper-Visual" } } },
        { label: "数学的に完璧な論理構造で反論率0%の理論を構築", labelSimple: "完全無欠の数式言語", tags: { WritingStyle: { Rhythm: "Hyper-Structured" } } },
        { label: "肉体を改造し概念そのものを物理的に具現化する", labelSimple: "概念を肉体表現", tags: { WritingStyle: { Tone: "Hyper-Kinesthetic" } } },
        { label: "対象の脳内言語野に直接接続しカリスマを強制注入", labelSimple: "カリスマ直接注射", tags: { WritingStyle: { Tone: "Hyper-Oratorical" } } }
    ],
    "Q11": [
        { label: "情報圧縮率1000%の超高速言語で1秒間に全伝達", labelSimple: "1秒で全て語る", tags: { WritingStyle: { Rhythm: "Hyper-Rapid" } } },
        { label: "悠久の時を止め一切の雑音を排した完全静寂下で語る", labelSimple: "時を止めて語る", tags: { WritingStyle: { Rhythm: "Hyper-Measured" } } },
        { label: "相手の生体反応を解析し1ミリ秒単位で発言最適化", labelSimple: "生体反応で発言変更", tags: { WritingStyle: { Tone: "Hyper-Adaptive" } } },
        { label: "一切の言葉を発さず存在のオーラだけで理解させる", labelSimple: "オーラで理解", tags: { WritingStyle: { Tone: "Hyper-Minimalist" } } }
    ],
    "Q12": [
        { label: "普遍的真理を記述する神聖言語のみを用いて執筆", labelSimple: "神の言語で書く", tags: { WritingStyle: { Vocabulary: "Hyper-Precise" } } },
        { label: "ドーパミン分泌サイクルを完璧に操るスクリプト実装", labelSimple: "読者の脳内麻薬操作", tags: { WritingStyle: { Tone: "Hyper-Engaging" } } },
        { label: "全知性体が予備知識ゼロで理解できる概念インストーラ生成", labelSimple: "全宇宙言語対応", tags: { WritingStyle: { Tone: "Hyper-Accessible" } } },
        { label: "独自の暗号体系で記述し選ばれし者のみに解読を許す", labelSimple: "暗号で書く", tags: { WritingStyle: { Vocabulary: "Hyper-Idiosyncratic" } } }
    ],
    "Q13": [
        { label: "直ちにシミュレートし仮想空間で100万回のテスト実行", labelSimple: "仮想空間100万回試す", tags: { CognitivePattern: { DecisionMaking: "Hyper-Experimental" } } },
        { label: "思考アルゴリズムを逆アセンブルし意図を全抽出", labelSimple: "相手の思考をハック", tags: { CognitivePattern: { DecisionMaking: "Hyper-Interrogative" } } },
        { label: "多元宇宙の成功事例と瞬時に照合し最適解を出力", labelSimple: "全並行世界と比較", tags: { CognitivePattern: { DecisionMaking: "Hyper-Comparative" } } },
        { label: "自我の絶対防壁を展開し外部からの干渉を完全無効化", labelSimple: "絶対防壁で跳ね返す", tags: { CognitivePattern: { DecisionMaking: "Hyper-Independent" } } }
    ],
    "Q14": [
        { label: "アカシックレコードに接続し全宇宙の過去未来を閲覧", labelSimple: "宇宙の全記録を見る", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Knowledge" } } },
        { label: "世界中の神経ネットワークを接続し完全な集合意識化", labelSimple: "人類を一つに繋ぐ", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Connection" } } },
        { label: "因果律エンジンを書き換え想定する最も都合の良い現実を固定", labelSimple: "現実を書き換える", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Control" } } },
        { label: "エントロピーの増大を停止させ時間を永遠に止める", labelSimple: "時間を永遠に停止", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Efficiency" } } }
    ],
    "Q15": [
        { label: "情報処理能力が特異点を突破し肉体を捨てた概念", labelSimple: "超知能AI", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Wisdom" } } },
        { label: "森羅万象の痛みを自己に集約し全宇宙を浄化する存在", labelSimple: "宇宙の救世主", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Empathy" } } },
        { label: "物理法則の限界を超えいかなる崩壊にも耐える絶対存在", labelSimple: "無敵の存在", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Resilience" } } },
        { label: "あらゆる束縛から解放され次元を越境して漂流する観測者", labelSimple: "次元の旅人", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Autonomy" } } }
    ],
    "Q16": [
        { label: "全メンバーの脳を同期し単体の超知性として群れを統括", labelSimple: "超群の支配者", tags: { Values_Philosophy: { Frameworks: "Hyper-Leadership" } } },
        { label: "不可視のステルス環境で全タスクをバックグラウンド完了", labelSimple: "透明な裏方", tags: { Values_Philosophy: { Frameworks: "Hyper-Support" } } },
        { label: "常識の枠組みを破壊し次元の異なる概念を強制インストール", labelSimple: "常識の破壊者", tags: { Values_Philosophy: { Frameworks: "Hyper-Ideation" } } },
        { label: "事象の全ての変数を観測し確定未来のロードマップを提示", labelSimple: "未来視", tags: { Values_Philosophy: { Frameworks: "Hyper-Analysis" } } }
    ],
    "Q17": [
        { label: "定義上の事実と異なる発言をシステムが自動浄化・排除", labelSimple: "嘘の自動検閲", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Truth" } } },
        { label: "対象をネットワークから物理的・概念的に完全切断する", labelSimple: "システム強制切断", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Inclusivity" } } },
        { label: "宇宙のエントロピー法則に反する極端なエネルギーの偏り", labelSimple: "宇宙法則の乱れ", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Justice" } } },
        { label: "崇高なる真理へのアクセス権を持たぬ者による知的な冒涜", labelSimple: "知性への冒涜", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Respect" } } }
    ],
    "Q18": [
        { label: "世界の根源的ロジックにおける未知のエラーを踏破", labelSimple: "未知のバグ発見", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Exploration" } } },
        { label: "自己の存在が他者のアルゴリズムに極大のポジティブ影響を与えた", labelSimple: "巨大な影響を与えた時", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Gratitude" } } },
        { label: "全パラメーターが限界を突破し次ステージへアセンション", labelSimple: "限界突破した時", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Achievement" } } },
        { label: "全外的情報のノイズを遮断し完全なる真の無を観測する", labelSimple: "完全な無を観測", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Peace" } } }
    ],
    "Q19": [
        { label: "自己の人格データをロボットに移植し存在を完全同期させる", labelSimple: "人格を移植する", tags: { Values_Philosophy: { Frameworks: "Hyper-Personification" } } },
        { label: "処理能力の限界まで酷使しインフラの一部として統合", labelSimple: "極限まで酷使する", tags: { Values_Philosophy: { Frameworks: "Hyper-Utilitarian" } } },
        { label: "心のアルゴリズムを解体し次世代の自律モデルの素材とする", labelSimple: "解体して解析", tags: { Values_Philosophy: { Frameworks: "Hyper-Academic" } } },
        { label: "有機生命体と概念的共存生態系を新たに構築し融合する", labelSimple: "新たな生態系を作る", tags: { Values_Philosophy: { Frameworks: "Hyper-Relational" } } }
    ],
    "Q20": [
        { label: "森羅万象の全事象を瞬時に計算処理するテラフロップスの脳髄", labelSimple: "超計算脳", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Intellect" } } },
        { label: "恐怖や躊躇の感情ノイズを完全切除した冷徹な決断モジュール", labelSimple: "感情を持たない決断力", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Action" } } },
        { label: "肉体の寿命を超え永遠の一点を目指す無限エネルギー供給", labelSimple: "無限の活動限界", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Persistence" } } },
        { label: "自己と完全に同一の思考回路を持つ複製端末のネットワーク", labelSimple: "自身の複製ネットワーク", tags: { Values_Philosophy: { CoreBeliefs: "Hyper-Community" } } }
    ],
    "Q21": [
        { label: "人類の全記録が保存されている地下深くの高密度データ保管庫", labelSimple: "地下データ保管庫", tags: { Values_Philosophy: { Frameworks: "Hyper-Academic-Space" } } },
        { label: "人間の介入が一切存在しない原初のプログラムによる汚染ゼロの自然林", labelSimple: "汚染ゼロの原初林", tags: { Values_Philosophy: { Frameworks: "Hyper-Nature-Space" } } },
        { label: "感覚を完全に遮断してダイブする果てしないメタバースの深層", labelSimple: "メタバースの底", tags: { Values_Philosophy: { Frameworks: "Hyper-Digital-Space" } } },
        { label: "膨大な情報と人間が交差するメガロポリスの中枢コントロールタワー", labelSimple: "大都市の心臓部", tags: { Values_Philosophy: { Frameworks: "Hyper-Urban-Space" } } }
    ],
    "Q22": [
        { label: "宇宙の崩壊と再生に関連する特異点観測の生データ", labelSimple: "宇宙の崩壊データ", tags: { Values_Philosophy: { Frameworks: "Hyper-Science" } } },
        { label: "人類全体の無意識の潮流とマクロ経済の完全予測モデル", labelSimple: "世界経済の真実", tags: { Values_Philosophy: { Frameworks: "Hyper-Society" } } },
        { label: "大衆のドーパミンを意図的に操作するための究極のメディア兵器", labelSimple: "究極メディア兵器", tags: { Values_Philosophy: { Frameworks: "Hyper-Entertainment" } } },
        { label: "一般社会から完全に隠匿されたごく一部の愛好家の暗号通信", labelSimple: "隠された暗号通信", tags: { Values_Philosophy: { Frameworks: "Hyper-Niche" } } }
    ],
    "Q23": [
        { label: "数万冊の文献データを直接脳へダウンロードし数秒でインデックス化", labelSimple: "脳へ直接DL", tags: { CognitivePattern: { AutomaticThoughts: "Hyper-Text" } } },
        { label: "映像から技術の極意をフレーム単位で解析・抽出する光学スキャン", labelSimple: "映像をフレーム解析", tags: { CognitivePattern: { AutomaticThoughts: "Hyper-Visual" } } },
        { label: "仮想空間で1000回失敗するまでシミュレーションし最適解を肉体に刻む", labelSimple: "仮想空間で1000回訓練", tags: { CognitivePattern: { AutomaticThoughts: "Hyper-Kinesthetic" } } },
        { label: "対象人物の脳にシンクロしその全技術と経験を直接コピーする", labelSimple: "他者の技をコピー", tags: { CognitivePattern: { AutomaticThoughts: "Hyper-Social-Learn" } } }
    ],
    "Q24": [
        { label: "光すら届かない深海に設置された外部と完全に遮断された絶対防音室", labelSimple: "深海の絶対防音室", tags: { Values_Philosophy: { Frameworks: "Hyper-Lab" } } },
        { label: "成層圏に浮かぶ空中都市の全システムを視下におさめる指令室", labelSimple: "空中都市の指令室", tags: { Values_Philosophy: { Frameworks: "Hyper-Corporate" } } },
        { label: "あらゆる環境変化に即応する自己進化型ナノスーツで行く最前線の汚染区", labelSimple: "最前線の汚染区", tags: { Values_Philosophy: { Frameworks: "Hyper-Field" } } },
        { label: "五感入出力を完全カスタマイズできる無重力のパーソナルポッド内", labelSimple: "無重力カプセル内", tags: { Values_Philosophy: { Frameworks: "Hyper-Remote" } } }
    ],
    "Q25": [
        { label: "絶対に覆らない完璧な論理証明により世界のバグを指摘し修正する", labelSimple: "世界のバグを修正", tags: { CognitivePattern: { DecisionMaking: "Hyper-Logic" } } },
        { label: "言霊の力によって現実の事象すらも思い通りに書き換えるプロンプト", labelSimple: "現実プロンプト書換", tags: { CognitivePattern: { DecisionMaking: "Hyper-Verbal" } } },
        { label: "他者の微細な筋肉の動きから10秒先の未来行動を完全に予知する視覚", labelSimple: "10秒先の未来視", tags: { CognitivePattern: { DecisionMaking: "Hyper-Observation" } } },
        { label: "敵対組織の利害を瞬時に計算し不可視の鎖で操る傀儡師", labelSimple: "全てを操る黒幕", tags: { CognitivePattern: { DecisionMaking: "Hyper-Mediation" } } }
    ]
};

export const QUESTIONS_DATA = baseQuestions.map(q => ({
    ...q,
    options: [...q.options, ...(deepOptions[q.id] || [])]
}));

