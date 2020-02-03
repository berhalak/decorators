# decorators
Typescript decorators


```ts
class CanEat {
    constructor(private eaterName: string = null) {

        }
    eat() {
            console.log(this.eaterName + " eating");
        }
    }

class CanSleep {
    constructor(private sleeperName: string = null) {

    }
    sleep() {
        console.log(this.sleeperName + " sleeping");
    }
}

class Person extends Decorator(CanEat, CanSleep) {
    constructor(eater: CanEat, sleeper: CanSleep) {
        super(eater, sleeper);
    }
}
const bob = new Person(new CanEat("bob"), new CanSleep("bob"));
bob.sleep();
bob.eat();
```
