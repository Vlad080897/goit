import { getReposApi } from "../../api/api";
import { RES_STATUS } from "../../types/enums";
import { reposList } from "../reducers/repos";
import { AppDispatch } from "../store/store";

export const getRepos = () => async (dispatch: AppDispatch) => {
  const { getReposRequest, getReposSuccess } = reposList.actions;

  dispatch(getReposRequest());

  const res = await getReposApi();

  if (res.status === RES_STATUS.SUCCESS) {
    const repos = res.data.items.slice(0, 20);
    dispatch(getReposSuccess(repos));
  }
};
