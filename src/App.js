import * as React from 'react';
import { ChakraProvider, Box, Button, CSSReset, extendTheme } from "@chakra-ui/react";

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));

  function selectSquare(square) {
    if (calculateWinner(squares) || squares[square]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[square] = calculateNextValue(newSquares);
    setSquares(newSquares);
  }

  function restart() {
    setSquares(Array(9).fill(null));
  }

  function renderSquare(i) {
    return (
      <Button
        className="square"
        onClick={() => selectSquare(i)}
        bg={squares[i] === 'X' ? 'green.400' : 'blue.400'} // Ganti warna latar belakang berdasarkan isi kotak
        color="white"
      >
        {squares[i]}
      </Button>
    );
  }

  const winner = calculateWinner(squares);
  const nextValue = calculateNextValue(squares);
  const status = calculateStatus(winner, squares, nextValue);

  return (
    <Box textAlign="center">
      <Box fontSize="2xl" fontWeight="bold" mb={4}>
        {status}
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
        <Box>{renderSquare(0)}</Box>
        <Box>{renderSquare(1)}</Box>
        <Box>{renderSquare(2)}</Box>
        <Box>{renderSquare(3)}</Box>
        <Box>{renderSquare(4)}</Box>
        <Box>{renderSquare(5)}</Box>
        <Box>{renderSquare(6)}</Box>
        <Box>{renderSquare(7)}</Box>
        <Box>{renderSquare(8)}</Box>
      </Box>
      <Button
        mt={4}
        onClick={restart}
        bg="red.400"
        color="white"
        _hover={{ bg: "red.500" }}
      >
        Restart
      </Button>
    </Box>
  );
}

function Game() {
  return (
    <Box className="game" minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box className="game-board">
        <Board />
      </Box>
    </Box>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const theme = extendTheme({
  styles: {
    global: {
      // Menyesuaikan warna latar belakang dan font body
      body: {
        bg: "teal.200",
        color: "white",
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Game />
    </ChakraProvider>
  );
}

export default App;
