**TIL(Today I learn) 기록일** : 2023.01.15

# 39장 DOM

브라우저 렌더링 엔진은 `HTML` 문서를 파싱하여 브라우저가 이해할 수 있는 자료구조인 `DOM`을 생성합니다.  `DOM`은 `HTML` 문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API, 즉 프로퍼티와 메서드를 제공하는 트리 자료구조입니다.    
    
## 1. 노드

### 1) HTML 요소와 노드 객체

`HTML`요소는 `HTML` 문서를 구성하는 개별적인 요소를 의미합니다.

![image](https://user-images.githubusercontent.com/76567238/221836832-da18b72b-33b1-4025-8c99-b7b9d92e3b21.png)

`HTML` 요소는 렌더링 엔진에 의해 파싱되어 `DOM`을 구성하는 요소 노드 객체로 변환됩니다. 이때 HTML 요소의 어트리뷰트는 어트리뷰트 노드로, `HTML` 요소의 텍스트 콘텐츠는 텍스트 노드로 변환된다.  

![image](https://user-images.githubusercontent.com/76567238/221837123-6ac8cdc3-2faa-4944-a420-65aba5e605c5.png)

HTML 문서는 HTML 요소들의 집합으로 이뤄지며, HTML 요소는 중첩 관계를 갖습니다. 즉, HTML 요소의 콘텐츠 영역에는 텍스트뿐만 아니라 다른 HTML 요소도 포함할 수 있습니다. 

>❓ 트리 자료구조
- 트리 자료구조는 노드들의 계층 구조로 이뤄집니다.
- 트리 자료구조는 부모 노드와 자식노드로 구서되어 노드 간의 계층적 구조(부자, 형제 관계)를 표현하는 비선형 자료구조를 말합니다. - 트리 자료구조는 하나의 최상위 노드에서 시작합니다. 
    - 최상위 노드는 부모 노드가 없으며, `루트 노드`라고 합니다.
- 루트 노드는 0개 이상의 자식 노드를 갖습니다. 
    - 자식 노드가 없는 노드를 `리프 노드`라고 합니다.

**노드 객체들로 구성된 트리 자료구조를 DOM(Document Object Model)이라 합니다.

<br>

### 2) 노드 객체의 타입

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script src="app.js"></script>
  </body>
</html>
```

위의 HTML 문서를 렌더링 엔진이 파싱한다면 아래처럼 `DOM`을 생성합니다.

![image](https://user-images.githubusercontent.com/76567238/221839264-87ccfad8-9557-40cc-8536-0c4d437b9eee.png)

이처럼 `DOM`은 노드 객체의 계층적인 구조로 구성됩니다. 노드 객체는 종류가 있고 상속 구조를 갖습니다.     
노드 객체는 총 12개의 종류(노드 타입)가 있습니다. 이 중에서 중요한 노드 타입은 다음과 같이 4가지 입니다.   
    
- 문서 노드(Document Node): 이 노드는 웹 페이지 전체를 대표합니다. 이것은 DOM 트리의 루트(root) 노드이며, 일반적으로 document 객체를 통해 접근할 수 있습니다. 이 객체를 통해 페이지의 다른 요소에 접근하고 조작할 수 있습니다.

- 요소 노드(Element Node): 이들은 HTML 요소를 나타냅니다. 예를 들어 <div>, <p>, <span> 등의 태그는 각각 요소 노드로 표현됩니다. 요소 노드는 자식 노드를 가질 수 있으며, 이 자식들은 다른 요소 노드, 텍스트 노드, 어트리뷰트 노드 등이 될 수 있습니다.

- 어트리뷰트 노드(Attribute Node): 이 노드는 HTML 요소의 속성을 나타냅니다. 예를 들어, <div class="container">의 class="container" 부분이 어트리뷰트 노드입니다. 어트리뷰트 노드는 해당 요소 노드에 대한 정보를 제공하지만, 일반적인 DOM 트리 구조에서는 자식 노드로 직접 나타나지 않습니다. 대신 요소 노드의 속성을 통해 접근할 수 있습니다.

- 텍스트 노드(Text Node): 이 노드는 요소의 텍스트 내용을 담고 있습니다. 예를 들어 <p>Hello World</p>에서 "Hello World" 텍스트는 텍스트 노드에 해당합니다. 텍스트 노드는 요소 노드의 자식으로, 다른 요소 노드나 어트리뷰트 노드를 가질 수 없습니다.

<br>

### 3) 노드 객체의 상속 구조

`DOM`은 `HTML` 문서의 계층적 구조와 정보를 표현하며, 이를 제어할 수 있는 API, 즉 프로퍼티와 메서드를 제공하는 트리 자료구조라고 했습니다. 이를 통해 노드 객체는 자신의 부모, 형제, 자식을 탐색할 수 있으며, 자신의 어트리뷰트와 텍스트를 조작할 수 있습니다.

❗️ `DOM`을 구성하는 노드 객체는 `ECMAScript`사양에 정의된 표준 빌트인 객체가 아니라 브라우저 환경에서 추가적으로 제공하는 호스트 객체입니다. 하지만 노드 객체도 자바스크립트 객체이므로 프로토타입에 의한 상속 구조는 다음과 같습니다.

![image](https://user-images.githubusercontent.com/76567238/222152715-6be40e62-6a5d-4925-9a55-818248ddc231.png)

## 2. 요소 노드 취득

`HTML`의 구조나 내용 또는 스타일 등을 동적으로 조작하려면 먼저 요소 노드를 취득해야 합니다.  텍스트 노드는 요소 노드의 자식 노드이고, 어트리뷰트 노드는 요소 노드와 연결되어 있기 때문에 텍스트 노드나 어트리뷰트 노드를 조작하고자 할 때도 마찬가지입니다.    

>예를 들어, `HTML` 문서 내의 `h1` 요소의 텍스트를 변경하고 싶은 경우를 생각해봅시다. 이 경우 먼저 `DOM` 트리 내에 존재하는 `h1`요소 노드를 취득할 필요가 있습니다. 그리고 취득한 요소 노드의 자식 노드인 텍스트 노드를 변경하면 해당 `h1`요소 노드를 취득할 필요가 있습니다. 그리고 취득한 요소 노드의 자식 노드인 텍스트 노드를 변경하면 해당 `h1` 요소의 텍스트가 변경됩니다.

### 1) `id`를 이용한 요소 노드 취득

`Document.prototype.getElementById` 메서드는 인수로 전달한 `id` 어트리뷰트 값(이하 id값)을 갖는 하나의 요소 노드를 탐색하여 반환합니다. `getElementById`메서드는 `Document.prototype`의 프로퍼티입니다. 따라서 반드시 문서 노드인 `document`를 통해 호출해야 합니다.    



`DOM`은 `HTML`문서의 계층적 구조와 정보를 표현하는 것은 물론 노드 객체의 종류, 즉 노드 타입에 따라 필요한 기능을 프로퍼티와 메서드의 집합인 `DOM API`로 제공합니다.  이 `DOM API`를 통해 `HTML`의 구조나 내용 또는 스타일등을 동적으로 조작할 수 있습니다.


- `id`값은 HTML 문서 내에서 유일한 값이어야 하며, `class`어트리뷰트와는 달리 공백 문자로 구분하여 여러개의 값을 가질 수 없습니다.
    - 단, HTML 문서 내에 중복된 `id`값을 갖는 HTML 요소가 여러 개 존재하더라도 어떠한 에러도 발생하지 않습니다.
    - 즉, HTML 문서 내에는 중복된 `id`값을 갖는 요소가 여러 개 존재할 가능성이 있습니다.
    - 이러한 경우 `getElementById` 메서드는 인수로 전달된 `id`값을 갖는 첫 번째 요소 노드만 반환합니다. (`getElementById` 메서드는 언제나 단 하나의 요소 노드를 반환합니다)
    - 만약 인수로 전달된 `id`값을 갖는 HTML 요소가 존재하지 않는 경우 `getElementById`메서드는 `null`을 반환합니다.
    - HTML 요소에 `id` 어트리뷰트를 부여하면 `id` 값과 동일한 이름의 전역 변수가 암묵적으로 선언되고 해당 노드 객체가 할당되는 부수 효과가 있습니다.
        - 단, `id`값과 동일한 이름의 전역 변수가 이미 선언되어 있으면 이 전역 변수에 노드 객체가 재할당되지 않습니다.

### 2) 태그 이름을 이용한 요소 노드 취득

`Document.prototype/Element.prototype.getElementsByTagName` 메서드는 인수로 전달한 태그 이름을 갖는 모든 요소 노드들을 탐색하여 반환합니다. 메서드 이름에 포함된 `Elements`가 복수형인 것에서 알 수 있듯이 `getElementsByTagName`메서드는 여러 개의 요소 노드 객체를 갖는 `DOM`컬렉션 객체인 `HTMLCollection`객체를 반환합니다.    


- 함수는 하나의 값만 반환할 수 있으므로 여러 개의 값을 반환하려면 배열이나 객체와 같은 자료구조에 담아 반환해야 합니다.
- `getElementsByTagName`메서드가 반환하는 `DOM` 컬렉션 객체인 `HTMLCollection`객체는 유사 배열 객체이면서 이터러블입니다.

### 3) class를 이용한 요소 노드 취득

`Document.prototype/Element.prototype.getElementsByClassName` 메서드는 인수로 전달한 `Class` 어트리뷰트 값을 갖는 모든 요소 노드들을 탐색하여 반환합니다. 인수로 전달할 `class`값은 공백으로 구분하여 여러 개의 `class`를 지정할 수 있습니다.    
`getElementsByTagName` 메서드와 마찬가지로 `getElementsByClassName`메서드는 여러 개의 요소 노드 객체를 갖는 `DOM`컬렉션 객체인 `HTMLCollection`객체를 반환합니다.

- `document`를 통해 호출하며 `DOM`전체에서 요소 노드를 탐색하여 반환하고 `Element.prototype.getElementsByClassName`메서드는 특정 요소 노드를 통해 호출하며 특정 요소 노드의 자손 노드 중에서 요소 노드를 탐색하여 반환합니다.
- 만약 인수로 전달된 `class`값을 갖는 요소가 존재하지 않는 경우 `getElementsByClassName`메서드는 빈 `HTMLCollection`객체를 반환합니다.


### 4) CSS 선택자를 이용한 요소 노드 취득

Document.prototype/Element.prototype.querySelector 메서드

- 인수로 전달한 CSS 선택자를 만족시키는 요소 노드가 여러 개인 경우 첫 번째 요소 노드만 반환
- 인수로 전달된 CSS 선택자를 만족시키는 요소 노드가 존재하지 않는 경우 null을 반환
- 인수로 전달한 CSS 선택자가 문법에 맞지 않는 경우 DOMException 에러가 발생

>Document.prototype/Element.prototype.querySelectorAll 메서드 --> 여러 개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인 NodeList 객체를 반환하는데 이는 유사 배열 객체이면서 이터러블입니다.

- 인수로 전달된 CSS 선택자를 만족시키는 요소가 존재하지 않는 경우 빈 NodeList 객체를 반환
- 인수로 전달한 CSS 선택자가 문법에 맞지 않는 경우 DOMException 에러가 발생

### 5) 특정 요소 노드를 취득할 수 있는지 확인


>Element.prototype.matches("CSS선택자")

- 인수로 전달한 CSS 선택자를 통해 특정 노소를 취득할 수 있는지를 확인합니다.
- 이벤트 위임 등에서의 조건문에 주로 사용됩니다.
- getElementsByClassName 등은 HTMLCollection을 반환합니다.
- querySelectorAll 이나 Node 객체의 프로퍼티는 NodeList를 반환합니다.

- HTMLCollection은 DOM의 현재 상태를 실시간으로 반영(live)하는 반면, NodeList는 일반적으로 반환된 시기의 상태를 반영(non-live)합니다.

- 둘 모두 유사 배열 객체이며, Array() 생성자를 통해 배열로 변환하여 사용하는 것이 코딩 컨벤션을 유지하는 데에 바람직합니다.

### 6) HTMLCollection과 NodeList

- 두객체 모두 for…of로 순회할 수 있습니다.
- Array() 혹은 스프레드 문법을 사용하여 배열로 변환할 수 있습니다.
- 인덱스를 통해 요소에 접근할 수 있습니다.
HTMLCollection

>getElementsBy*** 메서드를 통해 반환됩니다.
>노드 객체의 상태 변화를 실시간으로 반영합니다.


## 3. 노드 탐색

- 요소 노드를 취득해 부모, 형제, 자식 노드 탐색이 가능합니다.

![image](https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/e825f3f8-a708-4975-a2aa-7eb30a5446eb)

### 1) 공백 텍스트 노드 

HTML element 사이의 스페이스, 탭, 줄바꿈(개행) 등의 공백 문자는 공백 텍스트 노드를 생성합니다.    

### 2) 자식 노드 탐색

<img width="650" alt="image" src="https://github.com/Ryan-Dia/Javascript-Deep-Dive-Study/assets/76567238/f6b57d30-098c-4e4f-8b33-73a897047e8f">


### 3) 자식 노드 존재 확인

자식 노드가 존재하는지 확인하려면 `Node.prototype.hasChildNodes` 메서드를 사용합니다. 

### 4) 요소 노드의 텍스트 노드 탐색

- firstChild 프로퍼티로 접근 가능합니다.

```js
console.log(document.getElementById('foo').firstChild);
```

### 5) 부모 노드 탐색 

- Node.prototype.parentNode 프로퍼티를 사용

### 6) 형제 노드 탐색

- Node.prototype.previousSibling/nextSibling, Element.prototype.previousElementSibling

## 4. 노드 정보 취득

- Node.prototype.nodeType
    - 노드 객체의 종류. 즉, 노드 타입을 나타내는 상수를 반환
    - 노드 타입 상수는 `Node`에 정의되어 있음
    - `Node.ELEMENT_NODE`: 요소 노드 타입을 나타내는 상수 1을 반환
    - `Node.TEXT_NODE`: 텍스트 노드 타입을 나타내는 상수 3을 반환
    - `Node.DOCUMENT_NODE`: 문서 노드 타입을 나타내는 상수 9를 반환
     
- Node.prototype.nodeName
    - 노드의 이름을 문자열로 반환
    - 요소 노드: 대문자 문자열로 태그 이름("UL", "LI" 등)을 반환
    - 텍스트 노트: 문자열 "#text"를 반환
    - 문서 노드: 문자열 "#document"를 반환

<br>

## 5. 요소 노드의 텍스트 조작

- nodeValue : 참조하면 노드 객체의 값(텍스트 노드의 텍스트)을 반환. 
 - 텍스트를 변경할 요소 노드를 취득한 다음, 취득한 요소 노드의 텍스트 노드를 탐색한다. 텍스트 노드는 요소 노드의  자식 노드이므로 firstChild 프로퍼티를 사용하여 탐색합니다.
 - 탐색한 텍스트 노드의 nodeValue 프로퍼티를 사용하여 텍스트 노드의 값을 변경합니다.

- textContent : 참조하면 요소 노드의 콘텐츠 영역(시작 태그와 종료 태그 사이) 내의 텍스트를 모두 반환.
    - HTML 마크업은 무시되고 따라서 할당할 때 내부의 태그가 사라지고 할당값으로 채워진다.

>❗️ innerText를 사용하지 말아야할 이유
>1. innerText 프로퍼티는 CSS에 순종적. (visibility:hidden으로 지정된 요소 노드의 텍스트 반환x)
>2. CSS를 고려해야 하므로 느리다.


## 6. DOM 조작

- innerHtml
    - 요소 노드의 HTML 마크업을 취득하거나 변경합니다.
    - 참조하면 HTML 마크업이 포함된 문자열을 그대로 반환합니다.
    - 문자열을 할당하면 요소 노드의 모든 자식 노드가 제거되고 할당한 문자열에 포함되어 있는 HTML 마크업이 파싱되어 요소 노드의 자식 노드로 DOM에 반영됩니다. 이때 사용자로부터 입력받은 데이터를 그대로 innerHTML 프로퍼티에 할당하는 것은 크로스 사이트 스크립팅 공격에 취약하므로 위험합니다.(DOMPurify 같은 세니티제이션 라이브러리 사용)
 
- insertAdjacentHTML
    - 기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입합니다.
    - 첫번째 인수 전달 문자열 : beforebegin, afterbegin, beforeend, afterend

  ```html
      <!DOCTYPE html>
        <html>
          <body>
            <!-- beforebegin -->
            <div id="foo">
              <!-- afterbegin -->
              text
              <!-- beforeend -->
            </div>
            <!-- afterend -->
          </body>
          <script>
            const $foo = document.getElementById('foo');
        
            $foo.insertAdjacentHTML('beforebegin', '<p>beforebegin</p>');
            $foo.insertAdjacentHTML('afterbegin', '<p>afterbegin</p>');
            $foo.insertAdjacentHTML('beforeend', '<p>beforeend</p>');
            $foo.insertAdjacentHTML('afterend', '<p>afterend</p>');
          </script>
        </html>
  ```

### 3) 노드 생성과 추가

DOM은 노드를 직접 생성/삽입/삭제/치환하는 메서드도 제공합니다.    

- Document.prototype.createElement(tagName) 메서드는 요소 노드를 생성하여 반환합니다.
    - createElement 메서드의 매개변수 tagName에는 태그 이름을 나타내는 문자열을 인수로 전달합니다.
- Document.prototype.createTextNode(text) 메서드는 텍스트 노드를 생성하여 반환합니다.
    -  createTextNode 메서드의 매개변수 text에는 텍스트 노드의 값으로 사용할 문자열을 인수로 전달합니다.
    -  createTextNode 메서드는 텍스트 노드를 생성할 뿐 요소 노드에 추가하지 않습니다.
-  Node.prototype.appendChild(childNode) 메서드는 매개변수 childNode에게 인수로 전달한 노드를 appendChild 메서드를 호출한 노드의 마지막 자식 노드로 추가합니다.

### 4) 복수의 노드 생성과 추가

- Document.prototype.createDocumentFragement
 
```js
const $fruits = document.getElementById('fruits');

// 컨테이너 노드 생성 하지 않고
// DocumentFragment 노드 생성
const $fragment = document.createDocumentFragment();

[text1, text2, ... ].forEach(text ⇒ {

	// 1. 요소 노드 생성
	const $li = documentcreateElement(`li`);
	// 2. 텍스트 노드 생성
	const textNode = document.createTextNode(text);
	// 3. 텍스트 노드를 $li 요소 노드의 자식으로 추가
	$li.appendChild(textNode);
	// 4. $li 요소 노드를 $DocumentFragment의 마지막 자식 노드로 추가
	$fragment.appendChild($li);
});

// 5. DocumentFragment 노드를 $fruits 요소 노드의 마지막 자식 노드로 추가
$fruits.appendChlild($fragment)
```

### 5) 노드 삽입

- Node.prototype.appendChild 메서드는 인수로 전달받은 노드를 자신을 호출한 노드의 마지막 자식 노드로 DOM에 추가합니다.
    - 이때 노드를 추가할 위치를 지정할 수 없고 언제나 마지막 자식 노드로 추가합니다.
- Node.prototype.insertBefore(newNode, childNode) 메서드는 첫 번째 인수로 전달받은 노드를 두 번째 인수로 전달받은 노드 앞에 삽입합니다.

### 6) 노드 이동

- DOM에 이미 존재하는 노드를 appendChild 또는 isertBefore 메서드를 사용하여 DOM에 다시 추가하면 현재 위치에서 노드를 제거하고 새로운 위치에 노드를 추가합니다. (즉, 노드가 이동합니다)

### 7) 노드 복사

- Node.prototype.cloneNode([deep: true | false]) 메서드는 노드의 사본을 생성하여 반환합니다.

### 8) 노드 교체

- Node.protoype.replaceChild(newChild, oldChild) 메서드는 자신을 호출한 노드의 자식 노드를 다른 노드로 교체합니다.

### 9) 노드 삭제

- Node.prototype.removeChild(child) 메서드는 child 매개변수에 인수로 전달한 노드를 DOM에서 삭제합니다.

## 7. 어트리뷰트

HTML 문서의 구성 요소인 HTML 요소는 여러 개의 속성을 가질 수 있습니다.     
HTML 요소의 동작을 제어하기 위한 추가적인 정보를 제공하는 HTML 속성은 HTML 요소의 시작 태그에 속성 이름 = "속성 값" 형식으로 정의합니다.

```html
<input id="user" type="text" value="ungmo2">
```

**📌 어트리뷰트 조작**   
요소 노드는 프로토타입을 통해 어트리뷰트 값을 취득하거나 변경할 수 있는 메서드를 제공합니다.    
Element.prototype.getAttribute(name)/setAttribute(name, value) 메서드를 사용하면 attributes 프로퍼티를 통하지 않고 어트리뷰트 값을 취득하거나 변경할 수 있어 편리합니다.    
특정 어트리뷰트가 존재하는지 확인하려면 Element.prototype.hasAttribute(name) 메서드를, 어트리뷰트를 삭제하려면 Element.prototype.removeAttribute(name) 메서드를 사용합니다.

**📌 HTML 어트리뷰트 vs DOM 프로퍼티**   
요소 노드 객체에는 HTML 어트리뷰트에 대응하는 프로퍼티인 DOM 프로퍼티가 존재합니다.   
이 DOM 프로퍼티는 각각 대응되는 HTML 어트리뷰트 값을 초기값으로 가지고 있습니다. DOM 프로퍼티는 getter와 setter 모두 존재하는 접근자 프로퍼티입니다. 따라서 DOM 프로퍼티는 참조와 변경이 가능합니다.   

HTML 어트리뷰트와 DOM 프로퍼티는 용도 별로 분리되어 있습니다. HTML 어트리뷰트의 역할은 요소의 초기 상태를 지정하는 것입니다. HTML 어트리뷰트 값은 요소의 초기 상태를 의미하며 이는 변하지 않습니다. DOM 프로퍼티는 요소 노드의 최신 상태를 관리합니다. 요소 노드의 상태가 사용자에 의해 변경되면(사용자 입력 등에 의해) 변경된 요소의 상태는 DOM 프로퍼티가 관리합니다.    

**📌 어트리뷰트 노드**   
어트리뷰트 노드는 HTML 어트리뷰트로 지정한 요소의 초기 상태를 기억합니다. 요소의 상태가 사용자에 의해 변경되어도 변하지 않고 초기상태를 그대로 유지합니다. 어트리뷰트 노드가 관리하는 초기 상태 값을 취득하거나 변경하려면 getAttribute/setAttribute 메서드를 사용합니다.    

**📌 DOM 프로퍼티**   
사용자가 입력한 최신 상태는 요소 노드의 HTML 어트리뷰트에 대응하는 DOM 프로퍼티가 관리합니다. DOM 프로퍼티는 사용자의 입력에 의한 상태 변화에 반응하여 언제나 최신 상태를 유지합니다. 이때 사용자의 입력과 관련이 있는 어트리뷰트와 그렇지 않은 어트리뷰트는 다르게 동작합니다. 

사용자 입력에 의한 상태 변화와 관련없는 어트리뷰트와 DOM 프로퍼티는(id 등)는 항상 동일한 값을 유지합니다. 즉, 하나가 변하면 다른 하나도 변경되어 동일한 값을 유지합니다. 반면 사용자 입력에 의한 상태 변화와 관련있는 어트리뷰트와 DOM 프로퍼티(value 등)는 어트리뷰트는 항상 초기값을 기억하고, DOM 프로퍼티만 최신 상태를 관리합니다.    


**📌 HTML 어트리뷰트와 DOM 프로퍼티의 대응 관계**    

대부분의 HTML 어트리뷰트는 HTML 어트리뷰트 이름과 동일한 DOM 프로퍼티와 1:1로 대응한합니다. (단, 언제나 1:1로 대응하는 것은 아니며, HTML 어트리뷰트 이름과 DOM 프로퍼티 키가 반드시 일치하는 것도 아닙니다)

- id 어트리뷰트와 id 프로퍼티는 1:1 대응하며, 동일한 값으로 연동합니다.
- input 요소의 value 어트리뷰트는 value 프로퍼티와 1:1 대응한다. 하지만 value 어트리뷰트는 초기 상태를, 프로퍼티는 최신 상태를 갖습니다.
- class 어트리뷰트는 className, classList 프로퍼티와 대응합니다.
- for 어트리뷰트는 htmlFor 프로퍼티와 1:1 대응합니다.
- td 요소의 colspan 어트리뷰트는 대응하는 프로퍼티가 존재하지 않습니다.
- textContent 프로퍼티는 대응하는 어트리뷰트가 존재하지 않습니다.
- 어트리뷰트 이름은 대소문자를 구별하지 않지만 대응하는 프로퍼티 키는 카멜 케이스를 따릅니다.
