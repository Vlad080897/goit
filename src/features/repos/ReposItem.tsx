import React from "react";
import { Repository } from "../../types/repos";
import styled from "styled-components";
import { Star as StarIcon } from "./Star";
import { Watcher as WatcherIcon } from "./Watcher";

type RepoItemType = {
  repo: Repository;
};

const ReposItem: React.FC<RepoItemType> = ({ repo }) => {
  const { language, name, owner, description, watchers, stargazers_count } =
    repo;

  return (
    <Wrapper>
      <LeftSideBlock>
        <Avatar src={owner.avatar_url} alt="user_logo" />
        <RepoInfo>
          <Name>{name}</Name>
          <Text>{owner.login}</Text>
          <Text>{language}</Text>
          <Text>{description}</Text>
        </RepoInfo>
      </LeftSideBlock>
      <RightSideBlock>
        <div>
          <StarIcon />
          <span>
            {stargazers_count} <span className="starts">starts</span>
          </span>
        </div>

        <div>
          <WatcherIcon />
          <span>{watchers} watchers</span>
        </div>
      </RightSideBlock>
    </Wrapper>
  );
};

export default ReposItem;

const Wrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 224px;
  background-color: #ffffff;
  margin: 36px 0;
  border-radius: 16px;
  font-family: "Open Sans", sans-serif; ;
`;

const LeftSideBlock = styled("div")`
  display: flex;
  box-sizing: border-box;
  padding: 40px;
`;

const RightSideBlock = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  margin-right: 40px;

  & div {
    display: flex;
    align-items: flex-end;
  }

  & span {
    margin-left: 5px;

    .starts {
      color: #6e798c;
    }
  }
`;

const RepoInfo = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 16px;
`;

const Name = styled("span")`
  text-transform: capitalize;
  font-weight: 400;
  font-size: 22px;
  font-family: "DM Serif Display";
`;

const Text = styled("span")``;

const Avatar = styled("img")`
  width: 128px;
  height: 144px;
`;
