import React, { useRef, useEffect } from 'react';

const DynamicGridBackground = ({ weights, entropy = 0 }) => {
    const canvasRef = useRef(null);
    const weightRef = useRef(weights);
    const entropyRef = useRef(entropy);

    // Keep latest weights in ref without triggering re-renders
    useEffect(() => {
        weightRef.current = weights;
        entropyRef.current = entropy;
    }, [weights, entropy]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const gridState = {
            points: [],
            cols: Math.floor(window.innerWidth / 60),
            rows: Math.floor(window.innerHeight / 60),
            targetX: window.innerWidth / 2,
            targetY: window.innerHeight / 2
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gridState.cols = Math.floor(canvas.width / 50);
            gridState.rows = Math.floor(canvas.height / 50);
            gridState.targetX = canvas.width / 2;
            gridState.targetY = canvas.height / 2;
            initGrid();
        };

        const initGrid = () => {
            const { cols, rows } = gridState;
            const points = [];
            const cellW = canvas.width / cols;
            const cellH = canvas.height / rows;

            for (let y = 0; y <= rows; y++) {
                for (let x = 0; x <= cols; x++) {
                    points.push({
                        baseX: x * cellW,
                        baseY: y * cellH,
                        x: x * cellW,
                        y: y * cellH,
                        vx: 0,
                        vy: 0
                    });
                }
            }
            gridState.points = points;
        };

        const animate = () => {
            const currentEntropy = entropyRef.current || 0;

            // Meta-UI: Entropy shifts background clearing to be more opaque, making trails longer/messier
            const bgAlpha = 0.4 - (currentEntropy * 0.2);
            ctx.fillStyle = `rgba(2, 6, 23, ${bgAlpha})`; // slate-950
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Meta-UI: Entropy shifts line color from Cyan toward Warning Red/Gold
            const red = Math.floor(34 + (currentEntropy * 221)); // 34 -> 255
            const green = Math.floor(211 - (currentEntropy * 150)); // 211 -> 61
            const blue = Math.floor(238 - (currentEntropy * 238)); // 238 -> 0

            // Randomly glitch alpha based on entropy
            const glitchAlpha = currentEntropy > 0.5 && Math.random() > 0.9 ? 0.8 : 0.2 + (currentEntropy * 0.3);
            ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${glitchAlpha})`;
            ctx.lineWidth = 1.5 + (currentEntropy * 2);

            const { points, cols } = gridState;
            const currentWeights = weightRef.current;

            // Map engine weights (-N to N) to screen coordinates
            const gravityX = (canvas.width / 2) + ((currentWeights?.x || 0) * (canvas.width / 4));
            const gravityY = (canvas.height / 2) + ((currentWeights?.y || 0) * (canvas.height / 4));

            // Smoothly move the gravity well target. Entropy makes it jitter.
            const jitterX = (Math.random() - 0.5) * currentEntropy * 100;
            const jitterY = (Math.random() - 0.5) * currentEntropy * 100;

            gridState.targetX += (gravityX + jitterX - gridState.targetX) * 0.05;
            gridState.targetY += (gravityY + jitterY - gridState.targetY) * 0.05;

            // Draw Gravity Well Indicator
            ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${0.1 + currentEntropy * 0.2})`;
            ctx.beginPath();
            ctx.arc(gridState.targetX, gridState.targetY, 4 + (currentEntropy * 10), 0, Math.PI * 2);
            ctx.fill();

            points.forEach(p => {
                let dx = p.baseX - p.x;
                let dy = p.baseY - p.y;

                const distX = gridState.targetX - p.x;
                const distY = gridState.targetY - p.y;
                const distance = Math.sqrt(distX * distX + distY * distY);

                // Meta-UI: Entropy dramatically increases the gravity well range and pull strength
                const radius = 400 + (currentEntropy * 600);
                const pullPower = 1500 + (currentEntropy * 3000);

                if (distance < radius && distance > 10) {
                    const pull = (radius - distance) / radius;
                    dx += (distX / distance) * pull * pullPower;
                    dy += (distY / distance) * pull * pullPower;
                }

                p.vx += dx * 0.01; // Spring stiffness
                p.vy += dy * 0.01;

                p.vx *= 0.85; // Friction
                p.vy *= 0.85;

                // Entropy jitter to individual points
                p.x += p.vx + ((Math.random() - 0.5) * currentEntropy * 5);
                p.y += p.vy + ((Math.random() - 0.5) * currentEntropy * 5);
            });

            // Draw the warped grid
            ctx.beginPath();
            for (let i = 0; i < points.length; i++) {
                const p = points[i];

                if (i % (cols + 1) < cols) {
                    const next = points[i + 1];
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(next.x, next.y);
                }

                if (i < points.length - (cols + 1)) {
                    const below = points[i + (cols + 1)];
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(below.x, below.y);
                }
            }
            ctx.stroke();

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    );
};

export default DynamicGridBackground;
