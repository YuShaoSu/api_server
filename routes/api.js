var express = require('express');
var router = express.Router();

var mysql = require('mysql')
var dbconfig = require('../db/config')
var sql = require('../db/sql')
var cs_pool = mysql.createPool(dbconfig.csunion)
//var oldexam_pool = mysql.createPool(dbconfig.oldexam)

router.get('/students',function(req,res,next){
  cs_pool.getConnection(function(err,connection){
      connection.query(sql.getStudent,function(err,result){
        res.json(result)
        connection.release()
      })
    }
  )
})


router.post('/pay',function(req,res,next){
  cs_pool.getConnection(function(err,connection){
      console.log(req.body)
      connection.query(sql.payFee,[req.body.id],function(err,result){
        if(err){
          res.json({success:false})
        }
        else{
          res.json({id:req.body.id,success:(result.changedRows === 1)})
        }
        connection.release()
      })
    }
  )
})

// router.get('/course',function(req,res,next){
//   oldexam_pool.getConnection(function(err,connection){
//       connection.query(sql.getCourse,function(err,result){
//         res.json(result)
//         connection.release()
//       })
//     }
//   )
// })

// router.get('/exam',function(req,res,next){
//   oldexam_pool.getConnection(function(err,connection){
//     var param = req.query || req.params
//     connection.query(sql.getList,[param.id],function(err,result){
//         res.json(result)
//         connection.release()
//       })
//     }
//   )
// })

module.exports = router;
