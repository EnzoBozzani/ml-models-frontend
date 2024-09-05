'use client';

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
import { Logout, Help, MachineLearningModel } from '@carbon/icons-react';

import { useToast } from '@/hooks/useToast';

import styles from './Header.module.scss';

export const HeaderComponent = () => {
	const { toastDetail, setToastDetail } = useToast();

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
								<HeaderMenuItem href='/dog-breed-identifier'>
									<div className={styles.link}>
										<MachineLearningModel size={20} />
										Dog breed identifier model
									</div>
								</HeaderMenuItem>
							</HeaderNavigation>
							<HeaderGlobalBar>
								<HeaderGlobalAction
									aria-label='Help'
									onClick={() =>
										toastDetail
											? setToastDetail(null)
											: setToastDetail({
													kind: 'info',
													title: 'Create your own computer vision model!',
													subtitle:
														'You can easily create your computer vision model just passing the categories you want to classify. Done that, the model will be trained and you can start doing your predictions. You can see how it works by testing our dog breed identifier model!',
													hideCloseButton: false,
											  })
									}
								>
									<Help size={20} />
								</HeaderGlobalAction>
								<HeaderGlobalAction
									aria-label='Logout'
									onClick={signOut}
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
											<div className={styles.link}>
												<MachineLearningModel size={20} />
												Dog breed identifier model
											</div>
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
