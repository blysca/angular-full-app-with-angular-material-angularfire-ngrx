import {Injectable} from '@angular/core';
import {Exercise} from './exercise.model';
import {Subject, Subscription} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {UiService} from '../shared/ui.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private uiService: UiService
  ) {
  }

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map(docArray => {
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data()['name'],
                calories: doc.payload.doc.data()['calories'],
                duration: doc.payload.doc.data()['duration']
              };
            });
          }),
          delay(1000),
        ).subscribe(
        (exercises: Exercise[]) => {
          this.uiService.loadingStateChanged.next(false);
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);
        },
        error => {
          this.uiService.loadingStateChanged.next(false);
          this.snackBar.open(error.message, null, {
            duration: 3000
          });
        }
      )
    );
  }

  startExercise(selectedId: string) {
    // this.db.doc('availableExercises/'+ selectedId).update({lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  fetchCompletedOrCancelledExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe(
          (exercises: Exercise[]) => {
            this.uiService.loadingStateChanged.next(false);
            this.finishedExercisesChanged.next(exercises);
          },
          error => {
            this.uiService.loadingStateChanged.next(false);
            this.snackBar.open(error.message, null, {
              duration: 3000
            });
          }
        )
    );
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db
      .collection('finishedExercises')
      .add(exercise);
  }
}
