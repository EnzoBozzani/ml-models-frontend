import { Metadata } from 'next';
import { MachineLearningModel } from '@carbon/react/icons';

import DogBreedIdentifierForm from '@/components/DogBreedIdentifierForm';

import styles from '@/styles/DogBreedIdentifierPage.module.scss';

export const metadata: Metadata = {
	title: 'Dog Breed Identifier',
};

const DogBreedIdentifierPage = () => {
	return (
		<main>
			<h1 className={styles.title}>
				Dog breed identifier model <MachineLearningModel className={styles.icon} />
			</h1>
			<DogBreedIdentifierForm />
		</main>
	);
};

export default DogBreedIdentifierPage;
