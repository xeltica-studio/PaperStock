import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

import { AppRoot } from '@/components/AppRoot';
import { CommonHead } from '@/components/CommonHead';
import { createPage, readPage, updatePage } from '@/client/api';
import { sanitizePath } from '@/misc/sanitize-path';
import { isSystemPath, isValidPath } from '@/misc/validate-path';
import { getPathFromQuery } from '@/misc/get-path-from-query';

const Editor = styled.textarea`
  max-width: 100%;
  min-width: 100%;
  height: calc(100vh - 300px);
`;

type EditPageProp = {
  initialTitle: string;
  initialBody: string;
  isNewPage: boolean;
};

const EditPage: NextPage<EditPageProp> = ({initialTitle, initialBody, isNewPage}) => {
	const router = useRouter();
	const [title, setTitle] = useState(initialTitle || getPathFromQuery(router.query));
	const [body, setBody] = useState(initialBody);
	const [isDisabled, setDisabled] = useState(false);

	const save = async () => {
		const path = getPathFromQuery(router.query);
		setDisabled(true);
		if (isNewPage) {
			await createPage(path, {
				title, body
			});
		} else {
			await updatePage(path, {
				title, body
			});
		}
		router.push(`/${path}`);
	};

	const pageTitle = isNewPage ? 'ページの新規作成' : 'ページの編集';

	return (
		<AppRoot title={pageTitle} onBackButton={() => router.back()}>
			<CommonHead>
				<title>{pageTitle} - PaperStock</title>
			</CommonHead>
			<div className="container vstack">
				<input type="text" className="input-field bg-white text-bold fluid" value={title} disabled={isDisabled} onChange={e => setTitle(e.target.value)} />
				<Editor className="input-field bg-white" value={body} disabled={isDisabled} onChange={e => setBody(e.target.value)} />
				<div className="hstack ml-auto f-middle">
					<aside className="text-dimmed">
						<i className="fab fa-markdown" /> Markdownを使用できます。
					</aside>
					<button className="btn primary" disabled={isDisabled} onClick={save}><i className="fas fa-check" /> 保存</button>
				</div>
			</div>
		</AppRoot>
	);
};

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	const path = sanitizePath(getPathFromQuery(query));
	if (!isValidPath(path)) throw new Error('パスが正しくありません。');
	if (isSystemPath(path)) throw new Error('システムページは編集できません。');

	const page = await readPage(path).catch(() => null);
	if (!page) {
		return {
			props: {
				initialTitle: '',
				initialBody: '',
				isNewPage: true,
			}
		};
	} else {
		return {
			props: {
				initialTitle: page.title,
				initialBody: page.body,
				isNewPage: false,
			}
		};
	}
};

export default EditPage;
