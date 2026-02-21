import React, { useEffect, useState, useCallback, useRef } from 'react';

const DiagnosisConsole = ({ question, currentQuestionIndex, totalQuestions, onAnswer }) => {
  const [selectedIndices, setSelectedIndices] = useState(new Set());
  const [startTime, setStartTime] = useState(Date.now());
  const [corrections, setCorrections] = useState(0);

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
      <div className="mb-4 border-b border-cyan-800 pb-2 flex justify-between items-center">
        <h3 className="text-xl text-cyan-400">
          [ 状態: Phase 2 | 進捗: {currentQuestionIndex + 1} / {totalQuestions} | モード: 未来探索中 ]
        </h3>
        <span className="text-xs text-cyan-700 animate-pulse">AWAITING_INPUT...</span>
      </div>

      <div className="mb-8 border-b border-cyan-800 pb-4">
        <p className="text-lg text-white leading-relaxed whitespace-pre-wrap">
          {question.text}
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {question.options.map((opt, idx) => {
          const isSelected = selectedIndices.has(idx);
          return (
            <div
              key={idx}
              onClick={() => toggleSelection(idx)}
              className={`flex items-center p-4 cursor-pointer border transition-all duration-200 group
                ${isSelected
                  ? 'border-cyan-400 bg-cyan-900/40 shadow-[inset_0_0_15px_rgba(34,211,238,0.2)]'
                  : 'border-cyan-900/50 bg-slate-900/50 hover:border-cyan-700 hover:bg-cyan-950/30'
                }`}
            >
              <div className={`w-5 h-5 mr-4 flex items-center justify-center border transition-colors
                ${isSelected ? 'border-cyan-300 bg-cyan-400' : 'border-cyan-700 bg-transparent group-hover:border-cyan-500'}`}
              >
                {isSelected && <span className="w-2.5 h-2.5 bg-slate-900 block" />}
              </div>
              <span className={`w-8 font-bold ${isSelected ? 'text-cyan-300' : 'text-cyan-700 group-hover:text-cyan-500'}`}>[{idx + 1}]</span>
              <span className={`flex-1 ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-cyan-100'}`}>
                {opt.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center border-t border-cyan-800/50 pt-4">
        <div className="text-cyan-600 text-sm">
          複数選択可 / 数字キー(1-9)で選択、Enterで送信
        </div>
        <button
          onClick={handleSubmit}
          disabled={selectedIndices.size === 0}
          className={`px-8 py-3 font-bold tracking-widest transition-all duration-300 border
            ${selectedIndices.size > 0
              ? 'border-cyan-400 text-cyan-100 bg-cyan-900/60 hover:bg-cyan-800 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] cursor-pointer'
              : 'border-cyan-900/50 text-cyan-900 bg-transparent cursor-not-allowed'
            }`}
        >
          [ 回答を送信 ]
        </button>
      </div>
    </div>
  );
};

export default DiagnosisConsole;
