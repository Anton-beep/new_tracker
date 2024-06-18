import ThemeSwitch from "./components/theme-switch.tsx";
import {ThemeProvider} from "./components/theme-provider.tsx";

function App() {
    return (
        <>
            <ThemeProvider>
                <div>asdfasdf</div>
                <div className={"horizontal-center"}>
                    <ThemeSwitch/>
                </div>
                <div className={"center"}>
                    съешь ещё этих мягких французских булок, да выпей чаю
                </div>
            </ThemeProvider>
        </>
    );
}

export default App;