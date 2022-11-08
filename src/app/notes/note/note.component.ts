import { Component, OnInit } from '@angular/core';
import {FormGroup, UntypedFormBuilder, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {createNote, initUpdateNote} from "../note.actions";
import {ActivatedRoute, Route} from "@angular/router";
import {Note} from "../note.model";
import {selectNote} from "../note.selectors";
import {selectEntities, selectIds} from "../note.reducer";
import {Dictionary} from "@ngrx/entity";
import {NotesService} from "../notes.service";
import {debounceTime, distinctUntilChanged, exhaustMap, map, Observable, OperatorFunction, tap} from "rxjs";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  noteForm!: FormGroup;
  id: string | number | undefined = undefined;
  note!: Note;
  label: string = '';
  formatter = (terms: any) => terms.label;

  constructor(private fb: UntypedFormBuilder,
              private store: Store,
              private notesService: NotesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const noteId = this.route.snapshot.params['id'];
    if (noteId) {
      this.id = noteId;
      this.notesService.findNoteById(this.id as string)
        .subscribe({
          next: response => {
            this.note = response.responseData[0];
            this.noteForm.patchValue({
              title: this.note.title,
              content: this.note.content,
            });
            this.noteForm.removeControl('label');
            this.noteForm.updateValueAndValidity();
          }
        })

    }
    this.noteForm = this.fb.group({
      title: [this.note?.title || null, [Validators.required]],
      content: [this.note?.content || null, [Validators.required]],
      label: [this.note?.label || null, [Validators.required]]
    });
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      exhaustMap((term) => this.notesService.findLabel(term) )
    );

  onAddNewNote() {
    const noteForm = this.noteForm.value;
    if (!this.id) {
      const note: any = {
        name: noteForm.label?.label || noteForm.label,
        notes: [
          {
            id: this.id,
            title: noteForm.title,
            content: noteForm.content
          }
        ]
      };
      this.store.dispatch(createNote({note}));
    } else {
      const updatedNote: any = {
        id: this.id,
        noteId: this.id,
        title: noteForm.title,
        label: this.note?.label,
        content: noteForm.content,
      }
      this.store.dispatch(initUpdateNote({note: updatedNote}))
    }
  }
}
