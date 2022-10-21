import type { AppProps } from 'next/app';
import { GlobalStyles } from '@/styles/globalStyles';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { ThemeProvider } from '@emotion/react';
import { darkTheme, lightTheme } from '@/styles/theme';
import ThemeContext from '@/contexts/ThemeContext';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as gtag from '@/lib/gtag';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps<{ fallback: any }>) {
  const { fallback } = pageProps;
  const { isDark, toggleTheme } = useTheme();
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Head>
        <title>Next SSG Blog</title>
        <meta name='description' content='Next SSG Blog' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='preload'
          href='https://unpkg.com/prismjs@0.0.1/themes/prism-tomorrow.css'
          as='script'
        />
        <link
          rel='preload'
          href='https://unpkg.com/prismjs@0.0.1/themes/prism-coy.css'
          as='script'
        />
        <link
          rel='preload'
          href='https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css'
          as='script'
        />
        <link
          rel='preload'
          href='https://unpkg.com/prismjs@0.0.1/themes/prism-funky.css'
          as='script'
        />
        <link
          href={`https://unpkg.com/prismjs@0.0.1/themes/prism-tomorrow.css`}
          rel='stylesheet'
        />
      </Head>
      {GlobalStyles}
      <SWRConfig value={{ fallback }}>
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
          <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ThemeContext.Provider>
      </SWRConfig>
    </>
  );
}

export default MyApp;
