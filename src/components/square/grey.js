import React from "react";
import {Square} from "./base";

export function GreySquare(props) {
  return (
    <Square style={{backgroundColor: 'grey'}} {...props}/>
  )
}