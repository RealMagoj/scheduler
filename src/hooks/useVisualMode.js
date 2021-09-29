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
    const newHistory = [...history];
    if (newHistory.length > 1) {
      newHistory.pop();
    };
    setHistory(newHistory);
    setMode(newHistory[newHistory.length - 1]);
  };
  return { mode, transition, back };
};