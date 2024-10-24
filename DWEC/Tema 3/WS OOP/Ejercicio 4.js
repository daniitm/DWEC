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

//Ejercicio 4:
class Instructor extends Lambdasian {
    constructor({name, age, location, specialty, favLanguage, catchPhrase}) {
        super({name, age, location});
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

const instructor = new Instructor({
    name: "Jane",
    age: 35,
    location: "San Francisco",
    specialty: "Redux",
    favLanguage: "JavaScript",
    catchPhrase: "Don't forget the homies."
});

console.log(instructor.speak());  
console.log(instructor.demo("JavaScript")); 
console.log(instructor.grade({ name: "John" }, "JavaScript")); 