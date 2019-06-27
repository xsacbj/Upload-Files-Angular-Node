import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UploadModule } from './components/Upload/upload.module';
import { FileListModule } from './components/FileList/file-list.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UploadModule,
    FileListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
