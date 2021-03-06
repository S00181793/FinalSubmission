import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  private userSub: Subscription;
  isAuthenticated = false;
  constructor(private dataStorage: DataStorageService,
              private authService: AuthService          
    ){

  }
  ngOnInit(){
    this.userSub = this.authService.user.subscribe(user =>{
      //this.isAuthenticated = !user ? false : true;
      this.isAuthenticated = !!user;  
      // console.log(!user);
      // console.log(!!user);
    });
  }

  onSaveData(){
    this.dataStorage.storeRecipes();
  }

  onFetchData(){
    this.dataStorage.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  //A lifecycle hook
  //A callback method that performs custom clean-up
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}

