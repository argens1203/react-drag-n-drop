import axios from 'axios';
import {NodeDto} from "../../module/node/entities/node.entity";

const baseURL = `${process.env.REACT_APP_API_BASE_URL}/nodes`;
const instance = axios.create({
    baseURL,
});

export class NodeRestful {
    static async createNode(){
        const res = await instance.post('/');
        return new NodeDto(res.data.data);
    }

    static async getNode(id){
        const res = await instance.get(id);
        return new NodeDto(res.data.data);
    }

    static async editNode(id, updates){
        const res = await instance.patch(id, updates);
        return new NodeDto(res.data.data);
    }

    static async deleteNode(id){
        return await instance.delete(id);
    }
}