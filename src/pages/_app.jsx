import { ThemeProvider } from 'next-themes';
import '../styles/globals.scss';

export default function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <Component { ...pageProps } />
        </ThemeProvider>
    )
}