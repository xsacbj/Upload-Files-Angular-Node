import { Component, Input } from '@angular/core';

@Component({
  selector: 'file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent {
  @Input() files: any[] = []
  @Input() onDelete = () => {}
}
