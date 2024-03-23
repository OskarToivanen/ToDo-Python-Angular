import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { FrontapgeComponent } from './frontapge/frontapge.component';
import { TaskEditComponent } from './task-edit/task-edit.component';

export const routes: Routes = [
  { path: '', component: FrontapgeComponent, title: 'Welcome' },
  { path: 'tasks', component: TasksComponent, title: 'Task List' },
  { path: 'task-form', component: TaskFormComponent, title: 'Create task' },
  { path: 'edit-task/:id', component: TaskEditComponent },
];
