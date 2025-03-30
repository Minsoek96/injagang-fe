# InJaGang (인터뷰와 자소서를 강하게 인자강)

<br/>

![Untitled](https://github.com/Minsoek96/Injagang/assets/125581005/b1d08a5d-842a-4b27-9f74-ac4046816a0a)

<br/>

## 배포 주소

[배포링크](https://www.injagang.shop)   
TEST 계정 : test@test.com  
TEST 비번 : password

<br/>

## 목차

1. [팀원 소개](#-팀원-소개)
2. [사이트 특징](#사이트-특징)
3. [서비스 기대 효과](#서비스-기대-효과)
4. [주요 아키텍처](#주요-아키텍처)
   - [프로젝트-구조](#프로젝트-구조-feature-sliced-design)
   - [통신-구조](#통신-구조)
   - [에러처리-구조](#에러처리-구조)
   - [인증-라우터](#인증-라우터)
   - [ERD](#erd)
6. [주요 기능](#주요-기능)
   - [자소서-첨부-게시](#자소서-첨부-게시)
   - [면접-녹화-셋팅](#면접-녹화-셋팅)
   - [자소서-첨삭-피드백](#자소서-첨삭-피드백)
   - [자소서-작성](#자소서-작성)
   - [페이지-접근-권한-통제](#페이지-접근-권한-통제)
   - [테마-설정](#테마-설정)
   - [ADMIN](#관리자-페이지)
7. [Tech Stack](#tech-stack)

<br/>

## 🙋‍♂️팀원 소개

| 백민석(FE)                                                                                       | 황재환(BE)                                                                                 |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| <img src="https://avatars.githubusercontent.com/u/125581005?s=64&v=4" width="300" height="300"/> | <img src="https://avatars.githubusercontent.com/u/58110333?v=4" width="300" height="300"/> |
| [Minsoek96](https://github.com/Minsoek96?tab=repositories)                                                    | [HwangJaeHwan](https://github.com/HwangJaeHwan)                                                            |

<br/>

## 사이트 특징

**기업별 자소서 템플릿 제공**

> 다양한 기업에 맞춘 자소서 템플릿을 제공하여,  
> 사용자가 기업 맞춤형 자소서를 작성할 수 있도록 지원합니다.

**자소서 피드백에 특화된 게시판**

> 사용자가 자신의 자소서를 첨부하고 유저간의 피드백을 받을 수 있는 기능을 제공하여  
> 다양한 의견을 수렴하여 자소서를 개선할 수 있는 환경을 제공합니다.

**면접 시뮬레이션 타입별 질문 제공 (CS, 상황, 기술, 성격)**

> 실제 면접에서 자주 접하는 다양한 질문 유형을 제공하여,  
> 여러 상황에 효과적으로 대처할 수 있는 능력을 키울 수 있습니다.

### 서비스 기대 효과

- 체계적인 면접 연습을 통해 자신감 향상
- 유저 간 자소서 피드백으로 품질 향상
- 커뮤니티를 통한 동기부여 제공
- 반복 학습을 통한 능력 강화

<br/>

## 주요 아키텍처

### 프로젝트 구조 (Feature Sliced Design)

**pages :  프로젝트 페이지내 첫 렌더링 화면 관련**
- 페이지 내 첫 화면 구성을 관리
- 페이지 전체의 상태 정리

**app : 프로젝트 전체의 전역적인 관련**
- `layout`  : 프로젝트 루트 레이아웃
- `provider` : 전역 프로바이더
- `style` : 프로젝트 전체 스타일 설정 관련
- `ui` : app 레이아웃에서 사용하는 UI

**widgets : 독립적인 UI 및 기능 컴포넌트 조합**
- `board` : 게시판 관련 레이아웃
- `header` : 헤더
- `interview` : 인터뷰 기능 컴포넌트 흐름 관리
- `manual` : 메인 페이지 소개
- `template` :  템플릿 페이지 흐름 관리

**features : 프로젝트 도메인 기능 관리**
- `auth` : 인증 관련 로그인 및 회원가입 기능
- `coverletter` : 자기소개서 관련 기능
- `feedback-composer` : 게시판 피드백 작성 관련 기능
- `guard` :  페이지 접근 권한 관련 기능
- `interview` :  인터뷰 관련 기능
- `myprofile` : 프로필 관련 기능
- `qna` : 게시판 관련 기능
- `question-composer` : 자기소개서 첨부 작성 관련 기능
- `template` : 어드민 페이지 템플릿 관련

**entities : 프로젝트 내 서비스 도메인 연결**
- `auth` : 인증 관련 도메인 연결, 상태
- `coverLetter` : 자기소개서 관련 도메인 연결 , 상태
- `feedback` : 피드백 관련 도메인 연결, 상태
- `interview_question` : 면접 질문 도메인 연결, 상태
- `qnaboard` : 게시판 관련 도메인 연결 , 상태
- `template` : 어드민 템플릿 관련 도메인 연결 , 상태

**shared : 프로적트 전역내의 공통적인 사항 ( 특정 도메인을 나타내진 않음 )**
- `apis` : 클라이언트 api 통신 관련
- `config` : entities와 연결 포인트 관리
- `const` : 프로젝트 상수 관리
- `hooks` : 공용 훅
- `store` : 토스트, 모달 같은 공용 스토어
- `styles` : 프로젝트 전체에서 재사용되는 스타일 관련
- `types` : 공용타입
- `ui` : 공용 UI키트
- `utils` : 공용 유틸

### 라우팅 구조

| 경로 | 설명 |
|------|------|
| `/` | 홈 |
| `/login` | 로그인 |
| `/join` | 회원가입 |
| `/myProfile` | 프로필 |
| `/coverLetter` | 자기소개서 목록 |
| `/coverLetter/new` | 자기소개서 작성 |
| `/coverLetter/[id]/edit` | 자기소개서 수정 |
| `/interview` | 인터뷰 |
| `/qna/list` | Q&A 목록 |
| `/qna/detail/[id]` | Q&A 상세 |
| `/qna/edit/[id]` | Q&A 수정 |
| `/qna/question` | Q&A 작성 |
| `/admin` | 관리자 |
| `/api/interview-feedback` | 인터뷰 피드백 Anthropic API |
| `/api/test-errors/[type]` | 에러 테스트 API |
| `/test` | 에러 테스트 |
| `/404` | 오류 페이지 |

### 통신 구조
![network](https://github.com/user-attachments/assets/9818824c-cfec-40e7-95fa-a1d1650065a4)

### 에러처리 구조
![error](https://github.com/user-attachments/assets/dba4b8bc-7d45-49c2-b40d-e9885a17eb60)

### 인증 라우터 
![authRouter](https://github.com/user-attachments/assets/5e7ff79e-50e3-48e3-bdbb-ae209f95c227)

### ERD
![인자강 디비 구조도](https://github.com/HwangJaeHwan/Injagang/assets/58110333/769886ad-0006-484d-a6ad-c5b128a8ea55)

## 주요 기능

### 자소서 첨부 게시

**[작성]**  
![c_board](https://github.com/user-attachments/assets/69310b20-8000-41e5-b0ef-76d10715766e)


**[수정 및 삭제]**  
![u_board](https://github.com/user-attachments/assets/ca8e89a4-c17d-49a8-8094-504432540b25)

<br/>

### 면접 녹화 셋팅

**[랜덤 질문 설정]**  
![setting1](https://github.com/user-attachments/assets/abfb8d8f-c7e9-47ae-b263-53051ef18896)


**[디바이스 설정]**  
![setting2](https://github.com/user-attachments/assets/9af7da40-5187-48cb-b316-fe62dea59179)


**[커스텀 질문 설정]**  
![question_set](https://github.com/user-attachments/assets/e41056ee-757b-4a98-8f2b-a8d61f19824c)

<br/>

### 면접 녹화 

![interview](https://github.com/user-attachments/assets/502ed900-07a5-455f-8c0e-1e860e785041)

<br/>


### 자소서 첨삭 피드백

![feedback](https://github.com/user-attachments/assets/ed2fe925-0de8-4342-a9b9-1cc02641b3ba)

### 자소서 작성

![c_coverletter](https://github.com/user-attachments/assets/d1eec35e-1030-4538-9233-8837b1a8dbbf)

<br/>

### 페이지 접근 권한 통제 
- 토큰 검증을 통한 인증 처리
- AccessToken + RefreshToken

![access](https://github.com/user-attachments/assets/5fad593c-25ee-4937-9449-cafc3824f697)



### 테마 설정

![theme](https://github.com/user-attachments/assets/5b8807d8-cf95-41f5-997a-018624b12ee1)

<br/>

### 관리자 페이지  

**[자소서 템플릿 생성]**  
![admin1](https://github.com/user-attachments/assets/f0a49e1a-c806-4201-99af-340b8f4addc3)


**[면접 질문 등록]**  
![admin2](https://github.com/user-attachments/assets/9fbeb135-bad9-490d-805b-00337c5c5481)




## Tech-Stack

<div>

|     Area     |                                                                                                                                                                                                                                                                                                                                                           Tech Stack                                                                                                                                                                                                                                                                                                                                                            |
|:------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| **Frontend** | <img src="https://img.shields.io/badge/next.js-000000.svg?&style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"> <img src="https://img.shields.io/badge/typescript-3178C6.svg?&style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"> <img src="https://img.shields.io/badge/styled--components-DB7093.svg?&style=for-the-badge&logo=styled-components&logoColor=white" alt="Styled Components"> <img src="https://img.shields.io/badge/react--query-FF4154.svg?&style=for-the-badge&logo=react-query&logoColor=white" alt="React Query"> <img src="https://img.shields.io/badge/zustand-764ABC.svg?&style=for-the-badge&logo=Zustand&logoColor=white" alt="Zustand"> <img src="https://img.shields.io/badge/react--testing--library-E33332.svg?&style=for-the-badge&logo=testing-library&logoColor=white" alt="React Testing Library"> <img src="https://img.shields.io/badge/vercel-000000.svg?&style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"> <img src="https://img.shields.io/badge/husky-4D4D4D.svg?&style=for-the-badge&logo=husky&logoColor=white" alt="Husky"> |
| **Backend**  | <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white" alt="Java"> <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white" alt="Spring"> <img src="https://img.shields.io/badge/h2-4479A1?style=for-the-badge&logo=h2&logoColor=white" alt="H2"> <img src="https://img.shields.io/badge/jwt-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT"> <img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis"> <img src="https://img.shields.io/badge/aws-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS"> |

</div>

