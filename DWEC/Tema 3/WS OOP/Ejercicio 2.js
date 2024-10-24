class Car {
    constructor(model, milesPerGallon) {
        this.model = model;
        this.milesPerGallon = milesPerGallon;
        this.tank = 0;
        this.odometer = 0;
    }

    fill(gallons) {
        this.tank += gallons;
    }

    drive(distance) {
        const maxDistance = this.tank * this.milesPerGallon;
        if (distance <= maxDistance) {
            this.odometer += distance;
            this.tank -= distance / this.milesPerGallon;
        } else {
            this.odometer += maxDistance;
            this.tank = 0;
            return `I ran out of fuel at ${this.odometer} miles!`;
        }
    }

    toString() {
        return `${this.model}, ${this.milesPerGallon} MPG`;
    }
}

const myCar = new Car("Toyota", 25);
console.log(myCar.toString()); 
myCar.fill(10);
console.log(myCar.tank); 
myCar.drive(100);
console.log(myCar.odometer); 
console.log(myCar.tank);  
console.log(myCar.drive(300)); 
console.log(myCar.odometer); 
console.log(myCar.tank);  