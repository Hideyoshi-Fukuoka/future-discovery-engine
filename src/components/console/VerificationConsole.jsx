import React, { useState } from 'react';
import { QUESTIONS_DATA } from '../../engine/QuestionsData';

const VerificationConsole = ({ answers, onEdit, onConfirm }) => {
    const [isConfirming, setIsConfirming] = useState(false);

    const handleConfirm = () => {
        setIsConfirming(true);
        setTimeout(() => {
            onConfirm();
        }, 800);
    };

    return (
        <div className="w-full max-w-4xl font-mono h-full flex flex-col pt-10">
            <div className="mb-4 border-b border-cyan-800 pb-2">
                <h3 className="text-xl text-cyan-400">[ 状態: Phase 3 | 進捗: 25 / 25 | モード: 最終確認 ]</h3>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 mb-8 space-y-2 text-sm text-slate-300">
                {QUESTIONS_DATA.map((q, i) => {
                    const selectedIndices = answers[q.id] || [];
                    const selectedLabels = selectedIndices.map(idx => {
                        const opt = q.options[idx - 1];
                        return opt ? `[${idx}] ${opt.label}` : '';
                    }).join(', ');

                    return (
                        <div key={q.id} className="grid grid-cols-12 gap-4 border-b border-cyan-900/30 py-2 items-center group">
                            <div className="col-span-1 text-cyan-600 font-bold">Q{i + 1}</div>
                            <div className="col-span-6 text-slate-400 group-hover:text-cyan-300 transition-colors">{q.text}</div>
                            <div className="col-span-4 text-cyan-400 text-right truncate">
                                {selectedLabels || '未回答'}
                            </div>
                            <div className="col-span-1 text-right">
                                <button
                                    onClick={() => onEdit(i)}
                                    className="text-xs px-2 py-1 border border-cyan-800 text-cyan-700 hover:bg-cyan-900/50 hover:text-cyan-300 transition-colors"
                                >
                                    修正
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-auto pb-10 flex justify-center">
                <button
                    onClick={handleConfirm}
                    disabled={isConfirming}
                    className={`
                        relative group px-16 py-4 border border-cyan-500/50 bg-cyan-950/30
                        text-cyan-300 tracking-widest text-lg transition-all duration-500
                        hover:bg-cyan-900/50 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]
                        disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden
                    `}
                >
                    <div className="absolute inset-0 w-full h-full bg-cyan-500/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                    <span className="relative z-10 font-bold">
                        {isConfirming ? '[ 承認プロセス実行中... ]' : '[ フルダイブログ承認 / 解析開始 ]'}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default VerificationConsole;
