import { ChangeEvent, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import useDebounced from "../../redux/hooks/useDebounced";
import {
  getIsLoading,
  getReposSelector,
  getTotalCount,
} from "../../redux/selectors/repos";
import { getRepos } from "../../redux/thunks/reposThunks";
import { Repository } from "../../types/repos";
import Pagination from "../pagination/Pagination";
import ReposItem from "./ReposItem";

const DEFAULT_VALUE = "react";

const Repositories = () => {
  const dispatch = useAppDispatch();

  const repos = useAppSelector(getReposSelector);
  const isLoading = useAppSelector(getIsLoading);
  const totalCount = useAppSelector(getTotalCount);

  const [currentRepos, setCurrentRepos] = useState<Repository[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [nPages, setPages] = useState(0);

  const debouncedSearch = useDebounced(searchValue, 500);
  const totalPages = totalCount / 3;

  const repositories = useMemo(
    () =>
      !currentRepos.length && searchValue
        ? "There's no result for your search"
        : currentRepos.map((repo) => <ReposItem key={repo.id} repo={repo} />),
    [currentRepos, searchValue]
  );

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value) {
      dispatch(getRepos());
    }
    setSearchValue(e.currentTarget.value);
  };

  const handlePageChange = (page: number) => {
    dispatch(getRepos(searchValue || DEFAULT_VALUE, page));
    setCurrentPage(page);
  };

  useEffect(() => {
    if (repos) {
      setCurrentRepos(repos);
    }
  }, [repos]);

  useEffect(() => {
    setPages(Math.min(startPage + 4, totalCount));
  }, [startPage, totalPages, totalCount]);

  useEffect(() => {
    if (debouncedSearch) {
      dispatch(getRepos(debouncedSearch, 1));
      setCurrentPage(1);
      setStartPage(1);
    }
  }, [debouncedSearch]);

  return (
    <>
      <SearchInput
        placeholder="Search"
        value={searchValue}
        onChange={handleValueChange}
      />
      {isLoading ? "Loading ..." : repositories}
      <Pagination
        nPages={nPages}
        repos={currentRepos}
        currentPage={currentPage}
        startPage={startPage}
        totalPages={totalPages}
        setStartPage={setStartPage}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default Repositories;

const SearchInput = styled("input")`
  width: 100%;
  border: none;
  box-shadow: 0px 4px 4px rgba(51, 51, 51, 0.04),
    0px 4px 24px rgba(51, 51, 51, 0.24);
  border-radius: 4px;
  height: 56px;
  padding-left: 10px;
  color: rgba(17, 17, 17, 0.48);
  margin-top: 32px;

  &:focus-visible {
    outline: none;
  }
`;
