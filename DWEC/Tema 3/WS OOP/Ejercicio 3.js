class Lambdasian {
    constructor({name, age, location}) { //Solo hay un objeto en todo el constructor, se hace poniendo corchetes dentro de los parentesis
        this.name = name;
        this.age = age;
        this.location = location;
    }

    speak() {
        return `Hello my name is ${this.name}, I am from ${this.location}.`;
    }
}

const person = new Lambdasian({ name: "John", age: 30, location: "New York" });
console.log(person.speak()); 