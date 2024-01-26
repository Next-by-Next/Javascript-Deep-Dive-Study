**TIL(Today I learn) 기록일** : 2024. 01. 26

# 43. Ajax

## 1. Ajax란?

Ajax란 자바스크립트를 사용하여 브라우저가 서버에게 비동기 방식으로 데이터를 요청하고, 서버가 응답한 데이터를 수신하여 웹페이지를 동적으로 갱신하는 프로그래밍 방식을 말합니다.
Ajax는 브라우저에서 제공하는 Web API인 XMLHttpRequest 객체를 기반으로 동작합니다.
XMLHttpRequest는 HTTP 비동기 통신을 위한 메서드와 프로퍼티를 제공합니다.

Ajax는 서버로부터 웹페이지의 변경에 필요한 데이터만 비동기 방식으로 전송받아 웹페이지를 변경할 필요가 없는 부분은 다시 렌더링하지 않고, 변경할 필요가 있는 부분만 한정적으로 렌더링하는 방식이 가능해졌습니다.
이를 통해 브라우저에서도 데스크톱 애플리케이션과 유사한 빠른 퍼포먼스와 부드러운 화면 전환이 가능해졌습니다.    

## 2. Json

JSON은 클라이언트와 서버 간의 HTTP 통신을 위한 텍스트 데이터 포맷입니다.    
자바스크립트에 종속되지 않는 독립형 데이터 포맷으로, 대부분의 프로그램이 언어에서 사용할 수 있습니다.     

>JSON 표기 방식    
>JSON은 자바스크립트의 객체 리터럴과 유사하게 키와 값으로 구성된 순수한 텍스트입니다.
```json
{
     "name": "Lee",
     "age": 20,
     "alive": true,
     "hobby": ["traveling", "tennis"]
}
```

- JSON.stringify
  - JSON.stringify 메서드는 객체를 JSON 포맷의 문자열로 변환합니다.
  - 클라이언트가 서버로 객체를 전송하려면 객체를 문자열화해야 하는데 이를 직렬화라 합니다.
- JSON.prase
  - JSON.parse 메서드는 JSON 포맷의 문자열을 객체로 변환합니다.
  - 서버로부터 클라이언트에게 전송된 JSON 데이터는 문자열입니다.
  - 이 문자열을 객체로서 사용하려면 JSON 포맷의 문자열을 객체화해야 하는데 이를 역직렬화라 합니다.

## 3. XMLHttpRequest

- 브라우저는 주소창이나 HTML의 form 태그 또는 a 태그를 통해 HTTP 요청 전송 기능을 기본 제공한합니다.
- 자바스크립트를 사용하여 HTTP 요청을 전송하려면 XMLHttpRequest 객체를 사용한다.
- Web API인 XMLHttpRequest 객체는 HTTP 요청 전송과 HTTP 응답 수신을 위한 다양한 메서드와 프로퍼티를 제공합니다.

**XMLHttpRequest 객체 생성**

XMLHttpRequest 객체는 XMLHttpRequest 생성자 함수를 호출하여 생성합니다.

<br>

**HTTP 요청 전송**

- HTTP 요청을 전송하는 경우 다음 순서를 따릅니다.
  - XMLHttpRequest.prototype.open 메서드로 HTTP 요청을 초기화합니다.
  - 필요에 따라 XMLHttpRequest.prototype.setRequestHeader 메서드로 특정 HTTP 요청의 헤더 값을 설정합니다.
  - XMLHttpRequest.prototype.send 메서드로 HTTP 요청을 전송합니다.

<br>

**HTTP 응답 처리**
- 서버가 전송한 응답을 처리하려면 XMLHttpRequest 객체가 발생시키는 이벤트를 캐치해야 합니다.
- XMLHttpRequest 객체는 onreadystatechange, onload, onerror 같은 이벤트 핸들러 프로퍼티를 갖습니다. 이 이벤트 핸들러 프로퍼티 중에서 HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티 값이 변경된 경우 발생하는 readystatechange 이벤트를 캐치하여 HTTP 응답을 처리할 수 있습니다.
