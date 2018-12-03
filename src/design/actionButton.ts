import styled from "src/styled";

interface Props {
  to?: string;
}

export const ActionButton = styled.button<Props>`
  color: ${p => p.theme.primaryColorInverted};
  background: ${p => p.theme.primaryColor};
  border-radius: 20px;
  padding: 10px 40px;
  border: none;
  font-size: 1em;
  box-shadow: 3px 3px 15px -2px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background 0.3s, box-shadow 0.3s, color 0.3s;

  &:disabled {
    background: rgba(0, 0, 0, 0.2);
    box-shadow: none;
    color: #eee;
  }
`;
