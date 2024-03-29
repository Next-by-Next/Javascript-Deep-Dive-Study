**TIL(Today I learn) 기록일** : 2023.11.11

# 11장. 원시 값과 객체의 비교

- 자바스크립트가 제공하는 데이터 타입은 크게 **원시 타입**과 **객체 타입** 으로 구분할 수 있습니다.

- 원시 타입 값
  - 변경 불가능한 값
  - 변수에 할당하면 변수(확보된 메모리 공간)에는 실제 값이 저장됩니다.
- 객체(참조) 타입의 값
  - 변경이 가능한 값
  - 변수에 하랑하면 변수(확보된 메모리 공간)에는 참조 값이 저장됩니다.

## 1. 원시 값

### 1) 변경 불가능한 값

1. 원시 타입의 값, 즉 원시 값은 변경 불가능한 값입니다.
- 여기서 변수와 값을 명확히 구분해야합니다.
  - 변수 : 하나의 값을 저장하기 위해 확보된 메모리 공간 자체 또는 그 메모리 공간을 식별하기 위해 붙인 이름
  - 값 : 변수에 저장된 데이터로서 표현식이 평가되어 생성된 결과를 말합니다.
2. 불변성을 갖는 원시 값을 할당한 변수는 재할당 이외에 변수 값을 변경할 수 있는 방법은 없습니다.

### 2) 문자열과 불변성

문자열은 원시값입니다.    
문자열은 유사 배열 객체이면서 이터러블이므로 배열과 유사하게 각 문자에 접근할 수 있습니다.   

><유사 배열 객체>
```js

유사 배열 객체란 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체를 말합니다.
문자열은 마치 배열처럼 인덱스를 통해 각 문자에 접근할 수 있으며, length 프로퍼티를 갖기 때문에 유사 배열 객체이고 for문으로 순회할 수도 있습니다. 
var str = 'string';
// 문자열은 유사 배열이므로 배열과 유사하게 인덱스를 사용해 각 문자에 접근할 수 있다.
console.log(str[0]); // s
// 원시 값인 문자열이 객체처럼 동작한다.
console.log(str.length); // 6
console.log(str.toUpperCase()); // STRING
```

❗️ 주의 
- str[0] = 'S' 처럼 이미 생성된 문자열의 일부 문자를 변경해도 반영되지 않습니다. 문자열은 변경 불가능한 값이기 때문입니다. 이처럼 한번 생성된 문자열은 읽기 전용 값으로서 변경할 수 없습니다.
        따라서 데이터의 신뢰성이 보장됩니다. 변수에 새로운 문자열을 재할당하는 것은 가능하지만 이는 기존 문자열을 변경하는 것이 아니라 새로운 문자열을 새롭게 할당하는 것 입니다.

### 3) 값에 의한 전달

엄격하게 표현하면 변수에는 값이 전달되는 것이 아니라 메모리 주소가 전달되기에 값에 의한 전달은 모호한 표현입니다. 변수와 같은 식별자는 값이 아니라 메모리 주소를 기억하고 있습니다.

![image](https://user-images.githubusercontent.com/76567238/207576990-9a160d7d-b45a-4444-8f35-a8c69ae9b214.png)


```js
var score = 80;
var copy = score;

console.log(score); // 80
console.log(copy); // 80

score = 100;

console.log(score); // 100
console.log(copy); // ?
```

여기서 score 변수와 copy 변수의 값의 80은 다른 메모리 공간에 저장된 별개의 값입니다.    
따라서 score에 100을 할당해도 copy의 값은 80 그대로 입니다.

![image](https://user-images.githubusercontent.com/76567238/207599250-836fc425-cb3b-47e9-b8e4-9ae081c52012.png)

여기서 기억해야할 점은 "값의 의한 절달"도 사실은 값을 전달하는 것이 아니라 메모리 주소를 전달합니다. 단, 전달된 메모리주소를 통해 메모리 공간에 접근하면 값을 참조할 수 있습니다.

## 2. 객체

객체는 프로퍼티의 개수가 정해져 있지 않으며, 동적으로 추가되고 삭제할 수 있습니다. 또한 프로퍼티의 값에도 제약이 없습니다. 따라서 객체는 원시 값과 같이 확보해야 할 메모리 공간의 크기를 사전에 정해 둘 수 없습니다.

📌 자바스크립트 객체의 관리 방식

자바스크립트 객체는 프로퍼티 키를 인덱스로 사용하는 해시 테이블이라고 생각할 수 있습니다.   
대부분의 자바스크립트 엔진은 해시 테이블과 유사하지만 높은 성능을 위해 일반적인 해시 테이블보다 나은 방법으로 객체를 구현합니다.

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/7b26f8ca-a6ee-487a-a238-d7b7a23f34b3)

자바, c++ 같은 클래스 기반 객체지향 프로그래밍 언어는 사전에 정의된 클래스를 기반으로 객체(인스턴스)를 생성합니다. 
다시 말해, 객체를 생성하기 이전에 이미 프로퍼티와 메서드가 정해져 있으며 그대로 객체를 생성한다.'객체가 생성된 이후에는 프로퍼티를 삭제하거나 추가할 수 없습니다.
이는 사용하기 매우 편리하지만 성능 면에서는 이론적으로 클래스 기반 객체지향 프로그래밍언어의 객체보다 생성과 프로퍼티 접근에 비용이 더 많이 드는 비효율적인 방식입니다.
따라서 V8 자바스크립트 엔진에서는 프로퍼티에 접근하기 위해 동적 탐색 대신 히든 클래스라는 방식을 사용해 C++객체의 프로퍼티에 접근하는 정도의 성능을 보장합니다.
히든 클래스는 자바와 같이 고정된 객체 레이아웃(클래스)과 유사하게 동작합니다.

### 1) 변경 가능한 값

객체(참조) 타입의 값, 즉 객체는 변경 가능한 값입니다.    
메모리를 효율적으로 사용하기위해 그리고 객체를 복사해 생성하는 비용을 절약하여 성능을 향상시키기 위해 객체는 변경 가능한 값으로 설계되어있습니다.      

```js
var person = {
  name: 'Lee'
};
```
![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/b89fe5d0-f195-4b12-b65f-45f07322fcc8)


객체는 위와 같이 객체를 할당한 변수 `person`을 참조하면 메모리에 저장되어 있는 참조 값(0x00...1)을 통해 실제 객체 `{name: 'LEE'}`에 접근합니다.

### 2) 참조에 의한 전달

```js
var person = {
  name: 'Lee'
};

// 참조 값을 복사(얕은 복사)
var copy = person;
```

객체를 가리키는 변수(원본, person)를 다른 변수(사본, copy)에 할당하면 원본의 참조 값이 복사되어 전달됩니다. 이를 **참조에 의한 전달**이라고 합니다.   

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/9ea5bf25-763f-43b7-89a4-3bb47b7f07fe)

위 그림처럼 원본 person을 사본 copy에 할당하면 원본 person의 참조 값을 복사해서 copy에 저장합니다. 이때 원본 person과 사본 copy는 저장된 메모리 주소는 다르지만 동일한 참조 값을 갖습니다. 다시 말해 원본 person과 사본 copy는 저장된 메모리 주소는 다르지만 동일한 참조 값을 갖습니다.     
이것은 두 개의 식별자가 하나의 객체를 공유한다는 것을 의미합니다. 따라서 원본 또는 사본 중 어느 한쪽에서 객체를 변경하면 서로 영향을 주고 받습니다.
