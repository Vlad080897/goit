import { RootState } from "../store/store";

export const getReposSelector = (state: RootState) =>
  state.reposList.repositories;

export const getIsLoading = (state: RootState) => state.reposList.isLoading;
