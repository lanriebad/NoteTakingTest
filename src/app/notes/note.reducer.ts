import {Action, createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {Note} from './note.model';
import * as NoteActions from './note.actions';

export const notesFeatureKey = 'notes';

export interface NoteState extends EntityState<Note> {
  // additional entities state properties
  loaded: boolean;
}

export const adapter: EntityAdapter<Note> = createEntityAdapter<Note>({
  selectId: (note: any) => note.noteId
});

export const initialState: NoteState = adapter.getInitialState({
  // additional entity state properties
  loaded: false
});

export const reducer = createReducer(
  initialState,
  on(NoteActions.addNote,
    (state, action) => adapter.addOne(action.note, state)
  ),
  on(NoteActions.upsertNote,
    (state, action) => adapter.upsertOne(action.note, state)
  ),
  on(NoteActions.addNotes,
    (state, action) => {
      return adapter.addMany(action.notes, {...state, loaded: true})
    }
  ),
  on(NoteActions.upsertNotes,
    (state, action) => adapter.upsertMany(action.notes, state)
  ),
  on(NoteActions.updateNote,
    (state, action) => adapter.updateOne(action.note, state)
  ),
  on(NoteActions.updateNotes,
    (state, action) => adapter.updateMany(action.notes, state)
  ),
  on(NoteActions.deleteNote,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(NoteActions.deleteNotes,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(NoteActions.loadNotes,
    (state, action) => adapter.setAll(action.notes, state)
  ),
  on(NoteActions.clearNotes,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
