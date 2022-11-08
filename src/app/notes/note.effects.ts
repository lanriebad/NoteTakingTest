import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {addNote, createNote, deleteNote, initDeleteNote, initUpdateNote, updateNote} from "./note.actions";
import {exhaustMap, map, tap} from "rxjs";
import {NotesService} from "./notes.service";
import {Router} from "@angular/router";

@Injectable()
export class NoteEffects {
  addNote$ = createEffect( () => {
    return this.actions$.pipe(
      ofType(createNote),
      exhaustMap(action => this.notesService.postNote(action.note)),
      map(response => addNote({note: {
        ...response?.responseData?.[0]?.notes?.[0],
          noteId: response?.responseData?.[0]?.notes?.[0]?.id
        }})),
      tap( () => window.location.href = 'http://localhost:4200/notes ')
    )
  });

  deleteNote$ = createEffect(() => {
    let id: string;
    return this.actions$.pipe(
      ofType(initDeleteNote),
      tap( action => id = action.id as string),
      exhaustMap(action => this.notesService.deleteNote(action.id)),
      map( (response: any) => deleteNote({id}))
    )
  });

  updateNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initUpdateNote),
      exhaustMap(action => this.notesService.editNote(action.note)),
      map( (response: any) => updateNote({note: {changes: {...response?.responseData?.[0], noteId: response?.responseData?.[0].id}, id: response?.responseData?.[0].id}})),
      tap( () => window.location.href = 'http://localhost:4200/notes ')
    );
  })

  constructor(private actions$: Actions,
              private router: Router,
              private notesService: NotesService) {}
}
