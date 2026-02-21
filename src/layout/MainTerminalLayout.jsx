import React from 'react';
import { useEngineState } from '../hooks/useEngineState';
import { PHASES } from '../engine/CoreEngine';
import InitiationConsole from '../components/console/InitiationConsole';
import DiagnosisConsole from '../components/console/DiagnosisConsole';
import VerificationConsole from '../components/console/VerificationConsole';
import ResultProcessor from '../components/processor/ResultProcessor';
import DynamicGridBackground from '../components/visuals/DynamicGridBackground';
import PersonalKernelSidebar from '../components/sidebar/PersonalKernelSidebar';
import MetadataLog from '../components/sidebar/MetadataLog';
import { CoreEngine } from '../engine/CoreEngine';

const MainTerminalLayout = () => {
    const {
        phase,
        currentQuestion,
        currentQuestionIndex,
        answers,
        handleAnswer,
        startDiagnosis,
        jumpToQuestion,
        finishVerification,
        totalQuestions,
        hesitationMetrics,
        restartDiagnosis,
        entropy,
        paradoxAlert
    } = useEngineState();
    const currentWeights = CoreEngine.calculateWeights(answers);

    return (
        <div className="flex h-screen w-screen bg-slate-950 text-cyan-400 overflow-hidden relative font-base selection:bg-cyan-900 selection:text-white">
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <DynamicGridBackground weights={currentWeights} entropy={entropy} />
            </div>

            <PersonalKernelSidebar phase={phase} />

            <div className="flex-1 flex flex-col p-6 z-10 relative overflow-y-auto w-full max-w-4xl mx-auto">
                <div className="flex-1 flex flex-col justify-center items-center h-full w-full">

                    {phase === PHASES.INITIATION && (
                        <InitiationConsole onStart={startDiagnosis} />
                    )}

                    {phase === PHASES.DIAGNOSIS && (
                        <DiagnosisConsole
                            question={currentQuestion}
                            currentQuestionIndex={currentQuestionIndex}
                            totalQuestions={totalQuestions}
                            onAnswer={handleAnswer}
                        />
                    )}

                    {phase === PHASES.VERIFICATION && (
                        <VerificationConsole
                            answers={answers}
                            onEdit={jumpToQuestion}
                            onConfirm={finishVerification}
                        />
                    )}

                    {phase === PHASES.RESULT && (
                        <ResultProcessor
                            answers={answers}
                            metrics={hesitationMetrics}
                            onRestart={restartDiagnosis}
                        />
                    )}
                </div>
            </div>

            {phase !== PHASES.INITIATION && (
                <MetadataLog answers={answers} />
            )}

            {/* Paradox Glitch Overlay - Softened to subtle corner warning */}
            {paradoxAlert && (
                <div className="fixed bottom-4 left-4 z-50 pointer-events-none flex items-center space-x-2 bg-red-950/80 border border-red-800/50 p-3 shadow-[0_0_15px_rgba(220,38,38,0.3)] animate-pulse">
                    <span className="text-red-500 animate-ping">●</span>
                    <div className="text-red-400 text-xs md:text-sm font-mono uppercase tracking-widest">
                        [ ERROR: CAUSALITY PARADOX ]<br />
                        <span className="text-red-500/80 text-[10px]">{paradoxAlert.message}</span>
                    </div>
                </div>
            )}

            {/* Scanlines Overlay for terminal aesthetic */}
            <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden opacity-10">
                <div className="w-full h-[2px] bg-white absolute animate-scanline"></div>
            </div>

            {/* Entropy Filter */}
            {entropy > 0 && (
                <div
                    className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 z-30 transition-colors duration-1000"
                    style={{ backgroundColor: `rgba(255, ${200 - (entropy * 200)}, 0, ${entropy})` }}
                ></div>
            )}
        </div>
    );
};

export default MainTerminalLayout;
