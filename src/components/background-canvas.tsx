import {useEffect, useRef} from "react";

const BackgroundCanvas = ({color}: { color: string }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        context.fillStyle = color;

        context.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default BackgroundCanvas;