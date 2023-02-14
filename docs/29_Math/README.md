## 29장 Math

#### `Math`

- Math는 수학적인 상수와 함수를 위한 property와 method를 제공한다.
- Math provides property and method for mathematical constant number and function
- 'Math'는 생성자 함수가 아니다 -> 정적 property 와 정적 method만을 제공하는 표준 빌트인 객체이다!

## 📂 29.1 `Math` Property

### `Math.PI`

- 원주율 PI 값(𝞹 ≈ 3.14159)을 반환
- -->그래픽 작업을 하는 경우 사용한다.

```javascript
해당 라이브러리를 생성
Math.PI; // 3.14159
```

## 📂 29.2 `Math` 메서드

### `Math.abs`

- 인수로 전달된 숫자의 절대값<sup>absolute value</sup>을 반환
- 절대값은 반드시 0 또는 양수이어야 한다.
- 인수로 전달된 숫자의 절댓값<sup>absolute

```javascript
Math.abs(-1); // 1
Math.abs("-1"); // 1
Math.abs(""); // 0
Math.abs([]); // 0
Math.abs(null); // 0
Math.abs(undefined); // NaN
Math.abs({}); // NaN
Math.abs("string"); // NaN
Math.abs(); // NaN
```

### `Math.round`

- 인수로 전달된 숫자의 소숫점 이하를 "반올림"한 정수 반환

```javascript
Math.round(1.4); // 1
Math.round(1.6); // 2
Math.round(-1.4); // -1 주의! -1.4를 반올림한 수는 -1이다
Math.round(-1.6); // -2 주의!
Math.round(1); // 1
Math.round(); // NaN, Not a Number
```

### `Math.ceil`

- 인수로 전달된 숫자의 소수점 이하를 "올림" 한 정수 반환
- 소수점 이하를 올림하면 더 큰 정수가 된다.

```javascript
Math.ceil(1.4); // 2
Math.ceil(1.6); // 2
Math.ceil(-1.4); // -1
Math.ceil(-1.6); // -1
Math.ceil(1); // 1
Math.ceil(); // NaN
```

### `Math.floor`

- 인수로 전달된 숫자의 소수점 이하를 "내림"한 정수 반환

```javascript
Math.floor(1.9); // 1
Math.floor(9.1); // 9
Math.floor(-1.9); // -2
Math.floor(-9.1); // -10
Math.floor(1); // 1
Math.floor(); // NaN
```

### `Math.sqrt`

- 인수로 전달된 숫자의 "제곱근"을 반환

```javascript
Math.sqrt(9); // 3
Math.sqrt(-9); // NaN, 음수는 제곱근 불가
Math.sqrt(2); // 1.414213562373095, 루트 2
Math.sqrt(1); // 1
Math.sqrt(0); // 0
Math.sqrt(); // NaN, Null값임
```

### `Math.random`

- 임의의 난수(랜덤 숫자)를 반환
- `Math.random` 메서드가 반환한 난수는 0에서 1 미만의 "실수" 이다!
  - 즉, 0은 포함되지만 1은 포함되지 않는다.

```javascript
Math.random(); // 0 ~ 1 미만의 부동 소수점 (0.8208720231391746)
/*
1에서 10범위의 랜덤 정수 취득
1) Math.random 으로 0에서 1미만의 랜덤 실수를 구한 다음
   10을 곱해 0에서 10 미만의 랜덤 실수를 구한다.
2) 0에서 10미만의 랜덤 실수에 1을 더해 1에서 10 범위의 랜덤 실수를 구한다.
3) Math.floor로 1에서 10 범위의 랜덤 실수의 소수점 이하를 떼어 버린 다음 정수를 반확한다.
*/
const random = Math.floor(Math.random() * 10 + 1);
console.log(random); // 1~10범위의 정수
```

### `Math.pow`

- 첫 번째 인수를 밑<sup>bottom</sup>으로, 두 번째 인술르 지수<sup>exponent</sup>로 거듭제곱한 결과를 반환
- ES7에 도입된 지수 연산자(`**`)를 사용하면 가독성이 좋아진다.

```javascript
Math.pow(2, 8); // 256
Math.pow(2, -1); // 0.5
Math.pow(2); // NaN
// ES7(ECMAScript 2016) Exponentiation operator(거듭 제곱 연산자)
2 ** (2 ** 2); // 16
Math.pow(Math.pow(2, 2), 2); // 16
```

### `Math.max`

- 전달받은 인수 중에서 가장 큰 수를 반환
- 인수가 전달되지 않으면 `-Infinity`를 반환
- `Function.prototype.apply` 메서드 또는 스프레드 문법을 사용해 배열을 인수로 전달하면 배열의 요소 중 최대값을 구할 수 있다.

```javascript
Math.max(1); // 1
Math.max(1, 2); // 2
Math.max(1, 2, 3); // 3
Math.max(); // -Infinity
// 배열 요소 중에서 최대값 취득
const arr = [1, 2, 3];
const max = Math.max.apply(null, arr); // 3
// ES6 Spread operator
Math.max(...arr); // 3
```

### `Math.min`

- 전달받은 인수 중에서 가장 작은 수를 반환
- 인수가 전달되지 않으면 `Infinity`를 반환

```javascript
Math.min(1); // 1
Math.min(1, 2); // 1
Math.min(1, 2, 3); // 1
Math.min(); // Infinity
// 배열 요소 중에서 최소값 취득
const arr = [1, 2, 3];
const min = Math.min.apply(null, arr); // 1
// ES6 Spread operator
Math.min(...arr); // 1
```
