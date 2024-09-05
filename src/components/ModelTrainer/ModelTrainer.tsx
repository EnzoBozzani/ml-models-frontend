'use client';

import { Form, FormGroup, TextInput } from '@carbon/react';
import styles from './ModelTrainer.module.scss';
import { useRef, useState } from 'react';
import { Close } from '@carbon/icons-react';

export const ModelTrainer = () => {
	const [categories, setCategories] = useState<string[]>(['Category 1', 'Category 2', 'Category 3']);
	const [invalidText, setInvalidText] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	return (
		<section className={styles.section}>
			<Form
				onSubmit={(ev) => {
					ev.preventDefault();
				}}
				aria-label='Model trainer form'
			>
				<FormGroup legendText='Add categories'>
					<TextInput
						ref={inputRef}
						id='category'
						labelText='Category'
						placeholder='(e.g. Golden retriever)'
						invalid={!!invalidText}
						invalidText={invalidText}
						className={styles.categoryInput}
						onKeyDown={(ev) => {
							if (ev.key === 'Enter') {
								setInvalidText(null);

								setCategories((prev) => {
									if (inputRef.current) {
										console.log(inputRef.current.value);
										if (
											inputRef.current.value === '' ||
											inputRef.current.value.length > 20 ||
											inputRef.current.value.length < 3
										) {
											setInvalidText('Category must have between 3 and 20 characters!');
											return prev;
										}

										const categories = [...prev];
										categories.push(inputRef.current.value);
										inputRef.current.value = '';
										return categories;
									}

									return prev;
								});
							}
						}}
					/>
					<div className={styles.categories}>
						{categories.map((category, i) => (
							<span
								className={styles.category}
								key={`${category}-${i}`}
								onClick={() => {
									setCategories((prev) => {
										const categories = [...prev];
										categories.splice(i, 1);
										return categories;
									});
								}}
							>
								{category}
								<Close size={20} />
							</span>
						))}
					</div>
				</FormGroup>
			</Form>
		</section>
	);
};
