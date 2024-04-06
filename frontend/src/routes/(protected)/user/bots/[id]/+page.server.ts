import type { PageServerLoad } from './$types';


const fetchConfig = async (id: number) => {

    const dummy: ConfigSchema = {
        id: id,
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

    return dummy
}

export const load: PageServerLoad = async ({ params }) => {

    const id: number = Number(params.id)

    return {
        config: await fetchConfig(id)
    };
};