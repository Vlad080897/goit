import { getReposApi } from "../../api/api";
import { RES_STATUS } from "../../types/enums";
import { reposList } from "../reducers/repos";
import { AppDispatch } from "../store/store";

export const getRepos =
  (search?: string, page?: number) => async (dispatch: AppDispatch) => {
    const { getReposRequest, getReposSuccess } = reposList.actions;

    dispatch(getReposRequest());

    const res = await getReposApi(page, search);

    if (res.status === RES_STATUS.SUCCESS) {
      dispatch(getReposSuccess(res.data));
    }
  };
