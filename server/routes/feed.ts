import { Router, Response, Request } from 'express';
import * as uuid from 'node-uuid';


var mongoose = require('mongoose');
//var Feed = require('./models/Feed.js')

var FeedSchema = mongoose.Schema({
  text: String,
  name: String
});

var Feed = mongoose.model('Feed', FeedSchema);

// Set up mongodb connection
mongoose.connect('mongodb://admin:admin123@localhost:27017/admin');
var db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));


db.once('open', function() {
  console.log('Connected to MongoDB ;)');

  feedRouter.post('/', (request: Request, response: Response) => {
  	console.log(request.body);
  	try {
  		var obj = new Feed(request.body)
  	} catch(err){
  		console.log(err)
  	}
  	
    obj.save((err, obj) => {
    if(err) 
		return console.log(err + " Something happened :(");
	else {
		console.log("Success inserting!");
		response.status(200).json(obj);
	  	
	  }

    })
	

	});

});


const feedRouter: Router = Router();



/*feedRouter.post('/', (request: Request, response: Response) => {

	response.json({
    id: uuid.v4(),
    text: request.body.text,
    name: request.body.name
  });
  

});*/

feedRouter.post('/:id/comment', (request: Request, response: Response) => {

  const feedID = request.params.id;

  response.json({
    id: feedID,
    comment: {
      id: uuid.v4(),
      text: request.body.text
    }
  });

});

feedRouter.delete('/:id', (request: Request, response: Response) => {

  response.json({
    id: request.params.id
  });

});

export { feedRouter }
