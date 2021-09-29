import {useState} from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (!replace) {
      setHistory(prev => ([...prev, newMode]));
    };
  };
  const back = () => {
    console.log(history);
    if (history.length > 1) {
      history.pop();
    };
    setMode(history[history.length - 1]);
  };
  return { mode, transition, back };
};