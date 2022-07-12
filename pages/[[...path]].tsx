import type { GetServerSideProps } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Command, NavBar } from '../components/NavBar';
import { AppRoot } from '../components/AppRoot';
import { ApiErrorCode, ApiObject } from '../types/api-object';

export type MainProp = {
  error: false,
  title: string;
  body: string;
} | {
  error: true,
  errorType: ApiErrorCode,
  body: string,
};

const Main = styled.div`
  display: flex;
  gap: var(--margin);
`;

const Sidebar = styled.nav`
  width: 256px;
`;

const Content = styled.main`
  flex: 1;
`;

const Article = styled.article`
  h1:not(.title) {
    font-size: 2rem;
  }
  h1.title {
    width: 100%;
  }
`;

export const WikiPage: React.FC<MainProp> = (prop) => {
  const router = useRouter();
  const body = prop.error ? (
    <>
      <h2>エラー</h2>
      <p>{prop.errorType}</p>
      {prop.errorType === 'PAGE_NOT_FOUND' ? (
        <Link href={`/s/new?name=${encodeURIComponent(router.asPath)}`}>新規作成する</Link>
      ) : (
        <Link href="/">トップページに戻る</Link>
      )}
    </>
  ) : (
    <>
      <h1 className="title">{prop.title}</h1>
      <section dangerouslySetInnerHTML={{__html: prop.body}} />
    </>
  );

  return (
    <AppRoot className="container" title="PaperStock" titleHref="/" rightCommands={[
      {type: 'link', href: `/s/edit?path=${encodeURIComponent(router.asPath)}`, label: 'ページを編集する' }
    ]}>
      <Main>
        <Sidebar>
          <div className="menu">
            <Link href="/walkthrough"><div className="item">歩き方</div></Link>
            <Link href="/discord"><div className="item">公式Discord</div></Link>
            <Link href="/faq"><div className="item">よくある質問</div></Link>
            <Link href="/vote"><div className="item">投票</div></Link>
          </div>
          <Link href="/s/new"><a className="btn primary mt-2">新規作成</a></Link>
        </Sidebar>
        <Content>
          <Article className="card px-4 py-2 shadow-2">
            {body}
          </Article>
          <footer className="text-75 text-dimmed mt-5">
            <p>
              (C) 運営者名<br/>
              Powered by <a href="https://github.com/Xeltica/PaperStock" target="_blank" rel="noreferrer noopener">PaperStock</a> ver1.0.0
            </p>
          </footer>
        </Content>
      </Main>
    </AppRoot>
  );
};

export const getServerSideProps: GetServerSideProps = async ({req, res, resolvedUrl}) => {
  if (resolvedUrl.startsWith('/s/') || resolvedUrl === '/s') {
    return {
      props: {
        error: true,
        errorType: 'SYSTEM_PAGE'
      } as MainProp,
    };
  }
  const data = (await fetch('http://localhost:3000/api/v1/page' + resolvedUrl).then(d => d.json())) as ApiObject;
  return !data.ok ? {
    props: {
      error: true,
      errorType: data.errorCode,
    }
  } : {
    props: {
      error: false,
      ...data.response
    }
  };
};

export default WikiPage;
