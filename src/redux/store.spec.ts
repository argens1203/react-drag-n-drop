import {reducer} from "./store";

describe('root store', () => {
    it('should initialise', () => {
        let state = reducer(undefined, {});
        expect(state).toBeDefined();
    })
})