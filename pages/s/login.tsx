import type { NextPage } from 'next'
import styled from 'styled-components';

import { CommonHead } from '@/components/CommonHead';

const Container = styled.div`
  background-color: var(--indigo-6);
  background-image: radial-gradient(var(--white-50) 3%, transparent 0);
  background-size: 50px 50px;
  min-height: 100vh;
  position: relative;
`;

const Card = styled.div`
  width: 100%;
  max-width: 400px;
`;

const Login: NextPage = () => {
  return (
    <Container className="flex f-center f-middle">
      <CommonHead>
        <title>ログイン - PaperStock</title>
      </CommonHead>
      <Card className="card shadow-2 fade up">
        <div className="body px-5 py-3">
          <h1>PaperStock</h1>
          <label className="input-field">
            ユーザー名
            <input type="text" />
          </label>
          <label className="input-field">
            パスワード
            <input type="password" autoComplete="new-password" />
          </label>
          <button className="btn primary fluid mt-5">ログイン</button>
        </div>
      </Card>
    </Container>
  )
}

export default Login;
