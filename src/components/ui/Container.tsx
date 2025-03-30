import styled, { css } from "styled-components";

export const Container = styled.div<{ $centered?: boolean }>`
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  ${({ $centered }) =>
    $centered &&
    css`
      align-items: center;
      justify-content: center;
    `}
`;

export const GridArea = styled(Container)<{ $gridArea: string }>`
  grid-area: ${({ $gridArea }) => $gridArea};
`;
