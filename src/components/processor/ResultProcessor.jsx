import React, { useMemo, useState, useEffect } from 'react';
import { CoreEngine } from '../../engine/CoreEngine';
import { GeminiService } from '../../services/GeminiService';

const ResultProcessor = ({ appMode, answers, metrics, onRestart }) => {
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

            await GeminiService.generateFutureLogStream(report.PersonalKernel, appMode, (chunk) => {
                setFutureLogStream(prev => prev + chunk);
            });
            setIsStreaming(false);

        } else {
            setStep(nextStep);
        }
    };

    return (
        <div className={`w-full max-w-4xl font-prose pt-10 h-full flex flex-col transition-opacity duration-1000 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            <div className="mb-8 border-b border-obs-cyan/30 pb-2 font-data">
                <h3 className="text-xl text-obs-cyan">[ 状態: Phase 4 | 解析完了 | モード: 診断結果出力 ]</h3>
            </div>

            <div className={`transition-opacity duration-1000 ${step >= 0 ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-2xl sm:text-3xl text-logic-white mb-4">
                    あなたの職業適性は <span className="text-obs-cyan font-bold tracking-wider inline-block font-title">『{report.PersonalKernel.CareerMapping.TopClusters[0]}』</span> です。
                </h2>

                <div className="bg-obs-cyan/5 p-4 sm:p-6 border-l-4 border-obs-cyan/50 mb-8 rounded text-sm sm:text-base">
                    <p className="text-logic-white leading-relaxed whitespace-pre-wrap">
                        {report.PersonalKernel.CareerMapping.LogicPath}
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-opacity duration-1000 w-full ${step >= 1 && step < 2 ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'}`}>
                {step === 1 && (
                    <>
                        <button onClick={() => handleAction('restart')} className="w-full sm:w-auto px-4 sm:px-6 py-3 border border-obs-cyan/30 text-obs-cyan hover:bg-obs-cyan/10 hover:text-logic-white transition-colors text-sm sm:text-base focus:outline-none order-2 sm:order-1 font-data">
                            [ 再診断する (因果律リセット) ]
                        </button>
                        <button onClick={() => handleAction(3)} className="w-full sm:w-auto px-4 sm:px-6 py-3 border border-obs-cyan bg-obs-cyan/10 text-logic-white font-bold hover:bg-obs-cyan/20 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all text-sm sm:text-base focus:outline-none order-1 sm:order-2 font-data">
                            [ 未来日誌を出力する ]
                        </button>
                    </>
                )}
            </div>

            {/* Step 2: JSON View */}
            {step === 2 && (
                <div className="flex-1 flex flex-col mt-4 animate-fade-in relative z-10">
                    <pre className="flex-1 text-xs text-obs-cyan leading-relaxed whitespace-pre-wrap bg-bg-deep-void/80 p-6 rounded border border-obs-cyan/30 overflow-y-auto mb-6 font-data">
                        {jsonString}
                    </pre>
                    <div className="flex justify-center mb-10">
                        <button onClick={() => setStep(1)} className="px-8 py-2 border border-obs-cyan/50 text-obs-cyan hover:bg-obs-cyan/10">
                            戻る
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Exit/Future Log View (Gemini Stream) */}
            {step === 3 && (
                <div className="flex-1 flex flex-col mt-4 animate-fade-in relative z-10">
                    <div className="text-center mb-6 font-data">
                        <div className="text-obs-cyan animate-pulse font-bold tracking-widest">
                            [ SYSTEM ALIAS: GEMINI ACTIVE ]
                        </div>
                        {isStreaming && (
                            <div className="text-obs-cyan/70 text-xs mt-2 tracking-[0.3em]">
                                CALCULATING 30-YEAR TRAJECTORY...
                            </div>
                        )}
                    </div>

                    <div className="flex-1 bg-bg-deep-void/50 p-6 border border-obs-cyan/30 overflow-y-auto font-prose text-sm text-obs-cyan leading-relaxed mb-6 shadow-[inset_0_0_20px_rgba(0,255,255,0.05)] relative">
                        <div
                            className="whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{
                                __html: futureLogStream
                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-logic-white">$1</strong>')
                                    .replace(/\*\*([^*]*)$/, '<strong class="font-bold text-logic-white/80">$1</strong>')
                            }}
                        />
                        {isStreaming && <span className="animate-pulse text-obs-cyan font-bold block mt-2">_</span>}
                    </div>

                    {!isStreaming && (
                        <div className="flex justify-center gap-4 mb-10">
                            <button onClick={() => handleAction('restart')} className="px-8 py-2 border border-obs-cyan/50 text-obs-cyan hover:bg-obs-cyan/20 transition-colors font-data text-sm">
                                [ メニューへ ]
                            </button>
                            <button onClick={() => handleAction('restart')} className="px-8 py-2 border border-ano-magenta/50 text-ano-magenta hover:bg-ano-magenta/20 transition-colors font-data text-sm">
                                [ システム初期化 ]
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ResultProcessor;
