import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../../core/services/tasks.service';
import { Tasks } from '../../core/interfaces/tasks';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NgbModule, ReactiveFormsModule,NgClass,NgStyle],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private readonly _ModalService: NgbModal,
    private readonly _FormBuilder: FormBuilder,
    private readonly _TasksService: TasksService
  ) { }

  taskForm!: FormGroup;

  userTasks: WritableSignal<Tasks[]> = signal([]);
  allTaskCount: WritableSignal<number> = signal(0);

  getAllUserTasks() {
    this._TasksService.getAllUserTasks().subscribe({
      next: (res) => {
        console.log(res);
        this.userTasks.set(res.data.tasks);
        this.allTaskCount.set(res.results);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openModal(content: any) {
    this._ModalService.open(content);
  }

  onSubmit(modal: any) {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      this._TasksService.createTask(taskData).subscribe({
        next: (res) => {
          console.log('Task created successfully:', res);
          this.getAllUserTasks();
          this.taskForm.reset();
          modal.close();
        },
        error: (err) => {
          console.log('Error creating task:', err);
        }
      });
    }
  }

  onMarkComplete(taskId: string) {
    this._TasksService.markComplete(taskId).subscribe({
      next: (res) => {
        console.log('Task marked as complete:', res);
        this.getAllUserTasks();
      },
      error: (err) => {
        console.log('Error marking task as complete:', err);
      }
    });
  }

  onDelete(taskId: string) {
    this._TasksService.deleteTask(taskId).subscribe({
      next: () => {
        console.log('Task deleted successfully');
        this.userTasks.set(this.userTasks().filter(task => task._id !== taskId));
        this.allTaskCount.set(this.userTasks.length);
      },
      error: (err) => {
        console.log('Error deleting task:', err);
      }
    });
  }

  ngOnInit(): void {
    this.getAllUserTasks();

    this.taskForm = this._FormBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      description: ['', [Validators.maxLength(150)]]
    });

  }

}
