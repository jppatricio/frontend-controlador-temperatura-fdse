import * as get from './get';
import * as post from './post';

import * as admin from 'firebase-admin';

// var config = {
//     apiKey: 'AIzaSyCvA9HG6p7DQw1iE0WIgdQ4gmCEHtoQIP4',
//     authDomain: 'proyecto-fdse.firebaseapp.com',
//     databaseURL: 'https://proyecto-fdse.firebaseio.com',
//     projectId: 'proyecto-fdse'
//   };

// admin.initializeApp(config);
admin.initializeApp();

export const database = admin.firestore();

exports.readers = get;
exports.writers = post;