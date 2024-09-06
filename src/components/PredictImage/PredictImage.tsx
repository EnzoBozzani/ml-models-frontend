'use client';

import { SyntheticEvent, useState } from 'react';
import {
	Button,
	FileUploaderDropContainer,
	FileUploaderItem,
	Form,
	FormGroup,
	InlineNotification,
} from '@carbon/react';
import { ForecastLightning } from '@carbon/react/icons';

import ErrorMessage from '@/components/ErrorMessage';

import styles from './PredictImage.module.scss';

const MB = 1024 * 1024;

export const PredictImage = () => {
	const [file, setFile] = useState<File | null>(null);
	const [modelError, setModelError] = useState<string | null>(null);
	const [imageError, setImageError] = useState<string | null>(null);

	const uploadModel = (e: SyntheticEvent<HTMLElement, Event>, content: { addedFiles: File[] }) => {
		e.preventDefault();

		setModelError(null);

		const f = content.addedFiles[0];

		if (f.size > 200_000 * MB) {
			setModelError(`The file has a size of ~${(f.size / MB).toFixed(1)}MB. Max file size is 200MB.`);
			return;
		}

		setFile(f);
	};

	const uploadImage = (e: SyntheticEvent<HTMLElement, Event>, content: { addedFiles: File[] }) => {
		e.preventDefault();

		setImageError(null);

		const f = content.addedFiles[0];

		if (f.size > 1 * MB) {
			setImageError(`The file has a size of ~${(f.size / MB).toFixed(1)}MB. Max file size is 1MB.`);
			return;
		}

		setFile(f);
	};

	return (
		<section className={styles.section}>
			<InlineNotification
				kind='info'
				title='Upload a model to do a prediction'
				subtitle='Upload the model you downloaded on the "Training" tab and the image you want to predict. The model will predict any image you upload into some of the categories you informed.'
				hideCloseButton
				className={styles.notification}
			/>
			<Form>
				<div
					style={{ paddingInline: 0 }}
					className='cds--grid'
				>
					<div className='cds--row'>
						<div className='cds--col'>
							<FormGroup legendText='Upload model'>
								<p className={styles.description}>
									Max file size is 200mb. Only .pkl files are supported.
								</p>
								<FileUploaderDropContainer
									id='file'
									accept={['.pkl']}
									labelText='Drag and drop file here or click to upload'
									multiple={false}
									name='file'
									onAddFiles={uploadModel}
									style={{ border: modelError ? '1px solid red' : '' }}
									className={styles.input}
								/>
							</FormGroup>
							{file && (
								<FileUploaderItem
									name={file.name}
									status={'complete'}
									errorBody={'Something went wrong!'}
								/>
							)}
							<ErrorMessage error={modelError} />
						</div>
						<div className='cds--col'>
							<FormGroup legendText='Upload image'>
								<p className={styles.description}>
									Max file size is 1mb. Only .jpg files are supported.
								</p>
								<FileUploaderDropContainer
									id='image'
									accept={['.jpg']}
									labelText='Drag and drop file here or click to upload'
									multiple={false}
									name='image'
									onAddFiles={uploadImage}
									style={{ border: imageError ? '1px solid red' : '' }}
									className={styles.input}
								/>
							</FormGroup>
							{file && (
								<FileUploaderItem
									name={file.name}
									status={'complete'}
									errorBody={'Something went wrong!'}
								/>
							)}
							<ErrorMessage error={imageError} />
						</div>
					</div>
				</div>
				<Button
					className={styles.submitBtn}
					renderIcon={ForecastLightning}
				>
					Predict
				</Button>
			</Form>
		</section>
	);
};
