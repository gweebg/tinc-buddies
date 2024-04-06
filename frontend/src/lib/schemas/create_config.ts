import { z } from 'zod';

export const createConfigSchema = z.object({
	userID: z.number(),
	name: z.string().min(2).max(50),
	description: z.string().max(200).optional(),

	budget: z.coerce.number().gt(0).optional(),
	maxTransactionAmount: z.coerce.number().gt(0).optional(),
	minTransactionAmount: z.coerce.number().gt(0).optional(),
	maxNumberOfTransactions: z.coerce.number().gt(0).optional(),
	minTransactionRisc: z.coerce.number().gt(0).optional(),
	maxTransactionRisc: z.coerce.number().gt(0).optional(),
	lookaheadHours: z.coerce.number().gt(0).optional()
});

export type ConfigFormSchema = typeof createConfigSchema;
