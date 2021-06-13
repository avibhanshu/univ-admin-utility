import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentService } from './student.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  isVisible = false;
  studentSubscription: Subscription;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    // this.studentSubscription = this.studentService.studentAdded.subscribe(
    //   student => {
    //     if (student) {
    //       this.isVisible = true;
    //       this.isVisible = false;
    //     } else {
    //       this.isVisible = false;
    //     }
    //   }
    // );
  }

}
