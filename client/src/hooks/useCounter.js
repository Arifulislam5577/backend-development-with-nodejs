import { useState } from "react";

const useCounter = ({
  higherLimit = 10,
  lowerLimit = 0,
  initial = 0,
  steps = 1,
}) => {
  const [count, setCount] = useState(initial);

  const handleInc = () => {
    if (count < higherLimit) {
      setCount((prev) => prev + steps);
    }
  };

  const handleDec = () => {
    if (count > lowerLimit) {
      setCount((prev) => prev - steps);
    }
  };

  return { count, handleDec, handleInc };
};

export default useCounter;
