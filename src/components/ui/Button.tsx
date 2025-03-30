import styled from "styled-components";

type IconButtonProps = {
  text?: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

export const StyledButton = styled.button<{ $color?: string }>`
  background-color: ${({ $color }) => $color ?? "var(--secondary-color)"};
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

export const StyledIconButton = styled(StyledButton)<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
`;

export const IconButton = ({
  text,
  icon,
  onClick,
  disabled,
}: IconButtonProps) => {
  return (
    <StyledIconButton onClick={onClick} $disabled={disabled}>
      {text}
      {icon}
    </StyledIconButton>
  );
};
