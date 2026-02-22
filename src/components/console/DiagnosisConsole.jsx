import React, { useEffect, useState, useCallback, useRef } from 'react';

const DiagnosisConsole = ({ appMode, question, currentQuestionIndex, totalQuestions, onAnswer }) => {
  const [selectedIndices, setSelectedIndices] = useState(new Set());
  const [startTime, setStartTime] = useState(Date.now());
  const [corrections, setCorrections] = useState(0);
  const [showDeepOptions, setShowDeepOptions] = useState(false);

  const displayText = appMode === 'simple' && question.textSimple ? question.textSimple : question.text;

  // Reset metrics when question changes
  useEffect(() => {
    setStartTime(Date.now());
    setCorrections(0);
    setSelectedIndices(new Set());
    setShowDeepOptions(false);
  }, [question.id]);

  // Track state in a ref specifically for the keyboard listener
  // This avoids re-binding the event listener on every selection change
  const stateRef = useRef({ selectedIndices, startTime, corrections, showDeepOptions });
  useEffect(() => {
    stateRef.current = { selectedIndices, startTime, corrections, showDeepOptions };
  }, [selectedIndices, startTime, corrections, showDeepOptions]);

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
      const isSimple = appMode === 'simple';

      if (e.key === 'Enter') {
        handleSubmit();
      } else if (!isNaN(numCode)) {
        // Toggle Deep Options if 5 is pressed and in future mode with enough options
        if (!isSimple && numCode === 5 && question.options.length > 4) {
          setShowDeepOptions(prev => !prev);
        } else if (numCode >= 1 && numCode <= 4) {
          // Map 1-4 to surface [0-3] or deep [4-7]
          const offset = stateRef.current.showDeepOptions && !isSimple ? 4 : 0;
          const targetIndex = (numCode - 1) + offset;
          if (targetIndex < question.options.length) {
            toggleSelection(targetIndex);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appMode, question.options.length, toggleSelection, handleSubmit]);

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
        {question.options
          .slice(
            !showDeepOptions || appMode === 'simple' ? 0 : 4,
            !showDeepOptions || appMode === 'simple' ? 4 : 8
          )
          .map((opt, displayIdx) => {
            const actualIdx = (!showDeepOptions || appMode === 'simple') ? displayIdx : displayIdx + 4;
            const isSelected = selectedIndices.has(actualIdx);
            const displayLabel = appMode === 'simple' && opt.labelSimple ? opt.labelSimple : opt.label;

            // Hesitation glitch representation: if user corrects answers, add visual noise
            const isHesitating = corrections > 2;

            return (
              <div
                key={actualIdx}
                onClick={() => toggleSelection(actualIdx)}
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
                <span className={`shrink-0 w-8 font-bold relative z-10 font-data ${isSelected ? (isHesitating ? 'text-hes-amber' : 'text-obs-cyan') : 'text-obs-cyan/70 group-hover:text-obs-cyan'}`}>[{displayIdx + 1}]</span>
                <span className={`flex-1 relative z-10 font-prose ${isSelected ? 'text-logic-white' : 'text-slate-300 group-hover:text-logic-white'}`}>
                  {displayLabel}
                </span>
              </div>
            );
          })}

        {appMode !== 'simple' && question.options.length > 4 && (
          <div
            onClick={() => setShowDeepOptions(!showDeepOptions)}
            className="flex items-start sm:items-center p-4 cursor-pointer border border-dashed border-obs-cyan/30 hover:border-obs-cyan/80 bg-bg-deep-void/30 transition-all duration-200 group relative overflow-hidden mt-4"
          >
            <div className="shrink-0 w-5 h-5 mt-0.5 sm:mt-0 mr-4 flex items-center justify-center opacity-0"></div>
            <span className="shrink-0 w-8 font-bold relative z-10 font-data text-obs-cyan/50 group-hover:text-obs-cyan">[5]</span>
            <span className="flex-1 relative z-10 font-prose text-obs-cyan/60 group-hover:text-obs-cyan">
              {showDeepOptions ? '< 前の選択肢に戻る' : '別の選択肢を表示 >'}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end border-t border-obs-cyan/30 pt-4 gap-4 sm:gap-0 font-data">
        <div className="text-obs-cyan/70 text-[10px] sm:text-sm text-center sm:text-left">
          複数選択可 / 数字キー(1-5)で操作<br className="sm:hidden" /> Enterで送信
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
