import React, { useState } from 'react';

const InitiationConsole = ({ onStart }) => {
    const [isBooting, setIsBooting] = useState(false);

    const handleBoot = (mode) => {
        setIsBooting(true);
        setTimeout(() => {
            onStart(mode);
        }, 800);
    };

    return (
        <div className="w-full max-w-2xl font-mono flex flex-col items-center justify-center min-h-[50vh] px-4">
            <div className="mb-8 md:mb-12 text-center">
                <h1 className="text-3xl md:text-5xl text-cyan-400 mb-4 md:mb-6 tracking-widest font-bold">
                    未来発見エンジン
                </h1>
                <p className="text-cyan-600 tracking-[0.2em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm animate-pulse break-words">
                    AUTONOMOUS CAUSALITY PREDICTION SYSTEM
                </p>
            </div>

            {!isBooting ? (
                <div className="flex flex-col gap-4 w-full sm:w-auto">
                    <button
                        onClick={() => handleBoot('simple')}
                        className={`
                            w-full relative group px-6 sm:px-12 py-4 border border-cyan-400/80 bg-cyan-900/40
                            text-cyan-100 tracking-widest transition-all duration-300
                            hover:bg-cyan-800/80 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]
                            focus:outline-none focus:border-cyan-300 font-bold text-sm sm:text-base
                        `}
                    >
                        <div className="absolute inset-0 w-full h-full bg-cyan-400/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                        <span className="relative z-10">
                            [ かんたんモードで開始 ]
                        </span>
                        <div className="relative z-10 text-[10px] sm:text-xs text-cyan-200 mt-1 font-normal opacity-80">
                            やさしい言葉で未来を探す
                        </div>
                    </button>

                    <button
                        onClick={() => handleBoot('future')}
                        className={`
                            w-full relative group px-6 sm:px-12 py-3 border border-cyan-800/50 bg-slate-900/50
                            text-cyan-500 tracking-widest transition-all duration-500
                            hover:bg-cyan-950/50 hover:border-cyan-600 hover:text-cyan-400
                            focus:outline-none focus:border-cyan-600 text-xs sm:text-sm
                        `}
                    >
                        <span className="relative z-10">
                            [ 未来発見モード (標準) ]
                        </span>
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <div className="text-cyan-300 font-bold tracking-widest animate-pulse border border-cyan-500/50 px-12 py-4 bg-cyan-950/30">
                        [ BOOTING... ]
                    </div>
                </div>
            )}

            <div className="mt-12 md:mt-16 text-[10px] sm:text-xs text-cyan-800/80 tracking-widest text-center space-y-2">
                <p>INITIALIZING NEURAL HANDSHAKE...</p>
                <p>CALIBRATING LOGIC GATES...</p>
            </div>
        </div>
    );
};

export default InitiationConsole;
