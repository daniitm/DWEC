export function Ejercicio5() {
    const animals = ['dog', 'cat', 'chicken', 'cow', 'sheep', 'horse'];
  
    return (
      <ul>
        {animals.map((animal, index) => (
          <li key={index}>{animal}</li>
        ))}
      </ul>
    );
  }