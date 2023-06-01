import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizeDirective } from './directives/capitalize.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  CapitalizeDirective

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    CapitalizeDirective,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
