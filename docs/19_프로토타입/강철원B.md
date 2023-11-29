**TIL(Today I learn) 기록일** : 2023.11.27

# 19장 프로토타입


자바스크립트는 멀티 패러다임 프로그래밍 언어입니다. 자바스크립트는 클래스 기반 객체지향 프로그래밍 언어보다 효율적이며 더 강력한 객체지향 프로그래밍 능력을 지니고 있는 프로토타입 기반의 객체지향프로그래밍 언어입니다.

🥎 **클래스**
>사실 클래스도 함수이며, 기존 프로토타입 기반 패턴의 문법적 설탕이라고 볼 수 있습니다.
>클래스와 생성자 함수는 모두 프로토타입 기반의 인스턴스를 생성하지만 정확히 동일하게 동작하지는 않습니다.
>클래스는 생성자 함수보다 엄격하며 클래스는 생성자 함수에서는 제공하지 않는 기능도 제공합니다.
>프로토타입을 알아야 클래스와 생성자 함수를 더 이해하기 쉽습니다.

자바스크립트는 객체 기반의 프로그래밍 언어이며 자바스크립트를 이루고 있는 거의 "모든 것"이 객체입니다.       
원시 타입의 값을 제되한 나머지 값들(함수, 배열, 정규 표현식 등)은 모두 객체입니다.       

**프로토타입을 배워보기전에 기초가되는 객체지향 프로그래밍에 대해 알아야합니다**

## 1. 객체 지향 프로그래밍

객체지향 프로그래밍은 프로그램을 명령어 또는 함수의 목록으로 보는 전통적인 명령형 프로그래밍의 절차지향적 관점에서 벗어나, 여러개의 독립적 단위인 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임을 말합니다.    

"사람"에게는 다양한 속성이 있으나 우리가 구현하려는 프로그램에서는 사람의 "이름"과 주소"라는 속성에만 관심이 있다고 가정한다면, 이러한 다양한 속성 중에서 프로그램에 필요한 속성만 간추려 내어 표현하는 것을 추상화라고 합니다.   

```js
// 이름과 주소 속성을 갖는 객체
const person = {
  name: 'Lee',
  address: 'Seoul'
};

console.log(person); // {name: "Lee", address: "Seoul"}
```

이름과 주소 속성으로 표현객 객체인 `person`을 다른 객체와 구별하여 인식할 수 있습니다. 이처럼 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조를 객체라고 하며, 이러한 객체의 집합으로 프로그램을 표현하려는 것이 객체지향 프로그래밍 패러다임입니다.   

객체는 상태(`state`)를 나타내는 데이터와 상태 데이터를 조작할 수 있는 동작을 하나의 논리적인 단위로 구성한것 입니다. 이때 객체의 상태 데이터를 프로퍼티, 동작을 메서드라고 부릅니다.   
```js
const circle = {
  // property
  radius: 5, // 반지름

  // method
  // 원의 지름: 2r
  getDiameter() {
    return 2 * this.radius;
  },

  // method
  // 원의 둘레: 2πr
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  },

  // method
  // 원의 넓이: πrr
  getArea() {
    return Math.PI * this.radius ** 2;
  }
};

console.log(circle);
// {radius: 5, getDiameter: ƒ, getPerimeter: ƒ, getArea: ƒ}

console.log(circle.getDiameter());  // 10
console.log(circle.getPerimeter()); // 31.41592653589793
console.log(circle.getArea());      // 78.53981633974483
```

## 2. 상속과 프로토타입

상속은 객체지향 프로그래밍의 핵심 개념입니다. 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말합니다. 상속을 구현하여 불필요한 중복을 제거할 수 있습니다.   

동일한 생성자 함수에 의해 생성된 모든 인스턴스가 동일한 메서드를 중복 소유한다면 메모리를 불필요하게 낭비하고, 인스턴스 생성시마다 메서드를 생성하므로 퍼포먼스에도 악영향을 줍니다.  프로토타입을 기반으로 상속을 구현하여 이를 해결할 수 있습니다.    

```js
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    return Math.PI * this.radius ** 2;
  };
}

const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log(circle1.getArea === circle2.getArea);	// false
console.log(circle1.getArea()); // 3.14159...
console.log(circle2.getArea());	// 12.56637...
```

위 예제에서는 `Circle` 생성자 함수가 생성하는 모든 객체(인스턴스)는 `radius` 프로퍼티와 `getArea`메서드를 갖습니다.     
같은 상태를 갖는 인스턴스가 필요한 것이 아니라면 각 인스턴스마다 `radius`프로퍼티 값은 일반적으로 다릅니다.    
하지만 `getArea`는 동일한 내용이므로 모든 인스턴스가 중복 소유합니다.   

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/b6e2a631-b58f-4537-b1ce-29ec3cb0d7af)

이러한 불필요한 중복을 방지하기 위해 프로토타입을 기반으로 상속을 구현하면 아래와 같습니다.   

```js
function Circle(radius) {
  this.radius = radius;
}
// 모든 인스턴스가 getArea 메서드를 사용할 수 있도록 프로토타입에 추가한다.
// 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

const circle1 = new Circle(1);
const circle2 = new Circle(2);
// Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
console.log(circle1.getArea === circle2.getArea);	// true
console.log(circle1.getArea()); // 3.14159...
console.log(circle2.getArea());	// 12.56637...
```

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/b7d8492c-2864-4b7a-b299-4176cabb828f)

`Circle` 생성자 함수가 생성한 모든 인스턴스는 상위(부모) 객체 역할을 하는 `Circle.prototype`의 모든 프로퍼티와 메서드를 상속받습니다.    
위 예제에서 생성된 모든 인스턴스는 `radius`프로퍼티만 개별적으로 소유하고 동일한 메서드는 상속을 통해 공유하여 사용합니다.

## 3. 프로토타입 객체

프로토타입 객체(또는 프로토타입)란 객체 간 상속을 구현하기 위해 사용됩니다.     
모든 객체는 [[Prototype]]이라는 내부 슬롯을 가지며, 이 내부 슬롯의 갓은 프로토타입의 참조입니다. 객체가 생성될 때 객체 생성 방식에 따라 프로토타입이 결정되고 [[Prototype]]에 저장됩니다.    

객체와 프로토타입과 생성자 함수는 다음 그림과 같이 서로 연결되어있습니다.   

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/f74d26f0-dcae-4953-a9e6-701546545915)

[[Prototype]] 내부 슬롯에는 직접 접근할 수 없지만, __proto__접근자 프로퍼티를 통해 자신의 [[Prototype]] 내부 슬롯이 가리키는 프로토타입에 간접적으로 접근할 수 있습니다.   
그리고 프로토타입은 자신의 constructor 프로퍼티를 통해 생성자 함수에 접근할 수 있고, 생성자 함수는 자신의 prototype 프로퍼티를 통해 프로토타입에 접근할 수 있습니다.   

### 1) __proto__접근자 프로퍼티

다음 예제는 크롬 브라우저의 콘솔에서 출력한 결과입니다. 
![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/6ddad511-fdfb-4257-862d-5cccd2225876)


그림의 빨간 박스로 표시한 person 객체의 프로토타입은 __proto__ 접근자 프로퍼티를 통해 `perosn`객체의 `[[Prototype]]`내부 슬롯이 가리키는 객체인 `Object.prototype`에 접근한 결과입니다.   

#### ✅ `__Proto__`에 관한 4가지 진실

1. `__proto__`는 접근자 프로퍼티입니다.
직접 [[Prototype]]`에 접근할 수 없고 이에 접근할 수 있는 역할을 해줍니다.
아래의 예제에서 접근자 프로퍼티를 활용해 obj의 프로토타입을 parent로 변경하였고, 실제로 변경된 것을 확인 할 수 있습니다.

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/5596c887-1fef-4de5-84ef-7f29db1b31ed)

2. `__proto__`접근자 프로퍼티는 상속을 통해 사용됩니다.
`__proto__`접근자 프로퍼티는 객체가 직접 소유하는 것이 아니라, `Object.prototype`의 프로퍼티입니다. 모든 객체는 상속을 통해 `Object.prototype.__proto__`접근자 프로퍼티를 사용할 수 있습니다.

3. `__proto__`접근자 프로퍼티를 통해 프로토타입에 접근하는 이유
상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해서입니다. 무조건 단방향 링크드 리스트로 구현되어야 하는데, 순환참조하는 프로토타입 체인이 만들어지면 프로토타입 체인 종점이 존재하지 않기 때문에 프로퍼티 검색 시에 무한 루프에 빠지기 때문입니다.

4. `__proto__`접근자 프로퍼티를 코드 네에서 직접 사용하는 것은 권장하지 않습니다.
모든 객체가 이 접근자 프로퍼티를 사용할 수 있는 것은 아니기 때문에 프로토타입의 참조를 취득하고 싶은 경우에는 `Object.getPrototypeOf`메서드를 사용합니다.

```js
const obj = {};
const parent = {x:1};

//obj 객체의 프로토타입을 취득
Object.getPrototypeOf(obj); // obj.__proto__;
//obj 객체의 프로토타입을 교체
Object.setPrototypeOf(obj, parent); //obj.__proto__ = parent;
```
### 2) 함수 객체의 prototype 프로퍼티

함수 객체만이 소유하는 `prototype`프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킵니다.   
따라서 `non-constructor`인 화살표 함수와 ES6메서드 축약 표현으로 정의한 메서드는 `prototype`프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않습니다.    

생성자 함수로 호출하기 위해 정의하지 않은 일반 함수(함수 선언문, 함수 표현식)도 `prototype`프로퍼티를 소유하지만 아무런 의미가 없습니다.   

>모든 객체가 가지고 있는(엄밀히 말하면 Object.prototype으로부터 상속받은)`__proto__`접근자 프로퍼티와 함수 객체만이 가지고 있는 `prototype`프로퍼티는 결국 동일한 프로토타입을 가리킵니다.

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/16049570-2c21-4ce9-ade6-cc014de8f7d7)

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/568d1cd5-5756-4e11-b9d9-8f720af24948)
![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/8f2bc5e7-dc91-4cad-a055-924d1c166023)

`Person.prototype`과 `me.__proto__`는 결국 동일한 프로토타입을 가리킵니다.   

### 3) 프로토타입의 constructor 프로퍼티와 생성자 함수

모든 프로토타입은 `constructor`프로퍼티를 갖습니다. 이 `constructor`프로퍼티는 `prototype`프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킵니다. 이 연결은 함수 객체가 생성될 때 이뤄집니다.   

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/d0f836c9-1844-44bd-b5c4-b432de67a3a8)

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/d83cb847-8098-43a9-8176-0ee2b46867d9)

생성된 `me` 객체는 프로토타입의 `constructor` 프로퍼티를 통해 생성자 함수와 연결됩니다. `me`객체의 프로토타입인 `Person.prototype`에는 `me`객체에 없는 `constructor` 프로퍼티가 있습니다.  따라서 `me` 객체는 `constructor`프로퍼티를 상속받아 사용할 수 있습니다. 

<br>

## 4. 리터럴 표기법에 의해 생서된 객체의 생성자 함수와 프로토타입

>리터럴 표기법에 의해 생성된 객체의 경우 프로토타입의 `constructor`프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수 없습니다.

리터럴 표기법에 의한 객체 생성 방식은 인스턴스를 생성하지 않습니다.    

>리터럴로 생성하는 방식
```js
// 객체 리터럴
const obj = {};

// 함수 리터럴
const add = function (a, b) { return a + b; };

// 배열 리터럴
const arr = [1, 2, 3];

// 정규표현식 리터럴
const regexp = /is/ig;
```

리터럴 표기법에 의해 생성된 객체도 물론 프로토타입이 존재합니다. 하지만 이런 객체는 `constructor`프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 함수라고 단정할 수 없습니다.    

```js
// obj 객체는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴로 생성했다.
const obj = {};

// 하지만 obj 객체의 생성자 함수는 Object 생성자 함수다.
console.log(obj.constructor === Object); // true
```
위 예제같은 경우 객체 리터럴로 생성한 객체의 `constructor`프로퍼티는 `Object`생성자 함수와 연결되어 있습니다.   

결과적으로 리터럴로 생성한 객체와 생성자 함수로 생성한 객체의 `constructor`프로퍼티를 확인하면 동일해 보이지만 객체가 생성되는 방식은 다릅니다.    

위 예제에서 생성된 객체의 생성자 함수는 왜 `Object` 생성자 함수일까?    
ECMAScript를 살펴보면 알 수 있다.    

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/785ac6bb-3879-4192-8689-b87c24011736)

2번 항목에서 `Object` 생성자 함수에 인수를 전달하지 않거나 `undefined`또는 `null`을 인수로 전달하면서 호출하면 내부적으로는 추상 연산 `OrdinaryObjectCreate`를 호출하여 `Object.prototype`을 프로토타입으로 갖는 빈 객체를 생성합니다.    

```js
// 1. new.target이 undefined나 Object가 아닌 경우
// 인스턴스 -> Foo.prototype -> Object.prototype 순으로 프로토타입 체인이 생성된다.
class Foo extends Object {}
new Foo(); // Foo {}

// 2. Object 생성자 함수에 의한 객체 생성
// Object 생성자 함수는 new 연산자와 함께 호출하지 않아도 new 연산자와 함께 호출한 것과 동일하게 동작한다.
// 인수가 전달되지 않았을 때 추상 연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성한다.
let obj = new Object();
console.log(obj); // {}

// 3. 인수가 전달된 경우에는 인수를 객체로 변환한다.
// Number 객체 생성
obj = new Object(123);
console.log(obj); // Number {123}

// String  객체 생성
obj = new Object('123');
console.log(obj); // String {"123"}
```

이처럼 `Object` 생성자 함수 호출과 객체 리터럴의 평가는 추상 연산 `OrdinaryObjectCreate`를 호출하여 빈 객체를 생성하는 점에서 동일하나 `new.target`의 확인이나 프로퍼티를 추가하는 처리 등 세부내용은 다릅니다. 따라서 객체 리터럴에 의해 생성된 객체는 `Object`생성자 함수가 생성한 객체가 아닙니다.      

이런 차이는 함수 객체의 경우 더 명확합니다.    
12.4.4절 Function 생성자 함수에서 보았듯이 `Function`생성자 함수를 호출해 생성한 함수는 렉시컬 스코프를 만들지 않고 전역함수인 것처럼 스코프를 생성하며, 클로저도 만들지 않습니다.    

함수 선언문과 함수 표현식을 평가하여 함수 객체를 생성한 것은 `Function`생성자 함수가 아닙니다. 하지만 `constructor`프로퍼티를 통해 확인해 보면 `foo`함수의 생성자 함수는 `Function`생성자 함수입니다.   

```js
// foo 함수는 Function 생성자 함수로 생성한 함수 객체가 아니라 함수 선언문으로 생성했다.
function foo() {}

// 하지만 constructor 프로퍼티를 통해 확인해보면 함수 foo의 생성자 함수는 Function 생성자 함수다.
console.log(foo.constructor === Function); // true
```

| 리터럴 표기법           | 생성자 함수  | 프로토타입         |
|------------------------|--------------|--------------------|
| 객체 리터럴             | Object       | Object.prototype   |
| 함수 리터럴             | Function     | Function.prototype |
| 배열 리터럴             | Array        | Array.prototype    |
| 정규 표현식 리터럴     | RegExp       | RegExp.prototype   |

<br>

## 5. 프로토타입의 생성 시점

프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성됩니다.    

생성자 함수는 사용자가 직접 정의한 사용자 정의 생성자 함수와 자바스크립트가 기본 제공하는 빌트인 생성자 함수로 구분할 수 있습니다.   

### (1) 사용자 정의 생성자 함수와 프로토타입 생성 시점
>생성자 함수로서 호출할 수 있는 함수, 즉 `constructor`는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성됩니다. `non-constructor`는 프로토타입이 생성되지 않습니다.

```js
// 호이스팅으로 선언문에 도달하기 전에 함수 객체가 생성된다.
// 함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
console.log(Person.prototype); // {constructor: ƒ}

// 생성자 함수
function Person(name) {
  this.name = name;
}
```
위 예제에서 볼 수 있듯이 생성자 함수는 어떤 코드보다 먼저 평가되어 함수 객체가 되고, 그때 프로토타입도 더불어 생성됩니다.    

생성된 프로토타입은 `Person`생성자 함수의 `prototype`프로퍼티에 바인딩됩니다. 위 예제에서 생성된 프로토타입의 내부는 아래와 같습니다.    

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/c9158b10-457e-41f2-9771-1660b7de9aa9)

프로토타입도 객체이고 모든 객체는 프로토타입을 가지므로 프로토타입도 자신의 프로토타입을 갖습니다. 생성된 `prototype`의 프로토타입은 `Object.prototype`입니다.


![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/f2a9260e-c978-4e0b-a13b-ad0266c2b512)


### (2) 빌트인 생성자 함수와 프로토타입 생성 시점

Object, String, Number, Function, Array, RegExp, Date, Promise 등과 같은 빌트인 생성자 함수도 생성되는 시점에 프로토타입이 생성됩니다.     
모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성되고 생성된 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩됩니다.    

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/0ef740a4-f8cc-48b1-99de-ed540451313f)


>전역 객체
```text
전역 객체는 코드가 실행되기 전에 자바스크립트 엔진에 의해 생성됩니다.
브라우저에서는 window, 서버 사이드 환경에서는 global 객체를 의미합니다.
전역 객체는 표준 빌트인 객체들과 환경에 따른 호스트 객체,
그리고 var 키워드로 선언한 전역 변수와 전역함수를 프로퍼티로 갖습니다.
```

이처럼 객체가 생성되기 이전에 생성자 함수와 프로토타입은 이미 객체화 되어 존재하고, 이후 생성자 함수 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 생성된 객체의 `[[Prototype]]`내부 슬롯에 할당됩니다.    

<br>

## 6. 객체 생성 방식과 프로토타입의 결정

객체는 다음과 같은 다양한 생성 방법이 있습니다.    

- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스(ES6)

이들의 공통점은 추상 연산 `OrdinaryObjectCreate`에 의해 생성된다는 것 입니다.    
추상 연산은 빈 객체를 생성한 후, 객체에 추가할 프로퍼티 목록이 인수로 전달된 경우 프로퍼티를 객체에 추가합니다. 그리고 인수로 전달받은 프로토타입을 자신이 생성한 객체의 [[Prototype]] 내부 슬롯에 할당한다음 생성한 객체를 반환합니다.    
즉, 프로토타입은 추상 연산에 전달되는 인수에 의해 결정됩니다.    

### 1) 객체 리터럴에 의해 생성된 객체의 프로토타입

```js
const obj = { x : 1};
```

위 예제의 경우
- 객체 리터럴을 평가한다.
- `OrdinaryObjectCreate`를 호출한다.
- 이때 전달되는 프로토타입은 `Object.prototype`이다

결국 `Object.prototype`을 프로토타입으로 갖으므로 `obj`객체는 `constructor`, `hasOwnProperty`메서드등을 소유하지 않지만 사용할 수 있다.
```js
const obj = { x: 1 };

// 객체 리터럴에 의해 생성된 obj 객체는 Object.prototype을 상속받는다.
console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty('x'));    // true
```    

### 2) Object 생성자 함수에 의해 생성된 객체의 프로토타입

```js
const obj = new Object();
obj.x = 1;

// Object 생성자 함수에 의해 생성된 obj 객체는 Object.prototype을 상속받는다.
console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty('x'));    // true
```

객체 리터럴과 `Object`생성자 함수에 의한 객체 생성 결과는 동일합니다. 하지만 프로퍼티를 추가하는 방식이 차이가 있습니다.    
객체 리터럴은 리터럴 내부에 프로퍼티를 추가하지만 `Object`생성자 함수 방식은 일단 빈 객체를 생성한 이후 프로퍼티를 추가해야합니다.

### 3) 생성자 함수에 의해 생성된 객체의 프로토타입

`new` 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하면 다른 객체 방식과 마찬가지로 추상 연산이 호출됩니다.
생성자 함수에 의해 생성되는 객체의 프로토타입은 생성자 함수의 `prototype` 프로퍼티에 바인딩되어 있는 객체입니다.

```js
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');
```

위 코드가 실행되면 추상 연산에 의해 생성자 함수와 생성자 함수의 `prototype`프로퍼티에 바인딩되어 있는 객체와 생성된 객체 사이에 연결이 만들어 집니다.    

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/85bda792-d040-4493-971a-f1ebd18ac683)

생성된 프로토타입 `object.prototype`은 다양한 빌트인 메서드를 갖고 있습니다. 하지만 사용자 정의 생성자 함수 `Person`과 더불어 생성된 프로토타입 `Person.prototype`의 프로퍼티는 `constructor`뿐입니다.    

프로토타입은 객체이므로 일반 객체와 같이 프로토타입에도 프로퍼티를 추가/삭제할 수 있고, 이런 수정사항은 프로토타입 체인에 즉각 반영됩니다.   

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/7b469028-c1d4-45a8-a702-72969147d310)

`Person`생성자 함수를 통해 생성된 모든 객체는 프로토타입에 추가된 `sayHello`메서드를 상속받아 사용할 수 있습니다.   

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/f0edb04e-7ea2-4670-b800-41e273714099)

