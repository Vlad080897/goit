import { useEffect } from "react";
import styled from "styled-components";
import Repositories from "../features/repos/Repositories";
import { useAppDispatch } from "../redux/hooks/hooks";
import { getRepos } from "../redux/thunks/reposThunks";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRepos());
  }, []);

  return (
    <Wrapper>
      <Repositories />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled("div")`
  width: 90%;
  margin: 0 auto;
`;
