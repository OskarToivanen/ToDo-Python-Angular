import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      completed: new FormControl(false),
    });
  }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];

    this.taskForm = this.fb.group({
      id: [null],
      title: [''],
      description: [''],
      completed: [false],
    });

    if (this.id) {
      this.taskService.getTaskById(this.id).subscribe((task) => {
        this.taskForm.patchValue(task);
      });
    }
  }

  onSubmit() {
    if (this.taskForm.valid && this.id !== undefined) {
      this.taskService
        .updateTask(this.id, this.taskForm.value)
        .subscribe(() => {
          this.router.navigate(['/tasks']);
        });
    }
  }
}
