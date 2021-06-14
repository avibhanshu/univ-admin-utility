import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Course } from '../course.model';
import { CourseService } from '../course.service';
import { Observable, Subscription } from 'rxjs';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit, OnDestroy {
  courses: Course[];
  courseSubscription: Subscription;

  constructor(
    private courseService: CourseService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.courseSubscription = this.courseService.coursesChanged.subscribe(
      (courses) => (this.courses = courses)
    );
    this.courseService.fetchAvailableCourses();
  }

  onAddStudent(form: NgForm) {
    this.studentService.addStudent({
      name: form.value.studentName,
      rollNumber: form.value.rollNumber,
      course: form.value.course,
    });
  }

  ngOnDestroy() {
    this.courseSubscription.unsubscribe();
  }
}
