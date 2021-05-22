import React, { useState, useRef } from "react";
import "./App.css";
import ListComponent  from "./ListComponent";
// import firebase from 'firebase/app';



function App() {

  //TODOS-FEATURES
  //take input from user with prompt..
  //show it in the available balance..
  //subtract the expense amount from available balance..

  const [totalExpense, setTotalExpense] = useState(0);
  const [amount, setAmount] = useState("");
  const [item, setItem] = useState("");
  const inputEl = useRef();


  const setExpense = () => {
    setTotalExpense(
      (prevExpense) => parseInt(amount, 10) + prevExpense);
    <ListComponent />
  }

  const handleChange = (e) => {
    setAmount(e.target.value);
  }

  // const getDocs = () => {
  //   firebase.firestore().collection("expenseUser")
  //   .orderBy("createdAt", "item")
  //   .onSnapShot((snap) => {
  //     let documents = [];
  //     snap.forEach((doc) => {
  //       if(doc.id === "item") {
  //         console.log(doc.id)
  //       }
  //     })
  //   })
  // }

  return (
    <div className="app">
      <header>
        <h1>
          Expense Management App
        </h1>
        <h3>
          Total Spent: 
          <span> {totalExpense} </span>
        </h3>
      </header>
      <input
        type="text"
        value={amount}
        onChange={handleChange}
        placeholder="Today's expense..."
        ref={inputEl} />
      <input
        type="text"
        placeholder="Item Name..."
        onChange={(e) => setItem(e.target.value)}
      />
      <button onClick={setExpense}>Add</button>
    </div>
  );
}

export default App;
