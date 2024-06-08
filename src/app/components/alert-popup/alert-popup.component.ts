import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'alert-popup',
    standalone: true,
    templateUrl: './alert-popup.component.html',
    styleUrl: './alert-popup.component.css',
    imports: [CommonModule, MatDialogModule, MatButtonModule]
})

export class AlertPopupComponent {
    constructor(public dialogRef: MatDialogRef<AlertPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}