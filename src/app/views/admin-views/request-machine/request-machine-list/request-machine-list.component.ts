import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { LoaderService } from './../../../../shared/services/common/loader/loader.service';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-machine-list',
  templateUrl: './request-machine-list.component.html',
  styleUrls: ['./request-machine-list.component.scss'],
})
export class RequestMachineListComponent implements OnInit {

  requestList = [];
  constructor(
    private commonRequestService: CommonRequestService,
    private loaderService: LoaderService
  ) {
    this.getRequestedMachines();
  }

  ngOnInit() {}

  private getRequestedMachines() {
    this.loaderService.showLoader();
    this.commonRequestService.request(RequestEnums.GET_MACHINE_REQUEST).subscribe(res => {
      console.log(res);
      this.loaderService.dissmissLoading();
      if (res.errors.length > 0) {
        // error
      }
      this.requestList = res.data;
    });
  }
}
