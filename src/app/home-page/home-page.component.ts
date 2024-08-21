import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterOutlet, RouterModule, QuestionComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
