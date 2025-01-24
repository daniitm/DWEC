const AnimalItem = ({ animal }) => (
    <div style={{ border: '1px solid black', margin: '5px', padding: '10px' }}>
      <h3>{animal}</h3>
      <p>This is a {animal}</p>
    </div>
  );
  
  export function Ejercicio6() {
    const animals = ['dog', 'cat', 'chicken', 'cow', 'sheep', 'horse'];
  
    return (
      <div>
        <h2>Animal List</h2>
        {animals.map((animal, index) => (
          <AnimalItem key={index} animal={animal} />
        ))}
      </div>
    );
  }