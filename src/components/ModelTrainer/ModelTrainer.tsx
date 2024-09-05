'use client';

import { useRef, useState } from 'react';
import { Button, Form, FormGroup, TextInput } from '@carbon/react';
import { Close, ModelReference } from '@carbon/icons-react';

import { addCategory, trainModel } from './modelTrainer.utils';
import styles from './ModelTrainer.module.scss';
import { useToast } from '@/hooks/useToast';

export const ModelTrainer = () => {
	const { setToastDetail } = useToast();

	const [categories, setCategories] = useState<string[]>([]);
	const [invalidText, setInvalidText] = useState<string | null>(null);
	const [messages, setMessages] = useState<string[]>([]);

	const inputRef = useRef<HTMLInputElement | null>(null);

	return (
		<section className={styles.section}>
			<FormGroup legendText='Add categories'>
				<TextInput
					ref={inputRef}
					id='category'
					labelText='Category (press ENTER to add)'
					placeholder='(e.g. Golden retriever)'
					invalid={!!invalidText}
					invalidText={invalidText}
					className={styles.categoryInput}
					onKeyDownCapture={(ev) => addCategory(ev, setInvalidText, setCategories, inputRef)}
				/>
				<div className={styles.categories}>
					<span className={styles.categoryTitle}>Categories ({categories.length}):</span>
					{categories.map((category, i) => (
						<span
							className={styles.category}
							key={`${category}-${i}`}
						>
							{category}
							<Close
								size={20}
								onClick={() => {
									setCategories((prev) => {
										const categories = [...prev];
										categories.splice(i, 1);
										return categories;
									});
								}}
							/>
						</span>
					))}
				</div>
			</FormGroup>
			<Form
				action={() => trainModel(categories, setInvalidText, setToastDetail, setMessages)}
				aria-label='Model trainer form'
			>
				<Button
					renderIcon={ModelReference}
					type='submit'
					size='lg'
					className={styles.submitBtn}
				>
					Train model
				</Button>
			</Form>
			{messages.map((message) => (
				<>{message}</>
			))}
		</section>
	);
};
