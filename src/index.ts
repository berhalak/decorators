export type Constructor<T> = new (...args: any[]) => T;


function Decorator<T>(t1: Constructor<T>): Constructor<T>;
function Decorator<T1, T2>(t1: Constructor<T1>, t2: Constructor<T2>): Constructor<T1 & T2>;
function Decorator<T1, T2, T3>(t1: Constructor<T1>, t2: Constructor<T2>, t3: Constructor<T3>): Constructor<T1 & T2 & T3>;
function Decorator<T1, T2, T3, T4>(t1: Constructor<T1>, t2: Constructor<T2>, t3: Constructor<T3>, t4: Constructor<T4>): Constructor<T1 & T2 & T3 & T4>;
function Decorator(...types: Constructor<any>[]): Constructor<any> {
	class sample {
		private $targets: any[] | null;
		constructor(...args: any[]) {
			this.$targets = args.length ? args : null;
		}
	}

	const anySample = sample as any;

	types.forEach((base, baseIndex) => {
		const baseName = base.name;
		const innerName = baseName.substr(0, 1).toLowerCase() + baseName.substr(1);

		Object.getOwnPropertyNames(base.prototype).forEach(methodName => {
			anySample.prototype[methodName] = function () {
				let inner: any = undefined;
				if (this.$targets) {
					inner = this.$targets[baseIndex];
				}
				if (inner === undefined) {
					inner = this[innerName];
				}
				if (inner === undefined) {
					inner = this['_' + innerName]
				}
				return inner[methodName](...arguments);
			}
		});
	});

	return sample as any;
}

Decorator.use = function (self: any, ...any: any[]) {
	self.$targets = any;
}

function decorate<T, T1>(self: T, t1: T1): T & T1
function decorate<T, T1, T2>(self: T, t1: T1, t2: T2): T & T1 & T2
function decorate<T>(self: T, ...objs: any[]): any {
	// overcome single argument
	const decor = (Decorator as any)(...objs.map(x => x.constructor as any));

	// find lowest prototype
	// the one that is before object
	let lowest = self as any;
	let proto: any = null;
	do {
		if (proto)
			lowest = proto;
		proto = Object.getPrototypeOf(lowest);
	} while (proto != Object.prototype);
	Object.setPrototypeOf(lowest, decor.prototype);

	Decorator.use(self, ...objs);

	return self as any;
}

Decorator.decorate = decorate;

export {
	Decorator
}



function Mixin<T>(t1: Constructor<T>): Constructor<T>;
function Mixin<T1, T2>(t1: Constructor<T1>, t2: Constructor<T2>): Constructor<T1 & T2>;
function Mixin<T1, T2, T3>(t1: Constructor<T1>, t2: Constructor<T2>, t3: Constructor<T3>): Constructor<T1 & T2 & T3>;
function Mixin<T1, T2, T3, T4>(t1: Constructor<T1>, t2: Constructor<T2>, t3: Constructor<T3>, t4: Constructor<T4>): Constructor<T1 & T2 & T3 & T4>;
function Mixin(...types: Constructor<any>[]): Constructor<any> {
	class sample {
		constructor() {

		}
	};
	types.forEach(base => {
		Object.getOwnPropertyNames(base.prototype).forEach(name => {
			Object.defineProperty(sample.prototype, name, Object.getOwnPropertyDescriptor(base.prototype, name) as any);
		});
	});

	return sample as any;
}

export {
	Mixin
}