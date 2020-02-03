import { Decorator, Mixin } from "./index"

test('a', () => {
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
			super();
			Decorator.use(this, eater, sleeper);
		}
	}

	let can: Partial<CanEat> = new Person(null, null);



	const bob = new Person(new CanEat(), new CanSleep("test"));
	bob.sleep();

	class Person2 extends Mixin(CanEat, CanSleep) {

	}

	const john = new Person2();
	john.sleep();


	let jake = Decorator.decorate({}, new CanEat("jake"), new CanSleep("jake"));
	jake.sleep();
	jake.eat();
})