import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car-service.service';
import { Car } from '../../interfaces/car';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list-car',
  templateUrl: './list-car.component.html',
  styleUrl: './list-car.component.css'
})
export class ListCarComponent implements OnInit {

  title = 'Lista de vehiculos';
  cars: Car[] = [];
  filteredCars: Car[] = []; // array para almacenar los vehiculos filtrados
  pageSize: number = 5; // Cantidad de elementos por página
  currentPage: number = 1; // Página actual
  totalPages: number = 1; // Total de páginas
  showPicture: boolean = false;
  textShowPicture: string = 'Mostrar imagen';
  filterText: string = '';

  constructor(private carService: CarService,
    private router: Router) { }

  ngOnInit() {
    this.findAllCars();
  }

  private findAllCars() {
    this.carService.getListCars().subscribe((resp) => {
      this.cars = resp;
      this.totalPages = Math.ceil(this.cars.length / this.pageSize);
      this.filteredCars = [...this.cars];
    }, err => {
      swal.fire('Listado', err.error.mensaje, 'error');
    });
  }

  // Método para navegar a la página siguiente
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Método para navegar a la página anterior
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Método para obtener los coches de la página actual
  getCurrentPageCars(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.filteredCars.length);
    return this.filteredCars.slice(startIndex, endIndex);
  }

  // mostrar las estrellas en lugar del numero
  starsArray(num: number): any[] {
    return Array(num).fill(0);
  }

  // Funcion para mostrar la imagen del vehiculo
  showPictureFn() {
    this.showPicture = !this.showPicture;
    this.textShowPicture = this.showPicture ? 'Ocultar imagen' : 'Mostrar imagen';
  }

  // Método para filtrar la lista de coches
  filterCars() {
    if (!this.filterText) {
      this.filteredCars = [...this.cars]; // Si no hay texto de filtro, mostrar todos los vehiculos
    } else {
      const searchText = this.filterText.toLowerCase();
      this.filteredCars = this.cars.filter(car =>
        car.codigo.toLowerCase().includes(searchText) ||
        car.marca.toLowerCase().includes(searchText) ||
        car.modelo.toLowerCase().includes(searchText)
      );
    }
    this.totalPages = Math.ceil(this.filteredCars.length / this.pageSize);
    this.currentPage = 1; // Reiniciar a la primera página después de aplicar el filtro
  }

  showDetail(car: Car) {
    this.router.navigate(['/new-edit-car', car.codigo]);
  }

  deleteDetail(car: Car) {
    this.carService.deleteCarByCode(car.codigo).subscribe((resp: any) => {
      this.findAllCars();
      swal.fire('Borrado', resp.mensaje, 'success');
    }, err => {
      swal.fire('Borrado', err.error.mensaje, 'error');
    });
  }

  newCar(): void {
    this.router.navigate(['/new-edit-car', '-1']);
  }
}