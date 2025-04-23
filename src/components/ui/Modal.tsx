import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import { StyledButton } from "./Button";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  secondaryAction: {
    label: string;
    onClick: () => void;
  };
};

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  position: relative;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 28rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ModalBody = styled.div`
  margin-bottom: 1.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <ModalOverlay>
      <Backdrop onClick={onClose} />
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <ModalBody>{children}</ModalBody>
        <ButtonContainer>
          <StyledButton
            onClick={secondaryAction.onClick}
            $color="var(--tertiary-color)"
          >
            {secondaryAction.label}
          </StyledButton>
          <StyledButton onClick={primaryAction.onClick}>
            {primaryAction.label}
          </StyledButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>,
    document.getElementById("modal-root") as HTMLElement
  );
};
