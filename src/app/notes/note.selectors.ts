import { createFeatureSelector, createSelector } from '@ngrx/store';
import {notesFeatureKey, NoteState, selectAll, selectEntities} from "./note.reducer";

export const noteSelector = createFeatureSelector<NoteState>(notesFeatureKey);

export const selectNotesLoaded = createSelector(noteSelector, state => state.loaded );

export const selectNotes = createSelector(noteSelector, selectAll);

export const selectNote = (id: string) =>
  createSelector(
    noteSelector,
    selectEntities,
    (entities, props ) => entities.entities[id]);
