import { Metadata } from 'next';

import DogBreedIdentifierForm from '@/components/DogBreedIdentifierForm';

export const metadata: Metadata = {
	title: 'Dog Breed Identifier',
};

const DogBreedIdentifierPage = () => {
	return (
		<main>
			<DogBreedIdentifierForm />
		</main>
	);
};

export default DogBreedIdentifierPage;
