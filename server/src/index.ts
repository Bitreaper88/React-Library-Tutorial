import express from "express";

const port = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


