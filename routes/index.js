var express = require('express');
var router = express.Router();
var runAPI =require('../exports/rmp-api')

// Here is a submit where students can search and itll come up
router.post('/submit', async function (req, res) {
  console.log(req.body.teacherSearch);
  const findTeach = req.body.teacherSearch;
  const rate = await runAPI(res, req, findTeach);
  console.log(rate.review)
  res.render('index', { title: 'Searched', name: rate.name, rating: rate.rating, review: rate.review });

})


/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    res.render('index', { title: 'Express' });
  }
  catch (e) {
    console.log(e, e.message)
  }
});


module.exports = router;
