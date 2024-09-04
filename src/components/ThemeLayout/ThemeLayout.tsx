'use client';

import { ReactNode } from 'react';
import { Theme } from '@carbon/react';

export interface ThemeLayoutProps {
	children: ReactNode;
}

export const ThemeLayout = ({ children }: ThemeLayoutProps) => {
	return <Theme theme='g90'>{children}</Theme>;
};
