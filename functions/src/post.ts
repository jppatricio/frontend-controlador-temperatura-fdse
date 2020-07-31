import * as functions from 'firebase-functions';
import * as firestore from '@google-cloud/firestore'

import { database } from './index';

exports.newTemp = functions.https.onRequest(async (request, res) => {

    try {

        let newTemp = {
            'temperatura' : Number,
            'timestamp' : firestore.Timestamp.now(),
        }
        
        newTemp.temperatura = request.body.temperatura

        await database.collection('temperaturas').add(newTemp);

        res.status(200).send("Correctly POSTED")
    } catch (error) {

        res.status(500).send("ERROR ON POSTING NEW TEMP >>> " + error)
    }

});

exports.newLimits = functions.https.onRequest(async (request, res) => {

    try {

        let newLimit = {
            'maximo' : Number,
            'minimo' : Number,
        }
        
        newLimit.maximo = request.body.maximo
        newLimit.minimo = request.body.minimo

        await database.collection('limites').doc("current").set(newLimit)

        res.status(200).send("Correctly POSTED")

    } catch (error) {

        res.status(500).send("ERROR ON POSTING NEW TEMP >>> " + error)
    }

});