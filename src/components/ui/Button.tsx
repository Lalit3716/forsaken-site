import styled, { css } from "styled-components";

type IconButtonProps = {
  text?: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

export const StyledButton = styled.button<{
  $color?: string;
  $disabled?: boolean;
}>`
  background-color: ${({ $color }) => $color ?? "var(--secondary-color)"};
  color: var(--text-color);
  border: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: opacity 0.2s;

  &:active {
    opacity: 0.8;
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;

      &:hover {
        opacity: 0.5;
      }

      &:active {
        opacity: 0.5;
      }
    `}
`;

export const StyledIconButton = styled(StyledButton)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const IconButton = ({
  text,
  icon,
  onClick,
  disabled,
}: IconButtonProps) => {
  return (
    <StyledIconButton
      onClick={() => !disabled && onClick()}
      $disabled={disabled}
    >
      {text}
      {icon}
    </StyledIconButton>
  );
};
