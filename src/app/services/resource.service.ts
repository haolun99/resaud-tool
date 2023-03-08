import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private _http:HttpClient) { }

  addResource(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/resources', data);
  }

  updateResource(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/resources/${id}`, data);
  }

  getResourceList(): Observable<any> {
    return this._http.get('http://localhost:3000/resources');
  }

  deleteResource(id: number) : Observable<any> {
    return this._http.delete(`http://localhost:3000/resources/${id}`);
  }
}
