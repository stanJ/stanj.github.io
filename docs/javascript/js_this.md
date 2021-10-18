# js this

匿名函数的执行环境具有全局性，因此其this对象通常指向window
如果用apply call改变函数执行环境的情况下，this指向其他对象

## 全局环境下(`Global context`)this

### 浏览器环境

 this === window

```javascript
console.log(window === this) // true
```

### 模块环境

- ES6模块
顶层`this`返回`undefined`，在模块顶层使用`this`是毫无意义的
利用顶层`this`等于`undefined`这一点，可以判断代码是否在ES6模块中
- commonjs模块
顶层`this`等于`exports`

### 函数环境(`Function Context`)的`this`

对于函数来说 `this`是运行时绑定的，取决于执行环境，每次调用`this`都可能不一样
浏览器环境下，在全局函数中，`this`等于`window`，而当函数作为某个对象的方法调用时，`this`等于那个对象
es5提供了`bind()`方法来设置函数的`this`，之后无论怎么调用都没法改变
es2015提供了**箭头函数**，它本身没有绑定`this`，而是保留它的外部作用域的`this`

全局函数内部的`this`

```javascript
// 全局函数
function f1() {
  return this;
}
// 浏览器环境:
f1() === window; // true
// node环境:
// globalThis可以获取到当前环境的全局对象，node环境的全局对象相比浏览器环境的window少了很多浏览器相关的接口
f1() === globalThis; // true
// ES6模块内:
// ES6模块自动采用严格模式，所以全局函数内this不再指向全局对象，而是undefined
f1() === undefined
```

严格模式下全局函数的`this`为`undefined`;

```javascript
// 全局函数
function f2() {
  'use strict'; // 严格模式
  return this;
}
f2() === undefined; // true
```

函数可以用`call`和`apply`方法来绑定`this`

```javascript
function add(c, d) {
  return this.a + this.b + c + d;
}
var o = { a: 1, b: 3 };
add.call(o, 5, 7); // 16
add.apply(o, [10, 20]); // 34
```

非严格模式下，调用`call`和`apply`方法，如果传入的`this`值不是对象，会试图把该参数转化为对象
`null`和`undefined`转化为`global object`;
基本类型如`7`、`'foo'`会被转化为相应的包装类型如`new Number(7)`、`new String('foo')`
严格模式下，`call`、`apply`方法传入任何值都不会被转化

```javascript
// 非严格模式
function getType() {
  console.log(typeof this !== 'object' ? typeof this : Object.prototype.toString.call(this));
}
getType.call(7); // [object Number]
getType.call('foo'); // [object String]
getType.call(true); // [object Boolean]
getType.call(undefined); // [object global]
getType.call(null); // [object global]
getType.call({ name: 'stan' }); // [object Object]
// 严格模式下
'use strict';
function getType() { ... } // 同上
getType.call(7); // number
getType.call('foo'); // string
getType.call(true); // boolean
getType.call(undefined); // undefined
getType.call(null); // [object Null]
getType.call({ name: 'stan' }); // [object Object]
```

### 构造函数里的`this`

构造函数里的`this`指的是`new`出来的实例对象

```javascript
function Person(name) {
  this.name = name;
}
var p = new Person('stan');
console.log(p); // { name: 'stan' }
// 如果构造函数返回值为对象，则用该对象作为实例对象，否则返回this的值
function Person(name) {
  this.name = name;
  return {
    aa: 11
  };
}
var p = new Person('stan');
console.log(p);
```

### 类环境(Class context)下的`this`

在类的构造器(`constructor`)里，`this`指的是类的实例

### 派生类(Derived classes)的this

派生类没有初始`this`，调用`super()`方法会创建一个`this`，等同于以下代码

```javascript
this = new Base();
```

### 原型链上的`this`

如果函数在某个对象的原型链上，在该对象上调用此方法时，`this`指的是此对象

```javascript
var o = {f: function() { return this.a + this.b; }};
// 创建一个新对象，使用参数对象作为新对象的__proto__属性
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5
```

### getter setter里的`this`

对象的属性的`getter`、`setter`里的`this`，就是该对象

```javascript
var o = {
  a: 1,
  b: 2,
  c: 3,
  get average() {
    return (this.a + this.b + this.c) / 3;
  },
  set average(val) {
    this.a = this.b = this.c = val;
  }
};
console.log(o.average); // 2
o.average = 4;
console.log(o.a); // 4
console.log(o.b); // 4
console.log(o.c); // 4
Object.defineProperty(o, 'sum', {
  get: function () {
    return this.a + this.b + this.c;
  },
  set: function (val) {
    this.a = this.b = this.c = val / 3;
  },
  enumerable: true,
  configurable: true
});
console.log(o.sum); // 12
o.sum = 15;
console.log(o.a); // 5
console.log(o.b); // 5
console.log(o.c); // 5
```
