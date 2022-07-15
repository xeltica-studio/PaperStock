import type { AppProps } from 'next/app';

import { GlobalStyle } from '@/global-style';

import 'xeltica-ui/dist/css/xeltica-ui.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;


