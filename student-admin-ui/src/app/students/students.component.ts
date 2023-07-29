
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../models/ui-model.ts/student.model';
import { StudentService } from './../student.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students:Student[]=[];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email','mobile','gender','edit'];
  dataSource:MatTableDataSource<Student>=new  MatTableDataSource<Student>();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  filterString='';
    constructor(private StudentService:StudentService){}

  ngOnInit(): void {
    this.StudentService.getStudents().subscribe(
      (success)=>{
          this.students=success;
          this.dataSource= new  MatTableDataSource<Student>(this.students);
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort;
      },
      (err)=>{
        
      }
    )
  }
  filterStudents()
  {
    this.dataSource.filter=this.filterString.trim().toLocaleLowerCase();
  }
}
