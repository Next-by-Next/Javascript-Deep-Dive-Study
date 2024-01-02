**TIL(Today I learn) 기록일** : 2024. 01 . 01   


# 33장 Symbol

<br>

## 1. 심벌이란?

심범은 ES6에서 도입된 7번째 데이터 타입으로 변경 불가능한 원시 타입의 값입니다. 심벌 값은 다른 값과 중복되지 않는 유일무이한 값입니다.
따라서 주로 **이름의 충돌 위험이 없는 유일한 프로퍼티 키를 만들기 위해 사용합니다.**

📌 심벌은 프로퍼티 키로도 사용할 수 있습니다.

---

<br>

## 2. 심벌 값의 생성

### 1) Symbol 함수

심벌 값은 Symbol 함수를 호출하여 생성합니다. 
이때 생성된 심벌 값은 외부로 노출되지 않아 확인할 수 없으며, 다른 값과 절대 중복되지 않는 유일무이한 값입니다.    

```js
// Symbol 함수를 호출하여 유일무이한 심벌 값을 생성한다.
const mySymbol = Symbol();
console.log(typeof mySymbol); // symbol

// 심벌 값은 외부로 노출되지 않아 확인할 수 없다.
console.log(mySymbol); // Symbol()
```

`Symbol` 함수는, `String`, `Number`, `Boolean` 생성자함수와 달리 new 연산자와 함께 호출하지 않습니다.
`new`연산자와 함께 `생성자 함수` 또는 `클래스`를 호출하면 `객체(인스턴스)`가 생성되지만 심벌 값은 `변경 불가능한 원시 값`이다.

`Symbol` 함수는, 선택적으로 문자열을 인수로 전달할 수 있습니다. 이 문자열은 생성된 심벌 값에 대한 설명으로 디버깅 용도로만 사용되며, 심벌 값 생성에 어떠한 영향도 주지 않습니다.

```js
// 심벌 값에 대한 설명이 같더라도 유일무이한 심벌 값을 생성한다.
const mySymbol1 = Symbol('mySymbol');
const mySymbol2 = Symbol('mySymbol');

console.log(mySymbol1 === mySymbol2); // false
```

<br>

❗️ 심벌 값도 문자열, 숫자, 불리언과 같이 객체처럼 접근하면 암묵적으로 래퍼 객체를 생성합니다.

```js
const mySymbol = Symbol('mySymbol');

// 심벌도 레퍼 객체를 생성한다
console.log(mySymbol.description); // mySymbol
console.log(mySymbol.toString()); // Symbol(mySymbol)
```

> 심벌 값은 암묵적으로 문자열이나 숫자 타입으로 변환되지 않는다.

```js
const mySymbol = Symbol();

// 심벌 값은 암묵적으로 문자열이나 숫자 타입으로 변환되지 않는다.
console.log(mySymbol + ''); // TypeError: Cannot convert a Symbol value to a string
console.log(+mySymbol); // TypeError: Cannot convert a Symbol value to a number
```

> 단 불리언 타입으로는 암묵적으로 타입 변환된다. 이를 통해 if 문 등에서 존재 확인이 가능하다.

```js
const mySymbol = Symbol();

// 불리언 타입으로는 암묵적으로 타입 변환된다.
console.log(!!mySymbol); // true

// if 문 등에서 존재 확인을 위해 사용할 수 있다.
if (mySymbol) console.log('mySymbol is not empty.');
```

### 2) Symbol.for / Symbol.keyFor 메서드

`Symbol.for` 메서드는 인수로 전달받은 문자열을 키로 사용하여 키와 심벌 값의 쌍들이 저장되어 있는 전역 심벌 레지스트리에서 해당 키와 일치하는 심벌 값을 검색합니다.

```js
// 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 없으면 새로운 심벌 값을 생성
const s1 = Symbol.for('mySymbol');
// 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 있으면 해당 심벌 값을 반환
const s2 = Symbol.for('mySymbol');

console.log(s1 === s2); // true
```

> Symbol.keyFor 메서드를 사용하면 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출할 수 있다.

```js
// 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 없으면 새로운 심벌 값을 생성
const s1 = Symbol.for('mySymbol');
// 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출
Symbol.keyFor(s1); // -> mySymbol

// Symbol 함수를 호출하여 생성한 심벌 값은 전역 심벌 레지스트리에 등록되어 관리되지 않는다.
const s2 = Symbol('foo');
// 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출
Symbol.keyFor(s2); // -> undefined
```

## 3. 심벌과 상수

>예를 들어, 4방향 (위, 아래, 왼쪽, 오른쪽)을 나타내는 상수를 정의한다고 예를 들어봅시다.

```js
// 위, 아래, 왼쪽, 오른쪽을 나타내는 상수를 정의한다.
// 이때 값 1, 2, 3, 4에는 특별한 의미가 없고 상수 이름에 의미가 있다.
const Direction = {
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
};

// 변수에 상수를 할당
const myDirection = Direction.UP;

if (myDirection === Direction.UP) {
  console.log('You are going UP.');
}
```

위 예제와 같이 값에는 특별한 의미가 없고 상수 이름 자체에 의미가 있는 경우가 있습니다.    
이때 문제는 상수 값 1,2,3,4가 변경될 수 있으며, 다른 변수 값과 중복될 수도 있다는 것입니다.      
이러한 경우 변경/중복될 가능성이 있는 무의미한 상수 대신 중복될 가능성이 없는 유일무이한 심벌 값을 사용할 수 있습니다.

```js
// 위, 아래, 왼쪽, 오른쪽을 나타내는 상수를 정의한다.
// 중복될 가능성이 없는 심벌 값으로 상수 값을 생성한다.
const Direction = {
  UP: Symbol('up'),
  DOWN: Symbol('down'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('right'),
};

const myDirection = Direction.UP;

if (myDirection === Direction.UP) {
  console.log('You are going UP.');
}
```

> enum

```js
enum은 명명된 숫자 상수의 집합으로 열거형이라고 부른다. 자바스크립트는 enum을 지원하지는 않지만 (타입스크립트에서는 지원함)
enum을 흉내 내어 사용하려면 다음과 같이 객체의 변경을 방지하기 위해 객체를 동결하는 Object.freeze메서드와 심벌 값을 사용한다.
  
  const Direction = Object.freeze({
    UP: Symbol('up'),
    DOWN: Symbol('down'),
    LEFT: Symbol('left'),
    RIGHT: Symbol('right')
  });

  const myDirection = Direction.UP;

  if (myDirection === Direction.UP) {
    console.log('You are going UP.');
  }
  
```

<br>

---
