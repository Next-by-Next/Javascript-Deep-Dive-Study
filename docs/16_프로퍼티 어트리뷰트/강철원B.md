**TIL(Today I learn) 기록일** : 2023.11.22

# 16장. 프로퍼티 어트리뷰트

## 1. 내부 슬롯과 내부 메서드

앞으로 살펴볼 프러피티 어트리뷰트를 이해하기 위해 먼저 내부 슬릇과 내부 메서드의 개념에 대해 알아야 합니다.    

내부 슬롯과 내부 메서드는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 아용하는 의사 프로퍼티와 의사 메서드입니다.

내부 슬롯과 내부 메서드는 ECMAScript 사양에 정의된 대로 구현되어 자바스크립트 엔진에서 실제로 동작하지만 개발자가 직접 접근할 수 있도록 외부로 공개된 객체의 프로퍼티는 아닙니다. 즉, 내부 슬롯과 내부 메서드는 자바스크립트 엔진의 내부 로직이므로 원칙적으로 자바스크립트는 내부 슬롯과 내부 메서드에 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않습니다.   

단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기도 합니다.

예를 들어, 모든 객체는 [[Prototype]]이라는 내부 슬롯을 갖습니다. 내부 슬롯은 자바스크립트 엔진의 내부로직이므로 원칙적으로 직접 접근할 수 없지만 [[Prototype]] 내부 슬롯의 경우, __proto__를 통해 간접적으로 접근할 수 있습니다.    


```js
const o = {};

// 내부 슬롯은 자바스크립트 엔진의 내부 로직이므로 직접 접근할 수 없다.
o.[[Prototype]] // > Uncaught SyntaxError: unexpected token '['

o.__proto__ // -> Object.prototype
```

## 2. 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의합니다.    

    
프로퍼티 상태란? `프로퍼티의 값`, `값의 갱신 가능 여부`, `열거 가능 여부`, `재정의 가능 여부`,를 말합니다.   

프로퍼티 어트리뷰트는 자바스크립트 엔진이 관리하는 내부 상태 값인 내부 슬릇 [[Valude]], [[Writable]], [[Enumerable]], [[Configurable]]입니다.    
따라서 `Object.getWonPropertyDescriptor`메서드를 사용하여 간접적으로 확인할 수는 있습니다.    

## 3. 데이터 프로퍼티와 접근자 프로퍼티

프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 구분할 수 있습니다.

- 데이터 프로퍼티<sup>data property</sup>
  - 키와 값으로 구성된 일반적인 프로퍼티다. 지금까지 살펴본 모든 프로퍼티는 데이터 프로퍼티다.
- 접근자 프로퍼티<sup>accessor property</sup>
  - 자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티다.

 ### 1) 데이터 프로퍼티

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/8d66a050-c52f-4235-939a-c8beae9d6ed8)

### 2) 접근자 프로퍼티

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/d5aa0338-4abf-44ea-90b7-c485b694e79f)


## 4. 프로퍼티 정의

새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의, 기준 프로퍼티의 프로퍼티 어트리뷰트를 재정의하는 것을 말합니다.    
Object.defineProperty 메서드를 사용하면 프로퍼티의 어트리뷰트를 정의할 수 있습니다.   

```js
const person = {};

// doc 
defineProperty<T>(o: T, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>): T;

// 1. 데이터 프로퍼티 정의
Object.defineProperty(person, 'firstName', {
    value: 'first',
    writable: true,
    enumerable: true,
    configurable: true
});

// [[Enumerable]] 이 false 이면 
// 해당 프로퍼티는 for...in, Object.keys 등으로 열거할 수 없다.
// [[Writable]] 이 false 이면 [[Value]]의 값을 변경할 수 없다.
// [[Configurable]] 이 false 이면 해당 프로퍼티 재정의, 삭제 할 수 없다.

// 2. 접근자 프로퍼티 정의
Object.defineProperty(person, 'fullName', {
    get() {
        return `${this.firstName} ${this.lastName}`;
    },
    set(name) {
        [this.firstName, this.lastName] = name.split(' ');
    },
    enumerable: true,
    configurable: true
});
```

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/69e5460e-8d60-4be3-a509-6d07cc828b43)


## 5. 객체 변경 방지

자바스크립트는 객체 변경을 방지하는 다양한 메서드를 제공합니다.    

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/79ec3c9b-8734-4382-97be-204c994e5386

자바스크립트는 객체의 변경을 방지하는 다양한 메서드를 제공하며 각각 객체의 변경을 금지하는 강도가 다릅니다.   

### 1) 객체 확장 금지   

`Object.preventExtensions` 메서드는 객체의 확장을 금지합니다. 확장이 금지된 객체는 프로퍼티 추가가 금지됩니다.    
프로퍼티는 프로퍼티 동적 추가와 `Object.defineProperty` 메서드로 추가할 수 있습니다. 이 두가지 추가 방법이 모두 금지됩니다.   

### 2) 객체 밀봉

`Object.seal` 메서드는 객체를 밀봉합니다. 객체 밀봉(seal)이란 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지를 의비합니다. 즉, 밀봉된 객체는 읽기와 쓰기만 가능합니다.   

### 3) 객체 동결   

`Object.freeze` 메서드는 객체를 동결합니다. 객체 동결이란 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지, 프로퍼티 값 갱신 금지를 의미합니다. 즉, 동결된 객체는 읽기만 가능합니다.   

### 4) 불변 객체

지금까지 살펴본 변경 방지 메서드들은 얕은 변경 방지로 직속 프로퍼티만 변경이 방지되고 중첩 객체까지는 영향을 주지 못합니다. 따라서 Object.freeze 메서드로 객체를 동결하여도 중첩 객체까지 동결할 수 없습니다. 
