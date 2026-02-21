import React, { useEffect, useState } from 'react';

const KERNEL_LINES = [
    'Initialising neural handshake...',
    'Scanning biometric signatures...',
    'Decrypting cognitive patterns...',
    'Accessing deep memory sectors...',
    'Filtering emotional noise...',
    'Calibrating logic gates...',
    'Optimizing synapse latency...',
    'Verifying soul integrity...',
];

const PersonalKernelSidebar = ({ phase }) => {
    const [lines, setLines] = useState([]);
    const [cpu, setCpu] = useState(22);
    const [mem, setMem] = useState(45);

    useEffect(() => {
        const interval = setInterval(() => {
            setLines(prev => {
                const newLine = KERNEL_LINES[Math.floor(Math.random() * KERNEL_LINES.length)];
                const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
                return [`[${timestamp}] ${newLine}`, ...prev].slice(0, 20);
            });
            setCpu(Math.floor(Math.random() * 30 + 10));
            setMem(Math.floor(Math.random() * 40 + 20));
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-1/4 max-w-[300px] border-r border-cyan-900/30 p-4 z-10 flex flex-col backdrop-blur-sm bg-slate-950/80 hidden md:flex">
            <h2 className="text-xs font-bold border-b border-cyan-800 pb-2 mb-4 text-cyan-600">
                PERSONAL_KERNEL :: {phase}
            </h2>
            <div className="flex-1 overflow-hidden font-mono text-[10px] text-cyan-700/70 font-thin space-y-1">
                {lines.map((line, i) => (
                    <div key={i} className="opacity-80 hover:opacity-100 hover:text-cyan-400 cursor-default transition-opacity">
                        {line}
                    </div>
                ))}
            </div>
            <div className="mt-4 border-t border-cyan-900/30 pt-2">
                <div className="text-[10px] text-cyan-900">CPU: {cpu}%</div>
                <div className="text-[10px] text-cyan-900">MEM: {mem}TB</div>
            </div>
        </div>
    );
};

export default PersonalKernelSidebar;
