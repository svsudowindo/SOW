import { RequestEnums } from './../../../shared/constants/request-enums';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss'],
})
export class VendorListComponent {

  vendorsList = [];
  constructor(
    private router: Router,
    private commonRequestService: CommonRequestService) {
    }

  ionViewDidEnter() {
      this.getVendorList();
  }

  getVendorList() {
    this.commonRequestService.request(RequestEnums.GET_MANUFACTURERS).subscribe(res => {
      if (res.errors.length > 0) {
        // error
      } else {
        this.vendorsList = res.data;
      }
    });
  }
  addVendor() {
    this.router.navigate(['vendor-list', 'create'])
  }
}
