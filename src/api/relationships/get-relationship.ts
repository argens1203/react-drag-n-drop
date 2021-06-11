import axios from "axios";
import {RelationshipDto} from "../../module/relationships/entities/relationship.entity";
import {RelationshipRaw} from "../../module/relationships/entities/relationship-raw.entity";

const baseURL = `${process.env.REACT_APP_API_BASE_URL}/relationships`;
const instance = axios.create({
    baseURL,
});

export class RelationshipApi {
    static async getRelationships(from?: string, to?: string) {
        let url = `${baseURL}/belongs`;
        if (from) {
            url = url + `/from/${from}`;
        }
        if (to) {
            url = url + `/to/${to}`;
        }
        const res = await instance.get(url);
        return res.data.data.map((r: RelationshipRaw) => new RelationshipDto(r));
    }
}