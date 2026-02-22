import React, { useMemo, useState, useEffect } from 'react';
import { CoreEngine } from '../../engine/CoreEngine';
import { GeminiService } from '../../services/GeminiService';

const ResultProcessor = ({ appMode, answers, metrics, onRestart }) => {
    const [step, setStep] = useState(0); // 0: report fade-in, 1: career selection, 2: json view (removed), 3: future log view
    const [isFading, setIsFading] = useState(false);
    const [futureLogStream, setFutureLogStream] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [previousCareers, setPreviousCareers] = useState([]);

    const report = useMemo(() => CoreEngine.generateReport(answers, metrics), [answers, metrics]);

    useEffect(() => {
        // Auto-progress to show career options after report is read
        if (step === 0) {
            const timer = setTimeout(() => {
                setStep(1);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    const handleAction = async (nextStep, payload = null) => {
        if (nextStep === 'restart') {
            setIsFading(true);
            setTimeout(() => {
                if (onRestart) onRestart();
            }, 1000);
        } else if (nextStep === 3) {
            setStep(3);
            setIsStreaming(true);
            setFutureLogStream('');
            setSelectedCareer(payload);

            const currentPrevious = [...previousCareers];

            await GeminiService.generateFutureLogStream(report.PersonalKernel, appMode, payload, currentPrevious, (chunk) => {
                setFutureLogStream(prev => prev + chunk);
            });
            setIsStreaming(false);

            if (!previousCareers.includes(payload)) {
                setPreviousCareers(prev => [...prev, payload]);
            }

        } else if (nextStep === 1) {
            // Return to career selection from future log
            setStep(1);
            setFutureLogStream('');
            setSelectedCareer(null);
        } else {
            setStep(nextStep);
        }
    };

    const realCareers = report.PersonalKernel.CareerMapping.RealCareers || ["解析エラー", "解析エラー", "解析エラー"];
    const careerDescriptions = [
        "[ Core Match ] 王道の未来",
        "[ Pioneering Match ] 先進の未来",
        "[ Divergent Match ] 意外な未来"
    ];

    return (
        <div className={`w-full max-w-4xl font-prose pt-10 h-full flex flex-col transition-opacity duration-1000 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            <div className="mb-8 border-b border-obs-cyan/30 pb-2 font-data">
                <h3 className="text-xl text-obs-cyan">[ 状態: Phase 4 | 解析完了 | モード: 未来分岐選択 ]</h3>
            </div>

            <div className={`transition-opacity duration-1000 ${step >= 0 ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-2xl sm:text-3xl text-logic-white mb-2">
                    あなたの深層特性は <span className="text-obs-cyan font-bold tracking-wider inline-block font-title">『{report.PersonalKernel.CareerMapping.TopClusters[0]}』</span> です。
                </h2>
                <div className="text-obs-cyan/80 text-sm mb-6 font-data animate-pulse">
                    CAUSALITY VECTORS CONFIRMED. THREE POSSIBLE FUTURES DETECTED.
                </div>

                <div className="bg-obs-cyan/5 p-4 sm:p-6 border-l-4 border-obs-cyan/50 mb-8 rounded text-sm sm:text-base hidden sm:block">
                    <p className="text-logic-white leading-relaxed whitespace-pre-wrap">
                        {report.PersonalKernel.CareerMapping.LogicPath}
                    </p>
                </div>
            </div>

            {/* Step 1: Career Selection */}
            <div className={`flex flex-col gap-4 transition-opacity duration-1000 w-full ${step === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'}`}>
                <div className="text-logic-white mb-2 font-bold font-data">観測する未来（職業）を選択してください：</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {realCareers.map((career, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleAction(3, career)}
                            className="p-6 border border-obs-cyan/50 bg-bg-deep-void/80 hover:bg-obs-cyan/10 hover:border-obs-cyan cursor-pointer transition-all duration-300 group flex flex-col justify-between min-h-[120px] shadow-[inset_0_0_10px_rgba(0,255,255,0.05)] hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                        >
                            <div className="text-[10px] sm:text-xs text-obs-cyan/70 font-data mb-2 group-hover:text-obs-cyan transition-colors">{careerDescriptions[idx]}</div>
                            <div className="text-lg sm:text-xl text-logic-white font-bold font-prose group-hover:text-obs-cyan transition-colors">{career}</div>
                            <div className="mt-4 text-[10px] text-obs-cyan/50 font-data opacity-0 group-hover:opacity-100 transition-opacity">
                                &gt; 観測を開始する
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-2">
                    <button onClick={() => handleAction('restart')} className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-obs-cyan/30 text-obs-cyan hover:bg-obs-cyan/10 hover:text-logic-white transition-colors text-sm focus:outline-none font-data">
                        [ 診断をやり直す ]
                    </button>
                </div>
            </div>

            {/* Step 3: Exit/Future Log View (Gemini Stream) */}
            {step === 3 && (
                <div className="flex-1 flex flex-col mt-4 animate-fade-in relative z-10">
                    <div className="text-center mb-6 font-data">
                        <div className="text-obs-cyan animate-pulse font-bold tracking-widest text-lg sm:text-xl mb-1">
                            [ {selectedCareer} x 未来日誌 ]
                        </div>
                        <div className="text-obs-cyan/50 text-xs">
                            TARGET: {report.PersonalKernel.CareerMapping.TopClusters[0]}
                        </div>
                        {isStreaming && (
                            <div className="text-obs-cyan/70 text-xs mt-2 tracking-[0.3em] font-bold">
                                SYNCHRONIZING WITH TIMELINE 2056...
                            </div>
                        )}
                    </div>

                    <div className="flex-1 bg-bg-deep-void/50 p-4 sm:p-6 border border-obs-cyan/30 overflow-y-auto font-prose text-sm text-obs-cyan leading-relaxed mb-6 shadow-[inset_0_0_20px_rgba(0,255,255,0.05)] relative">
                        <div
                            className="whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{
                                __html: futureLogStream
                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-logic-white">$1</strong>')
                                    .replace(/\*\*([^*]*)$/, '<strong class="font-bold text-logic-white/80">$1</strong>')
                            }}
                        />
                        {isStreaming && <span className="animate-pulse text-obs-cyan font-bold block mt-2">_</span>}
                    </div>

                    {!isStreaming && (
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4 sm:mb-10">
                            <button onClick={() => handleAction(1)} className="px-8 py-3 border border-obs-cyan bg-obs-cyan/10 text-logic-white hover:bg-obs-cyan/20 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all font-data text-sm font-bold w-full sm:w-auto">
                                [ 別の未来を観測する ]
                            </button>
                            <button onClick={() => handleAction('restart')} className="px-8 py-3 border border-ano-magenta/50 text-ano-magenta hover:bg-ano-magenta/20 transition-colors font-data text-sm w-full sm:w-auto">
                                [ システム完全初期化 ]
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ResultProcessor;
