# web3.js 지갑 (with. ganache)

`Next.js`, `TypeScript`, `Tailwind.css`

ganache로 로컬 이더리움 네트워크를 구축하고 제공받은 가상 계좌로 지갑을 구현했습니다.

- 계좌를 선택하면 해당 계좌의 잔액을 확인할 수 있고 다른 계좌로 이더리움을 이체할 수 있습니다.
- Transactions 탭에서 거래 내역을 조회할 수 있습니다.
- /pages/api/에 web3.js api를 구현하였고, 프론트에서 api를 호출하도록 했습니다.
- 새 트랜잭션의 생성 시간이 없어서 redux에 (state.transactions) 트랜잭션 id별 생성 시간을 별도로 저장하여 거래 내역을 구현했습니다.

## 실행 방법

1. 라이브러리 설치

```
> npm install
```

2. ganache & 프로젝트 실행

```
> npm run dev
```

## api

- web3에 연결된 모든 계좌 조회

```
GET /api/accounts
```

- 특정 계좌 조회

```
GET /api/accounts/{id}
```

- 이체(트랜잭션 생성)

```
POST /api/transactions

{
  fromAccount: 보내는 계좌
  toAccount: 받는 계좌
  amount: 이체 금액
}
```

- 특정 트랜잭션 조회

```
GET /api/transactions/{id}
```

- 트랜잭션 수수료 조회

```
GET /api/transactions/fee
```

## 폴더 구조
```
- pages
- src
  ├ app             # 페이지 컴포넌트
  ├ components      # 공통 컴포넌트
  ├ features        # 기능 컴포넌트
  ├ layouts         # 레이아웃 컴포넌트
  ├ redux           # 리덕스
  ├ services        # api 호출
  ├ types           # 타입 정의
  └ utils           # 공통 유틸 정의
```

## 실행 화면

- 메인 화면
![main screen](https://github.com/yunjeoming/data-grid-and-web3/assets/76480300/3855ec6b-d409-4db7-a9d6-f72b3631d29b)

- 계좌 선택
![select account](https://github.com/yunjeoming/data-grid-and-web3/assets/76480300/45d21838-25d8-4cd9-af92-ddf713717c53)

- 환전 완료
![exchange](https://github.com/yunjeoming/data-grid-and-web3/assets/76480300/02b8597b-da2a-4811-b2cf-0403ff571567)

- 거래 내역 확인
![transactions screen](https://github.com/yunjeoming/data-grid-and-web3/assets/76480300/013aecc1-11a7-4752-8a57-180bb3c36e64)
