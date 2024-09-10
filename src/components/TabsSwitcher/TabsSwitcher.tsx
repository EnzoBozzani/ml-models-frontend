'use client';

import { ComponentType, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TabList, TabPanels, TabPanel, Tab, Tabs } from '@carbon/react';
import { ForecastLightning, ModelReference } from '@carbon/react/icons';

import ModelTrainer from '../ModelTrainer';
import PredictImage from '../PredictImage';

interface TabsSwitcherProps {
	tab: 'training' | 'prediction';
}

export const TabsSwitcher = ({ tab }: TabsSwitcherProps) => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const [tabsSwitcherDisabled, setTabsSwitcherDisabled] = useState<boolean>(false);

	const setSearchParam = (tab: 'training' | 'prediction') => {
		const currentParams = new URLSearchParams(searchParams);

		currentParams.set('tab', tab);
		const newSearchParams = currentParams.toString();

		router.push(`?${newSearchParams}`);
	};

	return (
		<Tabs defaultSelectedIndex={tab === 'training' ? 0 : 1}>
			<TabList
				activation='manual'
				aria-label='List of tabs'
				style={{ margin: '0 auto' }}
			>
				<Tab
					disabled={tabsSwitcherDisabled}
					renderIcon={ModelReference as ComponentType<{ size: number }>}
					onClick={() => {
						setSearchParam('training');
					}}
				>
					Training
				</Tab>
				<Tab
					disabled={tabsSwitcherDisabled}
					renderIcon={ForecastLightning as ComponentType<{ size: number }>}
					onClick={() => {
						setSearchParam('prediction');
					}}
				>
					Prediction
				</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<ModelTrainer setTabsSwitcherDisabled={setTabsSwitcherDisabled} />
				</TabPanel>
				<TabPanel>
					<PredictImage setTabsSwitcherDisabled={setTabsSwitcherDisabled} />
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};
