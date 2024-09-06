import styles from './ErrorMessage.module.scss';

export interface ErrorMessageProps {
	error: string | null;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
	if (!error) return null;

	return <p className={styles.error}>{error}</p>;
};
