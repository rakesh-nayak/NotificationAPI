import express from 'express';
import { clone } from 'lodash';
import {save, getById} from '../helpers/user-store';

const router = express.Router();

router.post('/', (req, res, next) => {
	save(req.body);
	return res.status(200).end();
});

export default router;
