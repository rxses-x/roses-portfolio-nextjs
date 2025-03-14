import { ThemeProvider } from 'next-themes';
import '../styles/globals.scss';

export default function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark">
            <Component { ...pageProps } />
        </ThemeProvider>
    )
}