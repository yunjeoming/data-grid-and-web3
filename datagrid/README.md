# Data grid

`Next.js`, `TypeScript`, `MUI`

Mui의 Data grid로 CRUD 화면을 구현했습니다.

- 가상의 유저 정보를 db.json에 저장하여 db.json을 db로 활용했습니다.
- 유저를 추가, 수정, 삭제할 수 있습니다.

## 실행 방법

1. 라이브러리 설치

```
> npm install
```

2. json-server 및 프로젝트 실행
```
> npm run dev
```

## 폴더 구조
```
- src
  ├ app             # 페이지 컴포넌트
  ├ components      # 공통 컴포넌트
  ├ features        # 기능 컴포넌트
  ├ hooks           # 커스텀 훅
  ├ mocks           # 가짜 데이터 생성
  ├ services        # api 호출
  ├ types           # 타입 정의
  └ utils           # 공통 유틸 정의
```

## 실행 화면
- 메인 화면
![main screen](https://github.com/yunjeoming/data-grid-and-web3/assets/76480300/ea5c54f6-e4ba-4f45-8f38-f67bd7d9a3dd)

- 유저 등록
![add user](https://github.com/yunjeoming/data-grid-and-web3/assets/76480300/537584d3-38f3-4413-9aae-7bda27140a95)

- 유저 수정
![update user](https://github.com/yunjeoming/data-grid-and-web3/assets/76480300/2a356a6d-106b-486f-8fb2-fcdeb6707c78)

- 유저 삭제
![delete user](https://github.com/yunjeoming/data-grid-and-web3/assets/76480300/3318d1b5-6bba-4345-9f20-9a2370ea7083)
