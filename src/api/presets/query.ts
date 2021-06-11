import axios from 'axios';
import { NodeRaw } from '../../module/node/entities/node-raw.entity';
import {NodeDto} from '../../module/node/entities/node.entity';

const baseURL = `${process.env.REACT_APP_API_BASE_URL}/presets`;
const instance = axios.create({
    baseURL,
});

export class PresetQuery {
    static async getAll() {
        const res = await instance.get(`/`);
        return res.data.data.map((r: NodeRaw) => new NodeDto(r));
    }
}