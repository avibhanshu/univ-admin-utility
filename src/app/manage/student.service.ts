import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { Student } from './student.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course } from './course.model';
import { map } from 'rxjs/operators';

@Injectable()
export class StudentService {
  private students: Student[] = [];
  studentAdded = new Subject<Student>();
  studentsChanged = new Subject<Student[]>();

  constructor(private db: AngularFirestore) {}

  addStudent(student: Student) {
    this.addStudentsToDatabase({
      ...student,
      date: new Date(),
    });
    this.studentAdded.next(student);
  }

  fetchStudents() {
    this.db
      .collection('students')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              name: (doc.payload.doc.data() as any).name,
              rollNumber: (doc.payload.doc.data() as any).rollNumber,
              date: (doc.payload.doc.data() as any).date,
              course: (doc.payload.doc.data() as any).course,
            };
          });
        })
      )
      .subscribe((students: Student[]) => {
        this.students = students;
        this.studentsChanged.next([...this.students]);
      });
  }

  selectCourse(selectedCourse: Course, id: string) {
    this.db.doc('students/' + id).update({ course: selectedCourse });
    this.db
      .collection('students')
      .valueChanges()
      .subscribe((students: Student[]) => {
        this.studentsChanged.next([...this.students]);
      });
  }

  private addStudentsToDatabase(student: Student) {
    this.db.collection('students').add(student);
  }
}
