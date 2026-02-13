/* import mongoose from "mongoose";
const Schema = mongoose.Schema;

// connect db
mongoose.connect("mongodb://127.0.0.1:27017/pcat-test-db");

// create schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model("Photo", PhotoSchema);

// create a Photo

Photo.create({
  title: "Photo Title 1",
  description: "Photo description 1 lorem ipsum",
});
 */

import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
  },
  { timestamps: true },
);

const Photo = mongoose.model("Photo", PhotoSchema);

/* async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/pcat-test-db");
    console.log("✅ MongoDB connected");

    const photo = await Photo.create({
      title: "Photo Title 2",
      description: "Photo description 2 lorem ipsum",
    });

    console.log("✅ Created:", photo);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Connection closed");
  }
}

main(); */

/* Update Photo */

/* async function updateData() {
  const id = "698c5b43515be6792cf8e561";

  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/pcat-test-db");
    console.log("✅ MongoDB connected");
    const updatedPhoto = await Photo.findByIdAndUpdate(
      id,
      {
        title: "Photo Title 1 updated",
        description: "Photo description 1 lorem ipsum updated",
      },
      { returnDocument: "after" },
    );

    console.log("Updated Photo:", updatedPhoto);
  } catch (err) {
    console.error("Error:", err);
  }
}

updateData(); */

/* Delete Photo */

async function deleteData() {
  const id = "698c5b43515be6792cf8e561";

  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/pcat-test-db");
    console.log("✅ MongoDB connected");
    const deletedPhoto = await Photo.findByIdAndDelete(id);

    console.log("Deleted Photo:", deletedPhoto);
  } catch (err) {
    console.error("Error:", err);
  }
}

deleteData();
