import { withDrag } from "./hoc/with-drag.hoc";
import { DragIndicator } from "@material-ui/icons";

export const BlockDragHandle = withDrag()(DragIndicator);
