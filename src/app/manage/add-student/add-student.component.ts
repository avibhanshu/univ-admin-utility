import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Course } from '../course.model';
import { CourseService } from '../course.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService, private studentService: StudentService) { }

  ngOnInit(): void {
    this.courses = this.courseService.getAvailableCourses();
  }

  onAddStudent(form: NgForm) {
    console.log(form.value);
    this.studentService.addStudent({
      name: form.value.studentName,
      rollNumber: form.value.rollNumber,
      course: form.value.course
    });
  }
}
