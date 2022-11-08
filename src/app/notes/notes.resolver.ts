import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Note} from "./note.model";
import {first, map, Observable, switchMap, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {NotesService} from "./notes.service";
import {selectNotes, selectNotesLoaded} from "./note.selectors";
import {addNotes} from "./note.actions";

@Injectable()
export class NotesResolver implements Resolve<Note[]> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Note[]> | Promise<Note[]> | Note[] {
    return this.store.select(selectNotesLoaded)
      .pipe(
        switchMap( isLoaded => isLoaded ? this.store.select(selectNotes) : this.notesService.fetchNotes()
          .pipe(tap(response => this.store.dispatch(addNotes({notes: response.responseData}))))),
        first()
      )
  }

  constructor(private store: Store,
              private notesService: NotesService) {
  }
}
