import { useState } from 'react';
import styled from 'styled-components';

import { REGEX_NAME } from '@/const';
import * as api from '@/client/api';
import { writeUser } from '@/client/storage';

const SetupPageRoot = styled.div`
  min-height: 100vh;
  background-color: var(--primary-6);
  background-image: radial-gradient(var(--white-50) 3%, transparent 0);
  background-size: 50px 50px;
  position: relative;
`;

const Card = styled.div`
	width: 100%;
	max-width: 500px;
	p {
		color: var(--tone-14);
	}
`;

export const SetupPage: React.FC = () => {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [nameValidationText, setNameValidationText] = useState('');
	const [passwordValidationText, setPasswordValidationText] = useState('');
	const [password2ValidationText, setPassword2ValidationText] = useState('');
	const [isProcessing, setProcessing] = useState(false);

	const isNameSuitable = REGEX_NAME.test(name);
	const isPasswordMatch = Boolean(password) && password === password2;
	const canSignup = !isProcessing && isNameSuitable && isPasswordMatch;

	const validateName = () => {
		setNameValidationText(
			!name ? '入力してください' : 
				!isNameSuitable ? 'ユーザー名は3文字以上の半角英数字と、_（アンダースコア）のみ使用できます' : 
					''
		);
	};

	const validatePassword = () => {
		setPasswordValidationText(password ? '' : '入力してください');
	};

	const validatePassword2 = () => {
		setPassword2ValidationText(
			!password2 ? '入力してください' :
				password !== password2 ? 'パスワードが一致しません' : '');
	};

	const signup = () => {
		setProcessing(true);
		api.signup(name, password)
			.then((u) => {
				writeUser(u);
				location.reload();
			})
			.catch((e) => alert(e))
			.finally(() => setProcessing(false));
	};

	return (
		<SetupPageRoot className="flex f-center f-middle">
			<Card className="card shadow-2 fade up">
				<div className="body">
					<h1 className="mb-1">PaperStockへようこそ！</h1>
					<p>サーバー構築、おめでとうございます！<br/>最後に、管理者アカウントを作成して、開始しましょう！</p>
					<div className="mt-2">
						<label className="input-field">
							管理者のユーザー名
							<input type="text" autoComplete="username" disabled={isProcessing} value={name} onChange={e => setName(e.target.value)} onBlur={validateName} />
							{nameValidationText && <span className="text-75 text-red text-normal"><i className="fas fa-circle-exclamation" /> {nameValidationText}</span>}
						</label>
						<label className="input-field">
							管理者パスワード
							<input type="password" autoComplete="new-password" disabled={isProcessing} value={password} onChange={e => setPassword(e.target.value)} onBlur={validatePassword} />
							{passwordValidationText && <span className="text-75 text-red text-normal"><i className="fas fa-circle-exclamation" /> {passwordValidationText}</span>}
						</label>
						<label className="input-field">
							確認のため、パスワードを再入力してください
							<input type="password" disabled={isProcessing} value={password2} onChange={e => setPassword2(e.target.value)} onBlur={validatePassword2} />
							{password2ValidationText && <span className="text-75 text-red text-normal"><i className="fas fa-circle-exclamation" /> {password2ValidationText}</span>}
						</label>
						<button className="btn primary fluid mt-5" disabled={!canSignup} onClick={signup}>アカウントを作成する</button>
					</div>
				</div>
			</Card>
		</SetupPageRoot>
	);
};