'use client';

import { createContext, ReactNode, useState } from 'react';

import Toast from '@/components/Toast';

type ToastDetail = {
	kind: 'error' | 'info' | 'info-square' | 'success' | 'warning' | 'warning-alt' | undefined;
	title: string;
	subtitle: string;
	hideCloseButton?: boolean;
};

export interface ToastContext {
	toastDetail: ToastDetail | null;
	setToastDetail: (data: ToastDetail | null) => void;
}

export const ToastContext = createContext<ToastContext>({ toastDetail: null, setToastDetail: () => {} });

export const ToastProvider = ({ children }: { children: ReactNode }) => {
	const [toastDetail, setToastDetail] = useState<ToastDetail | null>({
		kind: 'info',
		title: 'Create your own computer vision model!',
		subtitle:
			'You can easily create your computer vision model just passing the categories you want to classify. Done that, the model will be trained and you can start doing your predictions. You can see how it works by testing our dog breed identifier model!',
		hideCloseButton: false,
	});

	return (
		<ToastContext.Provider value={{ toastDetail, setToastDetail }}>
			{children}
			<Toast />
		</ToastContext.Provider>
	);
};
