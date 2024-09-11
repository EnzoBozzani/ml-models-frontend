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
	const [modelFile, setModelFile] = useState<File[]>([]);
	const [images, setImages] = useState<File[]>([]);
	const [modelError, setModelError] = useState<string | null>(null);
	const [imageError, setImageError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [probabilities, setProbabilities] = useState<[string, number][][]>([]);
	const [imageVisualizationUrls, setImageVisualizationUrls] = useState<string[]>([]);
	const [responseError, setResponseError] = useState<string | null>(null);

	const uploadModel = (e: SyntheticEvent<HTMLElement, Event>, content: { addedFiles: File[] }) => {
		e.preventDefault();

		setModelError(null);

		const f = content.addedFiles[0];

		if (f.size > 200 * MB) {
			setModelError(`The file has a size of ~${(f.size / MB).toFixed(1)}MB. Max file size is 200MB.`);
			return;
		}

		setModelFile([f]);
	};

	const uploadImage = (e: SyntheticEvent<HTMLElement, Event>, content: { addedFiles: File[] }) => {
		e.preventDefault();

		setImageError(null);

		const imgs = content.addedFiles
			.map((f) => {
				if (f.size > 2 * MB) {
					setImageError(
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
				setImageError('Max of 10 images reached!');
				return prev;
			}

			return newImages;
		});
	};

	const submitPrediction = async (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		setLoading(true);

		setProbabilities([]);
		setImageVisualizationUrls([]);
		setImageError(null);
		setModelError(null);
		setResponseError(null);

		if (modelFile.length === 0 || images.length === 0) {
			if (!images) {
				setImageError('Image is required!');
			}
			if (!modelFile) {
				setModelError('Model is required!');
			}
			setLoading(false);
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
		formData.append('model', modelFile[0]);

		const predictionResponse = await fetcher.predict(formData);

		if (predictionResponse.ok) {
			const probs = await predictionResponse.json();

			setProbabilities(probs);
		} else {
			const res = await predictionResponse.json();

			setResponseError(res.error);
			setImageVisualizationUrls([]);
		}

		setImages([]);
		setModelFile([]);

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
						files={modelFile}
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
						files={images}
						id='image'
						legendText='Upload images (up to 10)'
						text='Max file size is 2mb. Only .jpg files are supported'
						upload={uploadImage}
						disabled={loading}
						multiple
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
