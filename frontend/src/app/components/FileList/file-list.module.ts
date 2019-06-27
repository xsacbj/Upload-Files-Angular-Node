import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { NgCircleProgressModule } from 'ng-circle-progress'
import { MatIconModule } from '@angular/material/icon';
import {TooltipModule} from 'ng2-tooltip-directive';

import { FileListComponent } from './file-list.component'

@NgModule({
  declarations: [
    FileListComponent
  ],
  imports: [
    BrowserModule,
    NgCircleProgressModule.forRoot({
      radius: 10,
      outerStrokeWidth: 4,
      outerStrokeColor: "#7159c1",
      innerStrokeColor: "#00000000",
      animation: false,
      showTitle: false,
      showSubtitle: false,
      showUnits: false,
      showBackground: false
    }),
    MatIconModule,
    TooltipModule
  ],
  exports: [FileListComponent],
  providers: []
})
export class FileListModule { }
