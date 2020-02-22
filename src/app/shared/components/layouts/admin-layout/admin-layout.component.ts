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
  public appPages = [
    {
      title: 'Register',
      url: '/register-by-super-admin',
      icon: 'home'
    },
    {
      title: 'Register',
      url: '/register-by-super-admin',
      icon: 'home'
    },
    {
      title: 'Vendors',
      url: '/vendor-list',
      icon: 'home'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'log-out'
    }
  ];
  constructor(private router: Router) {
    this.router.events.pipe(
      filter(e => e instanceof RouterEvent)
    ).subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.title = this.router.routerState.root.firstChild.firstChild.snapshot.data.title;
      }
    });
  }

  ngOnInit() {
  }

}
