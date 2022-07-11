import React from "react";
import styled from "styled-components";

export type WikiPageProp = {
  title: string;
  body: string;
};

const Root = styled.div`
  margin-top: 72px;
`;

const NavBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const Main = styled.div`
  display: flex;
  gap: var(--margin);
`;

const Sidebar = styled.nav`
  width: 256px;
`;

const Article = styled.article`
  flex: 1;
  h1:not(.title) {
    font-size: 2rem;
  }
  h1.title {
    font-weight: bold;
    width: 100%;
    border-bottom: 1px solid var(--dimmed);
    margin-bottom: 1.5rem;
  }
`;

export const WikiPage: React.FC<WikiPageProp> = ({title, body}) => {
  return (
    <Root className="container">
      <NavBar className="navbar bg-primary">
        <h1 className="navbar-title">PaperStock</h1>
        <div className="hstack ml-auto">
          <button className="btn flat text-white">ログイン</button>
        </div>
      </NavBar>
      <Main>
        <Sidebar>
          <div className="menu">
            <div className="item">ホーム</div>
            <div className="item">歩き方</div>
            <div className="item">公式Discord</div>
            <div className="item">よくある質問</div>
            <div className="item">投票</div>
          </div>
        </Sidebar>
        <Article className="card px-4 py-2 mx-auto">
          <h1 className="title">{title}</h1>
          <section dangerouslySetInnerHTML={{__html: body}} />
        </Article>
      </Main>
    </Root>
  );
};
