export type ReposResponseType = {
  incomplete_results: boolean;
  items: Repository[];
  total_count: number;
};

export type Repository = {
  id: number;
  name: string;
  owner: Owner;
  watchers: number;
  stargazers_count: number;
  language: string;
  description: string;
};

type Owner = {
  avatar_url: string;
  login: string;
  id: number;
};
