import { Component } from '@angular/core';
import { TokenStorageService } from './token/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'presta-front';
  private roles!: string[];
  private authority!: string;
  isLogin = false;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLogin = true;
      this.roles = [];
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(rol => {
        if (rol === 'ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
  }
}

}