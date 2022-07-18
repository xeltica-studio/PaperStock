import type { NextPage } from 'next';
import styled from 'styled-components';

import { CommonHead } from '@/components/CommonHead';
import * as api from '@/client/api';
import { useState } from 'react';
import { writeUser } from '@/client/storage';
import { ApiError } from '@/client/http';

const Container = styled.div`
  background-color: var(--primary-6);
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
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');

	const [isProcessing, setProcessing] = useState(false);

	const canSignin = !isProcessing && Boolean(name) && Boolean(password);

	const signin = () => {
		setProcessing(true);
		api.signin(name, password)
			.then((u) => {
				writeUser(u);
				location.reload();
			})
			.catch((e) => {
				if (e instanceof ApiError) {
					alert((() => {
						switch (e.errorObject.errorCode) {
							case 'INTERNAL_ERROR': return '内部エラーが発生しました。システム管理者にお問い合わせください。';
							case 'USER_NOT_FOUND': return 'ユーザー名が存在しません。';
							case 'PASSWORD_MISMATCH': return 'パスワードが一致しません。';
							default: return e.errorObject.errorCode;
						}
					})());
				}
			})
			.finally(() => setProcessing(false));
	};
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
						<input type="text" disabled={isProcessing} autoComplete="username" value={name} onChange={e => setName(e.target.value)} />
					</label>
					<label className="input-field">
            パスワード
						<input type="password" disabled={isProcessing} autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
					</label>
					<button className="btn primary fluid mt-5" disabled={!canSignin} onClick={signin}>ログイン</button>
				</div>
			</Card>
		</Container>
	);
};

export default Login;
