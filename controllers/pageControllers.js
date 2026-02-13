import Photo from "../models/Photo.js";

export async function getAboutPage(req, res) {
  res.render("about");
}

export async function getAddPage(req, res) {
  res.render("add");
}

export async function getEditPage(req, res) {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render("edit", {
    photo,
  });
}
