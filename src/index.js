import React from "react";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";

// routers
import DefaultRouter from "routers";

// redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "reducers";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <DefaultRouter />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

/*
  필수
  TODO: acc 생성 지난 날짜에도 할 수 있도록 개선
  TODO: 지분이 -가 될 것 같으면 지분 이전 불가능하도록
  TODO: 부과시 금액 0인 호실은 생성하지 않기
  TODO: 주차권 판매 추가시 호실 존재 검사
  TODO: 개인차량 수정이 안되는 이슈
*/
/*
  부수적 작업
  TODO: 테이블 있는 페이지마다 날짜, 검색 기능 만들기
  TODO: 모든 action 마다 alert 로 피드백 주기
  TODO: DB Model 에서 모든 필드 default 값 주기
  TODO: 모든 숫자에 쉼표
  TODO: Redux 로 관리되는 Global 스피너 추가
  TODO: 호실, 개인차량 리스트 리덕스로 관리
  TODO: 모든 통신 비동기로 변경
*/
