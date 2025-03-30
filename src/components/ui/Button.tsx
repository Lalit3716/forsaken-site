import styled from "styled-components";

export const Button = styled.button`
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;

export const IconButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;
