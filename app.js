import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import methodOverride from "method-override";
import * as photoController from "./controllers/photoControllers.js";
import * as pageController from "./controllers/pageControllers.js";
const app = express();

/* Connect DB */

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/pcat-test-db");
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Error", err);
  }
}

connectDB();

/* Template Engine */
app.set("view engine", "ejs");

/* Middlewares */
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  }),
);

/* Routes */
app.get("/", photoController.getAllPhotos);
app.get("/photos/:id", photoController.getPhoto);
app.post("/photos", photoController.createPhoto);
app.put("/photos/:id", photoController.updatePhoto);
app.delete("/photos/:id", photoController.deletePhoto);

app.get("/about", pageController.getAboutPage);
app.get("/add", pageController.getAddPage);
app.get("/photos/edit/:id", pageController.getEditPage);

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
