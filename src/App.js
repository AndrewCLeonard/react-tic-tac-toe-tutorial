import React, { useState } from "react";

// receive `value` prop (`X`, `O`, or `null`) from `Board` component. // Pass down `onSquareClick` fn from `Board` to `Square.`
function Square({ value, onSquareClick }) {
	return (
		<button className='square' onClick={onSquareClick}>
			{value} {/* receive `value` prop from `Board` component */}
		</button>
	);
}

// maintains which squares are filled
function Board({ xIsNext, squares, onPlay }) {
	/*
	 * reminder: inner `handleClick` function has access to outer `Board` function.
	 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
	 */

	function handleClick(i) {
		// check if square already has an "X" or "O"
		if (squares[i] || calculateWinner(squares)) {
			return;
		}

		// `slice()` Array method creates a copy of `squares` array named `nextSquares`
		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[i] = "X";
		} else {
			nextSquares[i] = "O";
		}
		onPlay(nextSquares);
	}

	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = "Winner: " + winner;
	} else {
		status = "Next player: " + (xIsNext ? "X" : "O");
	}

	return (
		<React.Fragment>
			<div className='status'>{status}</div>
			<div className='board-row'>
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
			</div>
			<div className='board-row'>
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
			</div>
			<div className='board-row'>
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div>
		</React.Fragment>
	);
}

// `export default` tells `index.js` file to use `Game` component as top-level component (no longer the `Board` component)
export default function Game() {
	const [xIsNext, setXIsNext] = useState(true);
	const [history, setHistory] = useState([Array(9).fill(null)]); // create an array with 9 elements and set each to `null`.
	const currentSquares = history[history.length - 1];

	function handlePlay(nextSquares) {
		setHistory([...history, nextSquares]); // spread syntax = "enumerate all the items in history", which creates new array containing all items in `history`, followed by `nextSquares`
		/*  if history is [[null,null,null], ["X",null,null]]
		 * and nextSquares is ["X",null,"O"],
		 * then the new [...history, nextSquares] array will be:
		 * [[null,null,null], ["X",null,null], ["X",null,"O"]].
		 */
		setXIsNext(!xIsNext);
	}

	return (
		<div className='game'>
			<div className='game-board'>
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className='game-info'>
				<ol>{/*TODO*/}</ol>
			</div>
		</div>
	);
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
