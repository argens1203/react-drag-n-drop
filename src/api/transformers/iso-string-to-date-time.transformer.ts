import {DateTime} from "luxon";
import {toTransformer} from "../hoc/to-transformer.hoc";

export function isoStringToDateTime() {
    return toTransformer((s: string) => {
        DateTime.fromISO(s);
    });
}