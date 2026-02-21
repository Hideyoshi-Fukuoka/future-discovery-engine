import { useState, useCallback } from 'react';
import { CoreEngine, PHASES } from '../engine/CoreEngine';
import { QUESTIONS_DATA } from '../engine/QuestionsData';

export const useEngineState = () => {
    const [phase, setPhase] = useState(PHASES.INITIATION);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({}); // { "Q1": [1, 3], ... }
    const [hesitationMetrics, setHesitationMetrics] = useState({}); // { "Q1": {durationMs, corrections}, ... }

    // For navigating back to specific questions from Verification Phase
    const [isEditing, setIsEditing] = useState(false);
    const [returnToVerification, setReturnToVerification] = useState(false);

    const [entropy, setEntropy] = useState(0);
    const [paradoxAlert, setParadoxAlert] = useState(null);

    const startDiagnosis = useCallback(() => {
        setPhase(PHASES.DIAGNOSIS);
        setCurrentQuestionIndex(0);
        setHesitationMetrics({});
        setAnswers({});
        setEntropy(0);
        setParadoxAlert(null);
    }, []);

    const handleAnswer = useCallback((validIndicesArray, metrics = { durationMs: 0, corrections: 0 }) => {
        const qId = QUESTIONS_DATA[currentQuestionIndex].id;

        const newAnswers = { ...answers, [qId]: validIndicesArray };
        setAnswers(newAnswers);

        const newMetrics = { ...hesitationMetrics, [qId]: metrics };
        setHesitationMetrics(newMetrics);

        // Real-time Meta-UI Updates
        setEntropy(CoreEngine.calculateEntropy(newMetrics));

        const paradoxCheck = CoreEngine.detectParadox(newAnswers);
        if (paradoxCheck.isParadox) {
            setParadoxAlert(paradoxCheck);
        } else {
            setParadoxAlert(null);
        }

        if (isEditing && returnToVerification) {
            // User edited a single question from Phase 3, return to Phase 3
            setIsEditing(false);
            setPhase(PHASES.VERIFICATION);
        } else if (currentQuestionIndex < QUESTIONS_DATA.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            // Finished all questions, go to Verification
            setPhase(PHASES.VERIFICATION);
        }
    }, [currentQuestionIndex, isEditing, returnToVerification]);

    const jumpToQuestion = useCallback((index) => {
        if (index >= 0 && index < QUESTIONS_DATA.length) {
            setCurrentQuestionIndex(index);
            setIsEditing(true);
            setReturnToVerification(true);
            setPhase(PHASES.DIAGNOSIS);
        }
    }, [QUESTIONS_DATA.length]);

    const finishVerification = useCallback(() => {
        setPhase(PHASES.RESULT);
    }, []);

    const restartDiagnosis = useCallback(() => {
        setPhase(PHASES.INITIATION);
        setCurrentQuestionIndex(0);
        setHesitationMetrics({});
        setAnswers({});
        setEntropy(0);
        setParadoxAlert(null);
    }, []);

    return {
        phase,
        currentQuestionIndex,
        currentQuestion: QUESTIONS_DATA[currentQuestionIndex],
        answers,
        hesitationMetrics,
        entropy,
        paradoxAlert,
        startDiagnosis,
        restartDiagnosis,
        handleAnswer,
        jumpToQuestion,
        finishVerification,
        totalQuestions: QUESTIONS_DATA.length
    };
};
