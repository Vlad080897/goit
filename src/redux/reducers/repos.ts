import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Repository } from "../../types/repos";

const initialState = {
  repositories: [] as Repository[],
  isLoading: false,
  totalCount: 0,
};

export const reposList = createSlice({
  name: "repos",
  initialState,
  reducers: {
    getReposRequest: (state, _: PayloadAction<void>) => {
      state.isLoading = true;
    },
    getReposSuccess: (
      state,
      action: PayloadAction<{ items: Repository[]; total_count: number }>
    ) => {
      state.repositories = action.payload.items;
      state.totalCount = action.payload.total_count;
      state.isLoading = false;
    },
  },
});

export default reposList.reducer;
