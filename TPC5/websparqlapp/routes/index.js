var express = require('express');
var router = express.Router();
var axios = require('axios');
var bodyParser = require('body-parser');

const middlewares = [bodyParser.urlencoded()]
var queries = []
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(queries[0].output[0].p)
  axios.get('http://localhost:7200/repositories')
    .then(r => {
      res.render('index', {repos:r.data.results.bindings, lst:queries})
    })
    .catch(err => res.render('error', {error:err}))
});
router.post('/querydb', (req,res,next)=>{
  const {db,queryInput} = req.body
  if(db === 'undefined') res.redirect('/')
  var encoded=encodeURIComponent(queryInput)
  //fazer a query
  axios.get('http://localhost:7200/repositories/'+db+'?query='+encoded)
    .then(response =>{
      var queryRes = {
        db,
        queryInput,
        output:response.data.results.bindings 
      }
      queries.push(queryRes)
      res.redirect('/');
    })
    .catch(err => res.render('error', {error:err}))
})

module.exports = router;
