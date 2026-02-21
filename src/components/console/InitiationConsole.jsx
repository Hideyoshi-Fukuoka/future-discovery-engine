import React, { useState } from 'react';

const InitiationConsole = ({ onStart }) => {
    const [isBooting, setIsBooting] = useState(false);

    const handleBoot = () => {
        setIsBooting(true);
        setTimeout(() => {
            onStart();
        }, 800);
    };

    return (
        <div className="w-full max-w-2xl font-mono flex flex-col items-center justify-center min-h-[50vh] px-4">
            <div className="mb-8 md:mb-12 text-center">
                <h1 className="text-3xl md:text-5xl text-cyan-400 mb-4 md:mb-6 tracking-widest font-bold">
                    未来発見エンジン
                </h1>
                <p className="text-cyan-600 tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm animate-pulse break-words">
                    AUTONOMOUS CAUSALITY PREDICTION SYSTEM
                </p>
            </div>

            <button
                onClick={handleBoot}
                disabled={isBooting}
                className={`
                    w-full sm:w-auto relative group px-6 sm:px-12 py-4 border border-cyan-500/50 bg-cyan-950/30
                    text-cyan-300 tracking-widest uppercase transition-all duration-500
                    hover:bg-cyan-900/50 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]
                    disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden focus:outline-none focus:border-cyan-400
                `}
            >
                <div className="absolute inset-0 w-full h-full bg-cyan-500/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <span className="relative z-10 font-bold text-sm sm:text-base">
                    {isBooting ? '[ BOOTING... ]' : '[ システムブート ]'}
                </span>
            </button>

            <div className="mt-12 md:mt-16 text-[10px] sm:text-xs text-cyan-800/80 tracking-widest text-center space-y-2">
                <p>INITIALIZING NEURAL HANDSHAKE...</p>
                <p>CALIBRATING LOGIC GATES...</p>
            </div>
        </div>
    );
};

export default InitiationConsole;
