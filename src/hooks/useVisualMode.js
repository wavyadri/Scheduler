import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      history.pop();
      setHistory([...history, mode]);
      return setMode(mode);
    }

    setHistory((prev) => [...prev, mode]);
    return setMode(mode);
  };

  const back = () => {
    if (history.length < 1 || history.length === 1) {
      return mode;
    }
    history.pop();
    return setMode(history[history.length - 1]);
  };

  return { mode, transition, back };
}
