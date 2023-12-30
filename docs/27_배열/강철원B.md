**TIL(Today I learn) 기록일** : 2023.12.27

# 27. 배열

## 1. 배열이란?

> 자바스크립트에서 배열은 `객체 타입(object)`

- 자바스크립트에 `배열` 이라는 타입은 존재하지 않습니다.
- 자바스크립트의 배열은 `객체` 지만 일반 객체와는 구별된 특징을 가집니다.
  | 구분 | 객체 | 배열 |
  | --------------- |:-------------------------:|:-------------:|
  | 구조 | 프로퍼티 키와 프로퍼티 값 | 인덱스와 요소 |
  | 값의 참조 | 프로퍼티 키 | 인덱스 |
  | 값의 순서 | X | O |
  | length 프로퍼티 | X | O |

<br>
<br>

---

## 2. 자바스크립트 배열은 배열이 아니다.

배열은 아래 2가지로 구분할 수 있습니다.

1. `밀집 배열(dense array)`
2. `희소 배열(sparse array)`

### 1) 밀집배열


- 자료구조에서 일반적으로 언급하는 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 자료구조
- 배열의 요소들은 하나의 데이터 타입으로 통일, 서로 연속적으로 인접해 있는 형태를 의미
  - 연속적인 구조이기 때문에, 인덱스(index) 를 통해 단 한 번의 연산으로 요소에 접근가능
  - 하지만, 정렬되지 않은 배열이면서 특정 요소를 검색하는 경우 , 배열의 모든 요소를 처음부터 원하는 요소를 발견할 때까지 순회해야하므로 `O(n)` 시간복잡도를 가질 수 있습니다.
  - 배열에 요소를 삽입, 삭제 하는 경우도 연속적인 구조를 유지시키기 위해 요소를 작업시마다 이동시켜야 하는 단점도 존재합니다.

### 2) 희소배열


배열의 요소들의 각각의 메모리 공간이 동일한 크기를 갖지 않아도 되며, 연속적으로 이어져 있지 않아도 되고 이를 `희소 배열(sparse array)`이라 하며, 자바스크립트 배열은 `희소 배열`입니다.
자바스크립트 배열은 일반적인 배열의 동작을 흉내 낸 특수한 `객체`입니다.

- 자바스크립트 배열은 인덱스를 나타내는 `문자열`을 프로퍼티 키로 가지며, `length 프로퍼티` 를 갖는 특수한 객체
- 배열의 요소는 사실 프로퍼티 값
  - 자바스크립트에서 사용할 수 있는 모든 값은 객체의 프로퍼티 값이 될 수 있으므로 어떤 타입의 값도 배열의 요소가 될 수 있다.

<br>
<br>

---

## 3. length 프로퍼티와 희소 배열

📌 `length 프로퍼티`는 배열의 요소의 개수 를 나타낸다.

- length 프로퍼티 값은 0 ~ 2^32 - 1 미만의 양의 정수 를 가집니다.
- 기본적으로는 배열의 길이를 바탕으로 결정되지만 임의의 숫자 값을 명시적으로 할당도 가능
  - 이 경우, 현재 프로퍼티의 length 프로퍼티 값보다 작은 숫자 값을 할당할 경우 배열의 길이가 줄어듭니다.
  - 현재 프로퍼티의 length 프로퍼티 값보다 큰 숫자 값을 할당할 경우는 length 프로퍼티 값은 변경되지만, 실제 배열의 길이는 변함없습니다.
  - 이것은 length 프로퍼티가 값 없이 비어 있는 요소를 위해 메모리 공간을 확보하지 않으며 빈 요소를 생성하지 않음을 의미
- 배열의 요소가 연속적으로 위치하지 않고 일부가 비어 있는 배열 => 희소 배열(sparse array)
  - 자바스크립트 엔진은 희소 배열을 문법적으로 허용합니다. (희소 배열은 의도적으로 생성하는 일은 많지 않기 때문에 가능한 사용하지 않는 것이 좋습니다)
  - 가능한, 배열에는 같은 타입의 요소를 연속적으로 위치시키는 것이 좋습니다.


<br>
<br>

---

## 4. 배열 생성

객체와 마찬가지로 배열도 다양한 생성 방식이 있습니다.
가장 일반적이고 간편한 배열 생성 방식은 `배열 리터럴`을 사용하는 것입니다.
    
>배열 리터럴은 0개 이상의 요소를 쉼표로 구분하여 `대괄호([])`로 묶습니다.    
>배열 리터럴은 객체 리터럴과 달리 프로퍼티 키가 없고 `값`만 존재합니다.
```js
const arr = [1, 2, 3];
console.log(arr.length); // 3
```

> 배열 리터럴에 요소를 생략하면 `희소 배열`이 생성됩니다.
```js
const arr = [1, , 3]; // 희소 배열
console.log(arr.length); // 3
console.log(arr);        // [1, empty, 3]
console.log(arr[1]);     // undefned
```
### 1) Array.of

>ES6에서 도입된 Array.of 메서드는 전달된 인수를 요소로 갖는 배열을 생성합니다.
Array.of는 Array 생성자 함수와 다르게 전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성합니다. 
```js
// 전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성한다.
Array.of(1); // -> [1]
Array.of(1, 2, 3); // -> [1,  2,  3]
Array.of('string'); // -> ['string']
```

### 2) Array.from
>ES6에서 도입된 Array.from 메서드는 유사 배열 객체 또는 이터러블 객체를 인수로 전달받아 배열로 변환하여 반환합니다.
```js
// 유사 배열 객체를 변환하여 배열을 생성한다.
Array.from({ length: 2, 0: 'a', 1: 'b' }); // -> ['a', 'b']

// 이터러블을 변환하여 배열을 생성한다. 문자열은 이터러블이다.
Array.from('Hello'); // -> ['H', 'e', 'l', 'l', 'o']
```
Array.form을 사용하면 두 번째 인수로 전달한 콜백 함수를 통해 값을 만들면서 요소를 채울 수 있다.   
Array.from 메서드는 두 번째 인수로 전달한 콜백 함수에 첫 번째 인수에 의해 생성된 배열의 요소값과 인덱스를 순차적으로 전달하면서 호출하고, 콜백 함수의 반환값으로   
구성된 배열을 반환한다.   
```js
// Array.from에 length만 존재하는 유사 배열 객체를 전달하면 undefined를 요소로 채운다.
Array.from({ length: 3 }); // -> [undefined, undefined, undefined]

// Array.from은 두 번째 인수로 전달한 콜백 함수의 반환값으로 구성된 배열을 반환한다.
Array.from({ length: 3 }, (_, i) => i); // -> [0, 1, 2]
```
>유사 배열 객체와 이터러블 객체
유사 배열 객체는 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 잇고 length 프로퍼티를 갖는 객체를 말합니다.
유사 배열 객체는 마치 배열처럼 for문으로 순회할 수도 있습니다.
 ```js
 // 유사 배열 객체
 const arrayLike = {
    "0": "apple",
    "1": "banana",
    "2": "orange",
    length: 3
 };
 
 // 유사 배열 객체는 마치 배열처럼 for문으로 순회할 수도 있다.
 for(let i = 0; i< arrayLike.length; i++) {
    console.log(arrayLike[i]); // apple banana orange
 }
 ```
 이터러블 객체는 `Symbol.iterator` 메서드를 구현하여 `for..of` 문으로 순회할 수 있으며, 스프레드 문법과 배열 디스트럭처링 할당의 대상으로
 사용할 수 있는 객체를 말한다. ES6에서 제공하는 빌트인 이터러블은 `Array.String`, `Map`, `Set`, `DOM 컬렉션(NodeList, HTMLCollection)`, `arguments`등이 있습니다.
 이에 대해서는 34장 '이터러블'에 보충되어있습니다.

<br>

---

## 5. 배열 요소의 참조

- 배열을 참조할 때는 `대괄호([])` 를 사용하며, 대괄호 안에는 `인덱스` 가 와야 합니다.
- `정수로 평가되는 표현식` 이라면 인덱스로 사용 가능합니다.
- 존재하지 않는 요소에 접근하면 `undefined가 반환`
  - 배열은 `객체` 이기 때문에 객체에서 존재하지 않는 프로퍼티에 접근하면 `undefined` 를 반환하는 것과 같습니다.

```jsx
// 희소 배열
const arr = [1, , 3];

// arr 배열의 1번째 인덱스에는 요소가 존재하지 않는다.
// 하지만, length 프로퍼티는 empty 요소도 포함해서 길이를 측정한다.
// 단, 실질적인 배열 프로퍼티의 메모리 공간에는 빈 요소의 영역은 할당되지 않는다.
console.log(Object.getOwnPropertyDescriptors(arr));
// {
//   '0': { value: 1, writable: true, enumerable: true, configurable: true },
//   '2': { value: 3, writable: true, enumerable: true, configurable: true },
//   length: { value: 3, writable: true, enumerable: false, configurable: false }
// }
```

<br>

---

## 6. 배열 요소의 추가와 갱신

### 추가 & 갱신

- 배열도 `객체` 이므로, 객체의 프로퍼티를 동적으로 추가할 수 있는 것처럼 배열에도 요소를 동적으로 추가할 수 있습니다.
- 만약, 현재 배열의 length 프로퍼티 값보다 큰 인덱스로 새로운 요소를 추가하면 희소 배열이 됩니다.
  - 명시적으로, 값이 할당되지 않은 희소 배열의 요소들은 생성되지 않습니다.  ( 즉, length 프로퍼티 값은 변하나 실질적인 배열안에 요소의 개수는 변함없다. )
- 0이상 정수(또는 문자열 형태 숫자) 로 인덱싱에 사용해야 합니다.
  - 만약, 정수 이외의 값을 인덱싱에 사용하면 요소가 생성되는 것이 아니라, 프로퍼티가 생성됩니다.
  - 프로퍼티는 length 프로퍼티 값에 영향을 주지 않습니다.

<br />

## 7. 배열 요소의 삭제

- 배열도 객체이므로 배열의 특정 요소를 삭제하기 위해 `delete 연산자` 를 사용할 수 있습니다.
- delete 연산자를 통해 배열의 요소를 삭제하는 것은 객체의 프로퍼티를 삭제하는 개념과 같습니다.
  - 요소의 값이 삭제되면 희소 배열이 됩니다. (이 때, length 프로퍼티에는 영향을 주지 않습니다)
- 희소 배열을 만들지 않으면서 배열을 삭제하고 싶을 경우 `Array.prototype.splice`메서드를 사용하는 것을 추천합니다.


## 8. 배열 메서드

> 자바스크립트 배열은 다양한 `빌트인 메서드를 제공`

- 배열 생성자 함수는 다양한 `배열 정적 메서드를 제공`
- 배열 객체의 Array.prototype 은 `프로토타입 메서드를 제공`


<br />

### Array.isArray 메서드

> Array 생성자 함수의 정적 메서드

- 전달된 인수가 배열이면 `true` , 배열이 아니면 `false` 를 반환

  ```jsx
  console.log(Array.isArray([])); // true
  console.log(Array.isArray([1, 2])); // true
  console.log(Array.isArray(new Array())); // true

  console.log(Array.isArray(null)); // false
  console.log(Array.isArray(1)); // false
  console.log(Array.isArray("string")); // false
  console.log(Array.isArray(undefined)); // false
  console.log(Array.isArray(true)); // false
  console.log(Array.isArray({})); // false
  ```

<br />

### Array.prototype.indexOf 메서드

- 원본 배열에서 인수로 전달한 `요소를 검색하여 인덱스를 반환`

  - 검색되는 요소가 중복되어 여러 개일 경우 `첫 번째 검색된 요소의 인덱스를 반환`
  - 원본 배열에 검색할 요소가 존재하지 않으면 `-1 반환`
  - `배열에 특정 요소가 존재하는지 확인할 때 유용`

  ```jsx
  const arr = [1, 2, 2, 3];

  console.log(arr.indexOf(2)); // 1  ( 2를 검색 )
  console.log(arr.indexOf(2, 2)); // 2  ( 2번 째 인덱스 2를 검색)
  console.log(arr.indexOf(-1)); // -1 ( 존재하지 않는 요소 검색 )
  ```

<br />

### Array.prototype.push 메서드

- 인수로 전달받은 `모든 값을 원본 배열 마지막 요소로 추가` , `변경된 length 프로퍼티 값을 반환`
- `mutator method`
  - 부수 효과가 있으므로, ES6의 스프레드 문법을 사용하는 편이 좋습니다.
- 성능 측면에서 배열에 추가할 요소가 하나라면 마지막 배열 요소를 직접 추가하는 방법이 더 빠릅니다.

  ```jsx
  const arr = [1, 2];

  arr.push([3, 4]);
  console.log(arr); // [ 1, 2, [ 3, 4 ] ]

  arr.push("a", "b");
  console.log(arr); // [ 1, 2, [ 3, 4 ], 'a', 'b' ]

  const arr2 = [...arr, true];
  console.log(arr2); // [ 1, 2, [ 3, 4 ], 'a', 'b', true ]
  ```

<br />

### Array.prototype.pop 메서드

- 원본 배열에서 `마지막 요소를 제거하고 제거한 요소를 반환`
  - 원본 배열이 `빈 배열이면 undefined 반환`
- `mutator method`

  ```jsx
  const arr = [1, 2];

  let pop = arr.pop();
  console.log(arr); // [ 1 ]
  console.log(pop); // 2
  ```

- push 메서드와 혼합해서 `스택(stack) 자료구조` 를 구현할 수 있다.

  ```jsx
  // 클래스로 구현한 push와 pop 메서드를 활용한 "스택 자료구조"
  class Stack {
    #array;

    constructor(array = []) {
      if (!Array.isArray(array)) {
        throw new TypeError(`${array} is not an array !`);
      }
      this.#array = array;
    }

    push(value) {
      return this.#array.push(value);
    }

    pop() {
      return this.#array.pop();
    }

    entries() {
      return [...this.#array];
    }
  }

  const stack = new Stack([1, 2]);
  console.log(stack.entries()); // [ 1, 2 ]

  stack.push(3);
  console.log(stack.entries()); // [ 1, 2, 3 ]

  let pop = stack.pop();
  console.log(stack.entries(), pop); // [ 1, 2 ] 3
  ```

<br />

### Array.prototype.unshift 메서드

- 인수로 전달 받은 `모든 값을 원본 배열의 선두에 추가`하고 `변경된 length 프로퍼티 값을 반환`
- `mutator mehtod`

  - 부수 효과가 있으므로, ES6의 스프레드 문법을 사용하는 편이 좋습니다.

  ```jsx
  const arr = [1, 2];

  let result = arr.unshift(3, 4);
  console.log(result); // 4
  console.log(arr); // [ 3, 4, 1, 2 ]

  const newArr = [100, ...arr];
  console.log(newArr); // [ 100, 3, 4, 1, 2 ]
  ```

<br />

### Array.prototype.shift 메서드

- 원본 배열에서 `첫 번째 요소를 제거하고 제거한 요소를 반환`
  - 원본 배열이 빈 배열이면 `undefined 반환`
- `mutator method`

  ```jsx
  const arr = [1, 2];

  let shift = arr.shift();
  console.log(shift); // 1
  console.log(arr); // [ 2 ]
  ```

  ### Array.prototype.concat 메서드

- 인수로 전달된 값들(배열 or 원시값)을 `원본 배열의 마지막 요소로 추가한 새로운 배열을 반환`
  - 인수로 전달한 값이 배열인 경우, 배열을 해체하여 새로운 배열의 요소로 추가
- push 메서드와 unshift 메서드는 concat 메서드로 대체 가능
  - 다만, 차이점은 concat 메서드는 원본 배열을 직접 변경하지 않고, 새로운 배열을 반환하는 것
  - 따라서, push 와 unshift 메서드의 경우 원본 배열은 다른 변수에 복사해놓고 사용해야 안전
- ES6의 스프레드 문법으로 대체 가능합니다.

  ```jsx
  const arr1 = [1, 2];
  const arr2 = [3, 4];

  const arr3 = arr1.concat(arr2);
  console.log(arr3); // [ 1, 2, 3, 4 ]
  console.log(arr1, arr2); // [ 1, 2 ] [ 3, 4 ]

  const arr4 = arr3.concat("a", true);
  console.log(arr4); // [ 1, 2, 3, 4, 'a', true ]
  ```

<br />

### Array.prototype.splice 메서드

- 원본 배열의 `중간에 요소를 추가`하거나 `중간에 있는 요소를 제거`하는 경우 사용
- 3개의 매개변수를 가집니다.

  - `start` : 삭제 시작 인덱스
  - `deleteCount` : 시작 인덱스로부터 삭제할 요소의 개수
  - `items` : 요소를 삭제 후, 삭제한 인덱스로부터 추가할 데이터

  ```jsx
  const arr = [1, 2, 3, 4];

  const result = arr.splice(2, 1, 300);

  console.log(result); // [ 3 ]
  console.log(arr); // [ 1, 2, 300, 4 ]
  ```

- 배열에서 특정 요소를 제거하려면 Array.prototype.indexOf 와 혼합해서 구현할 수 있습니다.

  ```jsx
  const arr = [1, 2, 3, 1, 2];

  function remove(array, item) {
    const index = array.indexOf(item);

    if (index !== -1) array.splice(index, 1);

    return array;
  }

  console.log(remove(arr, 2)); // [ 1, 3, 1, 2 ] << 1번째 인덱스에 요소 2가 삭제된 후의 배열을 반환
  console.log(remove(arr, 100)); // [ 1, 3, 1, 2 ] << 100은 존재하지 않으므로 삭제된 요소는 없음
  ```

<br />

### Array.prototype.slice 메서드

- 인수로 전달된 `범위의 요소들을 복사하여 배열로 반환`
- `accessor method`
- 2개의 매개변수를 가집니다.

  - `start` : 복사 시작할 인덱스
  - `end` : 복사 끝 인덱스

  ```jsx
  const arr = [1, 2, 3];

  console.log(arr.slice(1, 3)); // [ 2, 3 ]
  console.log(arr); // [ 1, 2, 3 ]
  ```

- `얕은 복사(shallow copy)를 통해 새로운 배열을 생성`

  ```jsx
  const arr = [1, 2, 3];
  const shallowCopy = arr.slice();

  shallowCopy.splice(0, 1); // 복사본 배열 첫 번째 요소 삭제
  console.log(shallowCopy); // [ 2, 3 ]
  console.log(arr); // [ 1, 2, 3 ]
  ```

<br />



## 9. 배열 고차 함수

`고차함수`는 함수를 인수로 전달받거나 함수를 반환하는 함수를 말합니다.    
자바스크립트의 함수는 일급 객체이므로 함수를 값처럼 인수로 전달할 수 있으며 반환할 수도 있습니다. 고차 함수는 외부 상태의 변경이나 가변데이터를 피하고 `불변성을 지향`하는 함수형 프로그래밍에 기반을 두고 있습니다.     


함수형 프로그래밍은 순수 함수와 보조 함수의 조합을 통해 로직 내에 존재하는 조건문과 반복문을제거하여 복잡성을 해결하고 변수의 사용을 억제하여 상태 변경을 피하려는 프로그래밍 패러다임입니다.     
함수형 프로그래밍은 결국 순수 함수를 통해 부수 효과를 최대한 억제하여 오류를 피하고 프로그래밍의 안정성을 높이려는 노력의 일환입니다.    


### 1) sort
sort 메서드는 배열의 요소를 정렬합니다. 원본 배열을 직접 변경하여 정렬된 배열을 반환합니다.

sort 메서드는 시본적으로 오름차순으로 정렬합니다.

```js

const fruits = ['Banana', 'Orange', 'Apple'];

// 오름차순(ascending) 정렬
fruits.sort();

// sort 메서드는 원본 배열을 직접 변경한다.
console.log(fruits); // ['Apple', 'Banana', 'Orange']
한글 문자열인 요소도 오름차순으로 정렬된다.
```


sort 메서드는 유니코드 코드 포인트의 순서를 따라 정렬합니다. 하지만 숫자의 크기와 유니코드 순서와 일치하지 않기 때문에 의도하는 대로 정렬되지 않을 수 있습니다. sort 메서드는 배열의 요소를 일시적으로 문자열로 변환한 후 정렬합니다.    

```js
['2', '1'].sort(); // -> ["1", "2"]
[2, 1].sort();     // -> [1, 2]

['2', '10'].sort(); // -> ["10", "2"]
[2, 10].sort();     // -> [10, 2]
```


### 2) forEach

forEach 메서드는 for 문을 대체할 수 있는 고차 함수입니다. forEach 메서드는 자신의 내부에서 반복문을 실행합니다.     
forEach 메서드는 내부에서 반복문을 통해 자신을 호출한 배열을 순회하면서 수행해야 할 처리를 콜백 함수로 전달받아 반복 호출합니다.

```js
//for문
const numbers = [1, 2, 3];
let pows = [];

// for 문으로 배열 순회
for (let i = 0; i < numbers.length; i++) {
  pows.push(numbers[i] ** 2);
}
console.log(pows); // [1, 4, 9]


//forEach문
const numbers = [1, 2, 3];
let pows = [];

// forEach 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백 함수를 반복 호출한다.
numbers.forEach(item => pows.push(item ** 2));
console.log(pows); // [1, 4, 9]
```

위 예제에서 배열의 요소가 3개이므로 콜백 함수도 3번 호출합니다.

forEach 메서드의 콜백 함수는 forEach 메서드를 호출한 배열의 요소값, 인덱스, forEach 메서드를 호출한 배열 자체, 즉 this를 순차적으로 전달받을 수 있습니다.

### 3) map

map 메서드는 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출합니다. 그리고 콜백 함수의 반환값들로 구성된 새로운 배열을 반환합니다. 이때 원본 배열을 변경되지 않습니다.    
   
```js
const numbers = [1, 4, 9];

// map 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백 함수를 반복 호출한다.
// 그리고 콜백 함수의 반환값들로 구성된 새로운 배열을 반환한다.
const roots = numbers.map(item => Math.sqrt(item));

// 위 코드는 다음과 같다.
// const roots = numbers.map(Math.sqrt);

// map 메서드는 새로운 배열을 반환한다
console.log(roots);   // [ 1, 2, 3 ]
// map 메서드는 원본 배열을 변경하지 않는다
console.log(numbers); // [ 1, 4, 9 ]
```

### 4) filter

filter 메서드는 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출하고, 콜백 함수의 반환 값이 true인 요소로만 구성된 새로운 배열을 반환합니다. 이때 원본 배열을 변경되지 않습니다.

```js
const numbers = [1, 2, 3, 4, 5];

// filter 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백 함수를 반복 호출한다.
// 그리고 콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환한다.
// 다음의 경우 numbers 배열에서 홀수인 요소만을 필터링한다(1은 true로 평가된다).
const odds = numbers.filter(item => item % 2);
console.log(odds); // [1, 3, 5]
```

### 5) reudce

reduce 메서드는 자신을 호출한 배열을 모든 요소를 순회하면 인수로 전달받은 콜백 함수를 반복 호출합니다. 그리고 콜백 함수의 반환 값을 다음 순회 시에 콜백 함수의 첫 번째 인수로 전달하면서 콜백 함수를 호출하여 하나의 결과값을 만들어 반환합니다.    
reduce 메서드는 첫 번째 인수로 콜백함수, 두 번째 인수로 초기값을 전달 받습니다.    
reduce 메서드의 콜백 함수에는 초기값 또는 콜백 함수의 이전 반환 값, reduce 메서드를 호출한 배열의 요소값, 인덱스, reduce 메서드를 호출한 메서드(this)가 인수로 전달됩니다.


```js
// [1, 2, 3, 4]의 모든 요소의 누적을 구한다.
const sum = [1, 2, 3, 4].reduce(
 (accumulator, currentValue, index, array) => accumulator + currentValue, 0);

console.log(sum); // 10
```

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/b1a1aae1-5317-487d-b297-d488819f33f0)

### 6) some

some 메서드는 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출합니다. 이떄 some 메서드는 콜백 함수의 반환값이 단 한번이라도 참이면 true, 모두 거짓이면 false를 반환합니다. 즉 배열의 요소 중에 콜백 함수를 통해 정의한 조건을 만족하는 요소가 1개 이상 존재하는지 확인하여 그 결과를 불리언 타입으로 반환합니다.     

다른 고차함수와 마찬가지로 some 메서드의 콜백 함수는 some 메서드를 호출한 요소값, 인덱스, some 메서드를 호출한 배열 자체(this)를 전달받을 수 있습니다.    

```js
// 배열의 요소 중에 10보다 큰 요소가 1개 이상 존재하는지 확인
[5, 10, 15].some(item => item > 10); // -> true

// 배열의 요소 중에 0보다 작은 요소가 1개 이상 존재하는지 확인
[5, 10, 15].some(item => item < 0); // -> false

// 배열의 요소 중에 'banana'가 1개 이상 존재하는지 확인
['apple', 'banana', 'mango'].some(item => item === 'banana'); // -> true

// some 메서드를 호출한 배열이 빈 배열인 경우 언제나 false를 반환한다.
[].some(item => item > 3); // -> false
```

### 7) every

every 메서드는 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출합니다. 이때 every 메서드는 콜백 함수의 반환값이 모두 참이면 ture, 단 한번이라도 거짓이면 false를 반환합니다. 즉, 배열의 모든 요소가 콜백 함수를 통해 정의한 조건을 모두 만족하는지 확인하여 그 결과를 불리언 타입으로 반환합니다.    

 다른 고차함수와 마찬가지로 every 메서드의 콜백 함수는 every 메서드를 호출한 요소값, 인덱스, some 메서드를 호출한 배열 자체(this)를 전달받을 수 있습니다.    

```js
// 배열의 모든 요소가 3보다 큰지 확인
[5, 10, 15].every(item => item > 3); // -> true

// 배열의 모든 요소가 10보다 큰지 확인
[5, 10, 15].every(item => item > 10); // -> false

// every 메서드를 호출한 배열이 빈 배열인 경우 언제나 true를 반환한다.
[].every(item => item > 3); // -> true
```

### 8) find 

ES6에서 도입된 find 메서드는 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출하여 반환값이 true인 첫 번째 요소를 반환합니다. 만약 콜백 함수의 반환값이 true인 요소가 존재하지 않는다면 undefined를 반환합니다.

다른 고차함수와 마찬가지로 find 메서드의 콜백 함수는 find 메서드를 호출한 요소값, 인덱스, some 메서드를 호출한 배열 자체(this)를 전달받을 수 있습니다.    

```js
const users = [
  { id: 1, name: 'Lee' },
  { id: 2, name: 'Kim' },
  { id: 2, name: 'Choi' },
  { id: 3, name: 'Park' }
];

// id가 2인 첫 번째 요소를 반환한다. find 메서드는 배열이 아니라 요소를 반환한다.
users.find(user => user.id === 2); // -> {id: 2, name: 'Kim'}
```

### 9) findIndex

ES6에 도입된 findIndex 메서드는 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출하여 반환값이 true인 첫 번째 요소의 인덱스를 반환합니다.    


```js
const users = [
  { id: 1, name: 'Lee' },
  { id: 2, name: 'Kim' },
  { id: 2, name: 'Choi' },
  { id: 3, name: 'Park' }
];

// id가 2인 요소의 인덱스를 구한다.
users.findIndex(user => user.id === 2); // -> 1

// name이 'Park'인 요소의 인덱스를 구한다.
users.findIndex(user => user.name === 'Park'); // -> 3

// 위와 같이 프로퍼티 키와 프로퍼티 값으로 요소의 인덱스를 구하는 경우
// 다음과 같이 콜백 함수를 추상화할 수 있다.
function predicate(key, value) {
  // key와 value를 기억하는 클로저를 반환
  return item => item[key] === value;
}

// id가 2인 요소의 인덱스를 구한다.
users.findIndex(predicate('id', 2)); // -> 1

// name이 'Park'인 요소의 인덱스를 구한다.
users.findIndex(predicate('name', 'Park')); // -> 3
```

### 10) flatMap

ES10에서 도입된 flatMap 메서드는 map 메서드를 통해 생성된 새로운 배열을 평탄화합니다.  즉 map 메서드와 flat 메서드를 순차적으로 실행하는 효과가 있습니다.   
```js
const arr = ['hello', 'world'];

// map과 flat을 순차적으로 실행
arr.map(x => x.split('')).flat();
// -> ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']

// flatMap은 map을 통해 생성된 새로운 배열을 평탄화한다.
arr.flatMap(x => x.split(''));
// -> ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
```

❗️단, flatMap 메서드는 flat 메서드 처럼 평탄화 깊이를 지정할 수는 없고, 1단계만 평탄화합니다.   

```js
const arr = ['hello', 'world'];

// flatMap은 1단계만 평탄화한다.
arr.flatMap((str, index) => [index, [str, str.length]]);
// -> [[0, ['hello', 5]], [1, ['world', 5]]] => [0, ['hello', 5], 1, ['world', 5]]

// 평탄화 깊이를 지정해야 하면 flatMap 메서드를 사용하지 말고 map 메서드와 flat 메서드를 각각 호출한다.
arr.map((str, index) => [index, [str, str.length]]).flat(2);
// -> [[0, ['hello', 5]], [1, ['world', 5]]] => [0, 'hello', 5, 1, 'world', 5]
```

