import { z } from 'zod';

export const createConfigSchema = z.object({
	name: z.string().min(2).max(50),
	description: z.string().max(200).optional(),
	budget: z.coerce.number().gt(0).optional(),
	max_transaction_amount: z.coerce.number().gt(0).optional(),
	min_transaction_amount: z.coerce.number().gt(0).optional(),
	max_number_of_transactions: z.coerce.number().gt(0).optional(),
	min_transaction_risc: z.coerce.number().gt(0).optional(),
	max_transaction_risc: z.coerce.number().gt(0).optional(),
	lookahead_hours: z.coerce.number().gt(0).optional()
});

export type ConfigFormSchema = typeof createConfigSchema;
