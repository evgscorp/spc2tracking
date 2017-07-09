import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MdButtonModule, MdCheckboxModule,MdIconModule} from '@angular/material';

@NgModule({
  imports: [CommonModule, MdButtonModule, MdCheckboxModule,MdIconModule],
  exports: [MdButtonModule, MdCheckboxModule,MdIconModule],
  declarations: []
})
export class MaterialModule { }
