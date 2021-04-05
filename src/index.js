import React from "react";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";

import DefaultRouter from "routers";

ReactDOM.render(
  <React.StrictMode>
    <DefaultRouter />
  </React.StrictMode>,
  document.getElementById("root")
);

/*
  TODO: 모든 action 마다 alert 로 피드백 주기
  TODO: DB Model 에서 모든 필드 default 값 주기
  TODO: 엑셀을 DB로 바꾸는 기능 만들기
  TODO: 고지서 PDF 생성해서 다운로드되는 기능 만들기
  TODO: 테이블 있는 페이지마다 날짜, 검색 기능 만들기
  TODO: 호실 추가시 중복이면 에러뜨게
  TODO: 모달 취소 혹은 확인 시 폼 초기화 
  TODO: 무료주차권 소수점 문제
*/
