import {RelationshipType} from "./relationship-type.enum";

type IdLookup = {
    [id: string]: {
        [id: string]: boolean
    }
}

type OrderLookup = {
    [id: string]: string[];
};

type TypeLookup = {
    [id: string]: RelationshipType;
};

type RelationshipKeyedIdLookup = {
    [relationship: string]: IdLookup;
}

type RelationshipKeyedOrderLookup = {
    [relationship: string]: OrderLookup;
}

const initialTypeLookup: TypeLookup = {}
const initialLookup: RelationshipKeyedIdLookup = {};
const initialOrderLookup: RelationshipKeyedOrderLookup = {};

export const initialRelationshipState = {
    type: initialTypeLookup,
    order: initialOrderLookup,
    lookup: initialLookup,
    reverseLookup: initialLookup,
};

export type RelationshipSliceType = typeof initialRelationshipState;
