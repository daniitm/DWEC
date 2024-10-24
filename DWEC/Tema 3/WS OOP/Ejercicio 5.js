//Ejercicio 3:
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

//Ejercicio 5:
class Student extends Lambdasian {
    constructor({ name, age, location, previousBackground, className, favSubjects }) {
        super({ name, age, location });
        this.previousBackground = previousBackground;
        this.className = className;
        this.favSubjects = favSubjects;
    }

    listSubjects() {
        return `Loving ${this.favSubjects.join(', ')}!`;
    }

    PRAssignment(subject) {
        return `${this.name} has submitted a PR for ${subject}.`;
    }

    sprintChallenge(subject) {
        return `${this.name} has begun sprint challenge on ${subject}.`;
    }
}

const student = new Student({
    name: "Alice",
    age: 25,
    location: "Los Angeles",
    previousBackground: "Graphic Designer",
    className: "CS132",
    favSubjects: ["HTML", "CSS", "JavaScript"]
});

console.log(student.speak()); 
console.log(student.listSubjects()); 
console.log(student.PRAssignment("JavaScript")); 
console.log(student.sprintChallenge("JavaScript"));