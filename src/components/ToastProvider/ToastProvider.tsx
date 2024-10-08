'use client';

import { createContext, ReactNode, useState } from 'react';

import Toast from '@/components/Toast';

export type ToastDetail = {
	kind: 'error' | 'info' | 'info-square' | 'success' | 'warning' | 'warning-alt' | undefined;
	title: string;
	subtitle: string;
	hideCloseButton?: boolean;
};

interface ToastContextType {
	toastDetail: ToastDetail | null;
	setToastDetail: (data: ToastDetail | null) => void;
}

export const ToastContext = createContext<ToastContextType>({ toastDetail: null, setToastDetail: () => {} });

export const ToastProvider = ({ children }: { children: ReactNode }) => {
	const [toastDetail, setToastDetail] = useState<ToastDetail | null>(null);

	return (
		<ToastContext.Provider value={{ toastDetail, setToastDetail }}>
			{children}
			<Toast toastContext={{ toastDetail, setToastDetail }} />
		</ToastContext.Provider>
	);
};
