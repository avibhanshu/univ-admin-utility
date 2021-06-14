import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Student } from './student.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class StudentService {
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
    .valueChanges()
    .subscribe((students: Student[]) => {
      this.studentsChanged.next(students);
    });
  }

  private addStudentsToDatabase(student: Student) {
    this.db.collection('students').add(student);
  }
}
