import { Dispatch, KeyboardEvent, RefObject, SetStateAction } from 'react';
import { ToastDetail } from '../ToastProvider/ToastProvider';

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

export const trainModel = async (
	categories: string[],
	setInvalidText: Dispatch<SetStateAction<string | null>>,
	setToastDetail: (data: ToastDetail | null) => void,
	setMessages: Dispatch<SetStateAction<string[]>>
) => {
	if (categories.length < 2) {
		setInvalidText('At least 2 categories are needed!');
		return;
	}

	try {
		const res1 = await fetch('http://localhost:8000/search-images', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(categories),
		});

		if (!res1.body) {
			setToastDetail({
				kind: 'error',
				title: 'Something went wrong!',
				subtitle: 'Something went wrong while training the model...',
			});
			return;
		}

		const reader = res1.body.getReader();
		const decoder = new TextDecoder('utf-8');
		let done = false;

		while (!done) {
			const { value, done: readerDone } = await reader.read();
			done = readerDone;

			const chunk = decoder.decode(value, { stream: true });

			setMessages((prev) => {
				const newMessages = [...prev];

				newMessages.push(chunk);

				return newMessages;
			});
		}

		const res2 = await fetch('http://localhost:8000/train-model', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			// body: JSON.stringify(categories), must send the last chunk received by the previous request
		});

		if (!res2.body) {
			setToastDetail({
				kind: 'error',
				title: 'Something went wrong!',
				subtitle: 'Something went wrong while training the model...',
			});
			return;
		}

		done = false;

		while (!done) {
			const { value, done: readerDone } = await reader.read();
			done = readerDone;

			const chunk = decoder.decode(value, { stream: true });

			console.log(chunk);
		}
	} catch (error) {
		setToastDetail({
			kind: 'error',
			title: 'Something went wrong!',
			subtitle: 'Something went wrong while training the model...',
		});
	}
};
