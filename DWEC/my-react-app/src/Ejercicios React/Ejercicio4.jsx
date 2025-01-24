import React, { useState } from 'react';

export function Ejercicio4() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    };

return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>Click me</button>
    </div>
)};