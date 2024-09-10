'use client';

import { ComponentType } from 'react';
import { TabList, TabPanels, TabPanel, Tab, Tabs } from '@carbon/react';
import { ForecastLightning, ModelReference } from '@carbon/react/icons';

import ModelTrainer from '../ModelTrainer';
import PredictImage from '../PredictImage';

export const TabsSwitcher = () => {
	return (
		<Tabs>
			<TabList
				activation='manual'
				aria-label='List of tabs'
				style={{ margin: '0 auto' }}
			>
				<Tab renderIcon={ModelReference as ComponentType<{ size: number }>}>Training</Tab>
				<Tab renderIcon={ForecastLightning as ComponentType<{ size: number }>}>Prediction</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<ModelTrainer />
				</TabPanel>
				<TabPanel>
					<PredictImage />
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};
