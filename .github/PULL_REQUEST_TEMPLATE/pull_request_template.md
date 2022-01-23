<!--
# New Feature
새로운 로직이 추가되는 경우
이 경우 ## 이전 로직과 ## 바뀐 로직은 지워주세요
-->

## 이전 로직

<!--
ex) 모든 의존성 라이브러리 로딩, 미들웨어 설정, module instance화
-->

## 바뀐 로직

<!--
ex) loaders를 두어 server 초기화 분담
    각각의 파일에서 알맞는 의존성 라이브러리 주입 및 instace 초기화
-->

## 세부 사항

<!--
ex)
- app.ts에서 index.ts에 작성된 module 호출
- index.ts
  - loaders 내 하위 모든 module 호출 후 초기화
- express.ts
  - express 관련 라이브러리 의존성 주입
  - 라우팅-->

- Filename 1
  - 특성
