import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink,Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ToDo-List';
  constructor(private router:Router){
    
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    this.router.navigate(['/login']);
  }
  loginName(){
    return localStorage.getItem('login');
  }
}
