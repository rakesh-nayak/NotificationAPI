import express from 'express';
import { clone } from 'lodash';

import gcm from 'node-gcm';

const router = express.Router();

router.get('/', function(req, res){

    var device_tokens = []; //create array for storing device tokens
    var retry_times = 4; //the number of times to retry sending the message if it fails

    var sender = new gcm.Sender('AIzaSyD34Nr8J086H638zaP3to3AszAq8s0DNSQ'); //create a new sender
    var message = new gcm.Message(); //create a new message

    message.collapseKey = 'testing'; //grouping messages
    message.delayWhileIdle = true; //delay sending while receiving device is offline
    message.timeToLive = 3; //the number of seconds to keep the message on the server if the device is offline
    var device_token=req.query.q;
    device_tokens.push(device_token);

    sender.send(message, device_tokens, retry_times, function(err, response){
      if(err) {
        console.error(err);
      } else {
        console.log(response);
      }
    });

    res.send('ok');
});

export default router;
