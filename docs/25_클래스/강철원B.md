**TIL(Today I learn) 기록일** : 2023.12.20

# 25. 🥎 클래스

<br>

## 📚 목차

[1. 클래스는 프로토타입의 문법적 설탕인가?](#1-클래스는-프로토타입의-문법적-설탕인가)   
[2. 클래스 정의](#2-클래스-정의)   
[3. 클래스](#3-클래스)   
[4. 인스턴스 생성](#4-인스턴스-생성)  
[5. 메서드](#5-메서드)   



---

<br>

## 1. 클래스는 프로토타입의 문법적 설탕인가? 

❓ 자바스크립트는 프로토타입 기반 객체지향 언어입니다.(비록 다른 객체지향 언어와의 차이점에 대한 논쟁이 있긴 하지만 자바스크립트는 강력한 객체지향 프로그래밍 능력을 지니고 있습니다.     

프로토타입 기반 객체지향 언어는 클래스가 필요 없는 객체지향 프로그래밍 언어입니다. ES5에서는 클래스 없이도 다음과 같이 새성자 함수와 프로토타입을 통해 객체지향 언어의 상속을 구현할 수 있습니다.    

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  console.log(`Hi, I'm ${this.name}`);
};

const me = new Person('J');
me.sayHi(); // "Hi, I'm J"
```

- class 문법은 기존 프로토타입 기반 패턴을 클래스 기반 패턴처럼 사용할 수 있도록 하는 함수(문법적 설탕)입니다.
- 클래스와 생성자 함수는 모두 프로토타입 기반의 인스턴스를 생성하지만, 정확히 동일하게 동작하지 않습니다.
    - 클래스는 생성자 함수보다 엄격하며 생성자 함수에선 제공하지 않는 기능도 제공합니다.

❗️ 클래스와 생성자 함수의 차이점
- 클래스는 반드시 new 연산자와 함께 호출해야 하지만, 생성자 함수는 new 연산자가 없어도 일반 함수로서 호출됩니다.
- 생성자 함수와 달리 클래스는 상속을 지원하는 extends와 super 키워드를 제공합니다.
- 생성자 함수와 달리 클래스는 호이스팅이 발생하지 않는 것처럼 동작합니다.
- 생성자 함수와 달리 클래스는 내부 코드에서 암묵적으로 strict mode가 실행됩니다.
- 클래스의 constructor, 프로토타입 메소드, 정적 메소드는 모두 프로퍼티 어트리뷰트 [[Enumerable]] 이 false이기에 열거되지 않습니다.

<br>

---

## 2. 클래스 정의

클래스는 `class` 키워드를 사용하여 정의합니다.
클래스 이름은 생성자 함수와 마찬가지로 파스칼 케이스를 사용하는 것이 일반적입니다.   

```js
// 익명 클래스 표현식
const Person = class {};

// 기명 클래스 표현식
const Person = class MyClass {};
```

📌 클래스는 일급 객체로서 다음과 같은 특징을 갖습니다.
- 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능합니다.
- 변수나 자료구조(객체, 배열 등)에 저장할 수 있습니다.
- 함수의 매개변수에게 전달할 수 있습니다.
- 함수의 반환값으로 사용할 수 있습니다.

몸체에는 메소드 (`constructor`, 프로토타입 메소드, 정적 메소드)만 정의할 수 있습니다.

```js
class Person {
  // 인스턴스 생성 및 초기화
  constructor(name) {
    this.name = name; // public
  }

  // 프로토타입 메소드
  sayHi() {
    console.log(`Hi I'm ${this.name}`);
  }

  // 정적 메소드
  static sayHello() {
    console.log(`Hi I'm ${this.name}`);
  }
}

const me = new Person('J');
me.sayHi(); // // "Hi I'm J"
Person.sayHello(); // "Hi I'm Person"
```

<br>

---

## 3. 클래스 호이스팅

클래스 선언문으로 정의한 클래스는 함수 선언문과 같이 런타임 이전에 먼저 평가되어 함수 객체를 생성합니다.
이때 함수 객체는 `constructor`이고 생성자 함수와 함께 프로토타입도 생성됩니다.

```js
class Person {}

console.log(typeof Person); // function
```

>클래스 정의 이전에 참조할 수 없어 호이스팅이 발생하지 않는 것 처럼 동작합니다.
```js
const Person = '';

{
  console.log(Person); // error
  class Person {}
}
```

❓ 모든 선언문은 런타임 이전에 실행됩니다.

<br>

---

## 4. 인스턴스 생성

>클래스는 생성자 함수이며 new 연산자와 함께 호출되어 인스턴스를 생성합니다.
```js
class Person {}

// 인스턴스 생성
const me = new Person();
console.log(me); // Person {}
```

>함수는 new연산자의 사용 여부에 따라 일반 함수로 호출되거나 인스턴스 생성을 위한 생성자 함수로 호출되지만 클래스는 인스턴스를 생성하는 것이 유일한 존재 이유이므로 반드시 new 연산자와 함께 호출해야 합니다.
```js
class Person {}
// 클래스를 new 연산자 없이 호출하면 타입 에러가 발생한다.
const me = Person();
// TypeError: Class constructor Person cannot be invoked without 'new'
```
<br>

---

## 5. 메서드

### 1) constructor

- 인스턴스를 생성하고 초기화하기 위한 특수한 메서드로 이름을 변경할 수 없습니다.
- 내부의 `this`는 클래스가 생성한 인스턴스를 가리킵니다.
    - `this`에 추가한 프로퍼티는 인스턴스 프로퍼티가 됩니다.

```js
class Person {
  constructor(name) {
    this.name = name;
    this.city = 'seoul';
  }
}

const me = new Person('J');
console.log(me); // Person {name: 'J', city: 'seoul'}
```

- 단순한 메서드로 해석되지 않고, 클래스가 평가되어 생성한 함수 객체 코드의 일부가 됩니다.
- 한 개만 존재할 수 있습니다.
- 생략이 가능합니다.
```js
class Person {} // 아래처럼 빈 constructor가 암묵적으로 정의됨

class Person {
  constructor() {}
}
```
- 별도의 반환문을 갖지 않아야 합니다.

### 2) 프로토타입 메서드

- 클래스에서 정의한 메서드는 기본적으로 프로토타입 메서드입니다.
- 클래스의 인스턴스는 프로토타입 체인의 일원입니다.

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  }
}

const me = new Person('J');

console.log(Object.getPrototypeOf(me) === Person.prototype); // true
console.log(me instanceof Person); // true

console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype); // true
console.log(me instanceof Object); // true

console.log(me.constructor === Person); // true
```

### 3) 정적 메서드

인스턴스를 생성하지 않아도 호출할 수 있는 메서드입니다.

- 클래스는 함수 객체이므로 자신의 프로퍼티/메서드를 소유할 수 있기에, 클래스 정의가 평가된 후 정적 메서드를 호출할 수 있습니다.
- 인스턴스의 프로토타입 체인엔 클래스가 존재하지 않으므로, 인스턴스는 클래스의 메서드를 상속받을 수 없습니다.

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  static sayHi() {
    console.log('Hi');
  }
}

Person.sayHi(); // Hi
```

### 4) 정적 메서드와 프로토타입 메서드의 차이

>정적 메서드와 프로토타입 메서드의 차이는 다음과 같습니다.
- 정적 메서드와 프로토타입 메서드는 자신이 속해 있는 프로토타입 체인이 다르다.
- 정적 메서드는 클래스로 호출하고 프로토타입 메서드는 인스턴스로 호출한다.
- 정적 메서드는 인스턴스 프로퍼티를 참조할 수 없지만 프로토타입 메서드는 인스턴스 프로퍼티를 참조할 수 있다.

❓ 표준 빌트인 객체인 Math, Number, JSON, Object, Reflect 등은 다양한 정적 메서드를 가지고 있습니다. 이러한 정적 메서드는 애플리케이션 전역에서 사용할 유틸리티 함수입니다.

```js
// 표준 빌트인 객체의 정적 메서드
Math.max(1, 2, 3);          // -> 3
Number.isNaN(NaN);          // -> true
JSON.stringify({ a: 1 });   // -> "{"a":1}"
Object.is({}, {});          // -> false
Reflect.has({ a: 1 }, 'a'); // -> true
```

### 5) 클래스에서 정의한 메서드의 특징

>클래스에서 정의한 메서드는 다음과 같은 특징을 갖습니다.

1. `function` 키워드를 생략한 메서드 축약 표현을 사용한다.
2. 객체 리터럴과는 다르게 클래스에 메서드를 정의할 때는 콤마가 필요없다.
3. 암묵적으로 `strict mode`로 실행된다.
4. `for...in` 문이나 `Object.keys` 메서드 등으로 열거할 수 없다. 즉 프로퍼티의 열거 가능 여부를 나타내며, 불리언 값을 갖는 프로퍼티 어트리뷰트 `[[Enumerable]]`의 값이 `false`다.
5. 내부 메서드 `[[Construct]]`를 갖지 않는 `non-constructor`다. 따라서 `new` 연산자와 함께 호출할 수 없다.


