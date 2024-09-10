'use client';

import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/react/icons';
import { signIn } from 'next-auth/react';

import styles from '@/styles/SignIn.module.scss';

const SignInPage = () => {
	return (
		<section className={styles.wrapper}>
			<div className={styles.title}>Welcome to ML Models!</div>
			<div className={styles.btnWrapper}>
				<Button
					renderIcon={ArrowRight}
					onClick={() => signIn('appid')}
				>
					Sign in
				</Button>
			</div>
		</section>
	);
};

export default SignInPage;
