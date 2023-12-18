# ⭐️ Recommendation

## 📌 23 실행 컨텍스트

### 🥎 season 2

- [강성욱](https://github.com/Next-by-Next/Javascript-Deep-Dive-Study/blob/main/docs/23_%EC%8B%A4%ED%96%89%20%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8/%EA%B0%95%EC%84%B1%EC%9A%B1.md)
- [김은지](https://github.com/Next-by-Next/Javascript-Deep-Dive-Study/blob/main/docs/23_%EC%8B%A4%ED%96%89%20%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8/%EA%B9%80%EC%9D%80%EC%A7%80.md)
- [장서윤](https://github.com/Next-by-Next/Javascript-Deep-Dive-Study/blob/main/docs/23_%EC%8B%A4%ED%96%89%20%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8/%EC%9E%A5%EC%84%9C%EC%9C%A4.md)
- [한수지](https://github.com/Next-by-Next/Javascript-Deep-Dive-Study/blob/main/docs/23_%EC%8B%A4%ED%96%89%20%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8/%ED%95%9C%EC%88%98%EC%A7%80.md)
  
### 🥎 season 1


- [이보리](https://github.com/Next-by-Next/Javascript-Deep-Dive-Study/blob/main/docs/23_%EC%8B%A4%ED%96%89%20%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8/%EC%9D%B4%EB%B3%B4%EB%A6%AC.md)


<br>

## 📚 23장 실행 컨텍스트를 읽고 나서

### 강인영

- 내가 쓰는 코드가 ES6의 실행 컨텍스트로 관리되고, scope에 등록된다는 점이 흥미로웠다. 이런 문법을 그동안 몰랐어서 체계적으로 코드를 관리하지 못했던 점이 아쉬울 뿐이다ㅎㅎ..
- 규칙이 있다는 것은 프로그래밍에서 만큼은 재밌게 느껴진다. 알아가는게 즐겁고 어떻게 내 코드를 개선할 수 있는지 또다른 태스크가 주어지는 거니까..
예를 들어 변수를 어떻게 관리할지(전역 또는 지역), 콜백 함수 안에 변수를 선언할지 말지 등등
- 평가→실행→종료 라는 일련의 과정이 이루어지고 있음을 배웠으며, 디버깅할 때 이를 참고할 수 있을 듯하다.
- 예를 들어 여러 함수에서 쓰인다는 이유로 전역 객체를 쓰고자 한다면, 객체의 생성 시점과 각 함수가 실행되는 시점을 잘 고려해야 할 것이다. 만약 전역 객체가 필요한 특정 함수를 실행하였는데 전역 객체에 아무런 값이 할당되어 있지 않다면, 원하는 대로 프로그램이 실행되지 않기 때문이다.

### 신승현

- 이번 단원은 왠지 기초가 중요한 단원인 것 같다. 기존의 알고 있던 내용들이 조합되면서 실행 컨텍스트를 설명하는데 모르는 단어는 없지만 단어의 의미를 명확히 이해하지 못한다면 그 상위 단어 또한 이해하지 못하기에 기본을 다지고 가보자. 이번에 자바스크립트가 스코프를 기반으로 식별자와 식별자에 바인딩된 값(식별자 바인딩)을 관리하는 방식을 배웠고 이 뒤에 나올 내용도 확실히 이해하고 넘어가자.
