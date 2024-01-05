**TIL(Today I learn) 기록일** : 2024. 01. 04  

# 34 이터러블

## 1. 이터레이션 프로토콜

ES6에서 도입된 이터레이션 프로토콜은 순회 가능한 데이터 컬렉션(자료구조)을 만들기 위해 ECMAScript 사양에 정의하여 미리 약속한 규칙입니다.
   
>❗️ ES6 이전의 순회 가능한 데이터 컬렉셕, 즉 배열, 문자열, 유사 배열 객체, DOM 컬렉션 등은 통일된 규약없이 각자 나름의 구조를 가지고 `for 문`, `for...in 문`, `forEach 메서드` 등 다양한 방법으로 순회할 수 있었습니다. 
ES6에서는 순회 가능한 데이터 컬렉션을 이터레이션 프로토콜을 준수하는 이터러블로 통일하여 `for...of문`, `스프레드 문법`, `배열 디스트럭처링 할당`의 대상으로 사용할 수 있도록 일원화 했습니다.

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/cedaaa3d-61ce-421e-b922-c385e4493f0b)


<br/>

> ❗️ 이터러블 프로토콜
Well-known Symbol 인 Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속 받은 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다. 이러한 규약을 이터러블 프로토콜이라 하며, 이터러블 프로토콜을 준수한 객체를 이터러블이라 한다. 이터러블은 for...of문으로 순회할 수 있으며 스프레드문법과 
배열 디스트럭처링 할당의 대상으로 사용할 수 있다.


>❗️ 이터레이터 프로토콜
이터러블의 Symbol.iterator 메서드를 호출하며 이터레이터 프로토콜을 준수한 이터레이터를 반환한다.
이터레이터는 next 메서드를 소유하며 next 메서드를 호출하면 이터러블을 순회하며 value와 done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환한다.   이러한 규약을 이터레이터 프로토콜이라 하며, 이터레이터 프로토콜을 준수한 객체를 이터레이터라 한다.   
이터레이터는 이터러블의 요소를 탐색하기 위한 포인터 역할을 한다.


![image](https://user-images.githubusercontent.com/76567238/220304067-c717ca5a-0c5b-4051-b04c-82cc1d34c7e8.png)

   

### 1) 이터러블
이터러블은 `Symbol.iterator`를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체를 말합니다.   
>❓이터러블인지 확인하는 함수는 다음과 같이 구현할 수 있습니다.
```js
const isIterable = v => v !== null && typeof v[Symbol.iterator] === 'function';

// 배열, 문자열, Map, Set 등은 이터러블이다.
isIterable([]);        // -> true
isIterable('');        // -> true
isIterable(new Map()); // -> true
isIterable(new Set()); // -> true
isIterable({});        // -> false
```
예를 들어, 배열은 `Array.prototype`의 `Symbol.iterator` 메서드를 상속받은 이터러블입니다.   
이터러블은 `for...of`문으로 순회할 수 있으며, `스프레드 문법`과 `배열 디스트럭처링 할당`의 대상으로 사용할 수 있다.   
   
```js
const array = [1, 2, 3];

// 배열은 Array.prototype의 Symbol.iterator 메서드를 상속받는 이터러블이다.
console.log(Symbol.iterator in array); // true

// 이터러블인 배열은 for...of 문으로 순회 가능하다.
for (const item of array) {
  console.log(item);
}

// 이터러블인 배열은 스프레드 문법의 대상으로 사용할 수 있다.
console.log([...array]); // [1, 2, 3]

// 이터러블인 배열은 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.
const [a, ...rest] = array;
console.log(a, rest); // 1, [2, 3]
```
>스프레드 프로퍼티 제안은 일반 객체에 스프레드 문법의 사용을 허용한다.
```js
const obj = { a: 1, b: 2 };

// 스프레드 프로퍼티 제안(Stage 4)은 객체 리터럴 내부에서 스프레드 문법의 사용을 허용한다.
console.log({ ...obj }); // { a: 1, b: 2 }
```
### 2) 이터레이터

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/c4cd5f06-41cc-43f4-8c07-0a9e06372243)

이터러블의 `Symbol.iterator` 메서드를 호출하면 이터레이터 프로토콜을 준수한 `이터레이터`를 반환합니다. 
이터러블의 `Symbol.iterator` 메서드가 반환한 `이터레이터`는 `next` 메서드를 갖습니다.
```js
// 배열은 이터러블 프로토콜을 준수한 이터러블이다.
const array = [1, 2, 3];

// Symbol.iterator 메서드는 이터레이터를 반환한다.
const iterator = array[Symbol.iterator]();

// Symbol.iterator 메서드가 반환한 이터레이터는 next 메서드를 갖는다.
console.log('next' in iterator); // true
```

<br>

이터레이터의 `next` 메서드는 이터러블의 각 요소를 순회하기 위한 포인터의 역할을 합니다.
즉, `next` 메서드를 호출하면 이터러블을 순차적으로 한 단계씩 순회하며 순회 결과를 나타내는 `이터레이터 리절트 객체`를 반환합니다.
```js
// 배열은 이터러블 프로토콜을 준수한 이터러블이다.
const array = [1, 2, 3];

// Symbol.iterator 메서드는 이터레이터를 반환한다. 이터레이터는 next 메서드를 갖는다.
const iterator = array[Symbol.iterator]();

// next 메서드를 호출하면 이터러블을 순회하며 순회 결과를 나타내는 이터레이터 리절트 객체를
// 반환한다. 이터레이터 리절트 객체는 value와 done 프로퍼티를 갖는 객체다.
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```
이터레이터의 next 메서드가 반환하는 이터레이터 리절트 객체의 value 프로퍼티는 현재 순회 중인 이터러블의 값을 나타내며 done 프로퍼티는 이터러블의 순회 완료 여부를 나타낸다.     
   
<br> 
   
## 2. 빌트인 이터러블

자바스크립트는 이터레이션 프로토콜을 준수한 객체인 빌트인 이터러블을 제공합니다. 다음의 표준 빌트인 객체들은 빌트인 이터러블입니다.
   
![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/ae158eb4-fa43-4fb2-b212-e63a1c99f487)
   
## 3. for...of 문    
`for..of 문`은 이터러블을 순회하면서 `이터러블의 요소`를 `변수`에 할당합니다.   
`for...of 문`의 문법은 다음과 같다.
```js
for (변수선언문 of 이터러블) {...}
```
`for...of문`은 `for...in 문`의 형식과 매우 유사합니다.
```
for (변수선언문 in 객체) {...}
```

`for...in 문`은 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서 `프로퍼티 어트리뷰트 [[Enumerable]]`의 값인 `true`인 프로퍼티를 순회하며 열거합니다. 이때 프로퍼티키가 `심벌`인 프로퍼티는 열거하지 않습니다.   
    
`for...of 문`은 내부적으로 이터레이터의 `next` 메서드를 호출하여 이터러블을 순회하며 `next` 메서드가 반환한 `이터레이터 리절트 객체`의 `value` 프로퍼티 값을 `for...of문`의 변수에 할당한다.   
그리고 `이터레이터 리절트 객체`의 done 프로퍼티 값이 `false` 이면 이터러블의 순회를 계속하고 `true`이면 이터러블의 순회를 중단합니다.   
```js
for (const item of [1, 2, 3]) {
  // item 변수에 순차적으로 1, 2, 3이 할당된다.
  console.log(item); // 1 2 3
}
```

<br>

>위 예제의 for....of 문의 내부 동작을 for문으로 표현하면 다음과 같습니다.
```js
// 이터러블
const iterable = [1, 2, 3];

// 이터러블의 Symbol.iterator 메서드를 호출하여 이터레이터를 생성한다.
const iterator = iterable[Symbol.iterator]();

for (;;) {
  // 이터레이터의 next 메서드를 호출하여 이터러블을 순회한다. 이때 next 메서드는 이터레이터 리절트 객체를 반환한다.
  const res = iterator.next();

  // next 메서드가 반환한 이터레이터 리절트 객체의 done 프로퍼티 값이 true이면 이터러블의 순회를 중단한다.
  if (res.done) break;

  // 이터레이터 리절트 객체의 value 프로퍼티 값을 item 변수에 할당한다.
  const item = res.value;
  console.log(item); // 1 2 3
}
```
