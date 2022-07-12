import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { AppRoot } from "../../components/AppRoot";
import { Command, NavBar } from "../../components/NavBar";
import { PATH_INDEX } from "../../const";
import { $post, $put } from "../../misc/call-api";
import { ApiObject } from "../../types/api-object";

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
  const [title, setTitle] = useState(initialTitle || router.query.name);
  const [body, setBody] = useState(initialBody);
  const [isDisabled, setDisabled] = useState(false);

  const save = () => {
    setDisabled(true);
    const send = isNewPage ? $post : $put;
    send(`page/${router.query.path}`, {
      title,
      body,
    }).then(() => {
      router.push(`/${router.query.path}`);
    });
  };

  return (
    <AppRoot title={isNewPage ? 'ページの新規作成' : 'ページの編集'} onBackButton={() => router.back()}>
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
  const page = (await fetch('http://localhost:3000/api/v1/page/' + path).then(e => e.json())) as ApiObject;
  if (!page.ok) {
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
        initialTitle: page.response.title,
        initialBody: page.response.body,
        isNewPage: false,
      }
    };
  }
};

export default EditPage;
