'use client';

import { ToastNotification } from '@carbon/react';

import styles from './Toast.module.scss';
import { ToastDetail } from '../ToastProvider/ToastProvider';

export const Toast = ({
	toastContext,
}: {
	toastContext: {
		toastDetail: ToastDetail | null;
		setToastDetail: (data: ToastDetail | null) => void;
	};
}) => {
	const { toastDetail, setToastDetail } = toastContext;

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
