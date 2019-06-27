import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ngfModule } from "angular-file"

import { UploadComponent } from './upload.component';

@NgModule({
  declarations: [
    UploadComponent
  ],
  imports: [
    BrowserModule,
    ngfModule
  ],
  exports: [UploadComponent],
  providers: []
})
export class UploadModule { }
