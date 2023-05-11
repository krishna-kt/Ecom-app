const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, catg) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found...",
      });
    }
    // catg = short form of category
    req.category = catg;
    next();
  });

};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save category...",
      });
    }
    res.json( {category });
  });
};

exports.getCategory = (req, res)=>{
    return res.json(req.category);
};

exports.getAllCategory = (req, res)=>{
    Category.find().exec((err, categories)=>{
        if (err) {
            return res.status(400).json({
              error: "No Categories Found...",
            });
          }
          res.json(categories);
    })
};

exports.updateCategory = (req, res)=>{
    const category = req.category;
    category.name = req.body.name;

    console.log(category.name);

    category.save((err, updatedCategory)=>{
        if (err) {
          //console.log(err)
            return res.status(400).json({
              error: "failed to Update Category...",
            });
          }
          res.json(updatedCategory);
    });
};

exports.removeCategory = (req, res)=>{
    const category = req.category;

    category.remove((err, deletedcategory)=>{
        if (err) {
            return res.status(400).json({
              error: "failed to Delete Category...",
            });
          }
          res.json({
              message: "Successfully deleted...",
              deletedcategory
          });
    })
};