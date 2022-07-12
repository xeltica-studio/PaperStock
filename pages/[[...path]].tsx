import type { GetServerSideProps } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Command, NavBar } from '../components/NavBar';
import { AppRoot } from '../components/AppRoot';
import { ApiErrorCode, ApiObject, ApiPage } from '../types/api-object';
import { PATH_INDEX, PATH_SYSTEM } from '../const';

export type MainProp = {
  error: false,
  page: ApiPage,
} | {
  error: true,
  errorType: ApiErrorCode,
  body: string,
};

const Main = styled.div`
  display: flex;
`;

const Sidebar = styled.nav`
  width: 256px;
`;

const Content = styled.main`
  flex: 1;
  background: var(--panel);
  min-height: calc(100vh - 64px);
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
  const p = router.query.path;
  const path = typeof p === 'object' ? p[0] : p ?? PATH_INDEX;
  const body = prop.error ? (
    <>
      <header className="mb-2">
        <h1 className="title text-200">エラー</h1>
      </header>
      <p>{prop.errorType}</p>
      {prop.errorType === 'PAGE_NOT_FOUND' ? (
        <Link href={`/s/edit?path=${encodeURIComponent(path)}`}>新規作成する</Link>
      ) : (
        <Link href="/">トップページに戻る</Link>
      )}
    </>
  ) : (
    <>
      <header className="mb-2">
        <h1 className="title text-200">{prop.page.title}</h1>
      </header>
      <section dangerouslySetInnerHTML={{__html: prop.page.html}} />
    </>
  );

  return (
    <AppRoot title="PaperStock" titleHref="/" rightCommands={[
      {type: 'link', href: `/s/edit?path=${encodeURIComponent(path)}`, label: '編集', iconClass: 'fas fa-pen-to-square' },
      {type: 'button', iconClass: 'fas fa-ellipsis-h' },
    ]}>
      <Main>
        <Sidebar className="pa-1">
          <div className="menu">
            <Link href="/walkthrough"><div className="item">歩き方</div></Link>
            <Link href="/discord"><div className="item">公式Discord</div></Link>
            <Link href="/faq"><div className="item">よくある質問</div></Link>
            <Link href="/vote"><div className="item">投票</div></Link>
          </div>
          <Link href="/s/new">
            <a className="btn primary mt-2"><i className="fas fa-plus fa-fw" /> 新規作成</a>
          </Link>
        </Sidebar>
        <Content className="container">
          <Article>
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

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const p = query.path;
  const path = typeof p === 'object' ? p[0] : p ?? PATH_INDEX;
  if (path.startsWith(PATH_SYSTEM) || path === PATH_SYSTEM) {
    return {
      props: {
        error: true,
        errorType: 'SYSTEM_PAGE'
      } as MainProp,
    };
  }
  const data = (await fetch('http://localhost:3000/api/v1/page/' + path).then(d => d.json())) as ApiObject;
  return !data.ok ? {
    props: {
      error: true,
      errorType: data.errorCode,
    }
  } : {
    props: {
      error: false,
      page: data.response
    }
  };
};

export default WikiPage;
