import React, { useEffect, useState } from "react";

const UseEffect = () => {
  const [count, setCount] = useState(0);
  const addCount = () => {
    setCount(count + 1);
  };

  
  useEffect(() => {
    console.log(count);
  });

  return (
    <>
      <h2>{count}</h2>
      <button onClick={addCount}>Click</button>
    </>
  );
};

export default UseEffect;
