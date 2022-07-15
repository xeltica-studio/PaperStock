import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

import { AppRoot } from "@/components/AppRoot";
import { CommonHead } from "@/components/CommonHead";
import { PATH_INDEX } from "@/const";
import { createPage, readPage, updatePage } from "@/client/api";

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
  const [title, setTitle] = useState(initialTitle || router.query.path as string);
  const [body, setBody] = useState(initialBody);
  const [isDisabled, setDisabled] = useState(false);

  const save = async () => {
    setDisabled(true);
    if (isNewPage) {
      await createPage(router.query.path as string, {
        title, body
      });
    } else {
      await updatePage(router.query.path as string, {
        title, body
      });
    }
    router.push(`/${router.query.path}`);
  };

  const pageTitle = isNewPage ? 'ページの新規作成' : 'ページの編集';

  return (
    <AppRoot title={pageTitle} onBackButton={() => router.back()}>
      <CommonHead>
        <title>{pageTitle} - PaperStock</title>
      </CommonHead>
      <div className="container vstack">
        <div className="hstack slim">
          <div className="hgroup">
            <button className="btn bg-white">H1</button>
            <button className="btn bg-white">H2</button>
            <button className="btn bg-white">H3</button>
          </div>
          <div className="hgroup">
            <button className="btn bg-white"><i className="fas fa-bold" title="Bold" /></button>
            <button className="btn bg-white"><i className="fas fa-italic" title="Italic" /></button>
            <button className="btn bg-white"><i className="fas fa-underline" title="Underline" /></button>
            <button className="btn bg-white"><i className="fas fa-strikethrough" title="Strike Out" /></button>
          </div>
          <div className="hgroup">
            <button className="btn bg-white"><i className="fas fa-list-ul" title="Unordered List" /></button>
            <button className="btn bg-white"><i className="fas fa-list-ol" title="Ordered List" /></button>
            <button className="btn bg-white"><i className="fas fa-quote-right" title="Block Quote" /></button>
            <button className="btn bg-white"><i className="fas fa-code" title="Code Block" /></button>
          </div>
        </div>
        <input type="text" className="input-field bg-white text-bold fluid" value={title} disabled={isDisabled} onChange={e => setTitle(e.target.value)} />
        <Editor className="input-field bg-white" value={body} disabled={isDisabled} onChange={e => setBody(e.target.value)} />
        <button className="btn primary ml-auto" disabled={isDisabled} onClick={save}><i className="fas fa-check" /> 保存</button>
      </div>
    </AppRoot>
  );
};

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const p = query.path;
  const path = typeof p === 'object' ? p[0] : p ?? PATH_INDEX;
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
