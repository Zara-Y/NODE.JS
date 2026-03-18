import app from "./index.mjs"
// import db from "./config/db.mjs"



const PORT=process.env.PORT || 3000;

// db.connection
// .once("open", () => console.log("Connected to DB"))
// .on("Error", (err) => console.log("Error connecting to DB ==>" , err));

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});