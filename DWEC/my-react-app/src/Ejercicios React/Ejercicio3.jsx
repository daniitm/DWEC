
function Button({ onClick, children }) {
    return (
      <button onClick={onClick}>{children}</button>
    );
  }
  
  export function Ejercicio3() {
    const handleClick = (buttonNumber) => {
      alert(`Button ${buttonNumber} clicked!`);
    };
  
    return (
      <div>
        <Button onClick={() => handleClick(1)}>Button 1</Button>
        <Button onClick={() => handleClick(2)}>Button 2</Button>
        <Button onClick={() => handleClick(3)}>Button 3</Button>
      </div>
    );
  }