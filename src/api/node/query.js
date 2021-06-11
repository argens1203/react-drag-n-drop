import axios from 'axios';
import {NodeDto} from "../../module/node/entities/node.entity";

const baseURL = `${process.env.REACT_APP_API_BASE_URL}/nodes`;
const instance = axios.create({
    baseURL,
});

export class NodeQuery {
    static async getByTitle(title) {
        const res = await instance.get(`/title/${title}`);
        return res.data.data.map(r => new NodeDto(r));
    }

    static async getAll() {
        const res = await instance.get(`/`);
        return res.data.data.map(r => new NodeDto(r));
    }
}