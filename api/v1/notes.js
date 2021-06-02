const router = require("express").Router();
const { Article } = require("../../models");

router.get("/", async (req, res, next) => {
  let query = {};
  if (req.query.category) {
    query.p = new RegExp(req.query.category, "i");
  }

  const Articles = await Article.find(query)
    .populate('p')
    .exec(function (err, doc) {
      res.json({
        Articles: doc,
      });
    });
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const model = await Article.findById(id)
    res.json({model});
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
