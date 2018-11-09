const router = require('express').Router();
const Operations = require('../db/schemas/operations');
const Sequelize = require('sequelize');
const axios = require('axios');
const moment = require('moment');
const Op = Sequelize.Op;


//Запрос всех операций
router.get('/startdate/:start/enddate/:end', function(req, res, next)  {
  // Operations.findAll({
  //   order: [
  //     ['createdAt','DESC']
  //   ], 
  //   where: {
  //     createdAt: {
  //       [Op.gte]: moment.unix(req.params.start).format("YYYY-MM-DD 00:00:00"),
  //       [Op.lte]: moment.unix(req.params.end).format("YYYY-MM-DD 23:59:59")
  //     }
  //   }
  // })
  //   .then(operation=>{
  //     if (operation) {
  //       res.status(200).send({"status":"success", "operation": operation})
  //     } else {
  //       res.status(404).send({"status": "error", "message": "Operation not found"})
  //     }
  //   })
  //   .catch(err=>res.status(400).send({"status": "error", "message": err}))

  function getSelectedOperations () {
    return Operations.findAll({
            order: [
              ['createdAt','ASC']
            ], 
            where: {
              createdAt: {
                [Op.gte]: moment.unix(req.params.start).format("YYYY-MM-DD 00:00:00"),
                [Op.lte]: moment.unix(req.params.end).format("YYYY-MM-DD 23:59:59")
              }
            }
          })
  }

  function getRestOperations () {
    return Operations.findAll({
            order: [
              ['createdAt','DESC']
            ], 
            where: {
              createdAt: {
                [Op.lt]: moment.unix(req.params.start).format("YYYY-MM-DD 00:00:00")
              }
            }
          })
  }

  axios.all([getSelectedOperations(), getRestOperations()])
    .then(axios.spread(function(selected, rest) {
      let totalStart = 0; 
      let totalEnd = 0;
      let totalDay = 0;
      if (rest) {
        totalStart = rest.reduce((acc, item) => acc + item.total, 0)
        totalDay = selected.reduce((acc, item) => acc+ item.total, 0)
        totalEnd = totalStart + totalDay;
      } 
      if (selected) {
        res.status(200).send({"status":"success", "operation": selected, "totalStart": totalStart, "totalDay": totalDay, "totalEnd": totalEnd})
      } else {
        res.status(404).send({"status": "error", "message": "Operation not found"})
      }
    }))

})

//запрос одной операции по id
router.get('/id/:id', function(req, res, next) {
  Operations.findById(req.params.id)
  .then(operation=>{
    if (operation) {
      res.status(200).send({"status":"success", "operation": operation})
    } else {
      res.status(404).send({"status": "error", "message": "Operation not found"})
    }
  })
  .catch(err=>res.status(400).send({"status": "error", "message": err}))
})

//Добавление новой операции
router.post('/', function(req, res, next) {
  let error = {
    error: ""
  };
  let validateRow = [
    "type",
    "typeId",
    "name",
    "nameId",
    "comment",
    "operatorName",
    "operatorId",
    "total",
    "bonus"
  ];
  let objRow = [];
  // добавляем в массив названия всех полей из пришедшего объекта
  for (let el in req.body) {
    objRow.push(el);
  }
  for (let el of validateRow) {
    if (objRow.indexOf(el) === -1) {
      error.error += `'${el}' is missing `;
    }
  }
  if (error.error !== "") {
    res.status(400).send({ status: "error", error: error });
  } else {
    Operations.create(req.body)
    .then(operation=>{
      if (operation) {
        res.status(200).send({"status":"success", "operation": operation})
      } else {
        res.status(404).send({"status": "error", "message": "Operation not created"})
      }
    })
    .catch(err=>res.status(400).send({"status": "error", "message": err}))
  }  
})

//изменение данных по операции
router.put('/id/:id', function(req,res,next){
  Operations.findById(req.params.id)
    .then((result)=>{
      if (result) {
        result.update(req.body)
        .then(updateProd=>res.status(200).send({"status":"success", "operation": updateProd}))
        .catch(err=>res.status(400).send({"status": "error", "message": err}))
      } else {
        res.status(404).send({"status": "error", "message": "Operation not found"})
      }
    })
})

//Удаление операции
router.delete('/id/:id', function(req,res,next){
  Operations.destroy({
    where: {
      'id': req.params.id
    }
  })
    .then(operation=>{
      if (operation > 0) {
        res.status(200).send({"status":"success", "message": `Operation #${req.params.id} deleted!`})
      } else {
        res.status(404).send({"status":"error", "message": `Operation not found`})
      }
    })
    .catch(err=>res.status(400).send({"status": "error", "message": err}))
})


module.exports = router;