import { ThemeProvider } from 'next-themes';
import '../styles/globals.scss';
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark">
            <Component { ...pageProps } />
        </ThemeProvider>
    )
} 