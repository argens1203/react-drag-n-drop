import axios from 'axios';
const baseURL = `${process.env.REACT_APP_API_BASE_URL}/relationships`;
const instance = axios.create({
    baseURL,
});

export class NodeAction {
    static async setParent({from, to, target}){
        return await instance.post(`/belongs/from/${from}/to/${to}`);
    }
}