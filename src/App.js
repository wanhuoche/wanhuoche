import { useState } from 'react';

function Square({value,handleClick}) {
  return (
    <button className="square" onClick={handleClick}>{value}</button>
  );
}

function Board({squares,xIsNext,handlePlay}) {
  
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    handlePlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(cell => cell !== null); 
  let status;
  if (winner && winner !== "draw") {
    status = "Winner: " + winner;
  } else if (isDraw) {
    status = "Game Over: Draw!"
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} handleClick={() =>handleClick(0)}></Square>
        <Square value={squares[1]} handleClick={() =>handleClick(1)}></Square>
        <Square value={squares[2]} handleClick={() =>handleClick(2)}></Square>
      </div>
      <div className="board-row">
        <Square value={squares[3]} handleClick={() =>handleClick(3)}></Square>
        <Square value={squares[4]} handleClick={() =>handleClick(4)}></Square>
        <Square value={squares[5]} handleClick={() =>handleClick(5)}></Square>
      </div>
      <div className="board-row">
        <Square value={squares[6]} handleClick={() =>handleClick(6)}></Square>
        <Square value={squares[7]} handleClick={() =>handleClick(7)}></Square>
        <Square value={squares[8]} handleClick={() =>handleClick(8)}></Square>
      </div>
    </>
  )
}

export default function Game() {
  const [history,setHistory] = useState([Array(9).fill(null)])
  const [currentMove,setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nexthistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nexthistory);
    setCurrentMove(nexthistory.length -1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }
  const moves = history.map((squares,move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() =>jumpTo(move)}>{description}</button>
      </li>
    )
  })
  return (
    <div className='game'>
      <div className="game-board">
        <Board squares={currentSquares} xIsNext={xIsNext} handlePlay={handlePlay}></Board>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for (let i = 0; i<lines.length; i++) {
    const [a,b,c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }

  }
  return null;
}