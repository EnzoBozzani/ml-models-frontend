'use client';

import { SyntheticEvent, useState } from 'react';
import { FileUploaderDropContainer, FileUploaderItem, FormGroup } from '@carbon/react';

import styles from './PredictImage.module.scss';
import { useToast } from '@/hooks/useToast';
import ErrorMessage from '../ErrorMessage';

export const PredictImage = () => {
	const [file, setFile] = useState<File | null>(null);
	const [error, setError] = useState<string | null>(null);

	const addFile = (e: SyntheticEvent<HTMLElement, Event>, content: { addedFiles: File[] }) => {
		e.preventDefault();

		setError(null);

		const f = content.addedFiles[0];

		console.log(f.size);

		if (f.size > 100_000 * 1024 * 1024) {
			setError(`The file has a size of ~${(f.size / (1024 * 1024)).toFixed(1)}MB. Max file size is 200MB.`);
			return;
		}

		setFile(f);
	};

	return (
		<section className={styles.section}>
			<FormGroup legendText='Upload model'>
				<p className={styles.description}>Max file size is 200mb. Only .pkl files are supported.</p>
				<FileUploaderDropContainer
					id='file'
					accept={['.pkl']}
					labelText='Drag and drop files here or click to upload'
					multiple={false}
					name='file'
					onAddFiles={addFile}
					style={{ border: error ? '1px solid red' : '' }}
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
			<ErrorMessage error={error} />
		</section>
	);
};
