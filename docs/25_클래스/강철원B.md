**TIL(Today I learn) 기록일** : 2023.12.20

# 25. 🥎 클래스

<br>

## 📚 목차

[1. 클래스는 프로토타입의 문법적 설탕인가?](#1-클래스는-프로토타입의-문법적-설탕인가)   
[2. 클래스 정의](#2-클래스-정의)   
[3. 클래스 호이스팅](#3-클래스-호이스팅)   
[4. 인스턴스 생성](#4-인스턴스-생성)  
[5. 메서드](#5-메서드)   
[6. 클래스의 인스턴스 생성 과정](#6-클래스의-인스턴스-생성-과정)
[7. 프로퍼티](#7-프로퍼티)


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

## 6. 클래스의 인스턴스 생성 과정

### 1) 인스턴스 생성과 this 바인딩

`new`연산자와 함께 클래스 호출 시, constructor 실행 이전에 인스턴스(빈 객체)가 생성되고, 인스턴스의 프로토타입으로 클래스의 `prototype`객체가 설정됩니다. 그리고 인스턴스가 `this`에 바인딩 됩니다.    

### 2) 인스턴스 초기화

`constructor`가 실행되어 `this`에 바인딩 된 인스턴스를 초기화합니다.

### 3) 인스턴스 반환

완성된 인스턴스가 바인딩 된 `this`가 암묵적으로 반환됩니다.    

```js
class Person {
  // 생성자
  constructor(name) {
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // Person {}
    console.log(Object.getPrototypeOf(this) === Person.prototype); // true

    // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
    this.name = name;

    // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
  }
}
```

## 7. 프로퍼티

### 1) 인스턴스 프로퍼티

>인스턴스 프로퍼티는 `constructor`내부에서 정의해야 합니다.
```js
class Person {
  constructor(name) {
    // 인스턴스 프로퍼티
    this.name = name;
  }
}

const me = new Person('Lee');
console.log(me); // Person {name: "Lee"}
```

`constructor` 내부 코드가 실행되기 이전에 `constructor 내부의 `this`에는 이미 클래스가 암묵적으로 생성한 인스턴스인 빈 객체가 바인딩되어 있습니다.    

생성자 함수에서 생성자 함수가 생성할 인스턴스의 프로퍼티를 정의하는 것과 마찬가지로 `constructor`내부에서 `this`에 인스터스 프로퍼티를 추가합니다. 이로써 클래스는 암묵적으로 생성한 빈 객체, 즉 인스턴스에 프로퍼티가 추가되어 인스턴스가 초기화됩니다.    

### 2) 접근자 프로퍼티

접근자 프로퍼티는 자체적으로 값([[Value]] 내부 슬롯)을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티입니다.   

```js
const person = {
  // 데이터 프로퍼티
  firstName: 'Ungmo',
  lastName: 'Lee',

  // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
  // getter 함수
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  // setter 함수
  set fullName(name) {
    // 배열 디스트럭처링 할당: "36.1. 배열 디스트럭처링 할당" 참고
    [this.firstName, this.lastName] = name.split(' ');
  }
};

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(`${person.firstName} ${person.lastName}`); // Ungmo Lee

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
person.fullName = 'Heegun Lee';
console.log(person); // {firstName: "Heegun", lastName: "Lee"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(person.fullName); // Heegun Lee

// fullName은 접근자 프로퍼티다.
// 접근자 프로퍼티는 get, set, enumerable, configurable 프로퍼티 어트리뷰트를 갖는다.
console.log(Object.getOwnPropertyDescriptor(person, 'fullName'));
// {get: ƒ, set: ƒ, enumerable: true, configurable: true}
```

### 3) 클래스 필드 정의 제안

클래스 필드(필드 또는 멤버)는 클래스 기반 객체지향 언어에서 클래스가 생성할 인스턴스의 프로퍼티를 가리키는 용어입니다.

>자바의 클래스 필드는 마치 클래스 내부에서 변수처럼 사용됩니다.
```java
// 자바의 클래스 정의
public class Person {
  // ① 클래스 필드 정의
  // 클래스 필드는 클래스 몸체에 this 없이 선언해야 한다.
  private String firstName = "";
  private String lastName = "";

  // 생성자
  Person(String firstName, String lastName) {
    // ③ this는 언제나 클래스가 생성할 인스턴스를 가리킨다.
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public String getFullName() {
    // ② 클래스 필드 참조
    // this 없이도 클래스 필드를 참조할 수 있다.
    return firstName + " " + lastName;
  }
}
```

자바스크립트의 클래스에서 인스턴스 프로퍼티를 선언하고 초기화하려면 반드시 `constructor` 내부에서 `this`에 프로퍼티를 추가해야 합니다. 하지만 자바의 클래스에서는 위 예제의 ①과 같이 클래스 필드를 마치 변수처럼 클래스 몸체에 this없이 선언합니다. 자바스크립트의 클래스 몸체에는 메서드만 선언할 수 있습니다. 따라서 클래스 몸체에 자바와 유사하게 클래스 필드를 선언하면 문법 에러가 발생합니다.

```js
class Person {
  // 클래스 필드 정의
  name = 'Lee';
}

const me = new Person('Lee');
```

하지만 위 예제는 최신 브라우저 또는 Node.js(12 이상)에서 문법 에러가 발생하지 않고 정상 동작합니다.([참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes))
클래스 몸체에서 클래스 필드를 정의할 수 있는 클래스 필드 정의 제안은 아직 ECMAScript의 정식 표준 사양으로 승급되지 않았습니다(4단계)
하지만 최신 브라우저와 최신 Node.js에서는 다음 예제와 같이 클래스 필드를 클래스 몸체에 정의할 수 있다.

```js
class Person {
  // 클래스 필드 정의
  name = 'Lee';
  age = 23;
}

const me = new Person();
console.log(me); // Person {name: "Lee" , age: 23}
console.log(me.age); // 23
```

>클래스 몸체에서 클래스 필드를 정의하는 경우 this에 클래스 필드를 바인딩해서는 안 된다. this는 클래스의 constructor와 메서드 내에서만 유효하다.
```js
class Person {
  // this에 클래스 필드를 바인딩해서는 안된다.
  this.name = ''; // SyntaxError: Unexpected token '.'
}

```
