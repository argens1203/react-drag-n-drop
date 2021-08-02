import {withDrag} from "../hoc/with-set-id-on-drag.hoc";
import {DragIndicator} from "@material-ui/icons";

export const BlockDragHandle = withDrag()(DragIndicator);
