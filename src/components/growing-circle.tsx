import {useContext, useEffect, useRef} from 'react';
import {GrowingCircleCoords} from '../contexts/growing-circle-coords';
import {Theme} from "../contexts/theme.ts";

export default function GrowingCircle() {
    const {x, y, draw, setCoords} = useContext(GrowingCircleCoords);
    const {theme, setTheme} = useContext(Theme);
    const growthRate = 8;
    const canvasRef = useRef(null);
    let radius = 0;

    useEffect(() => {
        if (draw) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const computedStyle = getComputedStyle(document.body);
            ctx.fillStyle = theme === "light" ? computedStyle.getPropertyValue('--background-light') : computedStyle.getPropertyValue('--background-dark');
            const startTime = performance.now();

            function drawCircle() {
                const currentTime = performance.now();
                const elapsedTime = currentTime - startTime;
                radius = elapsedTime * growthRate;

                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI);
                ctx.fill();
                console.log("draw");
            }

            function animateCircle() {
                drawCircle();
                if (radius > Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2)) {
                    setCoords({x: 0, y: 0, draw: false});
                    const transition = document.body.style.transition;
                    document.body.style.transition = "none";
                    document.body.style.backgroundColor = "var(--background)";
                    void document.body.offsetWidth;
                    document.body.style.transition = transition;
                    return;
                }
                requestAnimationFrame(animateCircle);
            }

            animateCircle();
        }
    }, [theme]);

    return (
        <>
            {draw && <canvas ref={canvasRef} style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
            }}/>}
        </>
    );
}