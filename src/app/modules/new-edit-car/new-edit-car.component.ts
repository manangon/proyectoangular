import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../services/car-service.service';
import { Car } from '../../interfaces/car';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-edit-car',
  templateUrl: './new-edit-car.component.html',
  styleUrl: './new-edit-car.component.css'
})
export class NewEditCarComponent implements OnInit {

  formulario!: FormGroup;

  codigo!: string;
  car!: Car;
  title: string = 'Nuevo vehiculo';

  constructor(private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder, private carService: CarService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.codigo = params['codigo']; // Obtener el código del vehículo de la URL
      if (this.codigo && this.codigo !== '-1') {
        this.carService.getCarByCode(this.codigo).subscribe(resp => {
          this.car = resp;
          this.title = 'Ver/Editar vehiculo';
          this.onLoadCarData();
          this.formulario.controls['codigo'].disable();
        });
      } else {
        this.car = {
          id: 0,
          codigo: '',
          marca: '',
          modelo: '',
          foto: '',
          anio: new Date().getFullYear(),
          calificacion: 1,
          fecha_creacion: null,
          fecha_modificacion: null,
          usuario: '',
          usuario_mod: '',
          kilometraje: 0,
          precio: '',
        };
        this.onLoadCarData();
      }
    });
  }

  onLoadCarData() {
    this.formulario = this.formBuilder.group({
      codigo: [this.car.codigo, Validators.required],
      marca: [this.car.marca, Validators.required],
      modelo: [this.car.modelo, Validators.required],
      anio: [this.car.anio, Validators.required],
      kilometraje: [this.car.kilometraje, Validators.required],
      calificacion: [this.car.calificacion, Validators.required],
      precio: [this.car.precio, Validators.required],
    });
  }

  saveCar() {
    if (this.formulario.valid) {
      const carToSave: Car = {
        codigo: this.formulario.controls['codigo'].value,
        marca: this.formulario.controls['marca'].value,
        modelo: this.formulario.controls['modelo'].value,
        anio: this.formulario.controls['anio'].value,
        calificacion: this.formulario.controls['calificacion'].value,
        kilometraje: this.formulario.controls['kilometraje'].value,
        precio: this.formulario.controls['precio'].value,
        id: 0,
        foto: '',
        fecha_creacion: undefined,
        fecha_modificacion: undefined,
        usuario: '',
        usuario_mod: ''
      };
      if (this.codigo && this.codigo !== '-1') { // actualizar
        carToSave.usuario_mod = 'nancy vasquez';
        carToSave.fecha_modificacion = new Date();
        this.carService.updateCar(carToSave, this.codigo).subscribe((resp: any) => {
          swal.fire('Actualización', resp.mensaje, 'success');
          this.router.navigate(['/list-car']);
        }, err => {
          swal.fire('Actualización', err.error.mensaje, 'error');
        });
      } else { // nuevo
        carToSave.usuario = 'nancy vasquez';
        carToSave.fecha_creacion = new Date();
        this.carService.newCar(carToSave).subscribe((resp: any) => {
          swal.fire('Registro', resp.mensaje, 'success');
          this.router.navigate(['/list-car']);
        }, err => {
          swal.fire('Registro', err.error.mensaje, 'error');
        });
      }
    } else {
      swal.fire('Error', 'Revise los campos', 'error');
    }
  }

  returnList() {
    this.router.navigate(['/list-car']);
  }
}

