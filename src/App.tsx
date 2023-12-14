import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import PlayField from "./components/PlayField";
import Flex from "./components/Flex";
import Instructions from "./components/Instructions";

const ClearButton = styled.button`
  margin: 25px;
  height: 55px;
  width: 150px;
  font-size: 16px;
`;

const Divider = styled.div`
  margin: 0 40px;
  border-right: 4px solid;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  @media (max-width: 712px) {
    display: none;
  }
`;

function App() {
  // box state represents value for each cell. 0 = unset, 1 = first player, 2 = second player
  const initialBoxState = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const [player, setPlayer] = useState(1);
  const [boxes, setBoxes] = useState(initialBoxState);
  const [winner, setWinner] = useState(0);

  const updateBoxState = (row: number, col: number) => {
    setPlayer(player === 1 ? 2 : 1); // once box state is updated, switch the player for next turn
    setBoxes((prevState) => {
      const newState = [...prevState];
      newState[row][col] = player; // update cell value to the current player
      return newState;
    });
  };

  useEffect(() => {
    let winnerFound = false;
    const getWinner = (row: number[]) => {
      // calculate the winner based on the cell's value
      // Formula: sum of all rows % number of columns === 0, no remainder means each cell value is equal
      const sum = row.reduce((prev, current) => prev + current);
      if (!row.includes(0) && sum % row.length === 0) {
        setWinner(row[0]);
        winnerFound = true;
      }
    };
    // compare all rows
    boxes.forEach((row) => {
      getWinner(row);
    });

    // compare all columns
    if (!winnerFound) {
      for (let i = 0; i < boxes[0].length; i++) {
        const columnData: number[] = [];
        boxes.forEach((row) => {
          columnData.push(row[i]); // get data per column
        });
        getWinner(columnData);
      }
    }

    // compare diagonals
    if (!winnerFound) {
      const diagonalA: number[] = [];
      const diagonalB: number[] = [];
      boxes.forEach((row, index) => {
        diagonalA.push(row[index]); // left to right increment
        diagonalB.push(row[row.length - 1 - index]); // right to left decrement
      });
      if (!winnerFound) {
        getWinner(diagonalA);
      }
      if (!winnerFound) {
        getWinner(diagonalB);
      }
    }
  }, [boxes]);

  const allBoxesFilled = boxes.every((row) => row.every((item) => item > 0));

  return (
    <>
      <Flex flexDirection="column">
        <h1>Tic-tac-toe</h1>
      </Flex>
      <Flex flexWrap="wrap">
        <Flex flexDirection="column">
          <Instructions />
        </Flex>
        <Divider />
        <Flex flexDirection="column" flexGrow="1">
          <h3>
            {allBoxesFilled && !winner
              ? "It's a tie!"
              : winner
              ? `Player ${winner} wins`
              : `Player ${player}'s turn`}
          </h3>

          {boxes.map((row, rowIndex) => (
            <Flex justifyContent="center">
              {row.map((box, colIndex) => (
                <PlayField
                  key={`${rowIndex}-${colIndex}`}
                  text={box === 1 ? "X" : box === 2 ? "O" : ""}
                  row={rowIndex}
                  col={colIndex}
                  updateBoxState={updateBoxState}
                  disabled={!!winner}
                />
              ))}
            </Flex>
          ))}
          <Flex justifyContent="center">
            <ClearButton
              onClick={() => {
                setBoxes(initialBoxState);
                setWinner(0);
                setPlayer(1);
              }}
            >
              {winner || allBoxesFilled ? "Play again?" : "Reset"}
            </ClearButton>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default App;
