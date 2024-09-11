import { SyntheticEvent } from 'react';
import { FormGroup, FileUploaderDropContainer, FileUploaderItem } from '@carbon/react';

import ErrorMessage from '@/components/ErrorMessage';

import styles from './DragAndDropFileUploader.module.scss';

interface DragAndDropFileUploaderProps {
	upload: (e: SyntheticEvent<HTMLElement, Event>, content: { addedFiles: File[] }) => void;
	error: string | null;
	files: File[];
	id: string;
	accept: string[];
	legendText: string;
	text: string;
	disabled?: boolean;
	multiple?: boolean;
}

export const DragAndDropFileUploader = ({
	upload,
	error,
	files,
	id,
	text,
	accept,
	legendText,
	disabled = false,
	multiple = false,
}: DragAndDropFileUploaderProps) => {
	return (
		<>
			<FormGroup legendText={legendText}>
				<p className={styles.description}>{text}</p>
				<FileUploaderDropContainer
					id={id}
					accept={accept}
					labelText='Drag and drop file here or click to upload'
					multiple={multiple}
					name={id}
					onAddFiles={upload}
					style={{ border: error ? '1px dotted red' : '' }}
					className={styles.input}
					disabled={disabled}
				/>
			</FormGroup>
			{files.length !== 0 &&
				files.map((file) => (
					<FileUploaderItem
						key={`${file.name}${file.size}`}
						name={`${file.name} (${(file.size / 1_000_000).toFixed(1)} MB)`}
						status={'complete'}
						errorBody={'Something went wrong!'}
					/>
				))}
			<ErrorMessage error={error} />
		</>
	);
};
