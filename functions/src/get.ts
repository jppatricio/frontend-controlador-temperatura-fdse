import * as functions from 'firebase-functions';

import { database } from './index';


exports.getLastTemp = functions.https.onRequest((req, res) => {

    const docRef = database.collection('temperaturas').orderBy("timestamp", 'desc').limit(1);
    docRef.get()
      .then(doc => {
        if (doc.empty) {
          console.log('No such document!');
          return res.status(404).send('Not Found')
        } 
          console.log('DOC FOUND! >>> ' + doc.docs[0].data);
          return res.send(doc.docs[0].data());
      })
      .catch(err => {
        console.log('Error getting document', err);
      });

});

exports.getArchivedTemps = functions.https.onRequest((request, res) => {
    const docRef = database.collection('temperaturas').orderBy("timestamp", 'desc').limit(25);
    docRef.get()
      .then(doc => {
        let response : any[] = []
        if (doc.empty) {
          console.log('No such documents!');
          return res.status(404).send('Not Found')
        } 
          doc.docs.forEach(element => {
            response.push(element.data())
          });
          console.log('DOCS FOUND! >>> ' + response);
          return res.status(200).send(response);
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

});

exports.getLimits = functions.https.onRequest((request, res) => {
    const docRef = database.collection('limites').doc("current");
    docRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
          return res.status(404).send('Not Found')
        } 
          console.log('DOC FOUND! >>> ' + doc.data);
          return res.send(doc.data());
      })
      .catch(err => {
        console.log('Error getting document', err);
      });

});