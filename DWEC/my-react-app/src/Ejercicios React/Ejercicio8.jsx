const jokes = [
    {
      id: 1,
      setup: "What's the best thing about a Boolean?",
      punchline: "Even if you're wrong, you're only off by a bit"
    },
    {
      id: 2,
      setup: "Why do programmers wear glasses?",
      punchline: "Because they need to C#"
    }
  ];
  
  const JokeCard = ({ setup, punchline }) => (
    <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
      <h3>{setup}</h3>
      <p>{punchline}</p>
    </div>
  );
  
  export function Ejercicio8() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Programmer Jokes</h2>
        {jokes.map((joke) => (
          <JokeCard key={joke.id} setup={joke.setup} punchline={joke.punchline} />
        ))}
      </div>
    );
  }