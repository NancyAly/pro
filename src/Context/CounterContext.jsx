import { useState } from "react";
import { createContext } from "react";

export const CounterContext=createContext(0)

  export default function CounterContextProvider(props){
const [counter,setCounter]=useState(0);
return <CounterContext.Provider value={{ counter,setCounter}}>
    {props.children}
</CounterContext.Provider>;

 }