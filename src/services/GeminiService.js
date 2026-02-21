export const GeminiService = {
    /**
     * @param {Object} personalKernel The user's JSON report
     * @param {Function} onChunk Callback for streaming text chunks
     * @returns {Promise<string>} The full text when complete
     */
    generateFutureLogStream: async (personalKernel, onChunk) => {
        try {
            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ personalKernel })
            });

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
