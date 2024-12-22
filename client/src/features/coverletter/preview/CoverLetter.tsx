import { Suspense } from "react";

import { useRouter } from "next/router";

import { BiPlus } from "react-icons/bi";

import styled from "styled-components";

import { styleMixin, V } from "@/src/shared/styles";
import { Container, HideSvg, Spinner } from "@/src/shared/ui";

import CoverLetterList from "./CoverLetterList";
import CoverLetterPreView from "./CoverLetterPreView";

/** 유저 자소서 선택 페이지 */
function CoverLetter() {
  const router = useRouter();
  const headerTitle = "나의 자기소개서 목록";
  const moveCreationPage = "/coverLetter/new";

  return (
    <>
      <ListHeader>{headerTitle}</ListHeader>
      <CoverLetterContainer>
        <Suspense fallback={<Spinner />}>
          <CoverLetterList />
        </Suspense>
        <CoverLetterPreView />
        <HideSvg
          onClick={() => router.push(moveCreationPage)}
          label="자소서 작성하기"
          Logo={<BiPlus />}
          sx={{ fontSize: "4rem" }}
        />
      </CoverLetterContainer>
    </>
  );
}

export default CoverLetter;

const CoverLetterContainer = styled(Container.ItemBase)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  width: 100%;
  color: ${(props) => props.theme.colors.text};
  height: 100%;

  @media screen and (max-width: ${V.mediaTablet}) {
    ${styleMixin.Column("flex-start", "flex-start")}
    gap:1rem;
  }
`;

const ListHeader = styled.div`
  margin-bottom: 1.5rem;
  text-align: start;
  width: 100%;
  font-size: 2.5rem;
  font-weight: 400;
  background-color: ${(props) => props.theme.colors.highlightColor};
  padding: 1.8rem 1.25rem;
  border-radius: 0.5rem;
  position: relative;
  color: ${(props) => props.theme.colors.signatureText};
  letter-spacing: -0.02em;

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 2rem;
    padding: 1rem 0.8rem;
  }
`;
