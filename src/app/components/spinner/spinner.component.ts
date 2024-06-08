import { CommonModule } from "@angular/common";
import { Component, Injectable } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { BehaviorSubject } from "rxjs";

/** Spinner Component Implementation */

@Component({
    selector: 'spinner',
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule],
    template: `
        <div *ngIf="spinner.isLoadingStatus | async" class="loading-indicator">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;display:block;" width="150px" height="150px" viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke="#7d55ff" stroke-width="5" r="25"
                    stroke-dasharray="84.82300164692441 30.274333882308138">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.9900990099009901s"
                        values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                </circle>
            </svg>
        </div>
    `
})

export class SpinnerComponent {
    
    constructor(public spinner: SpinnerService){}

}


/** Spinner Service Implementation */

@Injectable({ providedIn: 'root' })

export class SpinnerService {

    private isLoading = new BehaviorSubject<boolean>(false);
    public isLoadingStatus = this.isLoading.asObservable();
  

    show(){
       this.isLoading.next(true);
    }

    hide(){
        this.isLoading.next(false);
    }

}