import styled from "styled-components";

const Square = styled.button`
  border: 1px solid 000;
  background: #fff;
  color: #000;
  width: 75px;
  height: 75px;
  font-size: 24px;
`;

interface PlayFieldProps {
  text: string;
  row: number;
  col: number;
  updateBoxState(row: number, col: number): void;
  disabled: boolean;
}

const PlayField = ({
  text,
  row,
  col,
  updateBoxState,
  disabled,
}: PlayFieldProps) => {
  return (
    <>
      <Square
        disabled={disabled}
        onClick={() => !text && updateBoxState(row, col)}
      >
        {text}
      </Square>
    </>
  );
};

export default PlayField;
