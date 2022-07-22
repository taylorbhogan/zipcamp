const express = require("express");
const asyncHandler = require("express-async-handler");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");
const { SpotImage, Spot, User, Area, State } = require("../../db/models");
const router = express.Router();

router.post(
  "/spots",
  singleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    const imgUrl = await singlePublicFileUpload(req.file);
    const spotImage = await SpotImage.create({
      spotId: req.body.spotId,
      imgUrl,
    });
    const spot = await Spot.findByPk(req.params.id, {
      include: [User, Area, State, SpotImage],
    });
    return res.json({ spot });
  })
);

router.delete(
  "/spots/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const { spotId } = await SpotImage.findByPk(req.params.id);

    await SpotImage.destroy({ where: { id } });
    const spot = await Spot.findByPk(spotId, {
      include: [User, Area, State, SpotImage],
    });

    return res.json({ spot });
  })
);

module.exports = router;
