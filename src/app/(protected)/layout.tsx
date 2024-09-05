import Header from '@/components/Header';
import ToastProvider from '@/components/ToastProvider';

export default function ProtectedLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ToastProvider>
			<Header />
			{children}
		</ToastProvider>
	);
}
