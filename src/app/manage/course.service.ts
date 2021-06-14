import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Course } from './course.model';
import { map } from 'rxjs/operators';

@Injectable()
export class CourseService {
  coursesChanged = new Subject<Course[]>();
  private availableCourses: Course[] = [];

  constructor(private db: AngularFirestore) {}

  fetchAvailableCourses() {
    this.db
      .collection('courses')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              name: (doc.payload.doc.data() as any).name,
              code: (doc.payload.doc.data() as any).code,
            };
          });
        })
      )
      .subscribe((courses: Course[]) => {
        this.availableCourses = courses;
        this.coursesChanged.next([...this.availableCourses]);
      });
  }
}
