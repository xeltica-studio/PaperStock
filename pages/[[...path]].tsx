import type { GetServerSideProps } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { AppRoot } from '@/components/AppRoot';
import { PATH_INDEX } from '@/const';
import { CommonHead } from '@/components/CommonHead';
import { ApiPage } from '@/models/api/page';
import { ApiPageListItem } from '@/models/api/page-list-item';
import { ApiErrorObject, ApiObject } from '@/models/api/object';

export type WikiPageProp = {
  page: ApiPage | null;
  list: ApiPageListItem[];
  error: ApiErrorObject | null;
  isPageNotFound: boolean;
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

export const WikiPage: React.FC<WikiPageProp> = (prop) => {
  const router = useRouter();
  const p = router.query.path;
  const path = typeof p === 'object' ? p[0] : p ?? PATH_INDEX;

  const body = prop.error ? (
    <>
      <header className="mb-2">
        <h1 className="title text-200">エラー</h1>
      </header>
      <p>{prop.error.errorCode}</p>
      {prop.error.errorCode === 'PAGE_NOT_FOUND' ? (
        <Link href={`/s/edit?path=${encodeURIComponent(path)}`}>新規作成する</Link>
      ) : (
        <Link href="/">トップページに戻る</Link>
      )}
    </>
  ) : (
    <>
      <header className="mb-2">
        <h1 className="title text-200">{prop.page?.title}</h1>
      </header>
      <section dangerouslySetInnerHTML={{__html: prop.page?.html ?? ''}} />
    </>
  );
  
  const onNewButtonClick = () => {
    const path = prompt('ページ名を入力してください');
    if (!path) return;
    router.push('/s/edit?path=' + encodeURIComponent(path));
  };

  return (
    <AppRoot title="PaperStock" titleHref="/" rightCommands={[
      {type: 'link', href: `/s/edit?path=${encodeURIComponent(path)}`, label: '編集', iconClass: 'fas fa-pen-to-square' },
      {type: 'button', iconClass: 'fas fa-ellipsis-h' },
    ]}>
      <CommonHead>
        <title>{prop.error ? 'エラー' : prop.page?.title} - PaperStock</title>
      </CommonHead>
      <Main>
        <Sidebar className="pa-1">
          <div className="menu">
            {prop.list.map(l => (
              <Link key={l.id} href={`/${l.path}`}>
                <a className="item">
                  <i className="icon fas fa-chevron-right" /> {l.title}
                </a>
              </Link>
            ))}
          </div>
          <button className="btn primary mt-2" onClick={onNewButtonClick}>
            <i className="fas fa-plus fa-fw" /> 新規作成
          </button>
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

export const getServerSideProps: GetServerSideProps<WikiPageProp> = async ({query}) => {
  const p = query.path;
  const path = typeof p === 'object' ? p[0] : p ?? PATH_INDEX;
  const [page, list] = await Promise.all([
    (await fetch('http://localhost:3000/api/v1/page/' + path).then(d => d.json())) as ApiObject,
    (await fetch('http://localhost:3000/api/v1/page/list').then(d => d.json())) as ApiObject
  ]);
  if (!list.ok) throw new Error('Could not get list');
  const isPageNotFound = !page.ok && page.statusCode === 404;
  return {
    props: {
      page: page.ok ? page.response : null,
      error: !page.ok ? page : null,
      list: list.response,
      isPageNotFound,
    },
    // TODO 404を返しつつちゃんとページをレンダリングする
    // notFound: isPageNotFound,
  };
};

export default WikiPage;
