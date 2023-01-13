# 📂 20장 strict mode

## strict mode가 추가된 이유
-잠재적인 오류를 발생시키기 어려운 개발 환경을 만들고 그 환경에서 개발하는 것이 좀 더 근본적인 해결책을 만들기 위해서

- 자바스크립트 언어의 문법을 좀 더 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킴.

## strict mode의 적용

```js
'use strict'; // 선두에 선언한다.
```

- 해당 함수와 중첩함수에만 적용하고 싶으면?

```js
function foo() { 
  'use strict'; // 선두에 선언하지 않으면 제대로 동작하지 않음.
  // some code...
}
```

## strict mode 활용

### 전역에 strict mode를 적용하는 것을 피하자.
- 스크립트 단위로 적용된 strict mode는 다른 스크립트에 영향을 주지 않고 해당 스크립트에 한정되어 적용
- strict mode와 non-strict mode 스크립트를 혼용하는 것은 오류를 발생시킬 수 있기 때문에
- 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode를 적용


### 함수 단위로 strict mode 적용을 피하자.

- strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직

- 함수마다 strict mode를 다르게 적용하는 것은 바람직 하지 않고, 모든 함수에 일일이 strict mode를 적용하는 것도 번거로운 일
- strict mode가 적용된 함수가 참조할 함수 외부 컨텍스트에 strict mode를 적용하지 않는다면 이 또한 문제

## strict mode가 발생하는 에러

### 암묵적 전역

- 선언하지 않은 변수를 참조하면 ReferenceError 발생

```js
(function () {
  'use strict';

  x = 1;
  console.log(x) // ReferenceError
})
```
### deltet연산자로 변수, 함수, 매개변수 삭제

- deltet연산자로 변수, 함수, 매개변수 삭제하면 SyntaxError 발생


```js
(function () {
  'use strict';

  var x = 1;
  // 변수 삭제
  delete x; // SyntaxError 

  function foo(a) {
    // 매개변수 삭제
    delete a; // SyntaxError 
  }
  // 함수 삭제
  delete foo; // SyntaxError 
})
```

### 매개변수 이름의 중복

- 매개변수 이름의 중복 사용하면 SyntaxError 발생

```js
(function () {
  'use strict';

  function foo(x,x) {
    return x+x
  }
  console.log(foo(1,2)) //SyntaxError
})
```

### with문의 사용
  - with문을 사용하면 SyataxError 발생
  - with문은 전달된 객체를 스코프 체인에 추가함.
  - 동일한 객체의 프로퍼티를 반복해 사용할 때 객체 이름을 생략 할 수 있어 코드가 간단해지는 장점이 있지만 성능과 가독성이 나빠 문제가 있기 때문에 권장하지 않음.

```js
(function () {
  'use strict';

  with({x:1}) {
    console.log(x) //SyntaxError
  }
})
```

## strict mode 적용에 의한 변화
### 일반 함수 this

- strict mode에서 함수를 일반 함수로 호출하면 this에 undefined가 바인딩 됨. (에러 발생 X)

```js
(function () {
  'use strict';

  function foo() {
    console.log(this) // undefined
  }
  foo();
  
  function Foo() {
    console.log(this) // Foo
  }
  new Foo();
}());
```

### arguments 객체
- strict mode에선 매개 변수에 전달된 인수를 재할당하여 변경해도 arguments객체에 반영되지 않음

```js
(function (a) {
  'use strict';
  // 매개 변수에 전달된 인수를 재할당하여 변경
  a = 2

  // arguments객체에 반영되지 않음
  console.log(arguments) // {0: 1, length: 1}
}(1));
```