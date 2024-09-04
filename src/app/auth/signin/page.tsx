'use client';

import { Button } from '@carbon/react';
import { signIn } from 'next-auth/react';

const SignInPage = () => {
	return (
		<main style={{ marginTop: 0 }}>
			<Button onClick={() => signIn('appid')}>Entrar</Button>
		</main>
	);
};

export default SignInPage;
