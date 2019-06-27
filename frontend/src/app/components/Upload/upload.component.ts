import { Component, Input } from '@angular/core';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  files:File[] = []
  validDrag: Boolean;

  @Input() onUpload = (files: File[])=>{}

  onFilesChange(){

    this.onUpload([...this.files])

    this.files.length=0
  }

}
