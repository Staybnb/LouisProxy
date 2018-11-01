const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const CORS = require('cors');
const bodyparser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));

//app.use(morgan('dev'));
app.use(bodyparser.json());

app.use (CORS())
app.all('/listing', function(req, res, next) {

  res.header('Access-Control-Allow-Origin', '*');
  next();

});


//David Requests
//<----------------------------------------------------->
app.get('/listingdata', (req, res) => {
  let requestId = req.query.id;
  requestId = requestId.slice(-3) * 1;
  axios.get(`http://3.16.89.66/listingdata?id=${requestId}`)
  .then((results) => res.send(results.data))
  .catch((err) => console.error(err));
})

app.get('/neighborhooddata', (req, res) => {
  let requestId = req.query.id;
  requestId = requestId.slice(-3) * 1;
  axios.get(`http://3.16.89.66/neighborhooddata?id=${requestId}`)
  .then((results) => res.send(results.data))
  .catch((err) => console.error(err));
})

app.get('/landmarkdata', (req, res) => {
  let lat = req.query.listingLat;
  let long = req.query.listingLong;
  axios.get(`http://3.16.89.66/landmarkdata?listingLat=${lat}&listingLong=${long}`)
  .then((results) => res.send(results.data))
  .catch((err) => console.error(err));
})
//<----------------------------------------------------->





app.get('/*', (req, res)=>{
  console.log('test',__dirname + '/public/index.html')
	res.sendFile(path.join(__dirname + '/public/index.html'))
})



app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});














// app.get('/listing/*', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/index.html'));
// });



// app.get('/listing*', (req, res) => {
//   let id = req.params.id
//   let dbquery= req.url.slice(-7) * 1;
//   //console.log(`axios get http://localhost:4000/listing/id${dbquery}`)
//   axios.get(`http://localhost:4000/listing/id${dbquery}`)
//   //axios.get(`http://localhost:4000/listing/id${dbquery}`)
//     .then((results) => {
//       //console.log(results.data, 'data')
//       res.send(results.data);
//       //res.status(200).send(dataObj);

//     })
//     .catch((err) => {
//       console.log(err);
//       res.send();
//     });
// });

