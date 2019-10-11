import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {StopTrainingComponent} from './stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;
  
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.timer = setInterval( () => {
      this.progress += 5;
      console.log('*** progress ', this.progress);
      if (this.progress >= 100) {
          clearInterval(this.timer);
      }
    }, 1000);
  }
  
  onStop() {
    clearInterval(this.timer);
    this.dialog.open(StopTrainingComponent);
  }
}
