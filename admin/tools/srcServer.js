import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

const port = process.env.PORT || 5001;
const board = process.env.BOARD || '';
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});
app.get('/health',function(req,res){
   return res.send("Ok");
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`listerning on :${port}`);
    //open(`http://localhost:${port}/display/${board}`);
  }
});


