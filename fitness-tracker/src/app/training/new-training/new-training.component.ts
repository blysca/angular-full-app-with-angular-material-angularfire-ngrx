import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {UiService} from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exerciseSubscription: Subscription;
  exercises: Exercise[];

  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<fromRoot.State>
  ) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    this.exerciseSubscription = this.trainingService.exercisesChanged
      .subscribe(exercises => {
        this.exercises = exercises;
        console.log('*** exercises ', exercises);
      });

    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
