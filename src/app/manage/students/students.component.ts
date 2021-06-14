import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Student } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['name', 'rollNumber', 'course'];
  dataSource = new MatTableDataSource<Student>();
  private studentsSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
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

  ngOnDestroy() {
    this.studentsSubscription.unsubscribe();
  }
}
