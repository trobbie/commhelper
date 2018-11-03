import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DefaultPipe } from './pipes/default.pipe';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    PageNotFoundComponent,
    DefaultPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    AuthModule,
    PageNotFoundComponent,
    DefaultPipe
  ]
})
export class SharedModule { }
