**TIL(Today I learn) 기록일** : 2023.12.05

# 21. 빌트인 객체

# 1. 자바스크립트 객체의 분류

- ⭐️ 표준 빌트인 객체
  - 표준 빌트인 객체는 ECMAScript 사양에 정의된 객체를 말하며, 애플리케이션 전역의 공통 기능을 제공합니다.
  - 표준 빌트인 객체는 ECMAScript 사양에 정의된 객체이므로 자바스크립트 실행 환경(브라우저 또는 Node.js 환경)과 관계없이 언제나 사용할 수 있습니다.
  - 표준 빌트인 객체는 전역 객체의 프로퍼티로서 제공됩니다. 따라서 별도의 선언 없이 전역 변수처럼 언제나 참조할 수 있습니다.
- ⭐️️️ 호스트 객체
  - 호스트 객체는 ECMAScript 사양에 정의되어 있지 않지만 자바스크립트 실행 환경(브라우저 환경 또는 Node.js 환경)에서 추가로 제공하는 객체를 말합니다.
  - 브라우저 환경에서는 DOM, BOM, Canvas, XMLHttpRequest, fetch, requestAnimationFrame, SVG, Web Storage, Web Component, Web Worker와 같은 클라이언트 사이드 Web API를 호스트 객체로 제공하고, Node.js 환경에서는 Node.js 고유의 API를 호스트 객체로 제공합니다. 
- ⭐️ 사용자 정의 객체
  - 사용자 정의 객체는 표준 빌트인 객체와 호스트 객체처럼 기본 제공되는 객체가 아닌 사용자가 직접 정의한 객체를 말합니다. 

# 2. 표준 빌트인 객체

 자바스크립트는 `Object`, `String`, `Number`, `Boolean`, `Symbol`, `Math`, `RegExp`, `Array`, `Map`, `Set`, `WeakMap`, `Function`, `Promise`, `Reflect`, `Proxy`, `JSON`, `Error` 등 40여개의 표준 빌트인 객체를 제공합니다.

`Math`, `Reflect`, `JSON`을 제외한 표준 빌트인 객체는 모두 인스턴스를 생성할 수 있는 생성자 함수 객체입니다. 생성자 함수 객체인 표준 빌트인 객체는 프로토타입 메서드와 정적 메서드를 제공하고 생성자 함수 객체가 아닌 표준 빌트인 객체는 정적 메서드만 제공합니다.

예를 들어, 표준 빌트인 객체인 `String`, `Boolean`, `Function`, `Array`, `Date`는 생성자 함수로 호출하여 인스턴스를 생성할 수 있습니다.

생성자 함수인 표준 빌트인 객체가 생성한 인스턴스의 프로토타입은 표준 빌트인 객체의 `prototype`프로퍼티에 바인딩된 객체입니다. 

>예를 들어 표준 빌트인 객체인 `String`을 생성자 함수로서 호출하여 생성한 `String`인스턴스의 프로토타입은 `String.prototype`입니다.
```js
// String 생성자 함수에 의한 String 객체 생성
const strObj = new String('Lee'); // String {"Lee"}

// String 생성자 함수를 통해 생성한 strObj 객체의 프로토타입은 String.prototype이다.
console.log(Object.getPrototypeOf(strObj) === String.prototype); // true
```

표준 빌트인 객체는 인스턴스 없이도 호출 가능한 빌트인 정적 메서드를 제공합니다.   

>예를 들어, 표준 빌트인 객체인 `Number`의 `prototype`프로퍼티에 바인딩된 객체, `Number,prototype`은 다양한 기능의 빌트인 프로토타입 메서드를 제공합니다. 이 프로토타입 메서드는 모든 `Number`인스턴스가 상속을 통해 사용할 수 있습니다. 그리고 표준 빌트인 객체인 `Number`는 인스턴스 없이 정적으로 호출할 수 있는 정적 메서드를 제공합니다.
```js
// Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(1.5); // Number {1.5}

// toFixed는 Number.prototype의 프로토타입 메서드다.
// Number.prototype.toFixed는 소수점 자리를 반올림하여 문자열로 반환한다.
console.log(numObj.toFixed()); // 2

// isInteger는 Number의 정적 메서드다.
// Number.isInteger는 인수가 정적(integer)인지 검사하여 그 결과를 Boolean으로 반환한다.
console.log(Number.isInteger(0.5)); // false
```

# 3. 원시값과 래퍼 객체

문자열이나 숫자, 불리언 등의 원시값이 있는데도 문자열, 숫자, 불리언 객체를 생성하는 `String`, `Number`, `Boolean` 등의 표준 빌트인 생성자 함수가 존재하는 이유는 무엇일까요?

>원시값은 객체가 아니므로 프로퍼티나 메서드를 가질 수 없는데도 원시값인 문자열이 마치 객체처럼 동작합니다. 
```js
const str = 'hello';

// 원시 타입인 문자열이 프로퍼티와 메서드를 갖고 있는 객체처럼 동작합니다.
console.log(str.length); // 5
console.log(str.toUpperCase()); // HELLO
```
이는 원시값인 문자열, 숫자, 불리언 값의 경우 이들 원시값에 대해 마치 객체처럼 마침표 표기법(또는 대괄호 표기법)으로 접근하면 자바스크립트 엔진이 일시적으로 원시값을 연관된 객체로 변환해 주기 때문입니다. 즉, 원시값을 객체처럼 사용하면 자바스크립트 엔진은 암묵적으로 연관된 객체를 생성하여 생성된 객체로 프로퍼티에 접근하거나 메서드를 호출하고 다시 원시값으로 되돌립니다. 
이처럼 문자열, 숫자, 불리언 값에 대해 객체처럼 접근하면 생성되는 임시 객체를 래퍼 객체(wrapper object)라합니다.

>예를 들어, 문자열에 대해 마침표 표기법으로 접근하면 그 순간 래퍼 객체인 String 생성자 함수의 인스턴스가 생성되고 문자열은 래퍼 객체의 [[StringData]] 내부 슬롯에 할당됩니다.
```js
const str = 'hi';

// 원시 타입인 문자열이 래퍼 객체인 String 인스턴스로 변환합니다.
console.log(str.length); // 2
console.log(str.toUpperCase()); // HI

// 래퍼 객체로 프로퍼티에 접근하거나 메서드를 호출한 후, 다시 원시값으로 되돌린다.
console.log(typeof str); // string
```
이때 문자열 래퍼 객체인 `String`생성자 함수의 인스턴스는 `String.prototype`의 메서드를 상속받아 사용할 수 있습니다.

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/e61f53ee-5a44-4ed7-a509-ec45f9e0d985)

그 후 래퍼 객체의 처리가 종료되면 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값으로 원래의 상태, 즉 식별자가 원시값을 갖도록 되돌리고 래퍼 객체는 가비지 컬렉션의 대상이 됩니다. 

```js
// ① 식별자 str은 문자열을 값으로 가지고 있다.
const str = 'hello';

// ② 식별자 str은 암묵적으로 생성된 래퍼 객체를 가리킨다.
// 식별자 str의 값 'hello'는 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된다.
// 래퍼 객체에 name 프로퍼티가 동적 추가된다.
str.name = 'Lee';

// ③ 식별자 str은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 갖는다.
// 이때 ②에서 생성된 래퍼 객체는 아무도 참조하지 않는 상태이므로 가비지 컬렉션의 대상이 된다.

// ④ 식별자 str은 새롭게 암묵적으로 생성된(②에서 생성된 래퍼 객체와는 다른) 래퍼 객체를 가리킨다.
// 새롭게 생성된 래퍼 객체에는 name 프로퍼티가 존재하지 않는다.
console.log(str.name); // undefined

// ⑤ 식별자 str은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 갖는다.
// 이때 ④에서 생성된 래퍼 객체는 아무도 참조하지 않는 상태이므로 가비지 컬렉션의 대상이 된다.
console.log(typeof str, str);
```

숫자 값도 마찬가지입니다. 숫자 값에 대해 마침표 표기법으로 접근하면 그 순간 래퍼 객체인 `Number`생성자 함수의 인스턴스가 생성되고 숫자를 래퍼 객체의 [[Number]] 내부 슬롯에 할당됩니다. 이때 래퍼 객체인 `Number`객체는 당연히 `Number.prototype`의 메서드를 상속받아 사용할 수 있습니다. 그 후, 래퍼 객체의 처리가 종료되면 래퍼 객체의 [[NumberData]] 내부 슬롯에 할당된 원시값을 되돌리고 래퍼 객체는 가비지 컬렉션의 대상이 됩니다.

```js
const num = 1.5;

// 원시 타입인 숫자 래퍼 객체인 String 객체로 변환됩니다.
console.log(num.toFixed()); // 2

// 래퍼 객체로 프로퍼티에 접근하거나 메서드를 호출한 후, 다시 원시 값으로 되돌린다.
console.log(typeof num, num); // number 1.5
```

불리언 값도 문자열이나 숫자와 마찬가지이지만 불리언 값으로 메서드를 호출하는 경우는 없으므로 그다지 유용하지 않습니다.

문자열, 숫자, 불리언, 심범 이외의 원시값, 즉 null과 undefined는 래퍼 객체를 생성하지 않습니다. 따라서 null과 undefined 값을 객체처럼 사용하면 에러가 발생합니다.


