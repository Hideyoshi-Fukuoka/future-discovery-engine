import React, { useEffect, useState, useCallback, useRef } from 'react';

const DiagnosisConsole = ({ appMode, question, currentQuestionIndex, totalQuestions, onAnswer }) => {
  const [selectedIndices, setSelectedIndices] = useState(new Set());
  const [startTime, setStartTime] = useState(Date.now());
  const [corrections, setCorrections] = useState(0);

  const displayText = appMode === 'simple' && question.textSimple ? question.textSimple : question.text;

  // Reset metrics when question changes
  useEffect(() => {
    setStartTime(Date.now());
    setCorrections(0);
    setSelectedIndices(new Set());
  }, [question.id]);

  // Track state in a ref specifically for the keyboard listener
  // This avoids re-binding the event listener on every selection change
  const stateRef = useRef({ selectedIndices, startTime, corrections });
  useEffect(() => {
    stateRef.current = { selectedIndices, startTime, corrections };
  }, [selectedIndices, startTime, corrections]);

  const toggleSelection = useCallback((index) => {
    setSelectedIndices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
    setCorrections(prev => prev + 1);
  }, []);

  const handleSubmit = useCallback(() => {
    const currentState = stateRef.current;
    if (currentState.selectedIndices.size > 0) {
      const durationMs = Date.now() - currentState.startTime;
      const validIndicesArray = Array.from(currentState.selectedIndices).sort((a, b) => a - b);
      const oneBasedIndices = validIndicesArray.map(idx => idx + 1);

      onAnswer(oneBasedIndices, { durationMs, corrections: currentState.corrections });
    }
  }, [onAnswer]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const numCode = parseInt(e.key, 10);
      if (!isNaN(numCode) && numCode >= 1 && numCode <= question.options.length) {
        toggleSelection(numCode - 1);
      } else if (e.key === 'Enter') {
        handleSubmit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question.options.length, toggleSelection, handleSubmit]);

  return (
    <div className="w-full max-w-2xl font-mono">
      <div className="mb-4 border-b border-obs-cyan/50 pb-2 flex justify-between items-center font-data">
        <h3 className="text-sm sm:text-xl text-obs-cyan">
          [ {appMode === 'simple' ? '診断' : '状態'}: Phase 2 | {appMode === 'simple' ? '質問' : '進捗'}: {currentQuestionIndex + 1} / {totalQuestions} ]
        </h3>
        <span className="text-xs text-obs-cyan/80 animate-pulse hidden sm:inline">AWAITING_INPUT...</span>
      </div>

      <div className="mb-8 border-b border-obs-cyan/50 pb-4">
        <p className="text-lg text-logic-white leading-relaxed whitespace-pre-wrap font-prose">
          {displayText}
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {question.options.map((opt, idx) => {
          const isSelected = selectedIndices.has(idx);
          const displayLabel = appMode === 'simple' && opt.labelSimple ? opt.labelSimple : opt.label;

          // Hesitation glitch representation: if user corrects answers, add visual noise
          const isHesitating = corrections > 2;

          return (
            <div
              key={idx}
              onClick={() => toggleSelection(idx)}
              className={`flex items-start sm:items-center p-4 cursor-pointer border transition-all duration-200 group relative overflow-hidden
                ${isSelected
                  ? 'border-obs-cyan bg-obs-cyan/10 shadow-[inset_0_0_15px_rgba(0,255,255,0.2)]'
                  : 'border-obs-cyan/50 bg-bg-deep-void/50 hover:border-obs-cyan/80 hover:bg-obs-cyan/5'
                }`}
            >
              {isHesitating && isSelected && (
                <div className="absolute inset-0 bg-hes-amber/10 mix-blend-overlay backdrop-blur-[2px] animate-pulse pointer-events-none"></div>
              )}
              <div className={`shrink-0 w-5 h-5 mt-0.5 sm:mt-0 mr-4 flex items-center justify-center border transition-colors relative z-10
                ${isSelected
                  ? (isHesitating ? 'border-hes-amber bg-hes-amber' : 'border-obs-cyan bg-obs-cyan')
                  : 'border-obs-cyan/70 bg-transparent group-hover:border-obs-cyan'}`}
              >
                {isSelected && <span className="w-2.5 h-2.5 bg-bg-deep-void block" />}
              </div>
              <span className={`shrink-0 w-8 font-bold relative z-10 font-data ${isSelected ? (isHesitating ? 'text-hes-amber' : 'text-obs-cyan') : 'text-obs-cyan/70 group-hover:text-obs-cyan'}`}>[{idx + 1}]</span>
              <span className={`flex-1 relative z-10 font-prose ${isSelected ? 'text-logic-white' : 'text-slate-300 group-hover:text-logic-white'}`}>
                {displayLabel}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end border-t border-obs-cyan/30 pt-4 gap-4 sm:gap-0 font-data">
        <div className="text-obs-cyan/70 text-[10px] sm:text-sm text-center sm:text-left">
          複数選択可 / 数字キー(1-9)で選択<br className="sm:hidden" /> Enterで送信
        </div>
        <button
          onClick={handleSubmit}
          disabled={selectedIndices.size === 0}
          className={`w-full sm:w-auto px-8 py-3 font-bold tracking-widest transition-all duration-300 border focus:outline-none
            ${selectedIndices.size > 0
              ? 'border-obs-cyan text-logic-white bg-obs-cyan/20 hover:bg-obs-cyan/30 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] cursor-pointer'
              : 'border-obs-cyan/30 text-obs-cyan/50 bg-transparent cursor-not-allowed'
            }`}
        >
          [ 回答を送信 ]
        </button>
      </div>
    </div>
  );
};

export default DiagnosisConsole;
