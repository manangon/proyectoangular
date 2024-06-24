import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client-service';
import { Client } from '../../interfaces/client';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit{

  title: string = 'Registro de clientes';
  formulario!: FormGroup;
  hasContact: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private clientService: ClientService) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      usuario: ['', Validators.required],
      fecha_creacion: ['', Validators.required],
    });
  }

  saveClient() {
    const clientToSave: Client = {
      id: null,
      nombre: this.formulario.controls['nombre'].value,
      apellido: this.formulario.controls['apellido'].value,
      telefono: this.formulario.controls['telefono'].value,
      email: this.formulario.controls['email'].value,
      fecha_creacion: new Date(),
      fecha_modificacion: null,
      usuario: 'nancy vasquez',
      usuario_mod: null,
      password: this.formulario.controls['password'].value,
    };
    if (!this.hasContact) {
      clientToSave.email = null;
      clientToSave.telefono = null;
    }
    this.clientService.newClient(clientToSave).subscribe((resp: any) => {
      swal.fire('Registro', resp.mensaje, 'success');
      this.router.navigate(['/init']);
    }, err => {
      swal.fire('Registro', err.error.mensaje, 'error');
    });
  }

  returnInit() {
    this.router.navigate(['/init']);
  }

  showContact(event: any) {
    console.log(event.srcElement.checked);
    this.hasContact = event.srcElement.checked;
  }

}
