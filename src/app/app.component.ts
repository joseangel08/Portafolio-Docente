import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  verificador=false;
  constructor() {

  }

  ngOnInit(){
    var user=localStorage.getItem("currentPeriodo");
    if(user!=null){
      this.verificador=true;
    }
  }
}