import styled from "styled-components";

const List = styled.ul`
  width: 280px;
  margin: 0;
`;

const Instructions = () => {
  return (
    <>
      <h3>Instructions:</h3>
      <List>
        <li>
          Players take turns placing their symbol in an empty cell on the grid.
        </li>
        <li>
          The goal is to get three of your symbols in a row horizontally,
          vertically, or diagonally.
        </li>
        <li>
          If a player gets three of their symbols in a row, that player wins the
          game.
        </li>
        <li>
          If the entire grid is filled, and no player has three symbols in a
          row, the game is a draw (also known as a tie or a cat's game).
        </li>
        <li>The game stops as soon as a player wins.</li>
      </List>
    </>
  );
};

export default Instructions;
