const User = require("../models/User");
const Media = require("../models/Media");

exports.uploadImage = async (req, res) => {
  const { title } = req.body;

  const media = await Media.create({
    title,
    type: "image",
    fileUrl: req.file.path
  });

  res.json({ message: "Image uploaded", media });
};

exports.uploadVideo = async (req, res) => {
  const { title } = req.body;

  const media = await Media.create({
    title,
    type: "video",
    fileUrl: req.file.path
  });

  res.json({ message: "Video uploaded", media });
};

exports.updateUserImage = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.profileImage = req.file.path;
  await user.save();

  res.json({ message: "User image updated", user });
};

exports.deleteMedia = async (req, res) => {
  const { id } = req.params;

  await Media.findByIdAndDelete(id);

  res.json({ message: "Media deleted" });
};
