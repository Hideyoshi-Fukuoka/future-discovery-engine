import React from 'react';

const ProgressMatrix = ({ currentQuestionIndex, totalQuestions }) => {
    return (
        <div className="grid grid-cols-5 gap-2 w-max mx-auto mb-8">
            {Array.from({ length: totalQuestions }).map((_, idx) => {
                const isActive = idx === currentQuestionIndex;
                const isCompleted = idx < currentQuestionIndex;

                return (
                    <div
                        key={idx}
                        className={`
              w-3 h-3 rounded-sm transition-all duration-300
              ${isActive ? 'bg-white scale-110' : ''}
              ${isCompleted ? 'bg-cyan-500' : 'bg-slate-800'}
            `}
                    />
                );
            })}
        </div>
    );
};

export default ProgressMatrix;
