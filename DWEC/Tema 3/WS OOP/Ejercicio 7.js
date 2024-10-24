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

//Ejercicio 6:
class Instructor extends Lambdasian {
    constructor({ name, age, location, specialty, favLanguage, catchPhrase }) {
        super({ name, age, location });
        this.specialty = specialty;
        this.favLanguage = favLanguage;
        this.catchPhrase = catchPhrase;
    }

    demo(subject) {
        return `Today we are learning about ${subject}.`;
    }

    grade(student, subject) {
        return `${student.name} receives a perfect score on ${subject}.`;
    }

    adjustGrade(student) {
        const adjustment = Math.floor(Math.random() * 21) - 10; // Random number between -10 and 10
        student.grade += adjustment;
        if (student.grade > 100) student.grade = 100;
        if (student.grade < 0) student.grade = 0;
        return `${student.name}'s grade is now ${student.grade}.`;
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

    graduate() {
        if (this.grade > 70) {
            return `${this.name} is ready to graduate!`;
        } else {
            return `${this.name} needs more grading to increase their score.`;
        }
    }
}

const student = new Student({
    name: "Alice",
    age: 25,
    location: "Los Angeles",
    previousBackground: "Graphic Designer",
    className: "CS132",
    favSubjects: ["HTML", "CSS", "JavaScript"],
    grade: 65
});

const instructor = new Instructor({
    name: "Jane",
    age: 35,
    location: "San Francisco",
    specialty: "Redux",
    favLanguage: "JavaScript",
    catchPhrase: "Don't forget the homies."
});

console.log(student.speak()); 
console.log(student.listSubjects());  
console.log(student.PRAssignment("JavaScript"));  
console.log(student.sprintChallenge("JavaScript"));  
console.log(student.graduate());  

console.log(instructor.adjustGrade(student));  
console.log(student.graduate());  