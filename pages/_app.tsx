import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';

import { GlobalStyle } from '../global-style';

import 'xeltica-ui/dist/css/xeltica-ui.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
