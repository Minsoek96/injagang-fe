# InJaGang (인터뷰와 자소서를 강하게 인자강)

<br/>

![Untitled](https://github.com/Minsoek96/Injagang/assets/125581005/b1d08a5d-842a-4b27-9f74-ac4046816a0a)

<br/>

## 배포 주소

[배포링크](https://injagang-fe.vercel.app/)   
TEST 계정 : test@test.com  
TEST 비번 : password

## 목차

1. [팀원 소개](#팀원-소개)
2. [사이트 특징](#사이트-특징)
3. [서비스 기대 효과](#서비스-기대-효과)
4. [ERD](#erd)
5. [주요 기능](#주요-기능)
   - [자소서-첨부-게시](#자소서-첨부-게시)
   - [면접-녹화-셋팅](#면접-녹화-셋팅)
   - [자소서-첨삭-피드백](#자소서-첨삭-피드백)
   - [자소서-작성](#자소서-작성)
   - [페이지-접근-권한-통제](#페이지-접근-권한-통제)
   - [테마-설정](#테마-설정)
   - [ADMIN](#관리자-페이지)
6. [Tech Stack](#tech-stack)

<br/>

## 🙋‍♂️팀원 소개

| 백민석(FE)                                                                                       | 황재환(BE)                                                                                 |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| <img src="https://avatars.githubusercontent.com/u/125581005?s=64&v=4" width="300" height="300"/> | <img src="https://avatars.githubusercontent.com/u/58110333?v=4" width="300" height="300"/> |
| https://github.com/Minsoek96?tab=repositories                                                    | https://github.com/HwangJaeHwan                                                            |

<br/>

## 사이트 특징

<br/>

**기업별 자소서 템플릿 제공**

> 다양한 기업에 맞춘 자소서 템플릿을 제공하여,  
> 사용자가 기업 맞춤형 자소서를 작성할 수 있도록 지원합니다.

**자소서 피드백에 특화된 게시판**

> 사용자가 자신의 자소서를 첨부하고 유저간의 피드백을 받을 수 있는 기능을 제공하여  
> 다양한 의견을 수렴하여 자소서를 개선할 수 있는 환경을 제공합니다.

**면접 시뮬레이션 타입별 질문 제공 (CS, 상황, 기술, 성격)**

> 실제 면접에서 자주 접하는 다양한 질문 유형을 제공하여,  
> 여러 상황에 효과적으로 대처할 수 있는 능력을 키울 수 있습니다.

## 서비스 기대 효과

- 체계적인 면접 연습을 통해 자신감 향상
- 유저 간 자소서 피드백으로 품질 향상
- 커뮤니티를 통한 동기부여 제공
- 반복 학습을 통한 능력 강화

<br/>

## ERD

![인자강 디비 구조도](https://github.com/HwangJaeHwan/Injagang/assets/58110333/769886ad-0006-484d-a6ad-c5b128a8ea55)

## 주요 기능

---

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

