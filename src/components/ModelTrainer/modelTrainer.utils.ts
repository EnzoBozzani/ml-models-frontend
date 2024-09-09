import { Dispatch, KeyboardEvent, RefObject, SetStateAction } from 'react';

import { fetcher } from '@/utils/fetcher';
import { ToastDetail } from '@/components/ToastProvider/ToastProvider';

export const addCategory = (
	ev: KeyboardEvent<HTMLInputElement>,
	setInvalidText: Dispatch<SetStateAction<string | null>>,
	setCategories: Dispatch<SetStateAction<string[]>>,
	inputRef: RefObject<HTMLInputElement>
) => {
	if (ev.key === 'Enter') {
		setInvalidText(null);

		setCategories((prev) => {
			if (inputRef.current) {
				const category = inputRef.current.value;

				if (category === '' || category.length > 20 || category.length < 3) {
					setInvalidText('Category must have between 3 and 20 characters!');
					return prev;
				}

				if (prev.length >= 50) {
					setInvalidText('The maximum number of allowed categories is 50');
					return prev;
				}

				const categories = [...prev];

				categories.push(category);

				return categories;
			}

			return prev;
		});

		setTimeout(() => {
			inputRef.current && (inputRef.current.value = '');
		}, 10);
	}
};

interface TrainModelArguments {
	categories: string[];
	setInvalidText: Dispatch<SetStateAction<string | null>>;
	setToastDetail: (data: ToastDetail | null) => void;
	setMessages: Dispatch<SetStateAction<string[]>>;
}

export const trainModel = async ({ categories, setInvalidText, setToastDetail, setMessages }: TrainModelArguments) => {
	setMessages([]);
	setInvalidText(null);

	if (categories.length < 2) {
		setInvalidText('At least 2 categories are needed!');
		return;
	}

	try {
		const imagesSearchResponse = await fetcher.searchImages(categories);

		if (!imagesSearchResponse.body) {
			setToastDetail({
				kind: 'error',
				title: 'Something went wrong!',
				subtitle: 'Something went wrong while training the model...',
			});
			setMessages([]);
			return;
		}

		const reader = imagesSearchResponse.body.getReader();
		const decoder = new TextDecoder('utf-8');
		let done = false;

		let lastChunk = '';
		let pathId = '';

		while (!done) {
			const { value, done: readerDone } = await reader.read();
			done = readerDone;

			const chunk = decoder.decode(value, { stream: true });

			if (done) {
				pathId = lastChunk;
			}

			setMessages((prev) => {
				const newMessages = [...prev];

				newMessages.push(chunk);

				return newMessages;
			});

			lastChunk = chunk;
		}

		setMessages((prev) => {
			const messages = [...prev];

			messages.pop();
			messages.pop();

			return messages;
		});

		const modelTrainingResponse = await fetcher.trainModel(pathId);

		if (!modelTrainingResponse.ok) {
			setToastDetail({
				kind: 'error',
				title: 'Something went wrong!',
				subtitle: 'Something went wrong while training the model...',
			});
			return;
		}

		const blob = await modelTrainingResponse.blob();
		const url = window.URL.createObjectURL(blob);

		const link = document.createElement('a');

		link.href = url;
		link.setAttribute('download', 'model.pkl');
		document.body.appendChild(link);
		link.click();

		link.parentNode!.removeChild(link);
		window.URL.revokeObjectURL(url);

		setMessages(['Model downloaded successfully! Proceed to Prediction tab']);
	} catch (error) {
		setToastDetail({
			kind: 'error',
			title: 'Something went wrong!',
			subtitle: 'Something went wrong while training the model...',
		});
		setMessages([]);
	}
};
