const router = require('express').Router();
const Articles = require('../db/schemas/articles');


//Запрос всех статей дохода/расхода
router.get('/', function(req, res, next)  {
  Articles.findAll()
    .then(article=>{
      if (article) {
        res.status(200).send({"status":"success", "article": article})
      } else {
        res.status(404).send({"status": "error", "message": "Operation not found"})
      }
    })
    .catch(err=>res.status(400).send({"status": "error", "message": err}))
})

module.exports = router;