import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './globals';

@Injectable()
export class UserService {
    public url: string;
    public identity: string;
    public token: string;
    constructor(
        public _http: HttpClient
    ) {
        this.url = global.url;
        this.identity = '';
        this.token = '';
    }

    test() {
        return 'hola service';
    }

    register(user: any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        console.log(params);

        return this._http.post(this.url + 'registro', params, { headers: headers });
    }

    sigup(user: any, gettoken: any = null): Observable<any> {
        if (gettoken != null) {
            user.gettoken = 'true';
        }

        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'login', params, { headers: headers });
    }

    update(token:string, user:any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization',token);
        return this._http.put(this.url + 'user/update', params, { headers: headers });
    }

    getIdentity() {
        let identity: any = localStorage.getItem('identity');
        identity = JSON.parse(identity);

        if (identity && identity != 'undefined') {
            this.identity = identity;
        } else {
            this.identity = '';
        }
        return this.identity;
    }
    getToken() {
        let token: any = localStorage.getItem('token'); 

        if (token && token != 'undefined') {
            this.token = token;
        } else {
            this.token = '';
        }
        return this.token;
    }

    // login(user: any): Observable<any> {
    //     let json = JSON.stringify(user);
    //     let params = 'json=' + json;
    //     let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //     console.log(params);

    //     return this._http.post(this.url + 'registro', params, { headers: headers });
    // }

}