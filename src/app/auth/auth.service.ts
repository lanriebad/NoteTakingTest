import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, pluck} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('/api/auth/login', {username, password});
  }

  register(email: string, username: string, password: string, name: string, surname: string): Observable<any> {
    return this.http.post('/api/auth/register', {email, password, username, name, surname, roleId: '1'})
  }

  getRefreshToken(refreshToken: string): Observable<any> {
    return this.http.post('/api/auth/refresh', {refreshToken})
      .pipe(
        pluck('responseData'),
        map((responseData: any) => ({
          accessToken: responseData?.[0]?.accessToken,
          refreshToken: responseData?.[0]?.refreshToken
        })));
  }
}
