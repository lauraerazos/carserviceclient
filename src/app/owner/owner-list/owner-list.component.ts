import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../shared/owner/owner.service';
import { GiphyService } from '../../shared/giphy/giphy.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  constructor(private ownerService: OwnerService, private giphyService: GiphyService) { }
    owners : Array<any>

  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {
      this.owners = data._embedded.owners;
    });
  }

}
