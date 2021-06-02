const router = require('express').Router();
const { Category } = require('../../../models/index');

router.get('/', async (req, res, next) => {
  let query = {};
  if (req.query.name) {
    var name = req.query.name; //获取查询条件
    query.name = new RegExp(name,"i"); // 查询条件 正则
  }
  const categories = await Category.find(query)
  res.json({
    categories
  });
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const categorys = await Category.findById(id);
    res.json({categorys});
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.json({code:"success",
message:"保存成功!"});
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndUpdate(id, req.body);
    res.json({code:"success",
message:"修改成功!"});
  } catch (err) {
    next(err);
  }
});


router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const delResult = await Category.findByIdAndDelete(id);
    res.json(delResult);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
