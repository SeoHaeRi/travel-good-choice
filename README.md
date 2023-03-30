# TravelGoodChoice (여행 커뮤니티)

📆 **프로젝트 진행기간 : 2022/12/10 ~ 2022/12/28**
## 메인 화면
<p align="center">
  <br>
  <img width="1908" alt="image" src="https://user-images.githubusercontent.com/62414262/228735154-3bc08fa2-0365-4ea2-b516-6e2b0292249b.png">

  <br>
</p>

## 프로젝트 소개

<p align="justify">
    국내 여행 커뮤니티 사이트<br>
여행지 정보를 볼 수 있고 커뮤니티에서 소통할 수 있다
</p>

| 회원가입, 로그인 | 댓글 |
| :--------: | :--------: |
| ![ezgif com-optimize (2)](https://user-images.githubusercontent.com/62414262/228740999-2b31f7f2-4cbf-4b8b-b835-a3b6704803de.gif) | ![ezgif com-optimize (3)](https://user-images.githubusercontent.com/62414262/228741677-39174441-d958-4dda-a759-0f33ad40254a.gif)|



## 기술 스택

| Backend |
| :--------: |
|<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript"><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJS"> <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="ExpressJS"> <img src="https://img.shields.io/badge/sequelize-blue?style=for-the-badge&logo=sequelize&logoColor=white" alt="sequelize"> <img src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">|

## ERD
<img width="530" alt="image" src="https://user-images.githubusercontent.com/62414262/228734702-af10cefc-0dac-4db5-bfb9-8332049662c7.png">

## 구현 기능
- ERD(관계형 모델링 설계) 설계
- 사용자 로그인 API 구현
    - `Session` 로그인 판별
    - `OAuth 2.0` 소셜 로그인
- `FileReader` 프로필 사진 미리보기
- `MySQL, Sequelize` 댓글 API 구현
    - `EJS, jQuery` 댓글 마크업 구현

## 회고

▷게시글 삭제 시 해당 댓글, 답글도 같이 삭제되도록 외래키 설정

▷로그아웃 시에 일반 로그인과 소셜 로그인이 다르게 동작하므로 세션 값으로 판별하였다

▷소셜 로그인을 하는 경우 닉네임 설정을 직접 하지 못하기 때문에 중복인 경우에 랜덤 닉네임 api 통해 새로 생성

▷공용 PC 환경에서 사용하는 경우를 고려해 서비스와 카카오 계정 둘다 로그아웃 가능하게 함, 개인PC 사용자는 서비스만 로그아웃 할 경우 다음에 카카오 로그인 할 때 카카오 계정 로그인 불필요

▷이미지 없는 경우 기본 이미지 디폴트 값으로 처리

