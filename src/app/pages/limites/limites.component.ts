import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import alert from 'sweetalert2'
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-limites',
  templateUrl: './limites.component.html',
  styleUrls: ['./limites.component.scss']
})
export class LimitesComponent implements OnInit {

  limitesForm: FormGroup

  coldLimit = 0
  hotLimit = 20

  constructor(private firestoreService: FirestoreService) {
    this.limitesForm = new FormGroup({
      maximo: new FormControl(0),

      minimo: new FormControl(0),
    })

    this.firestoreService.getLimits().subscribe((limitsSnap) => {
      this.hotLimit = limitsSnap.payload.data()['maximo']
      this.coldLimit = limitsSnap.payload.data()['minimo']
    });
  }

  ngOnInit(): void {
  }

  //

  toast = alert.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', alert.stopTimer)
      toast.addEventListener('mouseleave', alert.resumeTimer)
    }
  })

  cambiarLimites() {
    if (this.limitesForm.controls.maximo.value != null && this.limitesForm.controls.maximo.value != null) {
      if (this.limitesForm.controls.maximo.value > this.limitesForm.controls.minimo.value) {
        this.toast.fire({
          icon: 'success',
          title: 'Se ha solicitado el cambio de límites'
        })

        this.firestoreService.newLimits(this.limitesForm.value).then((res) => {
          alert.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'Se han actualizado los límites'
          })
        }).catch((err) => {
          alert.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se han actualizado los límites',
            footer: '>>> ' + err
          })
        });
      }
      else{
        this.toast.fire({
          icon: 'error',
          title: 'El límite máximo tiene que ser mayor al mínimo'
        })
      }
    }
    else{
      this.toast.fire({
        icon: 'error',
        title: 'Ingrese valores para los límites'
      })
    }
  }




}
