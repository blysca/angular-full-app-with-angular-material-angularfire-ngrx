import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {UiService} from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exerciseSubscription: Subscription;
  private exercises: Exercise[];

  private isLoading = false;
  private loadingSubs: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService
  ) {
  }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe( isloadingState => this.isLoading = isloadingState)
    this.exerciseSubscription = this.trainingService.exercisesChanged
      .subscribe(exercises => this.exercises = exercises);
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
    this.exerciseSubscription.unsubscribe();
  }
}
