import {createGlobalTheme} from "./theming";

const theme = createGlobalTheme({
    direction: "ltr",
    paletteType: "light"
});

const pageContext = {theme};

export default pageContext;


