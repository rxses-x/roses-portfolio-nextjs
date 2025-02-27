import { ThemeProvider } from 'next-themes';
import '../styles/styles.scss';

export default function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <Component { ...pageProps } />
        </ThemeProvider>
    )
}