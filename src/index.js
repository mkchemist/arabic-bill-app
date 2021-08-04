import React from "react"
import ReactDOM from "react-dom"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.rtl.min.css"
import "./scss/app.scss";
import App from "./App"

/* let db = window.db("./app.db")
db.exec("CREATE TABLE IF NOT EXISTS clients(client TEXT)")

try {
    db.exec(`CREATE TABLE IF NOT EXISTS bills(
        client_id INTEGER NOT NULL,
        bill_date DATE NOT NULL,
        product TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        comment TEXT
        
    );`);
}catch(e) {
    console.log(e)
} */

//db.exec("INSERT INTO clients VALUES('Test')")





ReactDOM.render(<App />, document.getElementById("app"))