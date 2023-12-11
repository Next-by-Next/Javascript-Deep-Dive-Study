**TIL(Today I learn) 기록일** : 2023.12.08


# 22장 this


## 1. this 키워드

메서드가 자신이 속한 객체의 프로퍼티를 참조하려면 먼저 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 합니다.

- 객체 리터럴 방식으로 생성한 경우 메서드 내부에서 자기 자신이 속한 객체를 재귀적으로 참조할 수 있습니다.
- `getDiameter`가 호출될 시점에는 이미 `circle` 객체가 만들어져 있기 때문에 해당 동작이 가능합니다. 하지만 이것은 일반적이지 않으며 바람직하지도 않습니다.

```jsx
const circle = {
  radius: 5,
  getDiameter() {
    return 2 * circle.radius;
  },
};

console.log(circle.getDiameter()); // 10
```

생성자 함수 방식으로 인스턴스를 생성하는 경우
  - 생성자 함수 또한 내부에서 프로퍼티나 메서드를 추가하기 위해 자신이 생성할 인스턴스를 참조할 수 있어야 합니다..
  - 생성자 함수를 정의하고, `new` 연산자와 함께 생성자 함수를 호출해야 하는 단계가 추가로 필요합니다.
  - 따라서 생성자 함수로 인스턴스를 생성하려면 먼저 생성자 함수가 존재해야 합니다.
  - 생성자 함수를 정의하는 시점에는 아직 new 연산자로 인스턴스를 생성하기 이전이므로 해당 인스턴스를 가리키는 식별자를 알 수 없습니다. 따라서 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 특수한 식별자가 필요합니다.(this)

```jsx
  function Circle(radius) {
    this.radius = radius;
  }

  Circle.prototype.getDiameter = function () {
    return 2 * this.radius;
  }

  const circle = new Circle(5);
```

```
📌 this ?
- 자신이 속한 개체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수다.
- this를 통해 자신이 속한 객체 또는 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.
- this는 자바스크립트 엔진을 통해 암묵적으로 생성되며, 코드 어디서든 참조할 수 있다.
- 함수를 호출하면, arguments 객체와 this가 암묵적으로 함수 내부에 전달된다. 또한 지역변수처럼 사용 가능하다.
- 단, this가 가리키는 값. 즉, this 바인딩은 함수 호출 방식에 의해 동적으로 결정된다.
```

객체 리터럴의 메서드 내부에서의 this는 메서드를 호출한 객체. 즉, circle을 가리킵니다. 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킵니다.
- 자바스크립트의 this는 함수가 호출되는 방식에 따라 this에 바인딩될 값, 즉. this 바인딩이 동적으로 결정됩니다.
- strict모드도 this바인딩에 영향을 줍니다.

결과적으로 this 바인딩은 함수가 호출되는 시점에 자바스크립트 엔진을 통해 암묵적으로 생성됩니다.

<br>

## 2. 함수 호출 방식과 this 바인딩

this 바인딩은 함수 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정됩니다.

\*\* Tips. 렉시컬 스코프는 객체 생성 시점에, this 바인딩은 함수 호출 시점에 결정됩니다.

- 함수 호출 방식은 다양합니다.
  1. 일반 함수 호출
  2. 메서드 함수 호출
  3. 생성자 함수 호출
  4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출

```jsx
// this 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.
const foo = function () {
 console.dir(this);
};

// 동일한 함수도 다양한 방식으로 호출할 수 있다.

// 1. 일반 함수 호출
// foo 함수를 일반적인 방식으로 호출
// foo 함수 내부의 this는 전역 객체 window를 가리킨다.
foo(); // window

// 2. 메서드 호출
// foo 함수를 프로퍼티 값으로 할당하여 호출
// foo 함수 내부의 this는 메서드를 호출한 객체 obj를 가리킨다.
const obj = { foo };
obj.foo(); // obj

// 3. 생성자 함수 호출
// foo 함수를 new 연산자와 함께 생성자 함수로 호출
// foo 함수 내부의 this는 생성자 함수가 생성한 인스턴스를 가리킨다.
new foo(); // foo {}

// 4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출
// foo 함수 내부의 this는 인수에 의해 결정된다.
const bar = { name: 'bar' };

foo.call(bar);   // bar
foo.apply(bar);  // bar
foo.bind(bar)(); // bar
```

<br>

### 1) 일반 함수 호출

기본적으로 `this`에는 전역 객체가 바인딩 됩니다.

>전역함수는 물론이고, 중첩 함수를 일반함수로 호출하면 함수 내부의 this에는 전역 객체가 바인딩됩니다.
```jsx
function foo() {
  console.log("foo's this:", this);
  function bar() {
    console.log("bar's this:", this);
  }
  bar(); // window
}
foo(); // window
```

- 여기서, this는 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수임으로, 일반함수에서 `this`는 의미가 없습니다.
- 따라서, 저번시간에 배운 것 처럼 `strict` 모드가 적용된 일반 함수의 `this`에서는 `undefined`가 바인딩됩니다.

>콜백함수는 어떻게 `this`가 바인딩 될까?
```jsx
var value = 10;
const example = {
  value: 100,
  method() {
    console.log(this); // example 객체 {value: 100, method: f}
    console.log(this.value); // 100

    function inner() {
      console.log(this); // window
      console.log(this.value); // 10
    }
    setTimeout(function () {
      console.log(this); // window
      console.log(this.value); // 10
    }, 100);
    inner();
  },
};
example.method();
```

콜백함수가 일반 함수로 호출된다면 콜백 함수 내부의 `this`에도 전역객체가 바인딩됩니다.
  - 어떤 함수라도 일반 함수로 호출한다면 `this`에 전역객체가 바인딩 됩니다. 하지만 이렇게되면 문제가 발생합니다. 외부함수인 메서드와 중첩함수나 콜백함수 같은 헬퍼 함수의 `this`가 일치하지 않게 됩니다. 이렇게 되면 헬퍼 함수의 역할을 제대로 못하게 됩니다


>메서드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메서드의 this 바인딩과 일치시키기 위한 방법은 다음과 같습니다.
```js
var value = 1;

const obj = {
  value: 100,
  foo() {
    // this 바인딩(obj)을 변수 that에 할당한다.
    const that = this;

    // 콜백 함수 내부에서 this 대신 that을 참조한다.
    setTimeout(function () {
      console.log(that.value); // 100
    }, 100);
  }
};

obj.foo();
```

>또는 화살표 함수를 사용해서 this 바인딩을 일치시킬 수도 있습니다.
```js
var value = 1;

const obj = {
  value: 100,
  foo() {
    // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
    setTimeout(() => console.log(this.value), 100); // 100
  }
};

obj.foo();
```
<br>

### 2) 메서드 호출

메서드 내부의 this에는 메서드를 호출한 객체. 즉, 메서드를 호출할 때 . 연산자 앞에 붙은 객체가 바인딩 됩니다.

```js
const person = {
  name: 'Lee',
  getName() {
    // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
    return this.name;
  }
};

// 메서드 getName을 호출한 객체는 person이다.
console.log(person.getName()); // Lee
```

- 메서드는 객체에 포함된 것이 아니라, 독립적으로 존재하는 별도의 객체입니다.
- 따라서, `getName` 프로퍼티가 가리티는 함수객체인 `getName` 메서드는 할당이 가능합니다.
  - 다른 객체의 프로퍼티에 할당하는 것으로 다른 객체의 메서드가 될 수도 있습니다.
  - 일반 변수에 할당하여 일반 함수로 호출될 수도 있습니다.
- 이 함수 객체는 함수 호출시에 어떤 객체에 `this`가 바인딩 될 것인지 정합니다.

❗️`person`객체의 `getName`프로퍼티가 가리키는 함수 객체는 `person`객체에 포함된 것이 아니라 **독립적으로 존재하는 별도의 객체**라는 것을 다시한번 상기해야합니다. (`getName`프로퍼티가 함수 객체를 가리키고 있을 뿐 입니다.

>`getName`메서드는 다른 객체의 프로퍼티에 할당하는 것으로 다른 객체의 메서드가 될 수도 있고 일반 변수에 할당하여 일반 함수로 호출될 수도 있습니다.
```js
const anotherPerson = {
  name: 'Kim'
};
// getName 메서드를 anotherPerson 객체의 메서드로 할당
anotherPerson.getName = person.getName;

// getName 메서드를 호출한 객체는 anotherPerson이다.
console.log(anotherPerson.getName()); // Kim

// getName 메서드를 변수에 할당
const getName = person.getName;

// getName 메서드를 일반 함수로 호출
console.log(getName()); // ''
// 일반 함수로 호출된 getName 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
// 브라우저 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 ''이다.
// Node.js 환경에서 this.name은 undefined다.
```

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/dabfc22a-2278-41f8-9289-703aa922455e)

<br>

### 4) Function.prototyppe.apply/call/bind 메서드에 의한 간접 호출

- apply와 call
  - apply와 call 메서드의 본질적인 기능은 함수를 호출하는 것입니다.
  - 함수를 호출하면서 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 this에 바인딩합니다.
