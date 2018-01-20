#React 101
리액트 기본 정리 자료

## React?
* MVC(Model View Controller) 패턴에서 뷰(View) 부분을 컴포넌트로 만들기위한 UI라이브러리
* Facebook에서 개발. 현재 Facebook, Instagram, Airbnb 등 여러 곳에서 사용

## React 특징
사용자 액션에 따라 개발자가 DOM을 직접 다루지 않고 React가 데이터 상태에 따라 자동으로 UI를 관리
개발자는 단순히 특정 상태에 대한 뷰의 변화만 구현

* JSX (JavaScript XML)
* Virtual DOM
* 단방향 데이터 (Unidirectional Data Flow)
* 서버 사이드 렌더링 (SSR)
* 리액트 네이티브 (React Native)

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

