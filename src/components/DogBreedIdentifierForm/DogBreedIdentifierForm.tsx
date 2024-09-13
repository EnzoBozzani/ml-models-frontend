'use client';

import { FormEvent, SyntheticEvent, useState } from 'react';
import DragAndDropFileUploader from '../DragAndDropFileUploader';
import styles from './DogBreedIdentifierForm.module.scss';
import { Button, Form, InlineNotification, Loading } from '@carbon/react';
import { fetcher } from '@/utils/fetcher';
import ProbabilitiesTable from '../ProbabilitiesTable';

const MB = 1_000_000;

interface DogBreedIdentifierFormProps {}

export const DogBreedIdentifierForm = ({}: DogBreedIdentifierFormProps) => {
	const [error, setError] = useState<string | null>(null);
	const [images, setImages] = useState<File[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [probabilities, setProbabilities] = useState<[string, number][][]>([]);
	const [imageVisualizationUrls, setImageVisualizationUrls] = useState<string[]>([]);
	const [responseError, setResponseError] = useState<string | null>(null);

	const uploadImage = (ev: SyntheticEvent<HTMLElement, Event>, content: { addedFiles: File[] }) => {
		ev.preventDefault();

		setError(null);

		const imgs = content.addedFiles
			.map((f) => {
				if (f.size > 2 * MB) {
					setError(
						`${f.name.substring(0, 20)} has a size of ~${(f.size / MB).toFixed(1)}MB. Max file size is 2MB.`
					);
					return;
				}

				return f;
			})
			.filter((img) => !!img);

		setImages((prev) => {
			const newImages = [...prev, ...imgs];

			if (prev.length + imgs.length > 10) {
				setError('Max of 10 images reached!');
				return prev;
			}

			return newImages;
		});
	};

	const predict = async (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		setLoading(true);

		setProbabilities([]);
		setImageVisualizationUrls([]);
		setError(null);
		setResponseError(null);

		if (!images || images.length === 0) {
			setError('Image is required!');
			return;
		}

		const formData = new FormData();

		images.forEach((image) => {
			formData.append('images', image);
			setImageVisualizationUrls((prev) => {
				const newList = [...prev];

				newList.push(URL.createObjectURL(image));

				return newList;
			});
		});

		const predictionResponse = await fetcher.predictDogImages(formData);

		if (predictionResponse.ok) {
			const probs = await predictionResponse.json();

			setProbabilities(probs);
		} else {
			const res = await predictionResponse.json();

			setResponseError(res.error);
			setImageVisualizationUrls([]);
		}

		setImages([]);

		setLoading(false);
	};

	return (
		<section className={styles.section}>
			<Form
				onSubmit={predict}
				className={styles.form}
			>
				<DragAndDropFileUploader
					id='images'
					accept={['image/jpeg']}
					error={error}
					files={images}
					legendText='Upload images'
					text='Max file size is 2mb. Only .jpg files are supported'
					upload={uploadImage}
					disabled={loading}
					multiple
				/>
				<Button type='submit'>Classify</Button>
			</Form>
			{responseError && (
				<InlineNotification
					kind='error'
					title={responseError}
					className={styles.errorNotification}
				/>
			)}
			{probabilities.length !== 0 && imageVisualizationUrls.length !== 0 && (
				<ProbabilitiesTable
					imageVisualizationUrls={imageVisualizationUrls}
					probabilities={probabilities}
					setImageVisualizationUrls={setImageVisualizationUrls}
					setProbabilities={setProbabilities}
				/>
			)}
			<Loading
				active={loading}
				withOverlay
			/>
		</section>
	);
};
