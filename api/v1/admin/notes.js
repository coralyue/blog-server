const router = require('express').Router();
const Article = require('../../../models/index').Article;

router.get('/', async (req, res, next) => {
  let query = {};
  if (req.query.category) {
    query.p = req.query.category;
  }
  const Articles = await Article.find(query)
    .populate('p')
    .exec(function (err, doc) {
      res.json({
        Articles: doc,
      });
    });
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const Articles = await Article.findById(id);
    res.json({ Articles });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const articles = new Article({
      title: req.body.title,
      content: req.body.content,
      desc: req.body.desc,
      p: req.body.p,
    });
    console.log(req.body);
    await articles.save();
    res.json({
      code: 'success',
      message: '发布文章成功',
    });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateResult = await Article.findByIdAndUpdate(id, req.body);
    res.json(updateResult);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const delResult = await Article.findByIdAndDelete(id);
    res.json(delResult);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
