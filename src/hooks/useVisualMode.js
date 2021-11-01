import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      const newHistory = [...history];
      newHistory.splice([newHistory.length - 1], 1, mode);
      setHistory([...newHistory]);
      return setMode(mode);
    }

    setHistory((prev) => [...prev, mode]);
    return setMode(mode);
  };

  const back = () => {
    if (history.length < 1 || history.length === 1) {
      return mode;
    }
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
    return setMode(newHistory[newHistory.length - 1]);
  };

  return { mode, transition, back };
}
