import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { AppRoot } from '@/components/AppRoot';
import { CommonHead } from '@/components/CommonHead';
import { ApiPage } from '@/models/api/page';
import { ApiPageListItem } from '@/models/api/page-list-item';
import { ApiErrorObject } from '@/models/api/object';
import { readPage, readPages, readServerSetting } from '@/client/api';
import { ApiError } from '@/client/http';
import { ServerSetting } from '@prisma/client';
import { useCallback, useState } from 'react';
import { sanitizePath } from '@/misc/sanitize-path';
import { isValidPath } from '@/misc/validate-path';
import { getPathFromQuery } from '@/misc/get-path-from-query';

export type WikiPageProp = {
  page: ApiPage | null;
  list: ApiPageListItem[];
  server: ServerSetting;
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

const Drawer = styled.div`
  z-index: 20000;
`;

export const WikiPage: React.FC<WikiPageProp> = ({page, list, server, error}) => {
	const router = useRouter();
	const path = getPathFromQuery(router.query);
	const [isVisibleDrawer, setVisibleDrawer] = useState(false);

	const body = error ? (
		<>
			<header className="mb-2">
				<h1 className="title text-200">エラー</h1>
			</header>
			<p>{error.errorCode}</p>
			{error.errorCode === 'PAGE_NOT_FOUND' ? (
				<Link href={`/s/edit?path=${encodeURIComponent(path)}`}>新規作成する</Link>
			) : (
				<Link href="/">トップページに戻る</Link>
			)}
		</>
	) : (
		<>
			<header className="mb-2">
				<h1 className="title text-200">{page?.title}</h1>
			</header>
			<section dangerouslySetInnerHTML={{__html: page?.html ?? ''}} />
		</>
	);
  
	const onNewButtonClick = () => {
		const path = prompt('ページ名を入力してください');
		if (!path) return;
		router.push('/s/edit?path=' + encodeURIComponent(sanitizePath(path)));
	};

	const hideDrawer = useCallback(() => setVisibleDrawer(false), []);

	const showDrawer = useCallback(() => setVisibleDrawer(true), []);

	const menuItem = (
		<>
			<div className="menu">
				{list.map(l => (
					<Link key={l.id} href={`/${l.path}`} onClick={hideDrawer}>
						<a className="item">
							<i className="icon fas fa-chevron-right" /> {l.title}
						</a>
					</Link>
				))}
			</div>
			<button className="btn primary ma-2" onClick={onNewButtonClick}>
				<i className="fas fa-plus fa-fw" /> 新規作成
			</button>
		</>
	);

	return (
		<AppRoot title={server.serverName ?? ''} titleHref="/" rightCommands={[
			{type: 'link', href: `/s/edit?path=${encodeURIComponent(path)}`, label: '編集', iconClass: 'fas fa-pen-to-square' },
			{type: 'button', iconClass: 'fas fa-ellipsis-h' },
		]}>
			<CommonHead>
				<title>{error ? 'エラー' : page?.title} - PaperStock</title>
			</CommonHead>
			<button className="btn primary le-tablet fix-bottom-left-4" onClick={showDrawer}>
				<i className="fas fa-bars"></i>
			</button>
			<Main>
				<Sidebar className="pa-1 ge-tablet">
					{menuItem}
				</Sidebar>
				<Content className="container">
					<Article>
						{body}
					</Article>
					<footer className="text-75 text-dimmed mt-5">
						<p>
							{server.ownerName && <>(C) {server.ownerName} All rights reserved. | </>}
              Powered by <a href="https://github.com/Xeltica/PaperStock" target="_blank" rel="noreferrer noopener">PaperStock</a> ver1.0.0
						</p>
					</footer>
				</Content>
			</Main>
			<Drawer className={`drawer-container ${isVisibleDrawer ? 'active' : ''}`}>
				<div className="backdrop" onClick={hideDrawer} />
				<div className="drawer">
					<header>
						<button className="close" onClick={hideDrawer}>
							<i className="fas fa-times"></i>
						</button>
					</header>
					{menuItem}
				</div>
			</Drawer>
		</AppRoot>
	);
};

export const getServerSideProps: GetServerSideProps<WikiPageProp> = async ({query}) => {
	const path = getPathFromQuery(query);
	console.log(JSON.stringify(path));
	if (!isValidPath(path)) throw new Error('パスが正しくありません。');
	const list = await readPages();
	const server = await readServerSetting();
	const props: WikiPageProp = {
		page: null,
		error: null,
		list,
		server,
		isPageNotFound: false,
	};
	try {
		props.page = await readPage(path);
	} catch (e) {
		if (e instanceof ApiError) {
			props.error = e.errorObject;
			props.isPageNotFound = e.errorObject.statusCode === 404;
		} else {
			throw e;
		}
	}
	return {
		props,
		// TODO 404を返しつつちゃんとページをレンダリングする
		// notFound: isPageNotFound,
	};
};

export default WikiPage;
