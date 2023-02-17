import React, { Dispatch, SetStateAction } from "react";
import { Repository } from "../../types/repos";
import styled from "styled-components";

type PaginationType = {
  repos: Repository[];
  nPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

const Pagination: React.FC<PaginationType> = ({
  repos,
  nPages,
  currentPage,
  setCurrentPage,
}) => {
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (!repos.length) {
    return null;
  }

  return (
    <Wrapper>
      <Button onClick={prevPage}>Prev</Button>
      <PagesWrapper>
        {Array.from({ length: nPages }).map((_, index) => (
          <PageNumber currentPage={currentPage} index={index}>
            {index + 1}
          </PageNumber>
        ))}
      </PagesWrapper>
      <Button onClick={nextPage}>Next</Button>
    </Wrapper>
  );
};

export default Pagination;

const Wrapper = styled("div")`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-family: "Archivo";
`;

const PagesWrapper = styled("div")`
  display: flex;
`;

const PageNumber = styled("div")<{
  currentPage: number;
  index: number;
}>`
  padding: 5px;
  border-bottom: ${({ currentPage, index }) =>
    currentPage === index + 1 ? "3px solid #65B79A" : "none"};
`;

const Button = styled("button")`
  background: none;
  border: none;
  font-weight: 600;
  font-size: 18px;

  &:hover {
    cursor: pointer;
  }
`;
