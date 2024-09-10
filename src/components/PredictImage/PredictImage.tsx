'use client';

import { Dispatch, FormEvent, SetStateAction, SyntheticEvent, useEffect, useState } from 'react';
import { Button, Form, InlineNotification } from '@carbon/react';
import { ForecastLightning } from '@carbon/react/icons';

import DragAndDropFileUploader from '@/components/DragAndDropFileUploader';

import styles from './PredictImage.module.scss';
import { fetcher } from '@/utils/fetcher';

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

		setImageError(null);
		setModelError(null);

		if (!image || !modelFile) {
			if (!image) {
				setImageError('Image is required!');
			}
			if (!modelFile) {
				setModelError('Model is required!');
			}
			return;
		}

		const formData = new FormData();

		formData.append('image', image);
		formData.append('model', modelFile);

		const predictionResponse = await fetcher.predict(formData);

		if (predictionResponse.ok) {
			const oi = await predictionResponse.json();

			alert(JSON.stringify(oi));
		} else {
			alert('Não ');
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
		</section>
	);
};
