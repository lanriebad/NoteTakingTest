import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable, tap} from "rxjs";
import {Note} from "../note.model";
import {selectNotes} from "../note.selectors";
import {initDeleteNote} from "../note.actions";
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {NotesService} from "../notes.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  notes: Observable<Note[]> = this.store.select(selectNotes);
  labels: Observable<any[]> = this.noteService.fetchAllLabels();

  constructor(private store: Store,
              private noteService: NotesService) { }

  ngOnInit(): void {
  }

  onDeleteNote(id: string | number) {
    this.store.dispatch(initDeleteNote({id}));
  }

  onFilterNote(term: string) {
    if (term) {
      this.notes = this.noteService.filterNotes(term);
    } else {
      this.notes = this.store.select(selectNotes);
    }
  }
}
