import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, OnInit , AfterViewInit,inject, Injectable, Inject} from '@angular/core'
import axios from 'axios';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
@Injectable()
export class QuestionComponent implements OnInit, AfterViewInit{
  isPlaying:boolean = false;
  private audio?: HTMLAudioElement;
  private slider?: HTMLInputElement;
  // SPOTIFYENDPOINT = '';
  // SPOTIFYTOKEN = process.env["SPOTIFYTOKEN"];
  constructor(@Inject(DOCUMENT)private document: Document){

  }

  ngOnInit(): void {
    // Initialize elements
    this.audio = this.document.getElementById('musicPlayer') as HTMLAudioElement;
    this.slider = this.document.getElementById('progress') as HTMLInputElement;
    this.audio.volume = 0.4 //set default volume to 40%
    // Set initial max value if elements are found
    if (this.audio && this.slider) {
      this.slider.max = this.audio.duration.toString();
    }
  }
  ngAfterViewInit(): void {
    const audio = this.document.getElementById('musicPlayer') as HTMLAudioElement;
    const slider = this.document.getElementById('progress') as HTMLInputElement;

    if (audio && slider) {
      audio.addEventListener('loadedmetadata', () => {
        if (audio.duration && !isNaN(audio.duration)) {
          slider.max = audio.duration.toString();  // Set the max value of the slider to the audio duration
        }
      });

      audio.addEventListener('timeupdate', () => {
        if (audio.currentTime && !isNaN(audio.currentTime)) {
          slider.value = audio.currentTime.toString();  // Update the slider position as the audio plays
        }
      });

      slider.addEventListener('input', (event: Event) => {
        this.onSliderChange(event);
      });
    }
  }
  checkAnswer(event: MouseEvent){
    const element = <HTMLElement>event.target;
    console.log("clicked");
    element.style.backgroundColor = "#3fa93d";

  }

  playSound(){
    let audio = <HTMLAudioElement>document.getElementById("musicPlayer")
    if(audio.paused){
      audio.play()
      this.isPlaying = true;
    }
    else{
      audio.pause();
      this.isPlaying = false;
    }

  }

  onSliderChange(event: Event) {
    const audio = <HTMLAudioElement>document.getElementById("musicPlayer");
    const slider = <HTMLInputElement>event.target;

    if (audio) {
      audio.currentTime = parseFloat(slider.value);  // Set the audio's current time based on the slider's value
    }

  }

  // async getSongs() {
  //   try{
  //     const response = await axios.get(this.SPOTIFYENDPOINT, {params:{
  //       'key':this.SPOTIFYTOKEN
  //     }})
  //   }
  //   catch(error){
  //     console.log(error);
  //   }
  // }

}
