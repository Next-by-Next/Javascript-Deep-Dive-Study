# 📕 17장 생성자 함수에 의한 객체 생성

## 📝 17.1 Object 생성자 함수

- `new Object()`를 이용해서 빈 객체를 생성할 수 있다.
- 생성된 객체에 프로퍼티와 메서드를 추가할 수 있다.
- 생성자 함수로 생성된 객체를 인스턴스라고 한다.

## 📝 17.2 생성자 함수

### ✏️ 객체 리터럴에 의한 객체 생성 방식의 문제점

- 직관적이고 간편 하지만 단 하나의 객체만 생성한다.
- 동일한 프로퍼티를 갖는 객체를 여러번 생성하면 같은 프로퍼티를 계속 기술해야 한다.

### ✏️ 생성자 함수에 의한 객체 생성 방식의 장점

- 객체를 템플릿처럼 만들어서 구조가 동일한 객체를 간편하게 생성할 수 있다.
- 객체지향 언어와는 다르게 일반 함수와 동일한 방법으로 생성자 함수를 정의하고 new 연산자와 함께 호출하면 생성자 함수로 동작한다.

```js
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);
```

### ✏️ 생성자 함수의 인스턴스 생성 과정

#### 바인딩

식별자와 값을 연결하는 과정.

this 바인딩 : this와 this가 가리킬 객체를 바인딩

#### 1. 인스턴스 생성과 this 바인딩

- 암묵적으로 빈 객체를 생성한다.(생성자 함수가 생성한 인스턴스)
- 인스턴스는 this에 바인딩된다.
- 런타임 이전에 실행된다.

#### 2. 인스턴스 초기화

- this에 바인딩되어 있는 인스턴스에 프로퍼티나 메서드를 추가한다.
- 생성자 함수가 인수로 전달받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화 한다.
- 이 처리는 개발자가 기술한다.

#### 3. 인스턴스 반환

- 함수 내부의 모든 처리가 끝나면 인스턴스가 바인딩된 this가 반환된다.
- this가 아닌 다른 객체를 명시적으로 반환하면 this가 반환되지 못하고 return 문에 명시한 객체가 반환된다.
- return 값으로 다른 객체가 아닌 원시 값을 반환하면 반환 값은 무시되고 this가 반환된다.
- 명시적으로 this가 아닌 다른 값을 반환하면 생성자 함수의 기본 동작을 훼손하니 return문을 생략해야 한다.

### ✏️ 내부 메서드 [[Call]]과 [[Construct]]

- 함수 선언문 또는 함수 표현식으로 정의한 함수는 일반적인 함수 호출과 new 연산자와 함께 생성자 함수로 호출해 객체를 생성하는 것이 가능하다.
- 함수는 내부 슬롯과 내부 메서드를 가지고 있기 때문에 일반 객체와 동일하게 동작할 수 있다.

  ```js
  function foo() {}

  foo.prop = 10;

  foo.method = function () {
    console.log(this.prop);
  };

  foo.method(); // 10
  ```

- **일반 객체는 호출할 수 없지만 함수는 호출할 수 있다**.
- [[Environment]], [[FormalParameters]] 등의 내부 슬롯과, [[Call]], [[Construct]] 같은 내부 메서드를 추가로 가지고 있다.
- 함수를 일반 함수로 호출하면 [[Call]] 메서드가 호출된다.
- new 연사자와 함께 생성자 함수로서 호출하면 [[Construct]] 메서드가 호출된다.

  ```js
  function foo() {}

  // [[Call]]
  foo();

  // [[Construct]]
  new foo();
  ```

- [[Call]] 메서드를 갖는 함수 객체를 callable이라 한다.
- [[Construct]] 메서드를 갖는 함수 객체를 constructor, 갖지 않는 함수 객체를 non-constructor이라 한다.
- 모든 함수 객체는 callable 이지만 constructor일 수도 있고 non-constructor일 수도 있다.

### ✏️ constructor와 non-constructor의 구분

함수 객체를 정의하는 방식에 따라서 구분된다.

**constructor** : 함수 선언문, 함수 표현식, 클래스  
**non-constructor** : 메서드(ES6 메서드 축약 표현), 화살표 함수

ECMASctipt 사양에서 메서드로 인정하는 범위가 일반적인 의미의 메서드보다 좁으니 주의해야 한다.

```js
// constructor

function foo() {}

const bar = function () {};

const baz = {
  x: function () {},
};

// non-constructor

const arrow = () => {};

const obj = {
  x() {},
};
```

메서드의 경우 어디서 정의되는지 보다 어떻게 정의되는지에 따라서 constructor 혹은 non-constructor가 결정된다.  
생성자 함수로서 호출될 것을 기대하지 않은 일반 함수에 new 연산자를 사용하면 생성자 함수로서 동작하니 주의하자.

### ✏️ new 연산자

new 연산자로 함수 객체를 호출하면 함수 객체의 내부 메서드 [[Construct]]가 호출된다. 이때 함수는 constructor이어야 한다.

```js
// 생성자 함수로서 정의하지 않은 함수
function add(x, y) {
  return x + y;
}

// 함수가 객체를 반환하지 않아서 빈 return문이 무시되고 빈 객체가 생성되어 반환된다.
let inst = new add(); // int -> {}

// 객체를 반환하는 일반 함수
function createUser(name, role) {
  return { name, role };
}

// 일반 함수를 new 연산자와 호출
inst = new createUser("lee", "admin"); // {name: "lee", role: "admin"} 함수가 생성한 객체를 반환
```

new 연산자 없이 생성자 함수를 호출하면 일반 함수로 호출되어 [[Construct]]가 아닌 [[Call]]이 호출된다.

```js
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle = Circle(5); // 일반 함수의 this는 전역 객체 window를 가르키기 때문에 undefined가 된다.

circle.getDiameter(); // TypeError
```

일반 함수와 생성자 함수를 구별하기 위해서 생성자 함수는 일반적으로 첫 문자를 대문자로 기술하는 파스칼 케이스로 명명하여 구분한다.

### ✏️ new.target

파스칼 케이스로 생성자 함수를 명명하는 방법을 사용하더라도 언제나 실수가 발생할 수 있다. 이런 위험성을 회피하기 위해서 ES6에서는 `new.target`을 지원한다. 이는 constructor인 함수 내부에서 암묵적인 지역 변수와 같이 사용되며 메타 프로퍼티라고 부른다. **(IE에서는 지원되지 않는다)**

함수 내부에서 `new.target`을 사용해서 생성자 함수로서 호출되었는지 확인할 수 있고 만약 생성자 함수로서 호출되지 않았다면 재귀 호출을 통해 생성자 함수로서 호출할 수 있다.

**`new` 연산자와 함께 호출된 생성자 함수의 경우 `new.target`은 함수 자신을 가리킨다. `new` 연산자 없이 호출된 함수 내부의 `new.target`은 undefined다.**

```js
function Circle(radius) {
  if (!new.target) {
    return new Circle(radius);
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}
```

대부분의 빌트인 생성자 함수는 new 연산자와 함께 호출되었는지를 확인한 수 적절한 값을 반환한다. (Object, String, Number, Boolean, Function, Array, Date, RegExp, Promise 등)

- Object와 Function 생성자 함수는 new 연산자 없이도 new 연산자와 함께 호출한 것처럼 동작한다.
- String, Number, Boolean 생성자 함수는 new 연산자와 호출하면 객체를 반환하고 new 연산자 없이 호출하면 해당 데이터 타입의 값을 반환한다. (데이터 타입 변환을 하기도 한다)

#### 스코프 세이프 생성자 패턴

`new.target`이 지원되지 않는 상황이라면 스코프 세이프 생성자 패턴을 사용할 수 있다.

```js
function Circle(radius) {
  // new 연산자와 생성자 함수를 호출하면 this에 바인딩한다. 이때 this와 Circle은 프로토타입에 의해 연결된다.

  // 함수가 new 연산자와 함께 호출되지 않으면 this는 전역 객체를 가리킨다.
  // 즉 this와 Circle은 프로토타입에 의해 연결되지 않는다.
  if (!(this instanceof Circle)) {
    return new Circle(radius);
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}
```

new 연산자와 함께 생성자 함수에 의해 생성된 객는 프로토타입에 의해 생성자 함수와 연결된다. 이를 이용해 new 연산자와 함께 호출되었는지 확인할 수 있다.
