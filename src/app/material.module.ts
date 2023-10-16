import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],

  exports:[
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule    
  ]
})
export class MaterialModule { }
