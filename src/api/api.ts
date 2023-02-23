import axios from "axios";
import { ReposResponseType } from "../types/repos";

export const getReposApi = async (page = 1, search = "react") =>
  await axios.get<ReposResponseType>(
    `https://api.github.com/search/repositories?q=${search}&per_page=3&page=${page}`
  );
