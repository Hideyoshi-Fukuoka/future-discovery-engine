export const GeminiService = {
    /**
     * @param {Object} personalKernel The user's JSON report
     * @param {string} appMode 'simple' or 'future'
     * @param {string} selectedCareer The user's chosen real-world career path
     * @param {Array<string>} previousCareers Array of previously viewed careers in this session
     * @param {Function} onChunk Callback for streaming text chunks
     * @returns {Promise<string>} The full text when complete
     */
    generateFutureLogStream: async (personalKernel, appMode, selectedCareer, previousCareers, onChunk) => {
        try {
            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ personalKernel, appMode, selectedCareer, previousCareers })
            });

            if (!response.ok) {
                if (response.status === 429) {
                    const errorMsg = "\n[SYSTEM ALERT: API BUDGET EXCEEDED]\n予算上限に達したため、一時的に未来へのアクセスを制限しています。\n";
                    if (onChunk) onChunk(errorMsg);
                    return errorMsg;
                }
                const errorText = await response.text();
                throw new Error(errorText || `HTTP Exception: ${response.status}`);
            }

            if (!response.body) {
                throw new Error("ReadableStream not supported by this browser.");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let fullText = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunkText = decoder.decode(value, { stream: true });
                fullText += chunkText;

                if (onChunk) {
                    onChunk(chunkText);
                }
            }

            return fullText;

        } catch (error) {
            console.error("Gemini Service Fetch Error:", error);
            const errorMsg = "\n[CRITICAL ERROR: TIMELINE SYNCHRONIZATION FAILED. CAUSALITY BREACH DETECTED.]\n" + error.message;
            if (onChunk) onChunk(errorMsg);
            return errorMsg;
        }
    }
};
