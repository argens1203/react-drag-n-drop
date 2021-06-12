export class Block {
    constructor(input: Partial<Block> = {}) {
        const {id} = input;
        if (!id) {
            throw Error("id is required");
        }
        Object.assign(this, input);
    }

    id!: string;
}