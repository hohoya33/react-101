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


## Lists with map