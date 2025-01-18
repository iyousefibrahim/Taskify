import { Component, inject, OnInit } from '@angular/core';
import { TasksService } from '../../core/services/tasks.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly _TasksService = inject(TasksService);

  getAllUserTasks() {
    
    
    this._TasksService.getAllUserTasks().subscribe({
      next: (res) => {
        console.log(res);

      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this.getAllUserTasks();
  }
}
