import React, { useMemo, useEffect, useRef } from 'react';
import { CoreEngine } from '../../engine/CoreEngine';

const MetadataLog = ({ answers }) => {
    // Generate the running JSON report based on current answers
    const reportData = useMemo(() => {
        const report = CoreEngine.generateReport(answers);
        // Exclude Career mapping logic path during Phase 2 to keep it cleaner, just show tags
        // or show the whole thing if preferred. Showing the raw tags is very cyber.
        return JSON.stringify(report.PersonalKernel, null, 2);
    }, [answers]);

    const scrollRef = useRef(null);

    // Auto scroll to bottom smoothly
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [reportData]);

    return (
        <div className="w-1/4 max-w-[350px] border-l border-obs-cyan/30 p-4 z-10 flex flex-col backdrop-blur-sm bg-bg-deep-void/80 h-full font-data">
            <div className="border-b border-obs-cyan/50 pb-2 mb-4 flex justify-between items-end">
                <h2 className="text-xs font-bold text-obs-cyan animate-pulse">LIVE_JSON_STREAM</h2>
                <span className="text-[9px] text-obs-cyan/70">PORT: 8080 CONNECTED</span>
            </div>

            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto font-data text-[10px] text-obs-cyan/80 leading-snug whitespace-pre pr-2 custom-scrollbar"
                style={{ scrollBehavior: 'smooth' }}
            >
                {/* Simulated typing/updating effect by showing the raw JSON tree directly */}
                {reportData}
            </div>

            {/* Blinking cursor at the end to simulate terminal stream */}
            <div className="mt-2 text-[10px] text-obs-cyan border-t border-obs-cyan/30 pt-2 flex items-center">
                <span>SYSTEM &gt;&gt; AWAITING INPUT</span>
                <span className="inline-block w-1 h-3 bg-obs-cyan ml-1 animate-pulse"></span>
            </div>
        </div>
    );
};

export default MetadataLog;
