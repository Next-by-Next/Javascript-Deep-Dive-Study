**TIL(Today I learn) 기록일** : 2023. 12. 31

# 28장 Number

## 1. Number 생성자 함수

표준 빌트인 객체 `Number`객체는 생성자 함수 객체입니다. 따라서 `new`연산자와 함께 호출하여 `Number` 인스턴스를 생성할 수 있습니다.    

`Number` 생성자 함수에 인수를 전달하지 않고 `new` 연산자와 함께 호출하면 `[[NumberData]]` 내부 슬롯에 0을 할당한 `Number` 래퍼 객체를 생성합니다.    

```js
const numObj = new Number();
console.log(numObj); // Number {[[PrimitiveValue]]:0}
```

위 예제를 크롬 브라우저의 개발자 도구에서 실행해보면 [[PrimitiveValue]]라는 접근할 수 없는 프로퍼티가 보입니다.    
이는 [[NumberData]] 내부 슬롯을 가리킵니다.    


`Number`생성자 함수의 인수로 숫자를 전달하면서 `new`연산자와 함께 호출하면 [[NumberData]] 내부 슬롯에 인수로 전달받은 숫자를 할당한 `Number`래퍼 객체를 생성합니다.  

```js
const numObj = new Number(10);
console.log(numObj); // Number {[[PrimitiveValue]]: 10}
```

`Number` 생성자 함수의 인수로 숫자가 아닌 값을 전달하면 인수를 숫자로 강제 변환한 후, [[NumberData]] 내부 슬롯에 변환된 숫자를 할당한 `Number 래퍼 객체를 생성합니다.     
인수를 숫자로 변환할 수 없다면 `NaN`을 [[NumberData]] 내부 슬롯에 할당한 `Number`래퍼 객체를 생성합니다.    

```js
let numObj = new Number('10');
console.log(numObj); // Number {[[PrimitiveValue]]: 10}

numObj = new Number('Hello');
console.log(numObj); // Number {[[PrimitiveValue]]: NaN}
```


❗️  `new`연산자를 사용하지 않고 `Number`생성자 함수를 호출하면 `Number`인스턴스가 아닌 숫자를 반환합니다. 이를 이용하여 명시적으로 타입을 반환하기도 합니다.    
```js
// 문자열 타입 => 숫자 타입
Number('0'); // -> 0
Number('-1'); // -> -1
Number('10.53'); // -> 10.53

// 불리언 타입 => 숫자 타입
Number(true); // -> 1
Number(false); // -> 0
```

## 2. Number 프로퍼티

### 1) Number.EPSILON

- ES6에서 도입된 `Number.EPSILON`은 1과 1보다 큰 숫자 중에서 가장 작은 숫자와의 차이와 같습니다.

>부동소수점 산술 연산은 정확한 결과를 기대하기 어렵습니다. 정수는 2진법으로 오차 없이 저장 가능하지만 부동소수점을 표현하기 위해 가장 널리 쓰이는 표준인 IEEE 754는 2진법으로 변환했을 때 무한소수가 되어 미세한 오차가 발생할 수 밖에 없는 구조적 한계가 있습니다.
```js
0.1 + 0.2;  // -> 0.3000000000000004
0.1 + 0.2 === 0.3; // -> false
```

`Number.EPSILON`은 부동소수점으로 인해 발생하는 오차를 해결하기 위해 사용합니다. 다음 예제는 `Number.EPSILON`을 사용하여 부동소수점을 비교하는 함수입니다.      

```js
function isEqual(a, b) {
  // a와 b를 뺀 값의 절대값이 Number.EPSILON보다 작으면 같은 수로 인정합니다.
return Math.abs(a - b) < Number.EPSILON;
}

isEqual(0.1 + 0.2, 0.3); // -> true
```

### 2) Number.MAX_VALUE

- `Number.MAX_VALUE`는 자바스크립트에서 표현할 수 있는 가장 큰 양수 값입니다.     
- `Number.MAX_VALUE`보다 큰 숫자는 `Infinity`입니다.

```js
Infinity > Number.MAX_VALUE;  // -> true
```

### 3) Number.MIN_VALUE

- `Number.MIN_VALUE`는 자바스크립트에서 표현할 수 있는 가장 작은 양수 값입니다.
- `Number.MIN_VALUE`보다 작은 숫자는 0입니다.

```js
Number.MIN_VALUE; // 5e-324
Number.MIN_VALUE > 0; // -> true
```

### 4) Number.MAX_SAFE_INTEGER

- `Number.MAX_SAFE_INTEGER`은 자바스크립트에서 안전하게 표현할 수 있는 가장 큰 정수값입니다.

### 5) Number.MIN_SAFE_INTEGER

- `number.MIN_SAFE_INTEGER`은 자바스크립트에서 안전하게 표현할 수 있는 가장 작은 정수값입니다.


### 6) Number.POSITIVE_INFINITY

- `Number.POSITIVE_INFINITY`는 양의 무한대를 나타내는 숫자값 `Infinity`와 같습니다.

```js
Number.POSITIVE_INFINITY; // -> Infinity
```

### 7) Number.NEGATIVE_INFINITY

- `Number.NEGATIVE_INFINITY`는 음의 무한대를 나타내는 숫자값 `-Infinity`와 같습니다.

### 8) Number.NaN

- `Number.NaN`은 숫자가 아님을 나타내는 숫자값입니다.
- `Number.NaN`은 `window.NaN`과 같습니다.

```js
Number.NaN; // -> NaN
```

## 3. Number 메서드

### 1) Number.isFinite

ES6에서 도입된 `Number.isFinite` 정적 메서드는 인수로 전달된 숫자값이 정상적인 유한수, 즉 `infinity`또는 `-Infinity`가 아닌지 검사하여 그 결과를 불리언 값으로 반환합니다.    

```js
// 인수가 정상적인 유한수이면 true를 반환합니다.
Number.isFinite(0); // true
Number.isFinite(Number.MAX_VALUE); // true
Number.isFinite(Number.MIN_VALUE); // true

// 인수가 무한수이면 false를 반환합니다.
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // fase
```

### 2) Number.isInteger

ES6에서 도입된 Number.isInteger 정적 메서드는 인수로 전달된 숫자값이 정수인지 검사하여 그 결과를 불리언 값으로 반환합니다.    
검사하기 전에 인수를 숫자로 암묵적 타입 변환하지 않습니다.

```js
// 인수가 정수이면 true를 반환합니다.
Number.isInteger(0) // true
Number.isInteger(123) // true
Number.isInteger(-123) // true

// 0.5는 정수가 아닙니다.
Number.isInteger(0.5) // false
// '123'을 숫자로 암묵적 타입 변환하지 않습니다.
Number.isInteger('123') // false
// false를 숫자로 암묵적 타입 변환하지 않습니다.
Number.isInteger(false) // false
```

### 3) Number.isNaN

ES6에서 도입된 `Number.isNaN` 정적 메서드는 인수로 전달된 숫자값이 `NaN`인지 검사하여 그 결과를 불리언 값으로 반환합니다.
```js
// 인수가 NaN이면 true를 반환합니다.
Number.isNaN(NaN); // true
```

`Number.isNaN`메서드는 빌트인 전역 함수 `isNaN`과 차이가 있습니다. 빌트인 전역 함수 isNaN은 전달 받은 인수를 숫자로 암묵적 타입 변환하여 검사를 수행하지만 `Number.isNaN`메서드는 전달받은 인수를 숫자로 암묵적 타입 변환하지 않습니다. 따라서 숫자가 아닌 인수가 주어졌을 때 반환값은 언제나 `false`입니다.

```js
// Number.isNaN은 인수로 암묵적 타입 변환하지 않습니다.
Number.isNaN(undefined); // false

// isFinite는 인수를 숫자로 암묵적 타입 변환합니다. undefined는 NaN으로 암묵적 타입 변환됩니다.
isNaN(undefined); // true
```

### 6) Number.prototype.toFixed

- toFixed 메서드는 숫자를 반올림하여 문자열로 반환합니다. 반올림하는 소수점 이하 자릿수를 나타내는 0~20 사시의 정수값을 인수로 전달할 수 있습니다.     
- 인수를 생략하면 기본값 0이 지정됩니다.

```js
// 소수점 이하 반온림. 인수를 생략하면 기본값 0이 지정됩니다.
(12345.6789).toFixed(); // -> '123456'
// 소수점 이하 1자리수 유효, 나머지 반올림
(123456.6789).toFixed(1); // -> '12345.7'
// 소수점 이하 2자릿수 유효, 나머지 반올림
(12345.6789).toFixed(2); // -> '12345.68'
// 소수점 이하 3자릿수 유효, 나머지 반올림
(12345.6789).toFixed(3); // -> '12345.679'
```
