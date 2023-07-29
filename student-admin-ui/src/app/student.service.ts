import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './models/api-models.ts/student.model';
import { UpdateStudentRequest } from './models/api-models.ts/updateStudentRequest';
import { AddStudentRequest } from './models/api-models.ts/addStudentRequest';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUpiUrl='https://localhost:44331'

  constructor(private httpClient:HttpClient) { }


  getStudents(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.baseUpiUrl+'/Students');
  }
//tek öğrencinin verileri
  getStudent(studentId:string | null): Observable<Student>{
    return this.httpClient.get<Student>(this.baseUpiUrl+'/students/'+studentId);
  }

  updateStudent(studentId:string,studentRequest:Student): Observable<Student>{
    const updateStudentRequest:UpdateStudentRequest={
      firstName:studentRequest.firstName,
      lastName:studentRequest.lastName,
      dateOfBirth:studentRequest.dateOfBirth,
      email:studentRequest.email,
      mobile:studentRequest.mobile,
      genderId:studentRequest.genderId,
      physicalAdress:studentRequest.adress.physicalAdress,
      postalAdress:studentRequest.adress.postalAdress
    }
    return this.httpClient.put<Student>(this.baseUpiUrl+'/students/'+studentId,updateStudentRequest);
  }

  deleteStudent(studentId:string): Observable<Student>{
   
    return this.httpClient.delete<Student>(this.baseUpiUrl+'/students/'+studentId);
  }
  addStudent(studentRequest:Student): Observable<Student>{
    const addStudentRequest:AddStudentRequest={
      firstName:studentRequest.firstName,
      lastName:studentRequest.lastName,
      dateOfBirth:studentRequest.dateOfBirth,
      email:studentRequest.email,
      mobile:studentRequest.mobile,
      genderId:studentRequest.genderId,
      physicalAdress:studentRequest.adress.physicalAdress,
      postalAdress:studentRequest.adress.postalAdress
    }
    return this.httpClient.post<Student>(this.baseUpiUrl+'/students/add',addStudentRequest);
  }

  getImagePath(relativePath:string){
    return `${this.baseUpiUrl}/${relativePath}`;
  }


  uploadImage(studentId:string,file:File): Observable<any>{
    
    const formData=new FormData();
    formData.append("profileImage",file);

    return this.httpClient.post(this.baseUpiUrl+'/students/'+studentId+'/upload-image',formData,{
      responseType:'text' });
  }

}
