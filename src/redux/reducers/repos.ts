import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Repository } from "../../types/repos";

const initialState = {
  repositories: [] as Repository[],
  isLoading: false,
};

export const reposList = createSlice({
  name: "repos",
  initialState,
  reducers: {
    getReposRequest: (state, _: PayloadAction<void>) => {
      state.isLoading = true;
    },
    getReposSuccess: (state, action: PayloadAction<Repository[]>) => {
      state.repositories = action.payload;
      state.isLoading = false;
    },
  },
});

export default reposList.reducer;
