# dressup
Typescript decorators

``` ts
import { mix, decorate } from "dressup"

test('decorator demo', () => {
	class Base {
		constructor(private num: number = null) {

		}
		baseMethod() {
			return this.num;
		}
	}

	@decorate()
	class Derive extends Base {
		constructor(private inner: Base) {
			super(null);
		}

		deriveMethod() {
			return this.baseMethod() + 2;
		}
	}

	const bob = new Derive(new Base(10));

	expect(bob.baseMethod()).toBe(10);
	expect(bob.deriveMethod()).toBe(12);
})

test('mix demo', () => {
	class Rename {
		rename(name: string) {
			(this as any).name = name;
			return this;
		}
	}

	class Printable {
		print() {
			return (this as any).name;
		}
	}

	class Model extends mix(Rename, Printable) {
		name = "test";
	}

	expect(new Model().print()).toBe("test");
	expect(new Model().rename("hello").print()).toBe("hello");
})
```

