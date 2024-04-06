type Sections = Record<string, string>;

interface ConfigSchema {
	id: number;
	user: number;

	name: string;
	description: string;

	max_transaction_amount: number;
	min_transaction_amount: number;
	max_number_of_transactions: number;
	min_number_of_transactions: number;
	min_transaction_risc: number;
	max_transaction_risc: number;
	lookahead_hours: number;

	activated: boolean
}
