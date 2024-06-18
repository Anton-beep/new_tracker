import {useTheme} from '../hooks/use-theme';
import {Sun} from './icons/sun';
import {useEffect, useState} from "react";
import GrowingCircle from "./growing-cricle.tsx";

const ThemeSwitch = () => {
    const {toggleTheme} = useTheme();

    const handleClick = () => {
        toggleTheme();
    };

    return (
        <>
            <div style={{zIndex: 10}}>
                <button onClick={handleClick} style={{zIndex: 10}}>
                    <Sun fill={"var(--background-emphasis)"} width={24} height={24}/>
                </button>
            </div>
        </>
    );
}

export default ThemeSwitch;