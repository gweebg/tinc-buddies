import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {

    const dummy: ConfigSchema = {
        id: 0,
        user: 1000,
        name: "Money Maker",
        description: "This is the best bot config ever!",
        max_transaction_amount: 100,
        min_transaction_amount: 100,
        max_number_of_transactions: 50,
        min_number_of_transactions: 50,
        min_transaction_risc: 120,
        max_transaction_risc: 120,
        lookahead_hours: 1,
        activated: true
    }

    return {
        configs: [dummy]
    };
};