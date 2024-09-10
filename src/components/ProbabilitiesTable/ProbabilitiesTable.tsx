import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@carbon/react';

import styles from './ProbabilitiesTable.module.scss';

interface ProbabilitiesTableProps {
	probabilities: [string, number][];
}

export const ProbabilitiesTable = ({ probabilities }: ProbabilitiesTableProps) => {
	const headers = ['Category', 'Probability'];
	return (
		<div className={styles.tableContainer}>
			<h3>Most likely categories</h3>
			<Table
				size='lg'
				useZebraStyles={false}
				aria-label='probabilities table'
				className={styles.table}
			>
				<TableHead>
					<TableRow>
						{headers.map((header) => (
							<TableHeader key={header}>{header}</TableHeader>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{probabilities.map((row) => (
						<TableRow key={`${probabilities[0]} ${probabilities[1]}`}>
							<TableCell>{row[0]}</TableCell>
							<TableCell>{(row[1] * 100).toFixed(2)}%</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
