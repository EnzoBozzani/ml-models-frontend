import TabsSwitcher from '@/components/TabsSwitcher';

const Home = ({ searchParams }: { searchParams: { tab: string | undefined } }) => {
	const { tab } = searchParams;

	const initialTab = !tab || (tab !== 'training' && tab !== 'prediction') ? 'training' : tab;

	return (
		<main>
			<TabsSwitcher tab={initialTab} />
		</main>
	);
};

export default Home;
