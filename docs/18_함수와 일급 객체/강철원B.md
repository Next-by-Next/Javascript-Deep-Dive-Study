**TIL(Today I learn) 기록일** : 2023.11.25

# 18장 함수와 일급 객체

## 🥎 1. 일급 객체

다음 조건을 만족하면 일급 객체입니다.    
1. 무명의 리터럴로 생성할 수 있다.
2. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
3. 함수의 매개변수에 전달할 수 있다.
4. 함수의 반환값으로 사용할 수 있다.

>자바스크립트의 함수는 다음 예제와 같이 위의 조건을 모두 만족하므로 일급 객체입니다.
```js
// 1. 함수는 무명의 리터럴로 생성할 수 있다.
// 2. 함수는 변수에 저장할 수 있다.
// 런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.
const increase = function (num) {
  return ++num;
};

const decrease = function (num) {
  return --num;
};

// 2. 함수는 객체에 저장할 수 있다.
const auxs = { increase, decrease };

// 3. 함수의 매개변수에게 전달할 수 있다.
// 4. 함수의 반환값으로 사용할 수 있다.
function makeCounter(aux) {
  let num = 0;

  return function () {
    num = aux(num);
    return num;
  };
}

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
const increaser = makeCounter(auxs.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
const decreaser = makeCounter(auxs.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

❗️ 함수 객체와 일반 객체와의 차이    
- 일반 객체는 호출할 수 없지만 함수 객체는 호출할 수 있습니다.
- 함수 객체는 일반 객체에는 없는 함수 고유의 프로퍼티를 소유합니다.

## 🥎 2. 함수 객체의 프로퍼티

### 1) arguments 프로퍼티

>함수가 호출될 때 전달된 인수들의 정보를 담고 있는 유사 배열 객체입니다. `arguments`객체는 함수 내부에서만 접근할 수 있습니다.
```js
function sum() {
  let result = 0;
  for (let i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```

자바스크립트는 매개변수와 인수의 개수가 일치하는지 확인하지 않습니다. 따라서 함수 호출시 매개변수 개수만큼 인수를 전달하지 않아도 에러가 발생하지 않습니다.    
선언된 매개변수의 개수보다 인수를 적게 전달한경우 `undefined`으로 초기화된 상태로 유지됩니다. 초과된 인수는 무시됩니다. (`arguments` 객체에는 보관됩니다)
```js
function multiply(x, y) {
  console.log(arguments);
  return x * y;
}

console.log(multiply());        // NaN
console.log(multiply(1));       // NaN
console.log(multiply(1, 2));    // 2
console.log(multiply(1, 2, 3)); // 2
```

`arguments`객체는 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용합니다.   
```js
function sum() {
  let res = 0;

  // arguments 객체는 length 프로퍼티가 있는 유사 배열 객체이므로 for 문으로 순회할 수 있다.
  for (let i = 0; i < arguments.length; i++) {
    res += arguments[i];
  }

  return res;
}

console.log(sum());        // 0
console.log(sum(1, 2));    // 3
console.log(sum(1, 2, 3)); // 6
```


❗️ 유사 배열 객체와 이터러블    
ES6에 도입된 이터레이션 프로토콜을 준수하면 순회 가능한 자료구조인 이터러블이 됩니다.    
이터러블의 개념이 없었던 ES6에서 `arguments`객체는 유사 배열 객체로 구분되어있습니다.    
ES6부터 `arguments`객체는 유사 배열 객체이면서 동시에 이터러블 `iterable`입니다.    
`iterable`객체는 `for...in`, `for...of`문을 사용할 수 있습니다.   
```js
function foo(){
    for(let a in arguments){
        console.log(a);
    }
}
foo(1,2,3);
// 1
// 2
// 3
```

유사 배열 객체는 배열이 아니기 때문에 배열 메서드를 사용할 수 없습니다.  배열 메서드를 사용하기 위해서는 `Function.prototype.call`, `Function.prototype.apply`를 사용해 간접 호출해야합니다.   
```js
function sum() {
  // arguments 객체를 배열로 변환
  const array = Array.prototype.slice.call(arguments);
  // 배열로 만들었기 떄문에 reduce 메서드를 사용할 수 있다.
  return array.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}

console.log(sum(1, 2));          // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
```

es6에서는 Rest문법을 활용해 쉽게 해결할 수 있습니다.   
```js
// ES6 Rest parameter
function sum(...args) {
  return args.reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2));          // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
```

> Rest 파라미터(Rest parameter)
>Rest파라미터는 `spread연산자(...)`를 사용해서 함수의 매개변수를 작성한 형태입니다.
>Rest파라미터를 사용하면 함수의 매개변수로 넘어오는 인자를 배열로 전달받을 수 있습니다.
```js
function foo(...rest) {
  console.log(Array.isArray(rest)); // true
  console.log(rest); // [ 1, 2, 3, 4, 5 ]
}
foo(1, 2, 3, 4, 5);
```

### 2) caller 프로퍼티 

함수 객체의 내장 프로퍼티로서, 해당 함수를 호출한 함수를 가리킵니다. 만약, 호출한 함수가 없다면 `null`을 가리킵니다.   

```js
function outerFunc() {
  innerFunc();
}

function innerFunc() {
  console.log(innerFunc.caller); // outerFunc
}

function myFunc() {
  console.log(myFunc.caller); // null
}

outerFunc();
myFunc();
```

### 3) length 프로퍼티

함수가 정의할 때 명시적으로 지정한 매개변수의 개수를 반환합니다. 기본 매개변수는 length 프로퍼티에 포함되지 않습니다.    


```js
function minus(a, b) {
  return a - b;
}


function add(a, b = 0) {
  return a + b;
}

console.log(minus.length);  // 출력 결과: 2
console.log(add.length);  // 출력 결과: 1
```

### 4) name 프로퍼티

함수의 이름을 나타냅니다.

```js
function myFunction() {
  // ...
}

console.log(myFunction.name); // "myFunction"
```

### 5) proto 접근자 프로퍼티

모든 객체는 [[Prototype]]이라는 내부 슬롯을 갖습니다.   
[[Prototype]] 내부 슬롯은 상속을 구현하는 프로토타입 객체를 가리킵니다.   

`__proto__`프로퍼티는 [[Prototype]] 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자프로퍼티입니다.    
내부슬롯에 직접 접근할 수 없어 간접적으로 접근하기 위한 프로퍼티입니다.    

```js
const obj = { a: 1 };

// 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype이다.
console.log(obj.__proto__ === Object.prototype); // true

// 객체 리터럴 방식으로 생성한 객체는 프로토타입 객체인 Object.prototype의 프로퍼티를 상속받는다.
// hasOwnProperty 메서드는 Object.prototype의 메서드다.
console.log(obj.hasOwnProperty('a'));         // true
console.log(obj.hasOwnProperty('__proto__')); // false
```

프로토타입 객체 그 자체를 가리키는 속성입니다. 예를 들어, 어떤 객체의 `__proto__`를 통해 그 객체의 프로토타입에 접근하거나 그 프로토타입을 다른 것으로 바꿀 수 있습니다.

하지만 `__proto__`를 직접 사용하는 것은 바람직하지 않습니다. 이는 자바스크립트에서 공식적으로 지원하는 기능이 아니라, 일부 브라우저에서만 지원하는 기능입니다. 또한 이를 통해 프로토타입을 변경하는 것은 코드를 이해하거나 예측하는 데 어려움을 줄 수 있습니다.    
대신 `Object.getPrototypeOf`또는 `Object.setPrototypeOf`등의 메소드를 사용하여 객체의 프로토타입에 안전하게 접근하거나 변경하는 것이 좋습니다.    

### 6) prototype 프로퍼티     

`prototype`프로퍼티는 생성자 함수로 호출할 수 있는 함수 객체, 즉 `constructor`만이 소유하는 프로퍼티입니다.    
일반 객체와 생성자 함수로 호출할 수 없는 `non-constructor`에는 `prototype`프로퍼티가 없습니다.


```js
// 함수 객체는 prototype 프로퍼티를 소유한다.
(function () {}).hasOwnProperty('prototype'); // -> true

function Person(){}
Person.hasOwnProperty('prototype');  // -> true


// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
var p1 = new Person();
p1.hasOwnProperty('prototype');  // -> false

({}).hasOwnProperty('prototype'); // -> false
```

 다른 객체들이 공통으로 사용할 수 있는 속성이나 메소드를 가진 객체를 기리킵니다. 이 `prototype`프로퍼티는 그 함수를 이용해 새로운 객체를 만들 때 중요한 역할을 합니다.   
 즉, `new`키워드를 사용해서 함수로부터 객체를 생성하면, 그 객체는 자동으로 그 함수의 `prototype`프로퍼티를 참조합니다.   

```js
function Dog(name) {
  this.name = name;
}

Dog.prototype.bark = function() {
  console.log(`${this.name} says woof!`);
}

let dog1 = new Dog('Max');
let dog2 = new Dog('Bella');

dog1.bark();  // "Max says woof!"
dog2.bark();  // "Bella says woof!"
```
