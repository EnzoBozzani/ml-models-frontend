'use client';

import {
	Header,
	HeaderContainer,
	HeaderMenu,
	HeaderMenuButton,
	HeaderMenuItem,
	HeaderName,
	HeaderNavigation,
	HeaderSideNavItems,
	SideNav,
	SideNavItems,
	SkipToContent,
} from '@carbon/react';

export const HeaderComponent = () => {
	return (
		<HeaderContainer
			render={({
				isSideNavExpanded,
				onClickSideNavExpand,
			}: {
				isSideNavExpanded: boolean;
				onClickSideNavExpand: () => void;
			}) => (
				<>
					<Header aria-label='IBM Platform Name'>
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
	);
};
