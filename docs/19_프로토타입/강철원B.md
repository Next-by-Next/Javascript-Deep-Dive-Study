**TIL(Today I learn) 기록일** : 2023.11.27

# 19장 프로토타입


자바스크립트는 멀티 패러다임 프로그래밍 언어입니다. 자바스크립트는 클래스 기반 객체지향 프로그래밍 언어보다 효율적이며 더 강력한 객체지향 프로그래밍 능력을 지니고 있는 프로토타입 기반의 객체지향프로그래밍 언어입니다.

🥎 **클래스**
>사실 클래스도 함수이며, 기존 프로토타입 기반 패턴의 문법적 설탕이라고 볼 수 있습니다.
>클래스와 생성자 함수는 모두 프로토타입 기반의 인스턴스를 생성하지만 정확히 동일하게 동작하지는 않습니다.
>클래스는 생성자 함수보다 엄격하며 클래스는 생성자 함수에서는 제공하지 않는 기능도 제공합니다.
>프로토타입을 알아야 클래스와 생성자 함수를 더 이해하기 쉽습니다.

자바스크립트는 객체 기반의 프로그래밍 언어이며 자바스크립트를 이루고 있는 거의 "모든 것"이 객체입니다.       
원시 타입의 값을 제되한 나머지 값들(함수, 배열, 정규 표현식 등)은 모두 객체입니다.       

**프로토타입을 배워보기전에 기초가되는 객체지향 프로그래밍에 대해 알아야합니다**

## 1. 객체 지향 프로그래밍

객체지향 프로그래밍은 프로그램을 명령어 또는 함수의 목록으로 보는 전통적인 명령형 프로그래밍의 절차지향적 관점에서 벗어나, 여러개의 독립적 단위인 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임을 말합니다.    

"사람"에게는 다양한 속성이 있으나 우리가 구현하려는 프로그램에서는 사람의 "이름"과 주소"라는 속성에만 관심이 있다고 가정한다면, 이러한 다양한 속성 중에서 프로그램에 필요한 속성만 간추려 내어 표현하는 것을 추상화라고 합니다.   

```js
// 이름과 주소 속성을 갖는 객체
const person = {
  name: 'Lee',
  address: 'Seoul'
};

console.log(person); // {name: "Lee", address: "Seoul"}
```

이름과 주소 속성으로 표현객 객체인 `person`을 다른 객체와 구별하여 인식할 수 있습니다. 이처럼 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조를 객체라고 하며, 이러한 객체의 집합으로 프로그램을 표현하려는 것이 객체지향 프로그래밍 패러다임입니다.   

객체는 상태(`state`)를 나타내는 데이터와 상태 데이터를 조작할 수 있는 동작을 하나의 논리적인 단위로 구성한것 입니다. 이때 객체의 상태 데이터를 프로퍼티, 동작을 메서드라고 부릅니다.   
```js
const circle = {
  // property
  radius: 5, // 반지름

  // method
  // 원의 지름: 2r
  getDiameter() {
    return 2 * this.radius;
  },

  // method
  // 원의 둘레: 2πr
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  },

  // method
  // 원의 넓이: πrr
  getArea() {
    return Math.PI * this.radius ** 2;
  }
};

console.log(circle);
// {radius: 5, getDiameter: ƒ, getPerimeter: ƒ, getArea: ƒ}

console.log(circle.getDiameter());  // 10
console.log(circle.getPerimeter()); // 31.41592653589793
console.log(circle.getArea());      // 78.53981633974483
```

## 2. 상속과 프로토타입

상속은 객체지향 프로그래밍의 핵심 개념입니다. 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말합니다. 상속을 구현하여 불필요한 중복을 제거할 수 있습니다.   

동일한 생성자 함수에 의해 생성된 모든 인스턴스가 동일한 메서드를 중복 소유한다면 메모리를 불필요하게 낭비하고, 인스턴스 생성시마다 메서드를 생성하므로 퍼포먼스에도 악영향을 줍니다.  프로토타입을 기반으로 상속을 구현하여 이를 해결할 수 있습니다.    

```js
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    return Math.PI * this.radius ** 2;
  };
}

const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log(circle1.getArea === circle2.getArea);	// false
console.log(circle1.getArea()); // 3.14159...
console.log(circle2.getArea());	// 12.56637...
```

위 예제에서는 `Circle` 생성자 함수가 생성하는 모든 객체(인스턴스)는 `radius` 프로퍼티와 `getArea`메서드를 갖습니다.     
같은 상태를 갖는 인스턴스가 필요한 것이 아니라면 각 인스턴스마다 `radius`프로퍼티 값은 일반적으로 다릅니다.    
하지만 `getArea`는 동일한 내용이므로 모든 인스턴스가 중복 소유합니다.   

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/b6e2a631-b58f-4537-b1ce-29ec3cb0d7af)

이러한 불필요한 중복을 방지하기 위해 프로토타입을 기반으로 상속을 구현하면 아래와 같습니다.   

```js
function Circle(radius) {
  this.radius = radius;
}
// 모든 인스턴스가 getArea 메서드를 사용할 수 있도록 프로토타입에 추가한다.
// 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

const circle1 = new Circle(1);
const circle2 = new Circle(2);
// Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
console.log(circle1.getArea === circle2.getArea);	// true
console.log(circle1.getArea()); // 3.14159...
console.log(circle2.getArea());	// 12.56637...
```

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/b7d8492c-2864-4b7a-b299-4176cabb828f)

`Circle` 생성자 함수가 생성한 모든 인스턴스는 상위(부모) 객체 역할을 하는 `Circle.prototype`의 모든 프로퍼티와 메서드를 상속받습니다.    
위 예제에서 생성된 모든 인스턴스는 `radius`프로퍼티만 개별적으로 소유하고 동일한 메서드는 상속을 통해 공유하여 사용합니다.
