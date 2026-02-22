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
        appMode,
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
        <div className="flex h-screen w-screen bg-bg-deep-void text-obs-cyan overflow-hidden relative font-base selection:bg-obs-cyan/20 selection:text-logic-white">
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <DynamicGridBackground weights={currentWeights} entropy={entropy} />
            </div>

            <PersonalKernelSidebar phase={phase} />

            <div className="flex-1 flex flex-col p-4 sm:p-6 z-10 relative overflow-y-auto w-full max-w-4xl mx-auto">
                <div className="flex-1 flex flex-col justify-center items-center h-full w-full">

                    {phase === PHASES.INITIATION && (
                        <InitiationConsole onStart={startDiagnosis} />
                    )}

                    {phase === PHASES.DIAGNOSIS && (
                        <DiagnosisConsole
                            appMode={appMode}
                            question={currentQuestion}
                            currentQuestionIndex={currentQuestionIndex}
                            totalQuestions={totalQuestions}
                            onAnswer={handleAnswer}
                        />
                    )}

                    {phase === PHASES.VERIFICATION && (
                        <VerificationConsole
                            appMode={appMode}
                            answers={answers}
                            onEdit={jumpToQuestion}
                            onConfirm={finishVerification}
                        />
                    )}

                    {phase === PHASES.RESULT && (
                        <ResultProcessor
                            appMode={appMode}
                            answers={answers}
                            metrics={hesitationMetrics}
                            onRestart={restartDiagnosis}
                        />
                    )}
                </div>
            </div>

            {phase !== PHASES.INITIATION && (
                <div className="hidden lg:flex shrink-0">
                    <MetadataLog answers={answers} />
                </div>
            )}

            {/* Paradox Glitch Overlay - Softened to subtle corner warning */}
            {paradoxAlert && phase !== PHASES.RESULT && (
                <div className="fixed bottom-safe left-safe bottom-2 sm:bottom-4 left-2 sm:left-4 z-50 pointer-events-none flex items-center space-x-2 bg-ano-magenta/20 border border-ano-magenta p-2 sm:p-3 shadow-[0_0_15px_rgba(236,72,153,0.5)] animate-pulse max-w-[90vw]">
                    <span className="text-ano-magenta animate-ping text-xs sm:text-base">●</span>
                    <div className="text-ano-magenta text-[10px] sm:text-sm font-data uppercase tracking-widest break-words">
                        [ ERROR: CAUSALITY PARADOX ]<br />
                        <span className="text-ano-magenta/80 text-[8px] sm:text-[10px]">{paradoxAlert.message}</span>
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
