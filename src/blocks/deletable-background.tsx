import React from "react";
import { Delete } from "@material-ui/icons";

type Props = {
  passedThreshold: boolean;
};

export function DeletableBackground(props: Props) {
  const { passedThreshold } = props;
  const maxed = "2em";
  const size = passedThreshold ? maxed : "1em";
  return (
    <div
      style={{
        backgroundColor: "red",
        height: "100%",
        width: "100%",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: -1,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}
    >
      <div style={{ marginRight: maxed }}>
        <Delete
          style={{ height: size, width: size, color: "white", zIndex: 0 }}
        />
      </div>
    </div>
  );
}
