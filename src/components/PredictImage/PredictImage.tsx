'use client';

import { Dispatch, FormEvent, SetStateAction, SyntheticEvent, useEffect, useState } from 'react';
import { Button, Form, InlineNotification, Loading } from '@carbon/react';
import { ForecastLightning } from '@carbon/react/icons';

import { fetcher } from '@/utils/fetcher';
import DragAndDropFileUploader from '@/components/DragAndDropFileUploader';
import ProbabilitiesTable from '@/components/ProbabilitiesTable';

import styles from './PredictImage.module.scss';

const MB = 1_000_000;

interface PredictImageProps {
	setTabsSwitcherDisabled: Dispatch<SetStateAction<boolean>>;
}

export const PredictImage = ({ setTabsSwitcherDisabled }: PredictImageProps) => {
	const [modelFile, setModelFile] = useState<File | null>(null);
	const [image, setImage] = useState<File | null>(null);
	const [modelError, setModelError] = useState<string | null>(null);
	const [imageError, setImageError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [probabilities, setProbabilities] = useState<[string, number][]>([]);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [responseError, setResponseError] = useState<string | null>(null);

	const uploadModel = (e: SyntheticEvent<HTMLElement, Event>, content: { addedFiles: File[] }) => {
		e.preventDefault();

		setModelError(null);

		const f = content.addedFiles[0];

		if (f.size > 200 * MB) {
			setModelError(`The file has a size of ~${(f.size / MB).toFixed(1)}MB. Max file size is 200MB.`);
			return;
		}

		setModelFile(f);
	};

	const uploadImage = (e: SyntheticEvent<HTMLElement, Event>, content: { addedFiles: File[] }) => {
		e.preventDefault();

		setImageError(null);

		const f = content.addedFiles[0];

		if (f.size > 2 * MB) {
			setImageError(`The file has a size of ~${(f.size / MB).toFixed(1)}MB. Max file size is 2MB.`);
			return;
		}

		setImage(f);
	};

	const submitPrediction = async (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		setLoading(true);

		setProbabilities([]);
		setImageError(null);
		setModelError(null);
		setResponseError(null);
		setPreviewUrl(null);

		if (!image || !modelFile) {
			if (!image) {
				setImageError('Image is required!');
			}
			if (!modelFile) {
				setModelError('Model is required!');
			}
			setLoading(false);
			return;
		}

		const formData = new FormData();

		formData.append('image', image);
		formData.append('model', modelFile);

		const predictionResponse = await fetcher.predict(formData);

		if (predictionResponse.ok) {
			const probs = await predictionResponse.json();

			setPreviewUrl(URL.createObjectURL(image));
			setProbabilities(probs);
		} else {
			setResponseError('Something went wrong while predicting your images...');
		}

		setImage(null);
		setModelFile(null);

		setLoading(false);
	};

	useEffect(() => {
		setTabsSwitcherDisabled(loading);
	}, [loading, setTabsSwitcherDisabled]);

	return (
		<section className={styles.section}>
			<InlineNotification
				kind='info'
				title='Upload a model to do a prediction'
				subtitle='Upload the model you downloaded on the "Training" tab and the image you want to predict. The model will predict any image you upload into some of the categories you informed.'
				hideCloseButton
				className={styles.notification}
			/>
			<Form
				onSubmit={submitPrediction}
				className={styles.form}
			>
				<div className={styles.dragAndDrop}>
					<DragAndDropFileUploader
						file={modelFile}
						error={modelError}
						upload={uploadModel}
						text='Max file size is 200mb. Only .pkl files are supported'
						accept={['.pkl']}
						id='modelFile'
						legendText='Upload model'
						disabled={loading}
					/>
				</div>
				<div className={styles.dragAndDrop}>
					<DragAndDropFileUploader
						accept={['image/jpeg']}
						error={imageError}
						file={image}
						id='image'
						legendText='Upload image'
						text='Max file size is 2mb. Only .jpg files are supported'
						upload={uploadImage}
						disabled={loading}
					/>
				</div>
				<Button
					className={styles.submitBtn}
					renderIcon={ForecastLightning}
					type='submit'
				>
					Predict
				</Button>
			</Form>
			{responseError && (
				<InlineNotification
					kind='error'
					title={responseError}
					className={styles.errorNotification}
				/>
			)}
			{probabilities.length !== 0 && previewUrl && (
				<ProbabilitiesTable
					previewUrl={previewUrl}
					probabilities={probabilities}
					setPreviewUrl={setPreviewUrl}
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
