import { Subject } from 'rxjs';
import { Course } from './course.model';

export class CourseService {
  CourseChanged = new Subject<Course>();
  private availableCourses: Course[] = [
    { id: 'DD', name: 'Digital Design' },
    { id: 'CO', name: 'Computer Organization' },
    { id: 'DBMS', name: 'Database Management System' },
    { id: 'OS', name: 'Operating Systems' },
  ];

  private courses: Course[] = [];

  getAvailableCourses() {
    return this.availableCourses.slice();
  }
}
