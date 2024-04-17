import "./App.css";
import HomePage from "./pages/home";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        allVariants: {
            fontSize: "1rem",
            fontFamily: 'Nunito, sans-serif',
            "-webkit-font-smoothing": "antialiased",
            "-moz-osx-font-smoothing": "grayscale"
        },
        h1: {
            fontFamily: 'Amatic SC, cursive',
            fontSize: '3rem',
        },
        h2: {
            fontFamily: 'Josefin Slab, serif',
            fontSize: '2.25rem',
        },
        body1: {
            fontFamily: 'Josefin Slab, serif',
            fontSize: '1.25rem',
        },
        button: {
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 'bold',
        }
    },
    components: {
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: '#00adb2',
                    height: 3,
                    transition: 'background-color 0.3s ease'
                }
            }
        }
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <HomePage />
        </ThemeProvider>
    );
}

export default App;
