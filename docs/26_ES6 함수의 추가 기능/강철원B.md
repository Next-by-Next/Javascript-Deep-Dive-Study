**TIL(Today I learn) 기록일** : 2023.12.26 

# ES6 함수의 추가 기능  

## 3. 화살표 함수

### 3) 화살표 함수와 this

화살표 함수가 일반 함수와 구별되는 가장 큰 특징은 바로 `this`입니다.    
화살표 함수의 `this`는 일반 함수의 `this`와 다르게 동작합니다. 이는 콜백 함수 내부의 `this` 문제 즉 콜백 함수 내부의 this가 외부 함수의 `this`와 다르기 때문에 발생하는 문제를 해결하기 위해 의도적으로 설계된 것입니다.      


#### ❗️ 콜백 함수 내부의 `this`문제

일반 함수로서 호출되는 모든 함수 내부의 this는 전역 객체를 가리킵니다.   
동일한 조건에서 strict mode일 경우 내부의 this에는 undefined가 바인딩됩니다.    
반면 화살표 함수는 함수 자체의 this 바인딩이 없고, 상위 스코프의 this를 그대로 참조합니다.    

```js
// 화살표 함수는 상위 스코프의 this를 참조한다.
() => this.x;

// 익명 함수에 상위 스코프의 this를 주입한다. 위 화살표 함수와 동일하게 동작한다.
(function () { return this.x; }).bind(this);
```

```js
// 중첩 함수 foo의 상위 스코프는 즉시 실행 함수다.
// 따라서 화살표 함수 foo의 this는 상위 스코프인 즉시 실행 함수의 this를 가리킨다.
(function () {
  const foo = () => console.log(this);
  foo();
}).call({ a: 1 }); // { a: 1 }

// bar 함수는 화살표 함수를 반환한다.
// bar 함수가 반환한 화살표 함수의 상위 스코프는 화살표 함수 bar다.
// 하지만 화살표 함수는 함수 자체의 this 바인딩을 갖지 않으므로 bar 함수가 반환한
// 화살표 함수 내부에서 참조하는 this는 화살표 함수가 아닌 즉시 실행 함수의 this를 가리킨다.
(function () {
  const bar = () => () => console.log(this);
  bar()();
}).call({ a: 1 }); // { a: 1 }
```

>화살표 함수가 전역 함수라면 this는 전역 객체를 가리킵니다.

```js
// 전역 함수 foo의 상위 스코프는 전역이므로 화살표 함수 foo의 this는 전역 객체를 가리킨다.
const foo = () => console.log(this);
foo(); // window
```

메서드로 사용할 때 역시 화살표 함수의 this는 상위 스코프를 가리키므로 사용하지 않는 것이 좋습니다.    

대신 ES6 메서드 축약 표현을 사용하는 것이 좋습니다.    

```js
// Good
const person = {
  name: 'Lee',
  sayHi() {
    console.log(`Hi ${this.name}`);
  }
};

person.sayHi(); // Hi Lee
```

### 4) super
>화살표 함수의 super는 this와 마찬가지로 상위 스코프의 super를 참조합니다.
```js
class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi! ${this.name}`;
  }
}

class Derived extends Base {
  // 화살표 함수의 super는 상위 스코프인 constructor의 super를 가리킨다.
  sayHi = () => `${super.sayHi()} how are you doing?`;
}

const derived = new Derived('Lee');
console.log(derived.sayHi()); // Hi! Lee how are you doing?
```

### 5) arguments   

>화살표 함수의 arguments 역시 상위 스코프의 arguments를 참조합니다.
```js
(function () {
  // 화살표 함수 foo의 arguments는 상위 스코프인 즉시 실행 함수의 arguments를 가리킨다.
  const foo = () => console.log(arguments); // [Arguments] { '0': 1, '1': 2 }
  foo(3, 4);
}(1, 2));

// 화살표 함수 foo의 arguments는 상위 스코프인 전역의 arguments를 가리킨다.
// 하지만 전역에는 arguments 객체가 존재하지 않는다. arguments 객체는 함수 내부에서만 유효하다.
const foo = () => console.log(arguments);
foo(1, 2); // ReferenceError: arguments is not defined
```


## 4. Rest 파라미터
화살표 함수로 가변 인자 함수를 구현해야 할 때는 반드시 Rest 파라미터를 사용해야 합니다.
Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받습니다.
```js
function foo(...rest) {
    //매게변수 rest는 인수들의 목록을 배열로 전달받는 Rest 파라미터다.
    console.log(rest); // [1,2,3,4,5]
}

foo(1,2,3,4,5);
```
- 일반 매개변수와 Rest 파라미터는 함께 사용할 수 있다. 이때 함수에 전달된 인수들은 매개변수와 Rest 파라미터에 순차적으로 할당된다.
- Rest 파라미터는 반드시 마지막 파라미터이어야 한다.
- Rest 파라미터는 단 하나만 선언할 수 있다.
- 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 length 프로퍼티에 영향을 주지 않는다.


## 5. 매개변수 기본값

>매개 변수에 기본값을 설정해서 별도로 할당되지 않아도 에러 없이 사용 가능합니다.
```js
function sum(x = 0, y = 0) {
  return x + y;
}

console.log(sum(1, 2)); // 3
console.log(sum(1));    // 1
```

>매개변수에 인수를 전달하지 않았을 경우와 undefined를 전달한 경우에만 유효
```js
function logName(name = 'Lee') {
  console.log(name);
}

logName();          // Lee
logName(undefined); // Lee
logName(null);      // null
```

>Rest 파라미터는 기본값 지정이 불가능
```js
function foo(...rest = []) {
  console.log(rest);
}
// SyntaxError: Rest parameter may not have a default initializer
```

>매개변수 기본값은 함수 객체의 length 프로퍼티와 arguments 객체에 아무런 영향이 없습니다.
```js
function sum(x, y = 0) {
  console.log(arguments);
}

console.log(sum.length); // 1

sum(1);    // Arguments { '0': 1 }
sum(1, 2); // Arguments { '0': 1, '1': 2 }
```



