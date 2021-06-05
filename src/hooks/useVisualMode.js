import {useState} from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);
  const transition = (newMode, replace = false) => {
    const newHistory = history;
    setMode(newMode);
    if (replace) {
      newHistory.pop();
    }
    setHistory([...newHistory, newMode]);
  }
  const back = () => {
    const newHistory = history;
    if (newHistory.length > 1) {
      newHistory.pop();
    }
    setMode(newHistory.pop());
  }
  return { mode, transition, back }
}