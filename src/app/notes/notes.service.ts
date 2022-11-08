import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class NotesService {
  constructor(private http: HttpClient,
              private toastr: ToastrService) {
  }

  fetchNotes(): Observable<any> {
    return this.http.get('/api/secure/all/notes');
  }

  postNote(payload: any): Observable<any> {
    return this.http.post('/api/secure/note', payload)
      .pipe( tap( (response: any) => {
        if (response.responseCode === '00') {
          this.toastr.success(response.responseMsg);
        } else {
          this.toastr.error(response.responseMsg || 'Operation Unsuccessful');
        }
      }));
  }

  editNote(payload: any): Observable<any> {
    return this.http.put('/api/secure/edit/note', payload)
      .pipe( tap( (response: any) => {
        if (response.responseCode === '00') {
          this.toastr.success(response.responseMsg);
        } else {
          this.toastr.error(response.responseMsg || 'Operation Unsuccessful');
        }
      }));
  }

  deleteNote(id: string | number) {
    return this.http.delete('/api/secure/delete/note/' + id)
      .pipe( tap( (response: any) => {
        if (response.responseCode === '00') {
          this.toastr.success(response.responseMsg);
        } else {
          this.toastr.error(response.responseMsg || 'Operation Unsuccessful');
        }
      }));
  }

  findNoteById(id: string): Observable<any> {
    return this.http.get('/api/secure/note/' + id);
  }

  findLabel(term: string): Observable<any> {
    return this.http.get('/api/secure/label/autocomplete', {params: new HttpParams().set('term', term)})
      .pipe(
        catchError(() => of([]))
      );
  }

  filterNotes(searchInfo: string): Observable<any> {
    return this.http.post('/api/secure/search', {searchInfo})
      .pipe(
        catchError(() => of([]))
      );
  }

  fetchAllLabels(): Observable<any> {
    return this.http.get('/api/secure/all/labels')
      .pipe(
        map( (res: any) => res?.responseData || []),
        catchError(() => of([]))
      );
  }
}
