'use client';

import { ContentSwitcher, Switch } from '@carbon/react';
import { useState } from 'react';

export const HomeContentSwitcher = () => {
	const [selectedContent, setSelectedContent] = useState(0);

	return (
		<>
			<ContentSwitcher
				size='lg'
				selectedIndex={0}
				onChange={(i) => {
					setSelectedContent(i.index || 0);
				}}
			>
				<Switch
					name='one'
					text='Train the model'
				/>
				<Switch
					name='two'
					text='Predict a image'
				/>
			</ContentSwitcher>
			<div>
				{selectedContent === 0 ? <>Conteudo 1</> : selectedContent === 1 ? <>Conteudo 2</> : <>Conteudo 3</>}
			</div>
		</>
	);
};
