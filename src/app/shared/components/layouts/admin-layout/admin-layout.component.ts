import { LocalStorageEnums } from './../../../constants/localstorage-enums';
import { StorageService } from './../../../services/common/storage.service';
import { ROLES } from './../../../constants/app-properties';
import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  title = '';
  ROLES_ENUM = ROLES;
  logginRole: any;
  constructor(
    private router: Router,
    private storageService: StorageService) {
    this.router.events.pipe(
      filter(e => e instanceof RouterEvent)
    ).subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.title = this.router.routerState.root.firstChild.firstChild.snapshot.data.title;
      }
    });
    this.logginRole = this.storageService.getLocalStorageItem(LocalStorageEnums.ROLE_NAME);
    console.log(this.logginRole);
  }

  ngOnInit() {
  }

}
