import express from "express";
import path from "path";

const app = express();

/* Middlewares */
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(import.meta.dirname, "temp/index.html"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
