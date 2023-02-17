import { ChangeEvent, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../redux/hooks/hooks";
import { getIsLoading, getReposSelector } from "../../redux/selectors/repos";
import { Repository } from "../../types/repos";
import Pagination from "../pagination/Pagination";
import ReposItem from "./ReposItem";

const Repositories = () => {
  const repos = useAppSelector(getReposSelector);
  const isLoading = useAppSelector(getIsLoading);

  const [currentRepos, setCurrentRepos] = useState<Repository[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(3);

  const indexOfLastRecord = currentPage * reposPerPage;
  const indexOfFirstRecord = indexOfLastRecord - reposPerPage;
  const nPages = Math.ceil(currentRepos.length / reposPerPage);

  const repositories = useMemo(
    () =>
      !currentRepos.length && searchValue
        ? "There's no result for your search"
        : currentRepos
            .slice(indexOfFirstRecord, indexOfLastRecord)
            .map((repo) => <ReposItem key={repo.id} repo={repo} />),
    [currentRepos, searchValue, indexOfLastRecord, indexOfFirstRecord]
  );

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.currentTarget.value.toLowerCase().trim());

  useEffect(() => {
    if (repos) {
      setCurrentRepos(repos);
    }
  }, [repos]);

  useEffect(() => {
    if (searchValue) {
      const filteredRepos = repos.filter((repo) =>
        repo.name.toLowerCase().trim().includes(searchValue)
      );
      setCurrentRepos(filteredRepos);
      setCurrentPage(1);
      return;
    }
    setCurrentRepos(repos);
  }, [searchValue, repos, currentRepos]);

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
        setCurrentPage={setCurrentPage}
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
