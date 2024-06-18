import React, {useState} from "react";
import {GrowingCircleCoords} from "../contexts/growing-circle-coords";

export default function CoordsProvider({children}: {children: React.ReactNode}) {
    const [coords, setCoords] = useState({x: 0, y: 0, draw: false});

    return (
        <GrowingCircleCoords.Provider value={{...coords, setCoords}}>
            {children}
        </GrowingCircleCoords.Provider>
    )
}