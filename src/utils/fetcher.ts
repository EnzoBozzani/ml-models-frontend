const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const LOCAL_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetcher = {
	async searchImages(categories: string[]) {
		return fetch(`${SERVER_URL}/search-images`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(categories),
		});
	},

	async trainModel(pathId: string) {
		return fetch(`${SERVER_URL}/train-model/${pathId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	},

	async predict(formData: FormData) {
		return fetch(`${SERVER_URL}/predict`, {
			method: 'POST',
			body: formData,
		});
	},

	async predictDogImages(formData: FormData) {
		return fetch(`${SERVER_URL}/dog-breed-identifier`, {
			method: 'POST',
			body: formData,
		});
	},
};
