const Category = require('../models/category');

module.exports.createCategory =  (req, res, next) => {


  const args = [req.body.description ,req.body.idcategory, req.body.categorytype ];

  console.log("va a crear una category" + args);
  Category.create(args)
  .then(() => res.status(200).json({ valid: true, message: 'Category created!' }))
  .catch((e) => res.status(400).json({ valid: false, message: e }));
}

module.exports.getCategory = (req, res, next) => {
  const args = [parseInt(req.params.id, 10)];
  Category.findById(args)
  .then(({rows}) => {
    res.status(200).json({ valid: true, data: rows })
  })
  .catch((e) => res.status(400).json({ valid: false, message: e }));
}

module.exports.getCategories = (req, res, next) => {
  
  console.log("Entrando a obtener cateogrias");
  Category.fetchAll()
  .then(({rows}) => {
    res.status(200).json({ valid: true, data: rows })
  })
  .catch((e) => res.status(400).json({ valid: false, message: e }));
}