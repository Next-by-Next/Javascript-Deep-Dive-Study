# ⭐️ Recommendation

## 📌 21 빌트인 객체

### 🥎 season 2

- [문소희](https://github.com/Next-by-Next/Javascript-Deep-Dive-Study/blob/main/docs/21_%EB%B9%8C%ED%8A%B8%EC%9D%B8%20%EA%B0%9D%EC%B2%B4/%EB%AC%B8%EC%86%8C%ED%9D%AC.md)
- [장서윤](https://github.com/Next-by-Next/Javascript-Deep-Dive-Study/blob/main/docs/21_%EB%B9%8C%ED%8A%B8%EC%9D%B8%20%EA%B0%9D%EC%B2%B4/%EB%B0%95%EB%85%B8%EC%A4%80.md)
- [이나린](https://github.com/Next-by-Next/Javascript-Deep-Dive-Study/blob/main/docs/21_%EB%B9%8C%ED%8A%B8%EC%9D%B8%20%EA%B0%9D%EC%B2%B4/%EC%9D%B4%EB%82%98%EB%A6%B0.md#4-%EC%A0%84%EC%97%AD-%EA%B0%9D%EC%B2%B4)
  
### 🥎 season 1

- [강인영](https://github.com/Next-by-Next/Javascript-Deep-Dive-Study/blob/main/docs/21_%EB%B9%8C%ED%8A%B8%EC%9D%B8%20%EA%B0%9D%EC%B2%B4/%EA%B0%95%EC%9D%B8%EC%98%81.md)
- [박노준](https://github.com/Next-by-Next/Javascript-Deep-Dive-Study/blob/main/docs/21_%EB%B9%8C%ED%8A%B8%EC%9D%B8%20%EA%B0%9D%EC%B2%B4/%EB%B0%95%EB%85%B8%EC%A4%80.md) ⭐️

<br>

## 📚 21장 빌트인 객체를 읽고 나서

#### 강인영

- 코딩할 때 정확한 용어를 알지 못하고 필요한 대로 쓴 코드들이 많았는데.. 메서드라고 다 같은 메서드가 아님을 제대로 깨달았다. (너무 당연한 말이지만)
    - 예를 들어 인스턴스 없이도 사용 가능한 빌트인 정적 메서드에 대해서 사용해본 경험은 있었지만, 메서드의 의미와 용도를 정확히 알게 되었다.
- 또 var과 let, const 간의 차이를 정확히 이해하게 되었고, var가 지양되는 경우에 대해서도 알게 되었다.
- isNaN, parseFloat 가 어떤 용도로 쓰이는지 이미 알고 있었지만, 그것들을 무엇으로 명명하는지 이번 장에서 알게 되었다. 사용만 하고 무엇이라 불리는지는 관심이 없었던 지난 날의 나를 성찰하게 된다..😅

#### 박노준

- 처음 JS를 공부하기 시작했을 때 Node.js API를 MDN에서 찾고는 했었습니다. 처음에는 둘이 같은 것을 각자의 방식으로 서술한 줄로만 알았는 데 일부는 맞고 일부는 틀린 해석이라고 할 수 있겠네요.

- 전역 객체를 사용하면서도 window 객체의 프로퍼티나 메소드니까 window를 명시해주는 것이 가독성이 좋은 코드인가?라는 고민을 했던 적이 있습니다. 그때는 결론을 남들도 다 생략하니까 나도 생략해야지라는 찝찝한 느낌으로 생각했었는 데 이번 챕터를 공부하면서 더 생각해보니 남들도 생략하니까가 컨벤션의 측면에서 맞는 것 같습니다.
- 우리가 코딩하면서 const obj = new globalThis.Object() 이렇게 사용하는 경우는 매우 드물잖아요.(사실 한 번도 본적 없고 이렇게 사용할 수 있다는 것을 생각도 못해봤습니다.)

#### 신승현

- 자바스크립트 객체의 분류와 문자열, 불리언 값, 숫자 값에 빌트인 함수 사용에 대한 원리를 알 수 있었고 표준 빌트인 생성자 함수가 존재하는 이유가 원시값이 임시 객체인 래퍼 객체처리 된다는 것이 처음 보는 내용이였고 신기하였다.


#### 이지연

- 자바스크립트 객체의 분류와 문자열, 불리언 값, 숫자 값에 빌트인 함수 사용에 대한 원리를 알 수 있었고 표준 빌트인 생성자 함수가 존재하는 이유가 원시값이 임시 객체인 래퍼 객체처리 된다는 것이 처음 보는 내용이였고 신기하였다.

#### 최성관

- 내가 항상 당연한듯이 써왔던 원시값에 대한 메소드들이 자바스크립트 내부에서 객체로 변환되어 사용 가능하다는 사실을 처음 알았다.
- undefined와 null 에 대해서 에러를 발생시키는 이유도 래퍼객체를 생성하지 않아서라는 점도 깨달았다. 앞으로 객체와 타입에 대해 이해하는데 많은 도움이 될것 같다.
