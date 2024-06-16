import React, { useRef, useState } from 'react';
import './TicTacToe.css'; // Assuming this contains your CSS styles
import heart_icon from '../Assests/heart png.png'; // Adjust the path as necessary
import cross_icon from '../Assests/cross png.png'; // Adjust the path as necessary


const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const toggle = (index) => {
    if (lock || board[index] !== "") {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = count % 2 === 0 ? "x" : "o";
    setBoard(newBoard);
    setCount(count + 1);

    if (checkWin(newBoard)) {
      won(newBoard[index]);
    }
  };

  const checkWin = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `Congrats: <img src="${cross_icon}" alt="cross"> winner`;
    } else {
      titleRef.current.innerHTML = `Congrats: <img src="${heart_icon}" alt="heart"> winner`;
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCount(0);
    setLock(false);
    titleRef.current.innerHTML = 'MatchPoint in <span>Aptos</span>';
  };

  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>MatchPoint in <span>Aptos</span></h1>
      <div className="board">
        <div className="row1">
          {board.slice(0, 3).map((value, index) => (
            <div key={index} className="boxes" onClick={() => toggle(index)}>
              {value === "x" && <img src={cross_icon} alt="cross" />}
              {value === "o" && <img src={heart_icon} alt="heart" />}
            </div>
          ))}
        </div>
        <div className="row2">
          {board.slice(3, 6).map((value, index) => (
            <div key={index + 3} className="boxes" onClick={() => toggle(index + 3)}>
              {value === "x" && <img src={cross_icon} alt="cross" />}
              {value === "o" && <img src={heart_icon} alt="heart" />}
            </div>
          ))}
        </div>
        <div className="row3">
          {board.slice(6, 9).map((value, index) => (
            <div key={index + 6} className="boxes" onClick={() => toggle(index + 6)}>
              {value === "x" && <img src={cross_icon} alt="cross" />}
              {value === "o" && <img src={heart_icon} alt="heart" />}
            </div>
          ))}
        </div>
      </div>
      <button className="Connect">Connect Wallet</button>
      <button className="reset" onClick={resetGame}>Reset</button>
      <button className="Cash">Cash Out</button>
    </div>
  );
};

export default TicTacToe;
