import {BackendNode, BackendNodeMeta} from "./types/node.type";
import {DateTime} from "luxon";
import {generate} from 'short-uuid';

const getMeta = () => new BackendNodeMeta({updatedAt: DateTime.now(), createdAt: DateTime.now(), isEnabled: true, id: generate()});

export async function getAllNodes(): Promise<BackendNode[]> {
    const titles = ['red', 'blue', 'yellow', 'green', 'black'];
    return titles.map((title) => {
        const meta = getMeta();
        return new BackendNode({title, meta, priority: Math.random()})
    })
}

export async function getNodeByTitle(title: string): Promise<BackendNode | undefined> {
    return undefined;
}

export async function createNode(): Promise<BackendNode> {
    return new BackendNode({meta: getMeta()});
}

export async function getNode(id: string): Promise<BackendNode> {
    const node = new BackendNode({meta: getMeta()});
    node.meta!.id = id;
    return node;
}


export async function editNode(id: string, updates: Partial<BackendNode>) {
    const node = new BackendNode({meta: getMeta()});
    node.meta!.id = id;
    return node;
}


export async function removeNode(id: string) {
    return;
}

