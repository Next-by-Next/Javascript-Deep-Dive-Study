**TIL(Today I learn) 기록일** : 2023.11.03 금

# 7장 연산자 📑   

### 목차

[1. 연산자](#1-연산자)   
[2. 산술 연산자](#2-산술-연산자)   
[3. 비교 연산자](#3-비교-연산자)   
[4. 삼항 조건 연산자](#4-삼항-조건-연산자)   
[5. 논리 연산자](#5-논리-연산자)   

<br>

## 1. 연산자

연산자는 하나 이상의 표현식을 대상으로 산술, 할당, 비교, 논리, 타입, 지수 연산등을 수행해 하나의 값을 만든다.


```js
// 산술 연산자
5*4 // 20

// 문자열 연결 연산자
'My name is' + 'Lee' // 'My name is one'

// 할당 연산자
color = 'red' // -> 'red'

// 비교 연산자
3 > 5 // false

// 논리 연산자
true && false //  false

// 타입 연산자
typeof 'Hi' // string
```

**연산자는 값으로 평가된 피연산자를 연산해 새로운 값을 만든다.**

<br>

## 2. 산술 연산자

산술 연산자는 피연산자를 대상으로 수학ㅈ거 계산을 수행해 새로운 숫자 값을 만든다.    
**산술 연산이 불가능한 경우, NaN을 반환한다.**

| 단항 산술 연산자 | 의미 | 부수 효과|
| :-: | - | :-: |
| ++| 증가 | O |
| --| 감소| O|
| + | 어떠한 효과도 없다. 음수를 양수로 반전하지도 않는다.|X|
| - | 양수를 음수로, 음수를 양수로 반전한 값을 반환한다.| X|

```js
var x = 1;

// ++ 연산자는 피연산자의 값을 변경하는 암묵적 할당이 이뤄진다.
x++;  // x = x + 1;
console.log(x); // 2

// -- 연산자는 피연산자의 값을 변경하는 암묵적 할당이 이뤄진다.
x--; // x = x - 1;
console.log(x); // 1
```

- 증가/감소(++/--) 연산자는 위치에 의미가 있다.

![image](https://user-images.githubusercontent.com/76567238/178997721-5f9dac9d-8dce-4aef-8531-8adc802581c8.png)
![image](https://user-images.githubusercontent.com/76567238/178997786-4ebe1ac8-7950-4180-a46b-1bb2c739fb9e.png)


<br>

📌 숫자 타입이 아닌 피연산자에 + 단항 연산자를 사용하면 피연산자를 숫자 타입으로 변환하여 반환한다.    
**이때 피연산자를 변경하는 것은 아니고 부호를 반전한 값을 생성해 반환한다.**

>단항자는 부호를 반전시킨다.
```js
-(-10); // 10
```
>문자열을 숫자로 타입 변환
```js
-'10'; // -10
```

>불리언 값을 숫자로 타입 변환한다.
```js
-true; // -1
```

>문자열은 숫자로 타입 변환할 수 없으므로 NaN을 반환한다.
```js
-'Hello'; // NaN
```

#### 🥎 문자열 연결 연산자
**+연산자는 피연산자 중 하나 이상이 문자열인 경우 문자열 연결 연산자로 동작한다.**   
그 외의 경우는 산술 연산자로 동작한다.

>문자열 연결 연산자
```js
'1' + 2; // '12'
1 + '2'; // '12'
```

>산술 연산자
```js
1 + 2; // 3
```

>true는 1로 타입 변환된다.
```js
1 + true; // 2
```

>false는 0으로 타입 변환된다.
```js
1 + false; // 1
```

>null은 0으로 타입 변환된다.
```js
1 + null; // 1
```

>undefined는 숫자로 타입 변환되지 않는다.
```js
+undefined; // NaN
1 + undefined // NaN
```

<br>

## 3. 비교 연산자
비교 연산자는 좌항과 우항의 피연산자를 비교한 다음 그 결과를 불리언 값으로 반환한다.    
![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/69674f1e-a16a-4783-9bf3-951adbac78f1)


📌 **동등 비교(==) 연산자는 좌항과 우항의 피연산자를 비교할 때 먼저 암묵적 타입 변환을 통해 타입을 일치시킨 후 같은 값인지 비교한다.**
```js
'0' == '' // false
0 == '' // true
0 == '0' // true
false == 'false' // false
false == '0'  // true
false == null // false
false == undefined // false
```

📌 **일치(===)비교 연산자는 좌항과 우항의 피연산자가 타입도 같고 값도 같은 경우에 한하여 `true`를 반환한다. (암묵적 타입 변환x)**
>일치 비교 연산자에서 주의할 것은 `NaN`이다.
```js
NaN === NaN // false
```
`NaN`은 자신과 일치하지 않는 유일한 값이다. 따라서 숫자가 `NaN`인지 조사하려면 빌트인 함수인 `isNaN`을 사용한다.     
```js
isNaN(NaN) // true
isNaN(10) // false
isNaN(1 + undefined) // true
```
❗️ [그러나 Number.isNaN 을 더 추천한다.](https://github.com/airbnb/javascript#standard-library--isnan)    
📖 [isNaN vs Number.isNaN](https://velog.io/@pul8219/JS-NaN-isNaN%EA%B3%BC-Number.isNaN%EC%9D%98-%EC%B0%A8%EC%9D%B4)

<br>

### ✅ Object.is
[Object.is](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/is)는 두 값이 같은 값인지 결정합니다.    
- `Object.is`와 `==` 연산자의 차이점은 `Object.is`는  어느 값도 강제하지 않습니다.
- `Object.is`와 `===` 연산자의 차이점은 부호가 있는 `0`과 `NaN`값 처리입니다.

```js
Object.is(25, 25); // true
Object.is("foo", "foo"); // true
Object.is("foo", "bar"); // false
Object.is(null, null); // true
Object.is(undefined, undefined); // true
Object.is(window, window); // true
Object.is([], []); // false
const foo = { a: 1 };
const bar = { a: 1 };
const sameFoo = foo;
Object.is(foo, foo); // true
Object.is(foo, bar); // false
Object.is(foo, sameFoo); // true

// Case 2: 부호 있는 0
Object.is(0, -0); // false
Object.is(+0, -0); // false
Object.is(-0, -0); // true

// Case 3: NaN
Object.is(NaN, 0 / 0); // true
Object.is(NaN, Number.NaN); // true
```

<br>

## 4. 삼항 조건 연산자   

삼항 조건 연산자 표현식은 if...else문과 중요한 차이가 있다.    
삼항 조건 연사자 표현식은 값처럼 사용할 수 있지만 if...else문은 값처럼 사용할 수 없다.

```js
var x = 10;

// if...else 문은 표현식이 아닌 문이다. 따라서 값처럼 사용할 수 없다.
var result if (x % 2) { result = '홀수';} else { result = '짝수' }; 
// SyntaxError: Unexpected token if
```
삼항 조건 연산자 표현식은 값으로 평가할 수 있는 표현식인 문이다.    
따라서 삼항 조건 연산자 표현식은 값처럼 다른 표현식의 일부가 될 수 있어 매우 유용하다. 

```js
var x = 10;

// 삼항 조건 연산자 표현식은 표현식인 문이다. 따라서 값처럼 사용할 수 있다.
var result = x % 2 ? '홀수' : '짝수'
console.log(result); // 짝수
```
<br>

## 5. 논리 연산자

논리 연산자는 우항과 자황의 피연산자를 논리 연산한다.    
![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/27782c89-a66d-4d78-bd93-0697f9daf1cf)

>논리 부정(!) 연산자를 사용할 때 피연산자가 불리언 값일 필요 없음
```js
!0 // true
!'Hello' // false
```

>논리합(||) 또는 논리곱(&&) 연산자 표현식의 평가 결과는 불리언 값이 아닐 수도 있다.
>논리합(||) 또는 논리곱(&&) 연산자 표현식은 언제나 2개의 피연산자 중 어느 한쪽으로 평가된다.
```js
// 단축 평가
'Cat' && 'Dog' // Dog
```
