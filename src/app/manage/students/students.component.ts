import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class StudentsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'rollNumber', 'course'];
  dataSource = new MatTableDataSource<Student>();
  studentSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    console.log(this.studentService.getStudents());
    // console.log(this.dataSource.data);
    this.studentSubscription = this.studentService.studentAdded
    .subscribe(
      (student: Student) => {
        if (student) {
          this.dataSource.data = this.studentService.getStudents();
        }
        }
      );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
