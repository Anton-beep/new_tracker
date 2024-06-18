import {useContext, useEffect} from "react";
import {Theme} from "../contexts/theme";
import {GrowingCircleCoords} from "../contexts/growing-circle-coords";
import {Sun} from "./icons/sun";
import {Moon} from "./icons/moon";

export default function ThemeSwitch() {
    const {theme, setTheme} = useContext(Theme);
    const {setCoords} = useContext(GrowingCircleCoords);

    useEffect(() => {
        document.body.className = theme + "-theme";
    }, [theme]);

    return (
        <button onClick={(event) => {
            setCoords({x: event.clientX, y: event.clientY, draw: true});
            setTheme(theme === "light" ? "dark" : "light");
        }}>
            {theme == "dark" ? <Sun fill={"var(--background)"} width={24} height={24}/> :
                <Moon fill={"var(--background)"} width={24} height={24}/>}
        </button>
    )
}