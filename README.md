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

* 성능 개선을 위해 최소한의 DOM 처리
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