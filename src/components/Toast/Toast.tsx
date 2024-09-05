'use client';

import { ToastNotification } from '@carbon/react';

import { useToast } from '@/hooks/useToast';

import styles from './Toast.module.scss';

export const Toast = () => {
	const { toastDetail, setToastDetail } = useToast();

	if (!toastDetail) return null;

	return (
		<section className={styles.toastSection}>
			<ToastNotification
				kind={toastDetail.kind}
				title={toastDetail.title}
				subtitle={toastDetail.subtitle}
				hideCloseButton={toastDetail.hideCloseButton === false ? false : true}
				role='status'
				timeout={toastDetail.hideCloseButton === false ? 0 : 4000}
				className={styles.toast}
				onClose={() => setToastDetail(null)}
			/>
		</section>
	);
};
