import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';

import 'xeltica-ui/dist/css/xeltica-ui.min.css';

const Global = createGlobalStyle`
  body {
    --primary: var(--indigo);
    --primary-1: var(--indigo-1);
    --primary-2: var(--indigo-2);
    --primary-3: var(--indigo-3);
    --primary-4: var(--indigo-4);
    --primary-5: var(--indigo-5);
    --primary-6: var(--indigo-6);
    --primary-7: var(--indigo-7);
    --primary-8: var(--indigo-8);
    --primary-9: var(--indigo-9);
    --link: var(--green);
  }

  .fade {
      animation: 0.3s ease-out 0s fadeIn;
      &.down {
          animation-name: fadeInUp;
      }
      &.up {
          animation-name: fadeInUp;
      }
  }

  @keyframes fadeIn {
      from {
          opacity: 0;
      }
      to {
          opacity: 1;
      }
  }

  @keyframes fadeInDown {
      from {
          opacity: 0;
          transform: translateY(-8px);
      }
      to {
          opacity: 1;
          transform: none;
      }
  }

  @keyframes fadeInUp {
      from {
          opacity: 0;
          transform: translateY(8px);
      }
      to {
          opacity: 1;
          transform: none;
      }
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
