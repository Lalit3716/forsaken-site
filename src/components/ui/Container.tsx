import styled from "styled-components";

const Container = styled.div<{
  $gridArea: string;
}>`
  grid-area: ${({ $gridArea }) => $gridArea};
  background-color: var(--background-color);
  border: 1px solid var(--primary-color);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Container;
