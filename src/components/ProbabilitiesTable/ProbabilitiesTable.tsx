import Image from 'next/image';
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell, Tag } from '@carbon/react';

import styles from './ProbabilitiesTable.module.scss';
import { Dispatch, SetStateAction } from 'react';
import { Close } from '@carbon/react/icons';

interface ProbabilitiesTableProps {
	probabilities: [string, number][][];
	imageVisualizationUrls: string[];
	setProbabilities: Dispatch<SetStateAction<[string, number][][]>>;
	setImageVisualizationUrls: Dispatch<SetStateAction<string[]>>;
}

export const ProbabilitiesTable = ({
	probabilities,
	imageVisualizationUrls,
	setProbabilities,
	setImageVisualizationUrls,
}: ProbabilitiesTableProps) => {
	const headers = ['Category', 'Probability'];
	return (
		<div className={styles.tables}>
			<Tag
				onClick={() => {
					setProbabilities([]);
					setImageVisualizationUrls([]);
				}}
				className={styles.cleanOutputsTag}
			>
				<div>
					<span>Clean all outputs</span> <Close size={16} />
				</div>
			</Tag>
			{probabilities.map((probs, i) => (
				<>
					<h3>
						Most likely categories for
						<Image
							src={imageVisualizationUrls[i]}
							alt='uploaded image'
							width={50}
							height={50}
							className={styles.image}
						/>
					</h3>
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
							{probs.map((row) => (
								<TableRow key={`${probs[0]} ${probs[1]}`}>
									<TableCell>{row[0]}</TableCell>
									<TableCell>{(row[1] * 100).toFixed(2)}%</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</>
			))}
		</div>
	);
};
