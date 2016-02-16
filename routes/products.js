import express from 'express';
import { clone } from 'lodash';
import fs from 'fs';
import jsonfile from 'jsonfile';

const router = express.Router();

router.get('/', (req, res) => {
	debugger;
	let filename = __dirname+'/data/promotions.json';
	jsonfile.readFile(filename, function(err, data) {
		var data = data || [];
		if(data.length > 0){
			let promotion = data[data.length-1];
			return res.send({promotion});
		}
		else{
			return res.send({});
		}
	});
	
});

export default router;
