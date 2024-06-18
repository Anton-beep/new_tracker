import React, {useState} from "react";
import {Theme} from "../contexts/theme";

export default function ThemeProvider({children}: {children: React.ReactNode}) {
    const [theme, setTheme] = useState("light");

    return (
        <Theme.Provider value={{theme, setTheme}}>
            {children}
        </Theme.Provider>
    )
}