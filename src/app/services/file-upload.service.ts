import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {GlobalVariable} from 'src/app/common/globalVariable';
import { AlertService } from './alert.service';
import { RestApiService } from './rest-api.service';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

constructor(private rest: RestApiService,private message:AlertService) { }
  upload(file:File,folder:string):Observable<any>{
    const formData:FormData = new FormData();
    formData.append('file',file);
    return this.rest.post(GlobalVariable.baseUrl+'rest/upload/'+folder,formData);
  }

}
