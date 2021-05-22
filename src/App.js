import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebaseConfig";
import firebase from "firebase/app";

function App() {
  //TODOS-FEATURES
  //take input from user with prompt..
  //show it in the available balance..
  //subtract the expense amount from available balance..

  const [totalExpense, setTotalExpense] = useState(0);
  const [amount, setAmount] = useState();
  const [item, setItem] = useState("");
  const [allExpenses, setAllExpenses] = useState(null);

  useEffect(() => {
    db.collection("expenseUser")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          if (doc.id === "total") {
            setTotalExpense(doc.data().total);
          } else {
            documents.push({ ...doc.data(), docId: doc.id });
          }
        });
        setAllExpenses(documents);
      });
  }, []);

  // const deleteDocs = (docId, totalexpense) => {
  //   db.collection("expenseUser")
  //   .doc(docId)
  //   .delete()
  //   .then(() => {
  //     console.log("document deleted!");
  //   })
  //   .catch((error) => {
  //     console.error("found error in: ", error);
  //   });
  //   db.collection("expenseUser")
  //   .doc("total")
  //   .update({
  //     total: firebase.firestore.FieldValue.increment(-totalexpense),
  //   });
  // }

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
  };

  const setExpense = () => {
    setAmount(parseInt(amount, 10));
    addDocs(item, amount);
  };

  // const renderList = (arr) => {
  //   arr.map((amount) => createListItem(amount));
  // }

  // const createListItem = () => {
  //   //need to do
  // }

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const itemHandleChange = (e) => {
    setItem(e.target.value);
  };

  return (
    <div className="app">
      <header>
        <h1>Expense Management App</h1>
        <h3>
          Total Spent:
          <span>{totalExpense}</span> <br />
        </h3>
      </header>
      <input
        type="text"
        value={amount}
        onChange={handleChange}
        placeholder="Today's expense..."
      />
      <input
        type="text"
        value={item}
        placeholder="Item Name..."
        onChange={itemHandleChange}
      />
      <button onClick={setExpense}>++</button>
      <p>Your expense history: </p>
      <ul>
        {allExpenses &&
          allExpenses.map((expense) => {
            return (
              <li key={expense.docId}>
                <span className="first-span">{expense.amount}</span>
                {"  "}
                <span className="second-span">{expense.desc}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default App;
