import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { QuestionComponent } from './question/question.component';

//remember to add new pages components to routes
export const routes: Routes = [
  { path:'', component: HomePageComponent },
];
