import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';
import bodyParser from 'body-parser';
/*eslint-disable no-console */

const port =  process.env.PORT || 5003;
const board = process.env.BOARD || '';
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


app.use(compression());
app.use(express.static('dist'));

app.get('/health',function(req,res){
   return res.send("Ok");
});
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('server running on port : '+ port)
    open(`http://localhost:${port}/display/${board}`);
  }
});
