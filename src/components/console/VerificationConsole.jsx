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
        <div className="w-full max-w-4xl font-mono h-full flex flex-col pt-10 px-2 sm:px-0">
            <div className="mb-4 border-b border-cyan-800 pb-2">
                <h3 className="text-lg sm:text-xl text-cyan-400">[ 状態: Phase 3 | 進捗: 25 / 25 | モード: 最終確認 ]</h3>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 sm:pr-4 mb-8 space-y-4 sm:space-y-2 text-xs sm:text-sm text-slate-300">
                {QUESTIONS_DATA.map((q, i) => {
                    const selectedIndices = answers[q.id] || [];
                    const selectedLabels = selectedIndices.map(idx => {
                        const opt = q.options[idx - 1];
                        return opt ? `[${idx}] ${opt.label}` : '';
                    }).join(', ');

                    return (
                        <div key={q.id} className="flex flex-col sm:grid sm:grid-cols-12 gap-2 sm:gap-4 border-b border-cyan-900/30 pb-4 sm:py-2 items-start sm:items-center group">
                            <div className="flex justify-between w-full sm:col-span-1 sm:block">
                                <span className="text-cyan-600 font-bold">Q{i + 1}</span>
                                <button
                                    onClick={() => onEdit(i)}
                                    className="sm:hidden text-[10px] px-3 py-1 border border-cyan-800 text-cyan-700 hover:bg-cyan-900/50 hover:text-cyan-300 transition-colors focus:outline-none"
                                >
                                    修正
                                </button>
                            </div>
                            <div className="w-full sm:col-span-6 text-slate-400 group-hover:text-cyan-300 transition-colors leading-relaxed">
                                {q.text}
                            </div>
                            <div className="w-full sm:col-span-4 text-cyan-400 sm:text-right truncate bg-slate-900/50 sm:bg-transparent p-2 sm:p-0 rounded">
                                {selectedLabels || '未回答'}
                            </div>
                            <div className="hidden sm:block sm:col-span-1 text-right">
                                <button
                                    onClick={() => onEdit(i)}
                                    className="text-xs px-2 py-1 border border-cyan-800 text-cyan-700 hover:bg-cyan-900/50 hover:text-cyan-300 transition-colors focus:outline-none"
                                >
                                    修正
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-auto pb-10 flex justify-center w-full">
                <button
                    onClick={handleConfirm}
                    disabled={isConfirming}
                    className={`
                        w-full sm:w-auto relative group px-6 sm:px-16 py-4 border border-cyan-500/50 bg-cyan-950/30
                        text-cyan-300 tracking-widest text-sm sm:text-lg transition-all duration-500
                        hover:bg-cyan-900/50 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]
                        disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden focus:outline-none
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
