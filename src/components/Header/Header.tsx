'use client';

import { useContext } from 'react';
import { signOut } from 'next-auth/react';
import {
	Header,
	HeaderContainer,
	HeaderGlobalAction,
	HeaderGlobalBar,
	HeaderMenuButton,
	HeaderMenuItem,
	HeaderName,
	HeaderNavigation,
	HeaderSideNavItems,
	SideNav,
	SideNavItems,
	SkipToContent,
	Theme,
} from '@carbon/react';
import { Logout, Help } from '@carbon/icons-react';
import { ToastContext } from '../ToastProvider/ToastProvider';

export const HeaderComponent = () => {
	const { setToastDetail } = useContext(ToastContext);

	return (
		<Theme theme='g100'>
			<HeaderContainer
				render={({
					isSideNavExpanded,
					onClickSideNavExpand,
				}: {
					isSideNavExpanded: boolean;
					onClickSideNavExpand: () => void;
				}) => (
					<>
						<Header aria-label='IBM ML Models'>
							<SkipToContent />
							<HeaderMenuButton
								aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
								onClick={onClickSideNavExpand}
								isActive={isSideNavExpanded}
								aria-expanded={isSideNavExpanded}
							/>
							<HeaderName
								href='/'
								prefix='IBM'
							>
								ML Models
							</HeaderName>
							<HeaderNavigation aria-label='IBM ML Models'>
								<HeaderMenuItem href='/dog-breed-identifier'>Dog breed identifier model</HeaderMenuItem>
							</HeaderNavigation>
							<HeaderGlobalBar>
								<HeaderGlobalAction
									aria-label='Ajuda'
									onClick={() =>
										setToastDetail({
											kind: 'info',
											title: 'Oi',
											subtitle: 'OI',
											hideCloseButton: false,
										})
									}
								>
									<Help size={20} />
								</HeaderGlobalAction>
								<HeaderGlobalAction
									aria-label='Sair'
									onClick={() => signOut()}
								>
									<Logout size={20} />
								</HeaderGlobalAction>
							</HeaderGlobalBar>
							<SideNav
								aria-label='Side navigation'
								expanded={isSideNavExpanded}
								isPersistent={false}
								onSideNavBlur={onClickSideNavExpand}
							>
								<SideNavItems>
									<HeaderSideNavItems>
										<HeaderMenuItem href='/dog-breed-identifier'>
											Dog breed identifier model
										</HeaderMenuItem>
									</HeaderSideNavItems>
								</SideNavItems>
							</SideNav>
						</Header>
					</>
				)}
			/>
		</Theme>
	);
};
