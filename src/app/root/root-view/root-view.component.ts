import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { TAB_NAV } from 'src/app/types/const';

@Component({
  selector: 'app-root-view',
  templateUrl: './root-view.component.html',
  styleUrls: ['./root-view.component.scss']
})
export class RootViewComponent implements OnInit, OnChanges {

  tabs = TAB_NAV;
  activeLink = this.tabs[0].link;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.activeLink = this.router.url;
  }

  ngOnChanges() {
    this.activeLink = this.router.url;
  }

  logout() {
    this.auth.logout().subscribe(rs => {
      this.router.navigate(['/login']);
    }, () => {});
  }
}
