**TIL(Today I learn) 기록일** : 2024. 01. 04  

# 34 이터러블

## 1. 이터레이션 프로토콜

ES6에서 도입된 이터레이션 프로토콜은 순회 가능한 데이터 컬렉션(자료구조)을 만들기 위해 ECMAScript 사양에 정의하여 미리 약속한 규칙입니다.
   
>❗️ ES6 이전의 순회 가능한 데이터 컬렉셕, 즉 배열, 문자열, 유사 배열 객체, DOM 컬렉션 등은 통일된 규약없이 각자 나름의 구조를 가지고 `for 문`, `for...in 문`, `forEach 메서드` 등 다양한 방법으로 순회할 수 있었습니다. 
ES6에서는 순회 가능한 데이터 컬렉션을 이터레이션 프로토콜을 준수하는 이터러블로 통일하여 `for...of문`, `스프레드 문법`, `배열 디스트럭처링 할당`의 대상으로 사용할 수 있도록 일원화 했습니다.



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


## 4. 이터러블과 유사 배열 객체

>❓ 유사 배열 객체
>유사 배열 객체는 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 `length` 프로퍼티를 갖는 객체를 말합니다.
>유사 배열 객체는 length 프로퍼티를 갖기 때문에 `for` 문으로 순회할 수 있고, 인덱스를 나타내는 숫자 형식의 문자열을 프로퍼티 키로 가지므로 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있습니다.
```js
// 유사 배열 객체
const arrayLike = {
   0: 1,
   1: 2,
   2: 3,
   length: 3
};

// 유사 배열 객체는 length 프로퍼티를 갖기 때문에 for 문으로 순회할 수 있습니다.
for(let i = 0; i < arrayLike.length; i++) {
   // 유사 배열 객체는 마치 배열처럼 인덱스 프로퍼티 값에 접근 할 수 있습니다.
   console.log(arrayLike[i]); // 1 2 3
}
```

유사 배열 객체는 이터러블이 아닌 일반 객체이기 때문에 `Symbol.iterrater 메서드가 없기 때문에 `for...of`문으로 순회할 수 없습니다.

```js
// 유사 배열 객체는 이터러블이 아니기 때문에 for...of 문으로 순회할 수 없습니다.
for( const item of arrayLike) {
   console.log(item); // 1 2 3
} // -> typeError : arrayLike is not iterable
```


## 5. 이터레이션 프로토콜의 필요성


- 이터레이션 프로토콜을 준수하는 이터러블
   - Array
   - String
   - Map
   - Set
   - TypedArray
   - DOM 컬렉션(NodeList, HTMLCollection)
   - arguments    

ES6에서는 순회 가능한 데이터 컬렉션을 이터레이션 프로토콜을 준수하는 이터러블로 통일하여 for...of문, 스프레드 문법, 배열 디스트럭처링 할당의 대상으로 사용할 수 있도록 일원화했습니다.

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/cedaaa3d-61ce-421e-b922-c385e4493f0b)


### 1) 사용자 정의 이터러블 구현

이터레이션 프로토콜을 준수하지 않는 일반 객체도 이터레이션 프로토콜을 준수하도록 구현하면 사용자 정의 이터러블이 됩니다.
>예를 들어, 피보나치 수열(1, 2, 3, 5, 8, 13..)을 구현한 간단한 사용자 정의 이터러블을 구현해봅시다.
```js
// 피보나치 수열을 구현한 사용자 정의 이터러블
const fibonacci = {
  // Symbol.iterator 메서드를 구현하여 이터러블 프로토콜을 준수한다.
  [Symbol.iterator]() {
    let [pre, cur] = [0, 1]; // "36.1. 배열 디스트럭처링 할당" 참고
    const max = 10; // 수열의 최대값

    // Symbol.iterator 메서드는 next 메서드를 소유한 이터레이터를 반환해야 하고
    // next 메서드는 이터레이터 리절트 객체를 반환해야 한다.
    return {
      next() {
        [pre, cur] = [cur, pre + cur]; // "36.1. 배열 디스트럭처링 할당" 참고
        // 이터레이터 리절트 객체를 반환한다.
        return { value: cur, done: cur >= max };
      }
    };
  }
};

// 이터러블인 fibonacci 객체를 순회할 때마다 next 메서드가 호출된다.
for (const num of fibonacci) {
  console.log(num); // 1 2 3 5 8
}
```

>사용자 정의 이터러블은 이터레이션 프로토콜을 준수하도록 `Symbol.iterator` 메서드를 구현하고 `Symbol.iterator` 메서드가 `next` 메서드를 갖는 이터레이터를 반환하도록합니다. 그리고 이터레이터의 `next` 메서드는 `done` 과 `value` 프로퍼티를 가지는 이터레이터 리절트 객체를 반환합니다. `for...of` 문은 `done` 프로퍼티가 `true`가 될 때까지 반복하며 `done` 프로퍼티가 `true`가 되면 반복을 중지합니다. 이터러블은 `for...of`문뿐만 아니라 스프레드 문법, 배열 디스트럭처링 할당에도 사용할 수 있습니다.   
```js
// 이터러블은 스프레드 문법의 대상이 될 수 있다.
const arr = [...fibonacci];
console.log(arr); // [ 1, 2, 3, 5, 8 ]

// ⭐️ 이터러블은 배열 디스트럭처링 할당의 대상이 될 수 있다.
const [first, second, ...rest] = fibonacci;
console.log(first, second, rest); // 1 2 [ 3, 5, 8 ]
```

### 2) 이터러블을 생성하는 함수
앞의 예제에서 수열의 최대값을 외부에서 전달할 수 있도록 수정해 봅시다.

>수열의 최대값을 인수로 전달받아 이터러블을 반환하는 함수를 만들면 됩니다.
```js
// 피보나치 수열을 구현한 사용자 정의 이터러블을 반환하는 함수. 수열의 최대값을 인수로 전달받는다.
const fibonacciFunc = function (max) {
  let [pre, cur] = [0, 1];

  // Symbol.iterator 메서드를 구현한 이터러블을 반환한다.
  return {
    [Symbol.iterator]() {
      return {
        next() {
          [pre, cur] = [cur, pre + cur];
          return { value: cur, done: cur >= max };
        }
      };
    }
  };
};

// 이터러블을 반환하는 함수에 수열의 최대값을 인수로 전달하면서 호출한다.
for (const num of fibonacciFunc(10)) {
  console.log(num); // 1 2 3 5 8
}
```

### 3) 이터러블이면서 이터레이터인 객체를 생성하는 함수

이터레이터를 생성하려면 이터러블의 `Symbol.iterator`메서드를 호출해야 합니다.

```js
// fibonacciFunc 함수는 이터러블을 반환한다.
const iterable = fibonacciFunc(5);
// 이터러블의 Symbol.iterator 메서드는 이터레이터를 반환한다.
const iterator = iterable[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false}
console.log(iterator.next()); // { value: 2, done: false}
console.log(iterator.next()); // { value: 3, done: false}
console.log(iterator.next()); // { value: 4, done: true}
```

이터러블이면서 이터레이터인 객체를 생성하면 `Symbol.iterator`메서드를 호출하지 않아도 됩니다. 다음 객체는 `Symbol.iterator`메서드와 `next` 메서드를 소유한 이터러블이면서 이터레이터입니다. `Symbol.iterator`메서드는 `this`를 반환하므로 `next`메서드를 갖는 이터레이터를 반환합니다.     

```js
// 이터러블이면서 이터레이터인 객체
// 이터레이터를 반환하면 Symbol.iterator 메서드와 이터레이션 리절트 객체를 반환하는 next 메서드를 소유한다.
{
   [Symbol.iterator]() { return this;},
   next() {
      return { value: any, done: boolean}
}
}
```

>앞에서 살펴본 `fibonacciFunc`함수를 이터러블이면서 이터레이터인 객체를 생성하여 반환하는 함수로 변경해봅시다.
```js
const fibonacciFunc = function (max) {
   let [pre, cur] = [0, 1];

// Symbol.iterator 메서드와 next 메서드를 소유한 이터러블이면서 이터레이터인 객체를 반환
return {
   [Symbol.iterator]() {return this;}
   // next 메서드는 이터레이터 리절트 객체를 반환
   next() {
      [pre, cur] = [cur, pre + cur]
      return { value : cur, done: cur >= max };
     }
   }
}

let iter = fibonacciFunc(10);

// iter는 이터러블이므로 for....for 문으로 순회할 수 있습니다.
for (const num of iter) {
   console.log(num); // 1 2 3 5 8
}

// iter는 이터러블이면서 이터레이터입니다.
iter = fibonacciFunc(10);

// iter는 이터레이터이므로 이터레이션 리절트 객체를 반환하는 next 메서드를 소유합니다.

console.log(iter.next()); // { value: 1, done: false}
console.log(iter.next()); // { value: 2, done: false}
console.log(iter.next()); // { value: 3, done: false}
console.log(iter.next()); // { value: 5, done: false}
console.log(iter.next()); // { value: 8, done: false}
console.log(iter.next()); // { value: 13, done: true}

```


