import gcm from 'node-gcm';
 
export function pushNotification(tokens){

    var retry_times = 4; //the number of times to retry sending the message if it fails

    var sender = new gcm.Sender('AIzaSyD34Nr8J086H638zaP3to3AszAq8s0DNSQ'); //create a new sender
    var message = new gcm.Message(); //create a new message
    message.collapseKey = 'testing'; //grouping messages
    message.delayWhileIdle = true; //delay sending while receiving device is offline
    message.timeToLive = 3; //the number of seconds to keep the message on the server if the device is offline

    sender.send(message, tokens, retry_times, function(err, response){
      if(err) {
        console.error(err);
      } else {
       	console.log(response);
      }
    });
}