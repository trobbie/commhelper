import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DefaultPipe } from './pipes/default.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PageNotFoundComponent,
    DefaultPipe
  ],
  exports: [
    CommonModule,
    PageNotFoundComponent,
    DefaultPipe
  ]
})
export class SharedModule { }
