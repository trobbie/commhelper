import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultPipe } from './pipes/default.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DefaultPipe
  ],
  exports: [
    CommonModule,
    DefaultPipe
  ]
})
export class SharedModule { }
