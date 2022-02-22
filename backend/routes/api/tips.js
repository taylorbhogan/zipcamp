const router = require("express").Router();

const { Spot, User, Tip } = require("../../db/models");

const asyncHandler = require("express-async-handler");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const tips = await Tip.findAll({
      include: [User, Spot],
    });
    res.json(tips);
  })
);

router.post(
  "/",
  asyncHandler(async function (req, res) {
    const formData = req.body;
    const tip = await Tip.create(formData);
    const tipIJustCreated = await Tip.findByPk(tip.id, {
      include: [User, Spot],
    });
    res.json(tipIJustCreated);
  })
);

router.put(
  "/:id",
  asyncHandler(async function (req, res) {
    const id = req.body.id;
    delete req.body.id;
    await Tip.update(req.body, { where: { id } });
    const tip = await Tip.findByPk(id, {
      include: [User, Spot],
    });

    return res.json(tip);
  })
);

router.delete(
  "/:id",
  asyncHandler(async function (req, res) {
    const tipId = req.params.id;
    const tip = await Tip.findByPk(tipId);
    if (!tip) throw new Error("Cannot find tip");
    const deletedTip = await Tip.destroy({ where: { id: tipId } });

    res.json(deletedTip);
  })
);

module.exports = router;
