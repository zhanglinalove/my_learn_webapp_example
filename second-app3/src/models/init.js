import mongoose  from 'mongoose';
import config  from'../config';

const db = mongoose.connect(config.mongodbUrl,{});



