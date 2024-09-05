'use client';

import { ReactNode } from 'react';
import { Content, Theme } from '@carbon/react';

export interface ThemeLayoutProps {
	children: ReactNode;
}

export const ThemeLayout = ({ children }: ThemeLayoutProps) => {
	return (
		<Theme theme='g90'>
			<Content style={{ maxWidth: '1440px', margin: '0 auto' }}>{children}</Content>
		</Theme>
	);
};
