import React, { useState } from "react";

// const [value, setValue] = useState(null);
// function handleClick() {
// 	setValue("X");
// }

// maintains which squares are filled
export default function Board(value, setValue) {
	const [squares, setSquares] = useState(Array(9).fill(null)); // create an array with 9 elements and set each to `null`.

	/*
	 * reminder: inner `handleClick` function has access to outer `Board` function.
	 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
	 */
	
	function handleClick() {
		// `slice()` Array method creates a copy of `squares` array named `nextSquares`
		const nextSquares = squares.slice();
		console.log(`nextSquares = ${nextSquares}`);
		// add `X` to the first (`[0]` index) square
		nextSquares[0] = "X";
		// tell React the state of the component has changed
		setSquares(nextSquares);
	}

	return (
		<React.Fragment>
			<div className='board-row'>
				<Square value={squares[0]} onSquareClick={handleClick} />{" "}
				{/* `Board` component passes prop down to each of the `Square` components it renders */}
				<Square value={squares[1]} />
				<Square value={squares[2]} />
			</div>
			<div className='board-row'>
				<Square value={squares[3]} />
				<Square value={squares[4]} />
				<Square value={squares[5]} />
			</div>
			<div className='board-row'>
				<Square value={squares[6]} />
				<Square value={squares[7]} />
				<Square value={squares[8]} />
			</div>
		</React.Fragment>
	);
}

function Square({ value, onSquareClick }) {
	return (
		<button className='square' onClick={onSquareClick}>
			{value}
		</button>
	); // receive `value` prop from `Board` component
}
