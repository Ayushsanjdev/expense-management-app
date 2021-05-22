import React, { useState, useEffect, useRef } from "react";
import "./App.css";
// import ListComponent  from "./components/ListComponent";
import { db } from './firebaseConfig';
import firebase from 'firebase/app';




function App() {

  //TODOS-FEATURES
  //take input from user with prompt..
  //show it in the available balance..
  //subtract the expense amount from available balance..

  const [totalExpense, setTotalExpense] = useState(0);
  const [amount, setAmount] = useState();
  const [item, setItem] = useState("");
  const spanEl = useRef();

  //firestore config

  const getDocs = () => {
    db.collection("expenseUser")
    .orderBy("createdAt", "desc")
    .onSnapshot((snap) => {
      let documents = [];
      snap.forEach((doc) => {
        if (doc.id === "total") {
          spanEl.current.textContent = doc.data().total;
        } else {
          documents.push({
            ...doc.data(),
            docId: doc.id,
          });
        }
        console.log(documents);
        renderList(documents);
      })
    });
  }

  const deleteDocs = (docId, totalexpense) => {
    db.collection("expenseUser")
    .doc(docId)
    .delete()
    .then(() => {
      console.log("document deleted!");
    })
    .catch((error) => {
      console.error("found error in: ", error);
    });
    db.collection("expenseUser")
    .doc("total")
    .update({
      total: firebase.firestore.FieldValue.increment(-totalexpense),
    });
  }


  const addDocs = (textDesc, amount) => {
    db.collection("expenseUser")
    .add({
      desc: textDesc,
      amount: amount,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
      console.log("doc id: ", docRef.id);
    })
    .catch((error) => {
      console.error("error adding document: ", error);
    });
    db.collection("expenseUser")
    .doc("total")
    .update({
      total: firebase.firestore.FieldValue.increment(amount)
    });
  }


  const setExpense = () => {
    setTotalExpense(
      (prevExpense) => parseInt(amount, 10) + prevExpense);
      
  }

  const renderList = (arr) => {
    arr.map((amount) => createListItem(amount));
  }

  const createListItem = () => {
    //need to do
  }

  const handleChange = (e) => {
    setAmount(e.target.value);
  }

  const itemHandleChange = (e) => {
    setItem(e.target.value);
  }

  return (
    <div className="app">
      <header>
        <h1>
          Expense Management App
        </h1>
        <h3>
          Total Spent: 
          <span ref={spanEl}> {totalExpense} </span> <br />
          Item Name:  
          <span> {item}</span>
        </h3>
      </header>
        <input
          type="text"
          value={amount}
          onChange={handleChange}
          placeholder="Today's expense..." />
        <input
          type="text"
          value={item}
          placeholder="Item Name..."
          onChange={itemHandleChange}
        />
      <button onClick={setExpense}>Add</button>
      <section>
        Click on add to show ur expenses here...
      </section>
    </div>
  );
}

export default App;
