import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Course } from '../course.model';
import { CourseService } from '../course.service';
import { Student } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit, AfterViewInit, OnDestroy {
  courses: Course[];
  displayedColumns = ['name', 'rollNumber', 'course', 'courseSelect'];
  dataSource = new MatTableDataSource<Student>();
  private studentsSubscription: Subscription;
  courseSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private studentService: StudentService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.courseSubscription = this.courseService.coursesChanged.subscribe(
      (courses) => (this.courses = courses)
    );
    this.courseService.fetchAvailableCourses();
    this.studentsSubscription = this.studentService.studentsChanged.subscribe(
      (students: Student[]) => {
        this.dataSource.data = students;
      }
    );
    this.studentService.fetchStudents();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCourseSelect(form: NgForm, id: string) {
    let selectedCourse = form.value.course;
    this.studentService.selectCourse(selectedCourse, id);
  }

  ngOnDestroy() {
    this.studentsSubscription.unsubscribe();
  }
}
