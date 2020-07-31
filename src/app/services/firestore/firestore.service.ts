import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore
  ) {}

  //POSTS
  public newLimits(data: {maximo: number, minimo: number}) {
    return this.firestore.collection('limites').doc("current").set(data);
  }

  //GETS
  public getTemperaturas() {
    return this.firestore.collection('temperaturas', ref => ref.orderBy('timestamp')).snapshotChanges();
  }
  public getLimits() {
    return this.firestore.collection('limites').doc("current").snapshotChanges();
  }
}