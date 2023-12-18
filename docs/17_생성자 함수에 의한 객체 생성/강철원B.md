**TIL(Today I learn) 기록일** : 2023.11.23

# 17장. 생성자 함수에 의한 객체 생성

```
10장 '객체 리터럴'에서 객체 리터럴에 의한 객체 생성 방식을 살펴보았습니다. 
객체 리터럴에 의한 객체 생성 방식은 가장 일반적이고 간단한 객체 생성 방식입니다.
객체는 객체 리터럴 이외에도 다양한 방법으로 생성할 수 있습니다.
17장에서는 다양한 객체 생성 방식 중에서 생성자 함수를 사용하여 객체를 생성하는 방식을 살펴봅시다.
```

## 🥎 1. Object 생성자 함수

new 연산자와 함께 호출하여 빈 객체(인스턴스)를 생성하는 함수입니다.
```js
const person = new Object();
```

>생성자 함수
>new 연산자와 함꼐 호출하여 객체(인스턴스)를 생성하는 함수
>생성자 함수에 의해 생성된 객체를 인스턴스라고 합니다.
>Object 생성자 함수 외에도 String, Number, Boolean, Function, Array, Date, RegExp Promise등의 빌트인 생성자 함수를 제공합니다.


## 🥎 2. 생성자 함수


### 1) 객체 리터럴에 의한 객체 생성 방식의 문제점

객체 리터럴에 의한 객체 생성 방식은 직관적이고 간편하지만 단 하나의 객체만 생성할 수 있습니다. 따라서 동일한 프로퍼티를 갖는 객체를 여러 개 생성해야 하는 경우 비효휼적입니다.

```js
const circle1 = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  }
};

const circle2 = {
  radius: 10,
  getDiameter() {
    return 2*this.radius;
  }
}
```

```
객체 리터럴의 단점은 중복을 처리하기 어려운 점, 캡슐화가 불가능하다는 점, 프로토타입 상속이 복잡해진다는 단점이 있습니다.
프로토타입이 복잡해지는 이유는 자바스크립트에서는 '프로토타입'이라는 메커니즘으로 상속을 구현하는데, 객체 리터럴로 객체를 생성하는 경우
객체의 프로토타입은 기본적으로 Object.prototype으로 설정됩니다.
따라서 다른 객체의 프로토타입을 상속하려면 추가적인 작업이 필요해지고, 이를 권장하지 않습니다.
```

### 2) 생성자 함수에 의한 객체 생성 방식의 장점

생성자 함수로 객체를 만들면 재사용성, 프로토타입 기반 상속, 캡술화의 장점이 있습니다. 

```js
function Person(name) {
  this.name = name; // 재사용성
  let age = 0; // 캡슐화

  this.getAge = function() { // 캡슐화된 속성에 대한 접근자
    return age;
  }

  this.birthday = function() { // 캡슐화된 속성을 수정하는 메서드
    age++;
  }
}

Person.prototype.greet = function() { // 프로토타입 기반 상속
  console.log(`Hello, my name is ${this.name}`);
}

let person1 = new Person('John');
let person2 = new Person('Sarah');

person1.greet(); // "Hello, my name is John"
person2.greet(); // "Hello, my name is Sarah"

console.log(person1.getAge()); // 0
person1.birthday();
console.log(person1.getAge()); // 1
```

생성자함수는 객체를 생성하는 함수입니다. 하지만 `java`와 같은 클래스 기반 객체지향 언어의 생성자와는 다르게 그 형식이 정해져 있는 것이 아니라 일반 함수와 동일한 방법으로 생성자 함수를 정의하고 new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작합니다.   

### 3) 생성자 함수의 인스턴스 생성 과정

1. **인스턴스 생성과 this 바인딩** : 먼저 빈 객체가 생성됩니다. 이 객체는 생성자 함수가 생성한 인스턴스로, 생성자 함수의 프로토타입 객체를 상속받습니다.
   그리고 이 newly 생성된 객체는 this 키워드에 바인딩됩니다. 따라서 생성자 함수 내부에서 this를 참조하면 생성된 인스턴스를 가리킵니다.

```js
function Person(name) {
  console.log(this); // Person {}
  this.name = name;
}
```

2. **인스턴스 초기화** : 생성자 함수에 기술되어 있는 코드가 한 줄씩 실행되면서 this에 바인딩된 인스턴스를 초기화합니다. 즉, 프로퍼티를 추가하거나 메소드를 생성하는 등의 작업을 수행합니다.

```js
function Person(name) {
  // 인스턴스 초기화
  this.name = name;
}
```

3. **인스턴스 반환** : 생성자 함수의 모든 코드가 실행되고 나면 this에 바인딩된 인스턴스가 암묵적으로 반환됩니다. 만약 생성자 함수가 명시적으로 객체를 반환하면 this가 아닌 해당 객체가 반환됩니다.
   하지만 원시 값은 반환하면 무시되고 this에 바인딩된 객체가 반환됩니다.

```js
function Person(name) {
  this.name = name;
  // this 반환
}

let john = new Person('John');
console.log(john); // Person { name: 'John' }
```

### 4) 내부 메서드 [[Call]]과 [[Construct]]

함수는 객체이지만 일반 객체와는 다릅니다. 일반 객체는 호출할 수 없지만 함수는 호출할 수 있습니다.   
함수가 일반 함수로서 호출되면 함수 객체의 내부 메서드 [[Call]]이 호출되고 new 연산자와 함께 생성자 함수로서 호출되면 내부 메서드 [[Construct]]가 호출됩니다. 함수는 callable해야 하며 constructor일 수도 있고 non-constructor일 수도 있습니다.    
>[[Call]]: 함수를 호출할 때 사용하는 내부 메서드입니다. 모든 함수 객체는 [[Call]] 내부메서드를 가지고 있으며, 이 메서드가 있어야 함수로서 호출이 가능합니다. 예를들어, myFunction()와 같이 함수를 호출하면 [[Call]] 내부 메서드가 실행됩니다.
```js
function sayHello() {
    console.log('Hello!');
}

// 함수를 호출하면 내부적으로 [[Call]] 메서드가 동작합니다.
sayHello();  // 출력: Hello!
```

>[[Construct]]: new 연산자와 함께 생성자 함수를 호출할 때 사용하는 내부 메서드입니다. 모든 생성자 함수는 [[Construct]] 내부 메서드를 가지고 있으며, 이 메서드가 있어야 new 키워드를 사용하여 인스턴스를 생성할 수 있습니다. 예를 들어, new MyConstructor()와 같이 생성자 함수를 호출하면 [[Construct]] 내부 메서드가 실행됩니다.
```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// new 키워드를 사용해 생성자 함수를 호출하면 내부적으로 [[Construct]] 메서드가 동작합니다.
var person = new Person('John', 30);

console.log(person.name);  // 출력: John
console.log(person.age);   // 출력: 30
```

### 5) constructor와 non-constructor의 구분

**생성자 함수 (constructor)**

>생성자 함수는 `new`키워드를 사용하여 인스턴스를 생성할 수 있는 함수입니다. 이 함수를 호출하면 `this` 바인딩을 통해 새 객체가 생성되고, 이 객체는 함수의 프로토타입을 상속받습니다. 생성자 함수는 일반적으로 첫 글자를 대문자로 작성하여 다른 개발자에게 생성자 함수임을 알립니다.
```js
function Person(name) {
  this.name = name;
}

const john = new Person('John'); // 'new' 키워드를 사용하여 생성자 함수 호출
console.log(john.name); // 출력: 'John'
```

**비생성자 함수(non-constructor)**

>비생성자 함수는 `new`키워드와 함꼐 호출할 수 없습니다. 만약 `new`키워드와 함게 호출하려고 시도하면, TypeError가 발생합니다. 화살표 함수, 메서드 축약 표현, Object, Function등의 빌트인 함수는 비생성자 함수의 예시입니다.

```js
const arrowFunc = () => {};
new arrowFunc(); // TypeError: arrowFunc is not a constructor
```

### 6) new 연산자

>`new` 연산자는 객체를 생성하고 초기화하는 데 사용됩니다. 이 연산자는 생성자 함수를 호출하며, 그 과정에서 객체를 생성하고 반환합니다. 특정 데이터 구조를 나타내는 클래스나 생성자 함수를 정의하고, 그 구조에 맞는 다수의 객체를 만들어야 하는 경우에 `new`연산자를 사용할 수 있습니다.

```js
// 생성자 함수를 정의
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// new 연산자를 사용해 Person 객체를 생성
var person1 = new Person('John', 30);
var person2 = new Person('Jane', 25);

console.log(person1);  // Person { name: 'John', age: 30 }
console.log(person2);  // Person { name: 'Jane', age: 25 }
```

사용자가 정의한 클래스나 라이브러리가 제공하는 클래스를 인스턴스화할 때도 `new`연산자가 사용됩니다. 예를 들어, `Express.js`와 같은 웹 프레임워크에서는 라우터 인스턴스를 만들기 위해 `new`를 사용합니다.   

```js
let express = require('express');
let router = new express.Router();
```

`new` 연산자와 함꼐 생성자 함수로서 호출하면 함수 내부의 `this`는 생성할 인스턴스를 가리키지만 일반 함수로 호출하게 되면 함수 내부의 `this`는 전역 객체 `window`를 가리킵니다.   

### 7) new.target

>ES6에서 도입된 속성으로, 함수나 생성자가 `new`연산자를 통해 호출되었는지 아닌지를 확인할 수 있습니다. `new`를 통해 호출된 함수 내부에서`new.target`을 사용하면, `new`연산자가 앞서 호출한 생성자를 참조합니다. 만약 `new`를 사용하지 않고 일반 함수처럼 호출했다면, `new.target`은 `undefined`를 반환합니다.

```js
function ExampleConstructor() {
    if (!new.target) {
        console.log('Called without new');
    } else {
        console.log('Called with new');
    }
}

ExampleConstructor();  // 출력: 'Called without new'
new ExampleConstructor();  // 출력: 'Called with new'
```
