import { Subject } from 'rxjs';
import { Student } from './student.model';

export class StudentService {
  studentAdded = new Subject<Student>();
  private students: Student[] = [];

  addStudent(student: Student) {
    this.students.push({
      ...student,
      date: new Date(),
    });
    this.studentAdded.next(student);
  }
  
  getStudents() {
    return this.students.slice();
  }
}
