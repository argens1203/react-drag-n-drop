import React from "react";

export function Square(props) {
  const {side = 100, style = {}} = props;
  const _style = {height: side, width: side, ...style};
  return (
    <div style={_style}/>
  )
}