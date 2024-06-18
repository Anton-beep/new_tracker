import React, {useRef, useEffect} from 'react';

interface GrowingCircleProps {
    fill: string;
    centerX: number;
    centerY: number;
    setGrowingEnd: (end: boolean) => void;
    growthRate: number;
}

const GrowingCircle = ({fill, centerX, centerY, setGrowingEnd, growthRate}: GrowingCircleProps) => {
    const canvasRef = useRef(null);
    let radius = 0;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.fillStyle = fill;

        function drawCircle() {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fill();
            radius += growthRate;
        }

        function animateCircle() {
            drawCircle();
            if (radius > Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2)) {
                setGrowingEnd(true);
                return;
            }
            requestAnimationFrame(animateCircle);
        }

        animateCircle();
    }, []);

    return <canvas ref={canvasRef} style={
        {
            width: "100vw",
            height: "100vh",
            position: "fixed",
            zIndex: -1
        }
    } key={fill}/>;
};

export default GrowingCircle;