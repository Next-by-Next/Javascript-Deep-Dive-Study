**TIL(Today I learn) 기록일** : 2024.01.09

## 목차

[1. Set](#1-set)   

# 37. 🚀 Set과 Map

## 1. 📚 Set
Set 객체는 중복되지 않는 유일한 값들의 집합입니다. Set객체는 배열과 유사하지만 다음과 같은 차이가 있습니다.

|구분 | 배열 | Set 객체|
|-|:-:|:-:|
|동일한 값을 중복하여 포함할 수 있다.| O | X|
|요소 순서에 의미가 있다. | O | X |
|인덱스로 요소를 접근할 수 있다. | O | X|   
   
   
- `Set` 객체의 특성은 수학적 집합의 특성과 일치합니다.
- `Set`은 수학적 집합을 구현하기 위한 자료구조입니다.
- `Set`을 통해 교집합, 합집합, 차집합, 여집합 등을 구현할 수 있습니다.

<br>
   
### 1) Set 객체의 생성

`Set`객체는 `Set` 생성자 함수로 생성합니다. `Set` 생성자 함수에 인수를 전달하지 않으면 빈 `Set` 객체가 생성됩니다.
```js
const set = new Set();
console.log(set); // Set(0) {}
```
- `Set` 생성자 함수는 이터러블을 인수로 전달받아 `Set` 객체를 생성합니다.   
- 이때 이터러블의 중복된 값은 `Set` 객체에 요소로 저장되지 않습니다.
    
```js
const set1 = new Set([1, 2, 3, 3]);
console.log(set1); // Set(3) {1, 2, 3}

const set2 = new Set('hello');
console.log(set2); // Set(4) {"h", "e", "l", "o"}
```

>이런식으로 배열의 중복을 제거할 수 있습니다.
```js
// 배열의 중복 요소 제거
const uniq = array => array.filter((v, i, self) => self.indexOf(v) === i);
console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [2, 1, 3, 4]

// Set을 사용한 배열의 중복 요소 제거
const uniq = array => [...new Set(array)];
console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [2, 1, 3, 4]
```

### 2) 요소의 개수 확인
```js
const { size } = new Set([1, 2, 3, 3]);
console.log(size); // 3
```

`size` 프로퍼티는 `setter` 함수 없이 `getter` 함수만 존재하는 접근자 프로퍼티다. 따라서 `size` 프로퍼티에 숫자를 할당하여 `Set`객체의 요소 개수를 변경할 수 없다.
```js
const set = new Set([1, 2, 3]);

console.log(Object.getOwnPropertyDescriptor(Set.prototype, 'size'));
// {set: undefined, enumerable: false, configurable: true, get: ƒ}

set.size = 10; // 무시된다.
console.log(set.size); // 3
```
    
    
### 3) 요소 추가
`Set` 객체에 요소를 추가할 때는 `Set.prototype.add` 메서드를 사용합니다.
```js
const set = new Set();
console.log(set); // Set(0) {}

set.add(1);
console.log(set); // Set(1) {1}
```
`add` 메서드는 새로운 요소가 추가된 `Set` 객체를 반환합니다. 따라서 `add` 메서드를 호출한 후에 `add` 메서드를 연속적으로 호출할 수 있습니다.
```js
const set = new Set();

set.add(1).add(2);
console.log(set); // Set(2) {1, 2}
```
`Set` 객체에 중복된 요소의 추가는 허용되지 않습니다. 이때 에러가 발생하지는 않고 무시됩니다.

### 4) 요소 존재 여부 확인

`Set` 객체에 특정 요소가 존재하는지 확인하려면 `Set.prototype.has`메서드를 사용합니다. `has`메서드는 특정 요소의 존재 여부를 나타내는 불리언 값을 반환합니다.

```js
const set = new Set([1,2,3]);

console.log(set.has(2)); // true
console.log(set.has(4)); // false
```

### 5) 요소 삭제

`Set`객체의 특정 요소를 삭제하려면 `Set.prototype.delete`메서드를 사용합니다. `delete`메서드는 삭제 성공여부를 나타내는 불리언 값을 반환합니다.    

`delete`메서드에는 인덱스가 아니라 삭제하려는 요소값을 인수로 전달해야 합니다. `Set`객체는 순서에 의미가 없습니다. 다시 말해, 배열과 같이 인덱스를 갖지 않습니다.

```js
const set = new Set([1,2,3]);

// 요소 2를 삭제한다.
set.delete(2);
console.log(set); // Set(2) {1, 3}

// 요소 1을 삭제한다.
set.delete(1);
console.log(set); // Set(1) {3)
```

### 6) 요소 일괄 삭제

`Set`객체의 모든 요소를 일괄 삭제하려면 `Set.prototype.clear`메서드를 사용합니다. `clear` 메서드는 언제나 `undefined`를 반환합니다.
```js
const set = new Set([1,2,3]);

set.clear();
console.log(set); // Set(0){}
```

### 7) 요소 순회

`Set` 객체의 요소를 순회하려면 `Set.prototype.forEach`메서드를 사용합니다. `Set.prototype.forEach`메서드는 `Array.prototype.forEach`메서드와 유사하게 콜백 함수와 `forEach`메서드의 콜백 함수 내부에서 `this`로 사용될 객체(옵션)를 인수로 전달합니다.

```js
const set = new Set([1,2,3]);

set.forEach((v, v2, set) => console.log(v, v2, set));

/*
1 1 Set(3) {1, 2, 3}
2 2 Set(3) {1, 2, 3}
3 3 Set(3) {1, 2, 3}
*/
```

>`Set`객체는 이터러블입니다. 따라서 `for...of`문으로 순회할 수 있으며, 스프레드 문법과 배열 디스트럭처링의 대상이 될 수 있습니다.
```js
const set = new Set([1, 2, 3]);

// Set 객체는 Set.prototype의 Symbol.iterator 메서드를 상속받는 이터러블입니다.
console.log(Symbol.iterator in set); // true

// 이터러블인 Set 객체는 for...of 문으로 순회할 수 있습니다.
for (const value of Set) {
    console.log(value); // 1  2 3
}

// 이터러블인 Set객체는 스프레드 문법의 대상이 될 수 있습니다.
console.log([...set]); // [1, 2, 3]

// 이터러블인 Set 객체는 배열 디스트럭처링 할당의 대상이 될 수 있습니다.
const [a, ...rest] = set;
console.log(a, rest); // 1, [2,3]
```

❗️`Set`객체는 요소의 순서에 의미를 갖지 않지만 `Set`객체를 순회하는 순서는 요소가 추가된 순서를 따릅니다.

### 8) 집합 연산

`Set`객체는 수학적 집합을 구현하기 위한 자료구조입니다. 따라서 `Set`객체를 통해 교집합, 합집합, 차집합 등을 구현할 수 있습니다. 집합 연산을 수행하는 프로토타입 메서드를 구현하면 다음과 같습니다.

#### 교집합

```js
Set.prototype.intersection = function(set) {
    const result = new Set();
    
    for (const value of set) {
        if (this.has(value)) result.add(value);
    }
    
    return result;
}

const setA = new Set([1,2,3,4]);
const setB = new Set([2,4]);

// setA와 setB의 교집합
console.log(setA.intersection(setB)); // Set(2) {2, 4}
// SetB와 setA의 교집합
console.log(setB.intersection(setA)); // Set(2) {2, 4}
```


