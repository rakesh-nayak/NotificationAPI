import express from 'express';
import gcmPush from './gcm-push';
import deviceToken from './user-device-token';
import products from './products';
import fs from 'fs';
import {getDeviceTokens} from '../helpers/user-store';

const router = express.Router();

router.get('/v1', function(req, res){ 
  return res.json({});
});

router.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

router.use ('/v1/push', gcmPush);
router.use('/v1/device', deviceToken);
router.use('/v1/promotions', products);

fs.watch(__dirname+'/data/promotions.json', wch(function(event, filename) { 
	getDeviceTokens();
}));

var blocked = {};

function wch(fn) {
  return function(event, path) {
    if(path in blocked) return;
    blocked[path] = true;
    setTimeout(function() { delete blocked[path] }, 25);
    fn(event, path);
  }
}
export default router;
