import  os from 'os';
import path from 'path';
import fs from 'fs';
import jsonfile from 'jsonfile';
import {pushNotification} from './push-notification';

export function save(body) {
   let filename = path.resolve(os.tmpDir(), 'user-store.json');
	console.log("User Store: " + filename);

	jsonfile.readFile(filename, function(err, data) {
		debugger;
		var data = data || [];
		var filteredData = data.filter(x=> x.email != body.email);

		filteredData.push({        
		    email:body.email,
		    deviceToken:body.token
		});
		fs.writeFileSync(filename, JSON.stringify(filteredData));
	});
}

export function getById(email) {
   let filename = path.resolve(os.tmpDir(), 'user-store.json');
	jsonfile.readFile(filename, function(err, data) {
		var data = data || [];
		var filteredData = data.filter(x=> x.email === email);
		return filteredData[0];
	});
}

export function getDeviceTokens() {
   let filename = path.resolve(os.tmpDir(), 'user-store.json');
	jsonfile.readFile(filename, function(err, data) {
		var data = data || [];
		let tokens =[];
		if(data.length > 0){
			data.map(item=>{
				tokens.push(item.deviceToken);
			});
		}
		if(tokens.length > 0){
			pushNotification(tokens);
		}
	});
}