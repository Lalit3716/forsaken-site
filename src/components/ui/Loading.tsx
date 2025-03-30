import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Spinner = styled.div<{ size?: number }>`
  width: ${(props) => props.size ?? 40}px;
  height: ${(props) => props.size ?? 40}px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #000;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

interface LoadingProps {
  size?: number;
}

export const Loading = ({ size }: LoadingProps) => {
  return (
    <SpinnerContainer>
      <Spinner size={size} />
    </SpinnerContainer>
  );
};
