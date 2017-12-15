import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BikeService {
  
  constructor(private _http: HttpClient) { }

  create(bike){
    return this._http.post(`/api/bikes/create`, bike);
  }

  list(){
    return this._http.get('/api/bikes/list');
  }

  update(bike){
    return this._http.put(`/api/bikes/id/${bike._id}`, bike);
  }

  remove(bike){
    return this._http.delete(`/api/bikes/id/${bike._id}`);
  }

  byName(name){
    return this._http.get(`/api/bikes/byName/${name}`);
  }

  byEmail(email){
    return this._http.get(`/api/bikes/byEmail/${email}`);
  }

}
