import React, { useMemo, useState, useEffect } from 'react';
import { CoreEngine } from '../../engine/CoreEngine';
import { GeminiService } from '../../services/GeminiService';

const ResultProcessor = ({ answers, metrics, onRestart }) => {
    const [step, setStep] = useState(0); // 0: report fade-in, 1: buttons visible, 2: json view, 3: future log view
    const [isFading, setIsFading] = useState(false);
    const [futureLogStream, setFutureLogStream] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);

    const report = useMemo(() => CoreEngine.generateReport(answers, metrics), [answers, metrics]);
    const jsonString = useMemo(() => JSON.stringify(report.PersonalKernel, null, 2), [report]);

    useEffect(() => {
        // Auto-progress to show buttons after report is read
        if (step === 0) {
            const timer = setTimeout(() => {
                setStep(1);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    const handleAction = async (nextStep) => {
        if (nextStep === 'restart') {
            setIsFading(true);
            setTimeout(() => {
                if (onRestart) onRestart();
            }, 1000);
        } else if (nextStep === 3) {
            setStep(3);
            setIsStreaming(true);
            setFutureLogStream('');

            await GeminiService.generateFutureLogStream(report.PersonalKernel, (chunk) => {
                setFutureLogStream(prev => prev + chunk);
            });
            setIsStreaming(false);

        } else {
            setStep(nextStep);
        }
    };

    return (
        <div className={`w-full max-w-4xl font-mono pt-10 h-full flex flex-col transition-opacity duration-1000 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            <div className="mb-8 border-b border-cyan-800 pb-2">
                <h3 className="text-xl text-cyan-400">[ 状態: Phase 4 | 解析完了 | モード: 診断結果出力 ]</h3>
            </div>

            <div className={`transition-opacity duration-1000 ${step >= 0 ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-2xl sm:text-3xl text-white mb-4">
                    あなたの職業適性は <span className="text-cyan-300 font-bold tracking-wider inline-block">『{report.PersonalKernel.CareerMapping.TopClusters[0]}』</span> です。
                </h2>

                <div className="bg-cyan-950/20 p-4 sm:p-6 border-l-4 border-cyan-600 mb-8 rounded text-sm sm:text-base">
                    <p className="text-cyan-100 leading-relaxed whitespace-pre-wrap">
                        {report.PersonalKernel.CareerMapping.LogicPath}
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-opacity duration-1000 w-full ${step >= 1 && step < 2 ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'}`}>
                {step === 1 && (
                    <>
                        <button onClick={() => handleAction(2)} className="w-full sm:w-auto px-4 sm:px-6 py-3 border border-cyan-700 text-cyan-400 hover:bg-cyan-900/50 hover:text-cyan-200 transition-colors text-sm sm:text-base focus:outline-none">
                            [ JSONデータを確認する ]
                        </button>
                        <button onClick={() => handleAction(3)} className="w-full sm:w-auto px-4 sm:px-6 py-3 border border-cyan-500 bg-cyan-900/40 text-cyan-100 hover:bg-cyan-800 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all text-sm sm:text-base focus:outline-none">
                            [ 終了する (未来日誌を生成) ]
                        </button>
                        <button onClick={() => handleAction('restart')} className="w-full sm:w-auto px-4 sm:px-6 py-3 border border-red-900/50 text-red-400 hover:bg-red-950/50 hover:text-red-300 transition-colors text-sm sm:text-base focus:outline-none">
                            [ 再診断する (因果律リセット) ]
                        </button>
                    </>
                )}
            </div>

            {/* Step 2: JSON View */}
            {step === 2 && (
                <div className="flex-1 flex flex-col mt-4 animate-fade-in relative z-10">
                    <pre className="flex-1 text-xs text-cyan-300 leading-relaxed whitespace-pre-wrap bg-slate-900/80 p-6 rounded border border-cyan-900 overflow-y-auto mb-6">
                        {jsonString}
                    </pre>
                    <div className="flex justify-center mb-10">
                        <button onClick={() => setStep(1)} className="px-8 py-2 border border-cyan-800 text-cyan-500 hover:bg-cyan-950/50">
                            戻る
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Exit/Future Log View (Gemini Stream) */}
            {step === 3 && (
                <div className="flex-1 flex flex-col mt-4 animate-fade-in relative z-10">
                    <div className="text-center mb-6">
                        <div className="text-cyan-500 animate-pulse font-bold tracking-widest">
                            [ SYSTEM ALIAS: GEMINI ACTIVE ]
                        </div>
                        {isStreaming && (
                            <div className="text-cyan-700 text-xs mt-2 tracking-[0.3em]">
                                CALCULATING 30-YEAR TRAJECTORY...
                            </div>
                        )}
                    </div>

                    <div className="flex-1 bg-slate-900/50 p-6 border border-cyan-800 overflow-y-auto font-mono text-sm text-cyan-100 leading-relaxed whitespace-pre-wrap mb-6 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]">
                        {futureLogStream}
                        {isStreaming && <span className="animate-pulse text-cyan-400 font-bold ml-1">_</span>}
                    </div>

                    {!isStreaming && (
                        <div className="flex justify-center gap-4 mb-10">
                            <button onClick={() => setStep(1)} className="px-8 py-2 border border-cyan-800 text-cyan-500 hover:bg-cyan-950/50 transition-colors">
                                メニューへ戻る
                            </button>
                            <button onClick={() => handleAction('restart')} className="px-8 py-2 border border-red-900/50 text-red-500 hover:bg-red-950/50 transition-colors">
                                システム初期化 (新規ユーザー)
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ResultProcessor;
