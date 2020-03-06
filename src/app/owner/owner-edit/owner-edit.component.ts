import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { OwnerService } from 'src/app/shared/owner/owner.service';
import { CarService } from 'src/app/shared/car/car.service';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit, OnDestroy {

  owner: any = {};
  cars = [];
  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private carService: CarService,
              private ownerService: OwnerService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['dni'];
      if (id) {
        this.ownerService.get(id).subscribe((owner: any) => {
          if (owner) {
            this.getCars();
            this.owner = owner._embedded.owners[0];
            console.log(this.owner);
            this.owner.href = owner._embedded.owners[0]._links.self.href;
          } else {
            console.log(`Owner with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/owner-list']);
  }

  getCars() {
    this.carService.getAll()
      .subscribe(cars => {
        this.cars = cars;
      });
  }

  save(form: NgForm) {
    this.ownerService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    console.log('CARS', this.cars);
    
    const carsToDissasociate = this.cars.filter(car => car.ownerDni === this.owner.dni);
    console.log(carsToDissasociate, this.owner);
    
    this.ownerService.remove(href).subscribe(result => {
      this.carService.dissasociateCars(carsToDissasociate)
        .subscribe(res => {
        console.log('CARROS DESASOCIADOS');
      })
      this.gotoList();
     }, error => console.error(error));
  }

}
