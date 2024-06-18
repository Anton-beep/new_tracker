import ThemeSwitch from "./components/theme-switch.tsx";
import ThemeProvider from "./components/theme-provider.tsx";
import GrowingCircle from "./components/growing-circle.tsx";
import CoordsProvider from "./components/coords-provider.tsx";

function App() {
    return (
        <>
            <ThemeProvider>
                <CoordsProvider>
                    <GrowingCircle/>
                    <div className={"center"}>
                        <ThemeSwitch/>
                        съешь ещё этих мягких французских булок, да выпей чаю
                    </div>
                </CoordsProvider>
            </ThemeProvider>
        </>
    );
}

export default App;