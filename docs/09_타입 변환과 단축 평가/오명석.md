# 📕 9장 타입 변환과 단축 평가

## 📝 9.1 타입 변환이란?

자바스크립트의 모든 값에는 타입이 있다.  
개발자의 의도에 따라 다른 타입으로 변환되는 것을 **명시적 타입 변환** 또는 **타입 캐스팅**이라 한다.

```js
var x = 10;

var str = x.toString();
// x = 10 , str = "10"
```

개발자의 의도와는 상관없이 표현식을 평가하는 도중에 암묵적으로 타입이 자동 변환되는 것을 **암묵적 타입 변환** 또는 **타입 강제 변환**이라 한다.

```js
var x = 10;

var str = x + "";
// x = 10 , str = "10"
```

**원시 값은 변경 불가능한 값이다.**  
명시적 타입 변환이나 암묵적 타입 변환이 기존 원시 값을 직접 변경하는 것이 아니라 기존 원시 값을 이용해 다른 타입의 새로운 원시 값을 생성한다.

명시적 타입 변환은 개발자의 의지가 코드에 명백히 드러나지만 암묵적 타입 변환은 드러나지 않게 자동으로 변환되기 때문에 코드에서 암묵적 타입 변환이 발생하는지, 어떤 타입으로 변환되는지 예측 가능해야 한다. 만약 예측하지 못하거나 예측 결과와 일치하지 않다면 오류를 생산할 가능성이 높아진다.

떄로는 명시적 타입 변환 보다 암묵적 타입 변환이 가독성이 좋은 경우가 있다. 중요한 것은 타입을 예측할 수 있어야 한다.

## 📝 9.2 암묵적 타입 변환

자바스크립트는 표현식을 평가할 때 코드 문맥에 부합하지 않는 다양한 상황에서도 가급적 에러를 발생시키지 않기 위해 암묵적으로 타입을 변환하여 표현식을 평가한다.  
암묵적 타입 변환이 발생하면 문자열, 숫자, 불리언과 같은 원시 타입 중 하나로 타입을 자동 변환한다.

### ✏️ 문자열 타입으로 변환

```js
1 + "2"; // -> "12"
```

`+` 연산자는 피연산자 중 하나 이상이 문자열이므로 문자열 연결 연산자로 동작한다.  
문자열 연결 연산자의 역할은 문자열 값을 만드는 것이다. 따라서 모든 피연산자는 문자열이어야 한다.  
문자열 연결 연산자는 피연산자 중에서 문자열이 아닌 피연산자를 문자열로 암묵적 타입 변환한다.  
꼭 피연산자만 암묵적 타입 변환의 대상이 되는 것은 아니다 템플릿 리터럴의 표현식 삽입은 표현식의 평가 결과를 문자열로 암묵적 타입 변환한다.

**문자열 타입 변환 예시**

```js
// 숫자 타입
0 + "" // "0"
-0 + "" // "0"
1 + "" // "1"
-1 + "" // "-1"
NaN + "" // "NaN"
Infinity + "" // "Infinity"
-Infinity + "" // "-Infinity"

// 불리언 타입
true + "" // "true"
false + "" // "false"

// null 타입
null + "" // "null"

// undefined 타입
undefined + "" // "undefined"

// 심벌 타입
(Symbol()) + "" // TypeError: Cannot convert a Symbol value to a string

// 객체 타입
({}) + "" // "[object Object]"
Math + "" // "[object Math]"
[] + "" // ""
[10, 20] + "" // "10,20"
(function(){}) + "" // "function(){}"
Array + "" // "function Array() {[native code]}
```

### ✏️ 숫자 타입으로 변환

산술 연산자의 역할은 숫자 타입의 값을 만드는 것이다. 따라서 피연산자 중에서 숫자 타입이 아닌 피연산자를 숫자 타입으로 암묵적 타입 변환한다.  
이때 타입 변환이 불가능한 피연산자의 평가 결과는 `NaN`이 된다.  
비교 연산자는 불리언 값을 만든다. 피연산자의 크기를 비교해야 되기 때문에 숫자 타입으로 암묵적 타입 변환한다.  
단항 + 연산자는 피연산자의 타입이 숫자가 아니면 숫자 타입으로 암묵적 타입 변환한다.

**숫자 타입 변환 예시**

```js
1 - "1"; // 0
1 * "10"; // 10
1 / "one"; // NaN
"1" > 0; // true

// 문자열 타입
+"" + // 0
  "0" + // 0
  "1" + // 1
  "string" + // NaN
  // 불리언 타입
  true + // 1
  false + // 0
  // null 타입
  null + // 0
  // undefined 타입
  undefined + // NaN
  // Symbol 타입
  Symbol() + // TypeError: Cannot convert a Symbol value to a number
  // 객체 타입
  {} + // NaN
  [] + // 0
  [10, 20] + // NaN
  function () {}; // NaN
```

### ✏️ 불리언 타입으로 변환

`if` 문이나 `for` 문과 같은 제어문 또는 삼항 조건 연산자의 조건식은 불리언 값으로 평가되어야 한다. 따라서 조건식의 결과를 불리언 타입으로 암묵적 타입 변환한다.

```js
if ("") console.log(1);
if (true) console.log(2);
if (0) console.log(3);
if ("str") console.log(4);
if (null) console.log(5);
// 2, 4
```

**자바스크립트는 불리언 타입이 아닌 값을 Truthy 값 또는 Falsy 값으로 구분한다.**

**Falsy로 평가되는 값**

- `false`
- `undefined`
- `null`
- 0, -0
- `NaN`
- `""` (빈 문자열)

`Falsy` 값 앞에 `!`을 사용하면 `true`로 평가된다.

## 📝 9.3 명시적 타입 변환

**개발자의 의도에 따라 명시적으로 타입을 변경하는 방법**

- 표준 빌트인 생성자 함수(String, Number, Boolean)를 New 연산자 없이 호출하는 방법과 빌트인 메서드를 사용하는 방법.
- 암묵적 타입 변환을 이용하는 방법.

💡 **표준 빌트인 생성자 함수와 빌트인 메서드**

```
표준 빌트인 생성자 함수와 표준 빌트인 메서드는 자바사크립트에서 기본 제공하는 함수다. 표준 빌트인 생성자 함수는 객체를 생성하기 위한 함수이며 new 연산자와 함께 호출한다. 표준 빌트인 메서드는 자바스크립트에서 기본 제공하는 빌트인 객체의 메서드다.
```

### ✏️ 문자열 타입으로 변환

**문자열 타입이 아닌 값을 문자열 타입으로 변환하는 방법**

- String 생성자 함수를 new 연산자 없이 호출하는 방법
- Object.prototype.toString 메서드를 사용하는 방법
- 문자열 연결 연산자를 사용하는 방법

### ✏️ 숫자 타입으로 변환

**숫자 타입이 아닌 값을 숫자 타입으로 변환하는 방법**

- Number 생성자 함수를 new 연산자 없이 호출
- parseInt, parseFloat 함수를 사용 (문자열만 숫자 타입으로 변환)
- `+` 단항 연산자를 사용
- `*` 산술 연산자를 사용

### ✏️ 불리언 타입으로 변환

**불리언 타입이 아닌 값을 불리언 타입으로 변환하는 방법**

- Boolean 생성자 함수를 new 연산자 없이 호출
- ! 부정 논리 연산자를 두 번 사용하는 방법

## 📝 9.4 단축 평가

### ✏️ 논리 연산자를 사용하는 단축 평가

논리합 또는 논리곱 연산자 표현식의 평가 결과가 무조건 불리언 값이 아닐수도 있다. 언제나 두개의 피연산자 중 어느 한쪽으로 평가된다.

- 논리곱은 두개의 피연산자가 모두 true로 평가될 때 true를 반환한다.
- 논리합은 좌항에서 우항으로 평가가 진행된다.

**단축 평가: 논리 연산의 결과를 결정하는 피연산자를 타입 변환하지 않고 그대로 반환한다**

- **단축 평가는 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과정을 생략한다.**

| 단축 평가 표현식    | 평가 결과 |
| :------------------ | :-------- |
| true \|\| anything  | true      |
| false \|\| anything | anything  |
| true && anything    | anything  |
| false && anything   | false     |

---

**단축 평가로 if 연산자를 대체하는 법**

```js
// Truthy
var done = true;
var message = "";

if (done) message = "done";

// 단축 평가
message = done && "done"; // "done"

// Falsy
var done = false;
var message = "";

if (!done) message = "notDone";

// 단축 평가
message = done || "notDone"; // "notDone"
```

**삼항 연산자로 if...else문 대체하는 법**

```js
var done = true;
var message = "";

if (done) message = "done";
else message = "notDone";

// 삼항 연산자
message = done ? "done" : "notDone"; // "done"
```

**객체를 가리키기를 기대하는 변수가 null 또는 undefined가 아닌지 확인하고 프로퍼티를 참조할 때**

- 객체는 키와 값으로 구성된 프로퍼티의 집합이다.
- 객체를 가리키기를 기대하는 변수의 값이 객체가 아니라 null or undefined 라면 타입 에러가 발생한다.
- 단축 평가를 활용하면 에러를 발생시키지 않는다.

```js
var elem = null;
var value = elem.value; // TypeError

// 단축 평가
var value = elem && elem.value; // null
```

**함수 매개변수에 기본값을 설정할 때**

- 함수를 호출할 때 인수를 전달하지 않으면 매개변수에는 undefined가 할당된다.
- 단축 평가를 사용해 매개변수의 기본값을 설정하면 undefined로 인해 발생하는 에러를 방지할 수 있다.

```js
function getStringLength(str) {
  str = str || "";
  return str.length;
}

getStringLength(); // 0
getStringLength("hi"); // 2

// ES6의 매개변수 기본값 설정
function getStringLength(str = "") {
  return str.length;
}

getStringLength(); // 0
getStringLength("hi"); // 2
```

### ✏️ 옵셔널 체이닝 연산자

ES11에서 도입된 옵셔널 체이닝 연산자 ?.는 좌항의 피연산자가 null or undefined인 경우 undefined를 반환하고, 그렇지 않다면 우항의 프로퍼티 참조를 이어간다. 옵셔널 체이닝이 도입되기 이전에는 논리 연산자 &&를 사용해 단축 평가를 해서 확인했다.

```js
// 옵셔널 체이닝
var elem = null;

var value = elem?.value; // undefined

// 논리 연산자의 단축 평가
var value = elem && elem.value; // null
```

논리 연산자 &&는 좌항의 피연산자라 false로 평가되는 Falsy 값(false, undefined, null, 0, -0, NaN, "")이면 좌항의 피연산자를 그대로 반환한다. (0이나 ""은 객체로 평가될 때도 있다)  
하지만 옵셔널 체이닝 연산자 ?.은 좌항의 연산자가 Falsy 값 이라도 null or undefined가 아니면 우항의 프로퍼티 참조를 이어간다.

```js
var str = "";

var length = str?.length; // 0

// 논리 연산자 단축 평가
var length = str && str.length; // ""
```

### ✏️ null 병합 연산자

ES11에서 도입된 null 병합 연산자 ??는 좌항의 피연산자가 null or undefined라면 우항의 피연산자를 반환하고, 아니라면 좌항의 피연산자를 반환한다.
이는 변수의 기본값을 설정할 때 유용하다.  
null 병합 연산자가 도입되기 이전에는 논리 연산자 \|\|를 사용했다. (만약 Falsy 값인 0, ""도 기본값으로 유효하다면 예기치 않은 동작이 발생할 수 있다)

```js
var foo = null ?? "default string"; // "default string"

var foo = "" || "default string"; // "default string"

var foo = "" ?? "default string"; // ""
```
