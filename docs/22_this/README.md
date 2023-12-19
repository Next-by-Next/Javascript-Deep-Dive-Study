# ⭐️ Recommendation

## 📌 21 빌트인 객체

### 🥎 season 2

- [문소희](https://github.com/Next-by-Next/Javascript-Deep-Dive-Study/blob/main/docs/22_this/%EB%AC%B8%EC%86%8C%ED%9D%AC.md)
- [이나린](https://github.com/Next-by-Next/Javascript-Deep-Dive-Study/blob/main/docs/22_this/%EC%9D%B4%EB%82%98%EB%A6%B0.md)
- [장서윤](https://github.com/Next-by-Next/Javascript-Deep-Dive-Study/blob/main/docs/22_this/%EC%9E%A5%EC%84%9C%EC%9C%A4.md)
  
### 🥎 season 1

- [강인영](https://github.com/Next-by-Next/Javascript-Deep-Dive-Study/blob/main/docs/22_this/%EA%B0%95%EC%9D%B8%EC%98%81.md)
- [이보리](https://github.com/Next-by-Next/Javascript-Deep-Dive-Study/blob/main/docs/22_this/%EC%9D%B4%EB%B3%B4%EB%A6%AC.md)
- [지유진](https://github.com/Next-by-Next/Javascript-Deep-Dive-Study/blob/main/docs/22_this/%EC%A7%80%EC%9C%A0%EC%A7%84.md)

<br>

## 📚 21장 빌트인 객체를 읽고 나서

### 강성욱

- `this`란 무엇이고 함수 호출에 따른 `this 바인딩`에 대해 알게 되었다.
- 이전에 면접 공부를 하며 this 바인딩에 대해 공부한 적이 있는데 그떄는 이해하기 보다 그저 외우기만 했고, 그만큼 금방 까먹었다.
- 이 책을 공부하면서 알게된 많은 배경지식들을 가지고 this 바인딩에 대해 공부하니 이제는 암기가 아닌 이해를 통해 머리속에 남게 된 것 같다.


### 강인영

- `this` 의 정의에 대해서 알 수 있었고, 사용되는 용도를 정확히 알게 되니 지난 날 this의 남발하던 과거가 스쳐 지나간다..
    - 함수 내부의 콜백 함수에서 this를 썼다가 함수의 this와 헷갈려서 프로그램 기능이 제대로 실행되지 않은 적이 있었다. 이제는 이런 이슈가 방지할 수 있겠지..! 😂
    - class든 function이든 this를 써서 값을 저장하던 버릇, 이제는 고칠 수 있겠다.
- `this` 와 전역 객체 간의 연관성을 알아보는 장이었다. this를 무분별하게 쓰는 경우 객체가 전역인지 지역적으로 쓰이는지 구분하기 힘들어지기 때문에, 유의해야 할 듯함🧐또
- 또한 `var` 과 `const` 에 따라 **전역 객체의 property**가 달라지는 것을 보면서, 상황에 맞는 **변수 선언 방식**을 설정해야겠다고 생각함.
    - 현업에서는 var 를 자주 사용하는지 궁금하다..

### 강철원

- 그동안 this에 대해 자세히 공부한적이 없는 것 같다. 그냥 다른 사람 코드보고 아 이런식으로 사용하는구나. 생각만 했지 이렇게 디테일하게 공부한적은 처음이다.    
- 지금까지 객체 내부에서만 사용해서 그외에는 어떻게 적용되는지 몰랐는데 이번기회를 통해 알게 되었다. this를 일반 함수에서 사용할 때 / 메서드에서 사용할 때 / 생성자 함수에서 사용할 때 조금씩 차이가 있다는 것을 알게되었다.    
> 이런식으로 중첩 함수를 호출하면 일반 함수이기에 this에는 전역객체가 바인딩되는 점 기억하자.
```js
// var 키워드로 선언한 전역 변수 value는 전역 객체의 프로퍼티다.
var value = 1;
// const 키워드로 선언한 전역 변수 value는 전역 객체의 프로퍼티가 아니다.
// const value = 1;

const obj = {
  value: 100,
  foo() {
    console.log("foo's this: ", this);  // {value: 100, foo: ƒ}
    console.log("foo's this.value: ", this.value); // 100

    // 메서드 내에서 정의한 중첩 함수
    function bar() {
      console.log("bar's this: ", this); // window
      console.log("bar's this.value: ", this.value); // 1
    }

    // 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 중첩 함수 내부의 this에는 전역 객체가 바인딩된다.
    bar();
  }
};

obj.foo();
```


### 신승현

- 프로토타입에 이어 this , 바인딩, apply, call, bind 메서드에 대해 알 수 있었고 함수 호출 방식에 의해 동적으로 결정되는 this 바인딩에 대해 확실하게 개념을 적립할 수 있었다.
