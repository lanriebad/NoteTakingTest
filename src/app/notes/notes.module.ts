import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NotesComponent} from './notes/notes.component';
import {NoteComponent} from './note/note.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {NoteEffects} from './note.effects';
import * as fromNote from './note.reducer';
import {AuthGuard} from "../auth/auth.guard";
import {NotesResolver} from "./notes.resolver";
import {NotesService} from "./notes.service";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

const noteRoutes: Routes = [
  {
    path: '', component: NotesComponent, resolve: {
      notes: NotesResolver
    },
    canActivate: [AuthGuard]
  },
  {path: 'new', component: NoteComponent, canActivate: [AuthGuard]},
  {path: 'edit/:id', component: NoteComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    NotesComponent,
    NoteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(noteRoutes),
    EffectsModule.forFeature([NoteEffects]),
    StoreModule.forFeature(fromNote.notesFeatureKey, fromNote.reducer),
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    NotesService,
    NotesResolver
  ]
})
export class NotesModule {
}
