'use client';

import { useState } from 'react';
import { ContentSwitcher, Switch } from '@carbon/react';

import ModelTrainer from '../ModelTrainer';
import PredictImage from '../PredictImage';

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
					text='Training'
				/>
				<Switch
					name='two'
					text='Prediction'
				/>
			</ContentSwitcher>
			{selectedContent === 0 ? <ModelTrainer /> : <PredictImage />}
		</>
	);
};
