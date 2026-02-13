import Photo from "../models/Photo.js";
import path from "path";
import fs from "fs";

export async function getAllPhotos(req, res) {
  /* const photos = await Photo.find({}).sort("-dateCreated");
  res.render("index", {
    photos: photos,
  }); */

  const page = parseInt(req.query.page) || 1;
  const photosPerPage = 2;

  const totalPhotos = await Photo.find().countDocuments();
  const photos = await Photo.find({})
    .sort("-dateCreated")
    .skip((page - 1) * photosPerPage)
    .limit(photosPerPage);

  res.render("index", {
    photos: photos,
    current: page,
    pages: Math.ceil(totalPhotos / photosPerPage),
  });
}

export async function getPhoto(req, res) {
  const photo = await Photo.findById(req.params.id);
  res.render("photo", {
    photo,
  });
}

export async function createPhoto(req, res) {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).send("No file uploaded");
    }

    let uploadedImage = req.files.image;
    const __dirname = path.resolve();
    const uploadDir = path.join(__dirname, "public", "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, uploadedImage.name);

    uploadedImage.mv(uploadPath, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Upload failed");
      }

      await Photo.create({
        ...req.body,
        image: "/uploads/" + uploadedImage.name,
      });

      res.redirect("/");
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

export async function updatePhoto(req, res) {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
}

export async function deletePhoto(req, res) {
  const __dirname = path.resolve();
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = path.join(__dirname, "public", photo.image);
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndDelete(req.params.id);
  res.redirect("/");
}
