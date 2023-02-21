import axios from "axios";
import { ReposResponseType } from "../types/repos";

export const getReposApi = async () =>
  await axios
    .get<ReposResponseType>(
      "https://api.github.com/search/repositories?q=react"
    )
