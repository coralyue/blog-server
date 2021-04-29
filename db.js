const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/blog-server", {
    useNewUrlParser: true
  })
  .then(res => {
    //console.log(res);
    console.log("数据库连接成功了！");
  })
  .catch(err => {
    console.log(err);
  });
