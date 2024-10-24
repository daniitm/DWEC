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
}
class ProjectManager extends Instructor {
    constructor({ name, age, location, specialty, favLanguage, catchPhrase, gradClassName, favInstructor }) {
        super({ name, age, location, specialty, favLanguage, catchPhrase });
        this.gradClassName = gradClassName;
        this.favInstructor = favInstructor;
    }

    standUp(channel) {
        return `${this.name} announces to ${channel}, @channel standy times!`;
    }

    debugsCode(student, subject) {
        return `${this.name} debugs ${student.name}'s code on ${subject}.`;
    }
}

const pm = new ProjectManager({
    name: "Alex",
    age: 40,
    location: "Chicago",
    specialty: "Full-Stack Web Development",
    favLanguage: "JavaScript",
    catchPhrase: "Keep pushing forward!",
    gradClassName: "CS1",
    favInstructor: "Sean"
});

console.log(pm.speak()); 
console.log(pm.demo("React")); 
console.log(pm.grade({ name: "John" }, "React")); 
console.log(pm.standUp("webpt5")); 
console.log(pm.debugsCode({ name: "John" }, "React"));