import styled from "styled-components";

const Container = styled.div<{
  $gridArea: string;
}>`
  grid-area: ${({ $gridArea }) => $gridArea};
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
`;

export default Container;
