import { Client } from '@ibm-generative-ai/node-sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Client({ endpoint: 'https://bam-api.res.ibm.com', apiKey: process.env.BAM_API_KEY });

export async function GET(req: NextRequest) {
	const text = await client.text.generation.create({
		model_id: 'ibm/granite-13b-chat-v2',
		input: 'List 50 dog breeds, using comma as separator. Pattern to be followed: breed1, breed2, breed3, ...',
		parameters: {
			decoding_method: 'greedy',
			repetition_penalty: 1.05,
			stop_sequences: ['<|endoftext|>'],
			include_stop_sequence: false,
			min_new_tokens: 1,
			max_new_tokens: 1024,
		},
	});

	console.log(text);

	// console.log(await client.model.list({ limit: 10, offset: 0 }));
	return NextResponse.json({ test: 'oi' }, { status: 200 });
}
