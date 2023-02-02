import React, { useState } from "react";

// const [value, setValue] = useState(null);
// function handleClick() {
// 	setValue("X");
// }

// maintains which squares are filled
export default function Board() {
	const [xIsNext, setXIsNext] = useState(true);
	const [squares, setSquares] = useState(Array(9).fill(null)); // create an array with 9 elements and set each to `null`.

	/*
	 * reminder: inner `handleClick` function has access to outer `Board` function.
	 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
	 */

	function handleClick(i) {
		// check if square already has an "X" or "O"
		if (squares[i]) {
			return;
		}

		// `slice()` Array method creates a copy of `squares` array named `nextSquares`
		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[i] = "X";
		} else {
			nextSquares[i] = "O";
		}
		// tell React the state of the component has changed
		setSquares(nextSquares);
		// flip `xIsNext` boolean
		setXIsNext(!xIsNext);
	}

	return (
		<React.Fragment>
			<div className='board-row'>
				{/* `Board` component maintains which squares are filled. It passes prop down to each of the `Square` components it renders */}
				{/* coding `handleClick(0) would call the function, which calls `setSquares` and re-renders the board, which calls `handleClick(0)`, creating an infinite loop*/}
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

// receive `value` prop (`X`, `O`, or `null`) from `Board` component. // Pass down `onSquareClick` fn from `Board` to `Square.`
function Square({ value, onSquareClick }) {
	return (
		<button className='square' onClick={onSquareClick}>
			{value} {/* receive `value` prop from `Board` component */}
		</button>
	);
}
