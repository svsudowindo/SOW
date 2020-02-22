import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss'],
})
export class VendorListComponent implements OnInit {

  vendorsList = [];
  constructor(private router: Router) { }

  ngOnInit() {}

  addVendor() {
    this.router.navigate(['vendor-list', 'create'])
  }
}
