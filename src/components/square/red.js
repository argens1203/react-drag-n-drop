import React from "react";
import {Square} from "./base";

export function RedSquare(props) {
  return (
    <Square style={{backgroundColor: 'red'}} {...props}/>
  )
}