import React, { Dispatch, SetStateAction, useMemo } from "react";
import styled from "styled-components";
import { Repository } from "../../types/repos";

type PaginationType = {
  repos: Repository[];
  nPages: number;
  currentPage: number;
  totalPages: number;
  startPage: number;
  setStartPage: Dispatch<SetStateAction<number>>;
  handlePageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationType> = ({
  repos,
  nPages,
  currentPage,
  setStartPage,
  startPage,
  totalPages,
  handlePageChange,
}) => {
  const pages = useMemo(
    () =>
      Array.from({ length: nPages })
        .map((_, index) => index + 1)
        .slice(-5),
    [nPages]
  );

  const prevPage = () => {
    if (nPages !== 5) {
      setStartPage(startPage - 5);
    }
  };

  const nextPage = () => {
    if (nPages < totalPages) {
      setStartPage(startPage + 5);
    }
  };

  if (!repos.length) {
    return null;
  }

  return (
    <Wrapper>
      <Button onClick={prevPage}>Prev</Button>
      <PagesWrapper>
        {pages.map((page) => (
          <PageNumber
            key={page}
            currentPage={currentPage}
            page={page}
            onClick={() => handlePageChange(page)}
          >
            {page}
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
  page: number;
}>`
  padding: 5px;
  cursor: pointer;
  border-bottom: ${({ currentPage, page }) =>
    currentPage === page ? "3px solid #65B79A" : "none"};
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
