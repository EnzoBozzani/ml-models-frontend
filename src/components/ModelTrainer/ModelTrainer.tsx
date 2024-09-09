'use client';

import { useRef, useState, useTransition } from 'react';
import { Button, Form, FormGroup, InlineNotification, TextInput } from '@carbon/react';
import { Close, Download, ModelReference } from '@carbon/react/icons';

import { useToast } from '@/hooks/useToast';

import { addCategory, trainModel } from './modelTrainer.utils';
import styles from './ModelTrainer.module.scss';

export const ModelTrainer = () => {
	const { setToastDetail } = useToast();

	const [categories, setCategories] = useState<string[]>([]);
	const [invalidText, setInvalidText] = useState<string | null>(null);
	const [messages, setMessages] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const inputRef = useRef<HTMLInputElement | null>(null);

	return (
		<section className={styles.section}>
			<InlineNotification
				kind='info'
				title='Inform the categories to train the model'
				subtitle='All you need to do is inform some categories (e.g. dog breeds). When clicking "Train model", pictures of each of these categories will be searched and used to train the model. At last, a .pkl fike will be generated containing the trained model, which you can use in the "Prediction" tab to see the model prediction for an specific image!'
				hideCloseButton
				className={styles.notification}
			/>
			<FormGroup legendText='Model training'>
				<TextInput
					ref={inputRef}
					id='category'
					labelText='Category (press ENTER to add)'
					placeholder='(e.g. Golden retriever)'
					invalid={!!invalidText}
					invalidText={invalidText}
					className={styles.categoryInput}
					onKeyDownCapture={(ev) => addCategory(ev, setInvalidText, setCategories, inputRef)}
					disabled={loading}
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
			<Button
				onClick={async () => {
					await trainModel({
						categories,
						setInvalidText,
						setToastDetail,
						setMessages,
						setLoading,
					});
				}}
				renderIcon={ModelReference}
				type='submit'
				size='lg'
				className={styles.submitBtn}
				disabled={loading}
			>
				Train model
			</Button>
			<div className={styles.output}>
				{messages.map((message, i) => (
					<InlineNotification
						key={message + i}
						title={message}
						kind='success'
						subtitle=''
						hideCloseButton
						className={styles.notification}
					/>
				))}
			</div>
		</section>
	);
};
