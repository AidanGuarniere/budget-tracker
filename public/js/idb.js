// create variable to hold db connection
let db;

// establish a connection to IndexedDB database called 'budget-tracker' and set it to version 1
const request = indexedDB.open("budget-tracker", 1);

// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function (event) {
  // save a reference to the database
  const db = event.target.result;
  // create an object store (table) called `new-budget`, set it to have an auto incrementing primary key of sorts
  db.createObjectStore("new-budget", { autoIncrement: true });
};

function uploadTransaction() {
  // open a transaction on budget-tracker's db
  const transaction = db.transaction(["new-budget"], "readwrite");

  // access budget-tracker's object store
  const budgetObjectStore = transaction.objectStore("new-budget");

  // get all records from store and set to a variable
  const getAll = budgetObjectStore.getAll();

  getAll.onsuccess = function () {
    // if indexedDb's store contains data, send it
    if (getAll.result.length > 0) {
      fetch("/api/transaction", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((serverResponse) => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
          }
          // open new transaction
          const transaction = db.transaction(["new-budget"], "readwrite");
          // access new budget-tracker object store
          const budgetObjectStore = transaction.objectStore("new-budget");
          // clear all items in budgetObjectStore
          budgetObjectStore.clear();

          alert("All saved transactions have been successfully submitted!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
}

// upon a successful
request.onsuccess = function (event) {
  // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
  db = event.target.result;

  // check if app is online, if yes run uploadTransaction() function to send all local db data to api
  if (navigator.onLine) {
    // we haven't created this yet, but we will soon
    uploadTransaction();
  }
};

request.onerror = function (event) {
  // log error here
  console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit a new budget and there's no internet connection
function saveRecord(record) {
  // open a new transaction with the database with read and write permissions
  const transaction = db.transaction(["new-budget"], "readwrite");

  // access the object store for `new-budget`
  const budgetObjectStore = transaction.objectStore("new-budget");

  // add record to budget-tracker's store with add method
  budgetObjectStore.add(record);
}

window.addEventListener('online', uploadTransaction);
