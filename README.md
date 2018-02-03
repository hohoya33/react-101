React 101 리액트 기본 정리 자료

## React?
* MVC(Model View Controller) 패턴에서 뷰(View) 부분을 컴포넌트로 만들기위한 UI라이브러리
* Facebook에서 개발. 현재 Facebook, Instagram, Airbnb 등 대규모 서비스에서도 사용되고 있는 견고한 라이브러리

## React 특징
* 컴포넌트'단위로 재사용 가능한 UI템플릿
* 사용자 액션에 따라 개발자가 DOM을 직접 다루지 않고 React가 데이터 상태에 따라 자동으로 UI를 관리
* 개발자는 단순히 특정 상태에 대한 뷰의 변화만 구현

### JSX (JavaScript XML)
* 여러 element 렌더링 시, 감싸주는 element 필요 (v16. Fragment 사용가능)
* class가 아니라 className 사용 (class는 자바스크립트 예약어)
* { text } 를 사용하여 text 자바스크립트 변수 렌더링
* if-else문 사용 불가 (삼항연산자 사용)
* Inline Style
* 주석 { /* comments */ }
```js
render() { 
    let text = 'Hello';
    let style = { color: 'red', backgroundColor: 'black' };
    let loading = true;

    return (
        <div>
            <div className="info">{ text }</div>
            <div style={ style }>{ loading ? 'Loading' : 'World' }</div>
        </div>
    );
}

//React v16부터 감싸주는 불필요한 태그 대신 Fragment 사용가능
import React, { Component, Fragment } from 'react';
render() { 
    return (
        <Fragment>
            <div>Hello</div>
            <div>World</div>
        </Fragment>
    );
}
```
### 컴포넌트 (Components)
* UI요소들을 그룹별로 나눠서 작업
* 개발 생산성을 높이고 유지보수가 용이 (재사용성)
* 컴포넌트 네이밍 시, 첫 문자는 대문자 CamelCase로 작성
```js
import Header from './Header';
import Grid from './Grid';
import Footer from './Footer';

render() { 
    return (
        <div className="App">
            <Header />
            <Grid />
            <Footer />
        </div>
    );
}
```

### Virtual DOM
DOM 자체는 빠름. DOM의 문제점은 동적 UI에 최적화되어 있지 않음<br>
브라우저에서 DOM의 변화(수정, 제거, 삽입)가 일어나면 리플로우 발생 (CSS 다시 연산, 레이아웃 새로 구성). 이 과정에서 DOM에 접근하는 만큼 반복 (속도저하)<br>

* 성능 개선을 위해 DOM 처리 횟수 최소화
1. 데이터 변경 시, 전체 UI를 Virtual DOM에 리렌더링
2. 이전 Virtual DOM에 있던 내용과 현재의 내용비교
3. 변경된 부분만 실제 DOM에 반영

### 단방향 데이터 (Unidirectional Data Flow)
부모 컴포넌트에서 하위 컴포넌트로 전달하는 단방향 데이터 흐름을 갖고 있어 데이터 추적과 디버깅이 쉬움

### 서버 사이드 렌더링 (SSR)
SPA에서 문제점 이였던 브라우저 초기 렌더링 딜레이를 줄이고, SEO 호환도 가능

### 리액트 네이티브 (React Native)
리액트를 기반으로 모바일 앱을 만들기 위한 프레임워크 (iOS / Android)


## React 설치 - create-react-ap
* [NodeJS](https://nodejs.org/en/)
* [create-react-app](https://github.com/facebookincubator/create-react-app) - webpack, babel을 설치 구성하는 복잡한 빌드 과정 생략 가능
* [크롬 확장프로그램 react-developer-tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

```bash
$ npm install -g create-react-app
```

## 프로젝트 생성
```bash
$ create-react-app [프로젝트명]
```
```bash
$ create-react-app ssg-app
$ cd ssg-app

$ npm start (프로젝트 서버 실행)
$ npm run build (파일 빌드)
```

## Component with JSX

### ReactDOM
* React를 웹사이트에 출력 하는것을 도와주는 모델
* 1개의 컴포넌트(App)를 출력
* Element 아이디는 root, index.html 파일안에 있음
* render를 하면 모든 컴포넌트들이 root 안에 출력
```js
//index.js
ReactDOM.render(<App />, document.getElementById('root'));
```

### 컴포넌트 만들기
* 컴포넌트 정의 방법은 보통 ES6 class 문법 사용
* 일단 App.js처럼 동일하기 작성 (class Product..)
* 컴포넌트는 항상 render를 해야 함
* export를 작성해서 해당 컴포넌트를 내 보냄
```js
//Product.js
import React, { Component } from 'react';

class Product extends Component {
    render() {
        return (
            <div>
                <h1>상품명 상품명 상품명</h1>
            </div>
        );
    }
}
export default Product;
```

App 컴포넌트에서 Product 컴포넌트를 레고블럭 조립하듯이 사용. 여러 번 반복 사용 가능
```js
//App.js
import React, { Component } from 'react';
import Product from './Product';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Product />
                <Product />
                <Product />
            </div>
        );
    }
}
export default App;
```

### 상품 이미지 넣기
* 클래스명은 ProductImage render > return > 이미지 소스
* Product 컴포넌트안에 상품명, 이미지..등 또 다른 작은 컴포넌트로 구성
* 큰 컴포넌트 안에 작은 컴포넌트를 넣는 방식으로 작업
* 컴포넌트를 사용하여 UI를 독립적이고 재사용 가능한 부분으로 분리
```js
//Product.js
class Product extends Component {
    render() {
        return (
            <div>
                <ProductImage />
                <h1>상품명 상품명 상품명</h1>
            </div>
        );
    }
}

class ProductImage extends Component {
    render() {
        return (
            <img src="http://item.ssgcdn.com/32/08/58/item/1000024580832_i1_500.jpg" />
        );
    }
}
```

## Props
리액트 두가지 주요 컨셉 (props, state)<br>
첫번째 props는 부모 컴포넌트로부터 전달받는 속성

부모 컴포넌트(App)는 프로퍼티를 사용해 상품명, 이미지 정보를 자식 컴포넌트(Product)로 각각 전달
```js
//App.js
const itemName = [
    '[LG]LG전자 트롬 RH9SA, RH9WA 인버터 전기식 건조기 용량9KG',
    '[일룸(iloom)]사랑받는 이유, 일룸이 제안하는 홈스타일링',
    '[발뮤다]에어엔진(그레이/ 블랙 로그인시 추가쿠폰지원(일부상품제외)'
];

const itemImages = [
    'http://item.ssgcdn.com/16/88/15/item/1000021158816_i1_202.jpg',
    'http://item.ssgcdn.com/25/08/15/item/1000023150825_i1_202.jpg',
    'http://item.ssgcdn.com/15/01/48/item/1000017480115_i1_202.jpg'
];

class App extends Component {
    render() {
        return (
            <div className="App">
            <Product name={itemName[0]} image={itemImages[0]} />
            <Product name={itemName[1]} image={itemImages[1]} />
            <Product name={itemName[2]} image={itemImages[2]} />
            </div>
        );
    }
}
```

* 자식 컴포넌트(Product)에서 상품 정보들은 props를 통해 받음
* JSX에서 각 요소들을 액세스하는 방법 { this.props.name }
```js
//Product.js
class Product extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <ProductImage image={this.props.image} />
                <h1>{this.props.name}</h1>
            </div>
        );
    }
}

class ProductImage extends Component {
    render() {
        return (
            <img src={this.props.image} />
        );
    }
}
```

## Lists with map
map() 메소드는 파라미터로 전달 된 함수를 통하여 배열 내의 각 요소를 처리<br>그 결과로 새로운 배열 생성

```js
let arr = [1, 2, 3, 4, 5];
let newArray = arr.map((currentValue, index, array) => {
    return currentValue * 2;
});

console.log(newArray); //[2, 4, 6, 8, 10]
```

## 컴포넌트 데이터 매핑
이전에 만든 리스트는 효율적이지 않음, 계속 복사 붙여넣기 할 수 없음<br>
상품 데이터를 기반으로 map메소드를 사용해 Product 컴포넌트에 매핑

기존 상품 데이터를(itemName, itemImages) 배열로 수정
```js
const items = [
    {
        name: '[LG]LG전자 트롬 RH9SA, RH9WA 인버터 전기식 건조기 용량9KG',
        image: 'http://item.ssgcdn.com/16/88/15/item/1000021158816_i1_202.jpg'
    },
    {
        name: '[일룸(iloom)]사랑받는 이유, 일룸이 제안하는 홈스타일링',
        image: 'http://item.ssgcdn.com/25/08/15/item/1000023150825_i1_202.jpg'
    },
    {
        name: '[발뮤다]에어엔진(그레이/ 블랙 로그인시 추가쿠폰지원(일부상품제외)',
        image: 'http://item.ssgcdn.com/15/01/48/item/1000017480115_i1_202.jpg'
    }
];
```

이제 배열 하나를 잡고 매핑해서 리스트 제작
```js
//App.js
class App extends Component {
    render() {
        return (
            <div className="App">
                {items.map(item => {
                    return <Product name={item.name} image={item.image} />
                })}
            </div>
        );
    }
}
```

## List Key
DOM Tree간에 항목 삽입, 삭제, 대체 이동 여부를 파악하기 위해 빠르게 조회 할 수 있는 고유 식별자<br>
각 리스트 아이템에 고유한 키 값을 넣어 실제 DOM과 가상 DOM을 비교, 빠른 방법으로 적절한 레코드를 업데이트
```js
//App.js
<div className="App">
    {items.map((item, index) => {
        return <Product name={item.name} image={item.image} key={index} />
    })}
</div>
```

## Prop Types
* 컴포넌트 props는 외부로부터 값을 지정받기 때문에 데이터 타입에 대한 검증 필요
* propTypes객체는 props에 대한 유효성 검사 실행
* prop-types 패키지 설치
```bash
$ npm install --save prop-types
```
* 이미지에 숫자나, true / false 같은 원치 않는 값이 들어 올 때 (에러발생)
* isRequired 필수조건
* string, number, isRequired..등 [propTypes 더보기](https://reactjs.org/docs/typechecking-with-proptypes.html)
* props가 전달되는 컴포넌트는 모두 작성하는게 좋음
```js
//Product.js
import PropTypes from 'prop-types';

class Product extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired, //name 속성은 반드시 필요
        image: PropTypes.string
    }
    //...
}	
```

## Component Lifecycle
컴포넌트가 생성되거나 업데이트, 제거될 때, 특정한 순서대로 이벤트가 실행

### 컴포넌트 생성
constructor() -> componentWillMount() -> render() -> componentDidMount()
```js
//App.js
class App extends Component {
    constructor(props) {
    //1. 생성자 메소드, 컴포넌트가 처음 만들어 질 때 실행 (state 정의)
    }
    componentWillMount() {
    //2. 컴포넌트가 DOM 위에 만들어지기 전에 실행
    }
    componentDidMount() {
    //3. 컴포넌트가 만들어지고 첫 렌더링을 다 마친 후 실행
    //프레임워크를 연동, setTomeout, setInterval, Ajax 요청
    }
    render() {
    //4. 컴포넌트 렌더링
    }
}
```

### 컴포넌트 업데이트
componentWillReceiveProps() -> shouldComponetUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()
```js
//App.js
class App extends Component {
    componentWillReceiveProps() {
    //1. 컴포넌트가 prop을 새로 받았을 때 실행
    }
    shouldComponetUpdate() {
    //2. prop, state가 변경 되었을 때, 업데이트 여부를 결정하기 위해 실행
    }
    componentWillUpdate() {
    //3. 컴포넌트가 업데이트 되기 전에 실행
    }
    componentDidUpdate() {
    //5. 컴포넌트가 업데이트를 마친 후 실행
    }
    render() {
    //4. 컴포넌트 렌더링
    }
}
```

### 컴포넌트 제거
componentWillUnmount()
```js
//App.js
class App extends Component {
    componentWillUnmount() {
    //컴포넌트를 사용하지 않을 때, DOM에서 사라진 후 실행
    }
}
```

## State
### props, state의 차이
* props: 상위 컴포넌트에서 값을 지정받기 때문에 하위 컴포넌트에서 수정불가
* state: 컴포넌트 내부에서 자기 자신의 상태를 제어하기 위해 수정가능

### state 사용방법
컴포넌트가 마운트되면 5초 후 greeting을 업데이트 하도록 코드작성
```js
//App.js
class App extends Component {
    state = {
        greeting: 'Hello'
    }

    render() {
        return (
            &lt;div className="App"&gt;
                {this.state.greeting}
            &lt;/div&gt;
        );
    }
}
```

### setState
* state를 직접 변경하면 안됨 (경고표시)
* setState를 사용해 갱신
* setState가 호출될 때마다 rende() 발생
```js
//App.js
componentDidMount() {
    setTimeout(() => {
        this.state.greeting = 'Hello again!'; (X)

        this.setState({
            greeting: 'Hello again!'
        });
    }, 5000)
}
```
컴포넌트 외부에 있는 상품 데이터(items)를 컴포넌트 안 state로 옮기자!
```js
//App.js
state = {
    items: [
        {
            name: '[LG]LG전자 트롬 RH9SA, RH9WA 인버터 전기식 건조기 용량9KG',
            image: 'http://item.ssgcdn.com/16/88/15/item/1000021158816_i1_202.jpg'
        },
        {
            name: '[일룸(iloom)]사랑받는 이유, 일룸이 제안하는 홈스타일링',
            image: 'http://item.ssgcdn.com/25/08/15/item/1000023150825_i1_202.jpg',
        },
        {
            name: '[발뮤다]에어엔진(그레이/ 블랙 로그인시 추가쿠폰지원(일부상품제외)',
            image: 'http://item.ssgcdn.com/15/01/48/item/1000017480115_i1_202.jpg'
        }
    ]
}
```

items을 this.state.items으로 수정
```js
//App.js
render() {
    return (
        <div className="App">
            {this.state.items.map((item, index) => {
                return <Product name={item.name} image={item.image} key={index} />
            })}
        </div>
    );
}
```

상품 리스트에서 상품을 하나 더 추가 하고 싶으면? 이전 상품 리스트를 그대로 두고 한 개의 상품을 추가
```js
//App.js
componentDidMount() {
    setTimeout(() => {
        this.setState({
            items: [
                ...this.state.items,
                {
                    name: '[입생로랑(YSL)]2017 홀리데이 컴플리트 메이크업 팔레트',
                    image: 'http://item.ssgcdn.com/27/52/13/item/1000024135227_i1_202.jpg'
                }
                //...this.state.items 상단부터 새로운 상품이 출력
            ]
        });
    }, 1000);
}
```

데이터 없이 컴포넌트 로딩 -> 상품 데이터 Ajax Call -> 데이터를 받아서 state를 업데이트<br>setTimeout 기능으로 유사하게 구현

```js
//App.js
setTimeout(() => {
    this.setState({
        items: [
            {
                name: '[LG]LG전자 트롬 RH9SA, RH9WA 인버터 전기식 건조기 용량9KG',
                image: 'http://item.ssgcdn.com/16/88/15/item/1000021158816_i1_202.jpg'
            },
            {
                name: '[일룸(iloom)]사랑받는 이유, 일룸이 제안하는 홈스타일링',
                image: 'http://item.ssgcdn.com/25/08/15/item/1000023150825_i1_202.jpg',
            }
            //...
        ]
    });
}, 1000);
```

### Loading States
this.state.items에 상품이 없으면 로딩 후 상품 리스트 출력

상품 리스트를 불러오는 새로운 함수(_renderItems)를 만들고 변수 items에 데이터 저장
```js
//App.js
_renderItems = () => {
    const items = this.state.items.map((item, index) => {
        return <Product name={item.name} image={item.image} key={index} />
    });
    return items;
}
```

this.state.items에 데이터가 있으면 _renderItems(), 데이터가 없으면 로딩 출력<br>
```js
//App.js
render() {
    return (
        <div className="App">
            {this.state.items ? this._renderItems() : 'Loading'}
        </div>
    );
}
```
1초 후 로딩이 나타나고 상품 리스트 출력

## Smart vs Dumb Components

### 클래스기반 컴포넌트 (class component)
* state, 라이프사이클 개념을 사용 할 때
* ex) 사용자가 입력창에 타이핑 시, 타이핑 하는 내용이 필요 할 때

### 함수형 컴포넌트 (functional component)
* props로 전달받은 값을 DOM 렌더링만 해주는 역할
* state, 라이프사이클를 갖고 있지 않음
* 코드가 가볍고 빠르고 쉬움

### 함수형 컴포넌트로 변경
state가 없고 props만 존재 시, class 컴포넌트 대신 functional 컴포넌트로 변경 가능
```js
//Product.js
function Product({name, image}) {
    return (
        <div>
            <ProductImage image={image} />
            <h1>{name}</h1>
        </div>
    )
}

Product.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
}

//es6 비구조화 할당(destructuring assignment) 구문
//const image = props.image; 이렇게 쓰는것과 같은 방식
function ProductImage({image}) {
    return (
        <img src={image} alt="상품이미지" />
    )
}

//propTypes 확인
ProductImage.propTypes = {
    image: PropTypes.string.isRequired
}
```

## AJAX Promises

### React에서 비동기 통신
이전에 작업한 setTimeout을 삭제하고 대신에 AJAX로 상품 데이터를 받아서 처리

* 기존 AJAX 처리 시 jQuery 사용. 이제 더 이상 jQuery는 필요 없음
* AJAX 기능만 필요 (fetch, axios..)

### fetch API
기존 XMLHttpRequest(XHR) API는 복잡하고 가독성이 떨어짐<br>
fetch()함수는 모던 웹브라우저에 내장 되어있는 기능, 비동기 통신을 간결하게 표현
```js
//App.js
componentDidMount() {
    const url = 'https://event.ssg.com/event/getLeafItemIdsItemList.ssg?itemIds=1000021158816,1000023150825,1000017480115,1000024135227,2097000201672,1000022797673';

    console.log(fetch(url)) //Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}

    fetch(url)
    .then(response => response.json()) //비동기작업 완료 시
    .then(json => console.log(json))
    .catch(err => console.log(err)) //비동기작업 중간에 에러 발생 시
}
```

### jsonp
웹 브라우져에서는 same-origin policy(SOP) 정책에 따라 다른 도메인간의 request을 제한<br>
그러나 script 태그는 SOP정책에 속하지 않는다는 사실을 근거로 서로 다른 도메인간 javascript 호출을 위해 jsonp 사용

### fetch-jsonp 설치
```bash
$ npm install fetch-jsonp --save
```

```js
import fetchJsonp from 'fetch-jsonp';

componentDidMount() {
    const url = 'https://event.ssg.com/event/getLeafItemIdsItemList.ssg?itemIds=1000021158816,1000023150825,1000017480115,1000024135227,2097000201672,1000022797673';

    fetchJsonp(url, {
        jsonpCallback: 'callBack'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.resultMsg);
    })
    .catch(error => {
        console.log('Error fetching and parsing data', error);
    });
}
```

## Async Await

* 동기: 명령을 순서대로 차례차례 끝내고 넘어감
* 비동기: 특정 명령이 실행된 후 그 명령이 끝나기 전에 다음 명령이 실행

서버에 request 요청 후, response 받는 속도는 명령 실행 속도보다 훨씬 느림<br>
이것을 원래 순서대로 코딩하게 되면 에러 발생<br>
따라서 동기적으로 실행되길 원한다면 callback 함수를 잘 이용

### Callback Hell
한 곳에 코드를 몰아서 작성하는 것보다 작은 함수로 기능을 나누는 것이 좋음

```js
//App.js
componentDidMount() {
    fetchJsonp(url, {
        jsonpCallback: 'callBack'
    })
    .then(response => response.json())
    .then(data => {
        this.setState({
            items: data.resultMsg
        }, () => {
            if(true) {
            //코드가 커지면 함수 안에 함수로 이어지면서 callback hell에 빠짐
            }
        });
    })
    .catch(error => {
        console.log('Error fetching and parsing data', error);
    });
}
```

### _callApi, _getItems 새로운 함수에 코드를 분리
```js
//App.js
componentDidMount() {
    this._getItems();
}
_callApi = () => {

}
_getItems = () => {

}
```

### async await 사용방법
ES2017에 새로 추가된 기능. 비동기 작업을 동기식으로 표현, callback hell을 해결하는 방법<br>
async await: 비동기 연산이 끝나길 '기다렸다가' 진행
```js
//async await test code
function callApi() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('비동기 작업 완료!');
        }, 3000);
    });
}

async function getItems() {
    const itemValue = await callApi();
    console.log(itemValue);
    console.log('끝');
}
getItems();
//비동기 작업 완료!
//끝
```

### _callApi() , _getItems()
데이터 요청 후 받은 데이터 결과를 return하도록 수정
```js
//App.js
_callApi = () => {
    const url = 'https://event.ssg.com/event/getLeafItemIdsItemList.ssg?itemIds=1000021158816,1000023150825,1000017480115,1000024135227,2097000201672,1000022797673';

    return fetchJsonp(url, {
        jsonpCallback: 'callBack'
    })
    .then(response => response.json())
    .then(data => data.resultMsg)
    .catch(error => {
        console.log('Error fetching and parsing data', error);
    });
}
_getItems = async() => {
    const items = await this._callApi(); //성공, 실패 상관없이 작업이 완료 될 때까지 기다림
    //this.setState는 _callApi작업이 끝 날 때까지 실행되지 않음
    this.setState({
        items //items: items (es6)
    });
}
```

### _renderItems()
* 콘솔로 데이터 확인 후 item 오브젝트 변경
* 상품명 itemNm, 이미지 imgPath
* key는 index 대신 itemId 사용
```js
//App.js

//before
<Product name={item.name} image={item.image} key={index} />
//after
<Product name={item.itemNm} image={item.imgPath} key={item.itemId} />
```

## Update Item Component
상품이미지, 상품명, 가격, 품절, 링크, 브랜드.. 등 데이터 확인 후 추가

```js
//App.js
_renderItems = () => {
    const items = this.state.items.map((item, index) => {
        return <Product
            soldout={item.soldOutYn}
            name={item.itemNm}
            image={item.imgPath}
            price={item.price}
            link={item.lnkdUrl}
            key={item.itemId} />
        });
    return items;
}
  ```

### Product 컴포넌트 업데이트 (props, html, css)
```js
//Product.js
import './Product.css';

function Product({ soldout, name, image, price, link }) {
    return (
        <li>
            <div className='cunit_prod'>
                <div className="thmb">
                    <a href={link}>
                        <ProductImage image={image} alt={name} />
                    </a>
                </div>
            </div>
            <div className="cunit_info">
                <div className="cunit_md">
                    <div className="title"><a href={link}>{name}</a></div>
                </div>
                <div className="cunit_price">
                    <div className="opt_price">
                        <span className="blind">판매가</span>
                        <em className="ssg_price">{price}</em> <span className="ssg_tx">원</span>
                    </div>
                </div>
            </div>
        </li>
    )
}

Product.propTypes = {
    soldout: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
}

function ProductImage({image, alt}) {
    return (
        <img src={image} alt={alt} title={alt} width="232" height="232" />
    )
}

ProductImage.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}
```

### 품절 대응 (css class)
```js
//Product.js
function Product({ soldout, name, image, price, link }) {
    return (
        <li>
            <div className={soldout === 'Y' ? 'cunit_prod cunit_soldout' : 'cunit_prod'}>
                <div className="thmb">
                    <a href={link}>
                        <ProductImage image={soldout === 'Y' ? 'http://img.ssgcdn.com/trans.ssg?src=/ui/ssg/img/common/img_ready_500x500.jpg&w=232&h=232' : image} alt={name} />
                    </a>
                </div>
            </div>
        </li>
    )
}
```


## Building for Production (deploy)
깃허브 페이지(gh-pages) 배포

```bash
$ npm run build
```

터미널 메세지 확인
```bash
The project was built assuming it is hosted at the server root.
To override this, specify the homepage in your package.json.
For example, add this to build it for GitHub Pages:
"homepage" : "http://myname.github.io/myapp",
```
package.json 홈페이지 key 추가 후, 다시 빌드<br>
```js
//package.json
"homepage": "http://hohoya33.github.io/react-ssg"
```

### gh-pages Branch
* github 접속 Create a new repository 
* Repository name 입력
* Initialize this repository with a README 체크

Branch:master 버튼 클릭 -> gh-pages 추가

Setting > Branches > Default branch gh-pages선택 후 Update > I understand update...클릭

첫 페이지 이동 후  > 상단 branch클릭 > master 브랜치 삭제

프로젝트 폴더 git 생성
```bash
$ git init
$ git remote add origin https://github.com/hohoya33/react-ssg.git
```

gh-pages 설치 후 아래 스크립트를 package.json에 추가
```bash
$ npm install --save-dev gh-pages
```
```js
//package.json
"scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
}
```
```bash
$ npm run deploy
//유저명, 비번 입력
```

github 페이지 확인