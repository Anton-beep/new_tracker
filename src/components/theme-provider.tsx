import {ReactNode, useEffect, useState} from 'react';
import {ThemeContext} from '../contexts/theme-context';
import GrowingCircle from "./growing-cricle.tsx";

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
    const [theme, setTheme] = useState('dark');
    const [growingEnd, setGrowingEnd] = useState(true);
    const [fill, setFill] = useState("var(--background)");
    const [cursor, setCursor] = useState({x: 0, y: 0});

    const toggleTheme = () => {
        setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        document.body.className = theme + '-theme';

        const computedStyle = getComputedStyle(document.body);
        setFill(computedStyle.getPropertyValue('--text-primary'));
        setGrowingEnd(false);

        const updateCursor = (e: MouseEvent) => {
            setCursor({x: e.clientX, y: e.clientY});
        };

        window.addEventListener('mousemove', updateCursor);

        if (growingEnd) {
            const transition = document.body.style.transition;
            document.body.style.transition = "none";
            document.body.style.backgroundColor = "var(--background)";
            void document.body.offsetWidth;
            document.body.style.transition = transition;
        }

        return () => {
            window.removeEventListener('mousemove', updateCursor);
        }
    }, [growingEnd, theme]);

    return (
        <>
            <ThemeContext.Provider value={{theme, toggleTheme}}>
                {growingEnd ? null :
                    <div style={{zIndex: -1}}>
                        <GrowingCircle fill={fill} centerX={cursor.x} centerY={cursor.y}
                                       setGrowingEnd={setGrowingEnd} growthRate={0.1}/></div>}
                {children}
            </ThemeContext.Provider>
        </>
    );
};
