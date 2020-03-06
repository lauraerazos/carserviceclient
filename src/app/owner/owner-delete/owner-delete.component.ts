import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { OwnerService } from 'src/app/shared/owner/owner.service';
import { CarService } from 'src/app/shared/car/car.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  dni: number;
  profession: string;
}
/**
 * 
 * @title Table with selection
 */
@Component({
  selector: 'app-owner-delete',
  templateUrl: './owner-delete.component.html',
  styleUrls: ['./owner-delete.component.css']
})
export class OwnerDeleteComponent implements OnInit {
  
  owner: any = {};
  cars = [];
  owners: any = {}
  tabla = [];
  displayedColumns: string[]
  dataSource
  selection

  constructor(private route: ActivatedRoute,
    private router: Router,
    private ownerService: OwnerService,
    private carService: CarService) { }
  
  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {
      this.owners = data._embedded.owners;
      this.displayedColumns = ['select', 'name', 'profession', 'dni'];
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.owners);
      this.selection = new SelectionModel<PeriodicElement>(true, []);
    });
    this.getCars();
  }

  getCars() {
    this.carService.getAll()
      .subscribe(cars => {
        this.cars = cars;
      });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    
    if (!row) {
      document.getElementById('btn_delete').classList.add('disable');
      document.getElementById('btn_delete').classList.remove('available');
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    } else {
      if (this.selection.isSelected(row)) {
        
        document.getElementById('btn_delete').classList.remove('disable');
        document.getElementById('btn_delete').classList.add('available');
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
     }
    
  }

  gotoList() {
    this.router.navigate(['/owner-list']);
  }

  remove() {
    console.log(this.selection._selection);

    for (let owner of this.selection._selection) {
      let href = owner._links.self.href;
      console.log(href);

      const carsToDissasociate = this.cars.filter(car => car.ownerDni === owner.dni);
      console.log(carsToDissasociate, owner);

      this.ownerService.remove(href).subscribe(result => {
        this.carService.dissasociateCars(carsToDissasociate)
        .subscribe(res => {
        console.log('CARROS DESASOCIADOS');
        })
        this.gotoList();
      }, error => console.error(error));
      
    }
  }
}
