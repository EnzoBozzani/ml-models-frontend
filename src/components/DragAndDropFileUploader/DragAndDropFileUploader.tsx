import { SyntheticEvent } from 'react';
import { FormGroup, FileUploaderDropContainer, FileUploaderItem } from '@carbon/react';

import ErrorMessage from '@/components/ErrorMessage';

import styles from './DragAndDropFileUploader.module.scss';

export interface DragAndDropFileUploaderProps {
	upload: (e: SyntheticEvent<HTMLElement, Event>, content: { addedFiles: File[] }) => void;
	error: string | null;
	file: File | null;
	id: string;
	accept: string[];
	legendText: string;
	text: string;
}

export const DragAndDropFileUploader = ({
	upload,
	error,
	file,
	id,
	text,
	accept,
	legendText,
}: DragAndDropFileUploaderProps) => {
	return (
		<>
			<FormGroup legendText={legendText}>
				<p className={styles.description}>{text}</p>
				<FileUploaderDropContainer
					id={id}
					accept={accept}
					labelText='Drag and drop file here or click to upload'
					multiple={false}
					name={id}
					onAddFiles={upload}
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
		</>
	);
};
