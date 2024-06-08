import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";

@Component({
    selector: 'add-edit-book',
    standalone: true,
    templateUrl: './add-edit-book.component.html',
    styleUrl: './add-edit-book.component.css',
    imports: [MatDialogModule,
        MatButtonModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule],
})

export class AddEditBookComponent implements OnInit {

    bookForm!: FormGroup;
    title: any;
    file: any;
    imageSrc!: string | ArrayBuffer | null;

    constructor(
        public dialogRef: MatDialogRef<AddEditBookComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        public formBuilder: FormBuilder) { }

    /**
     * Creating the form with Title, publish date, Publish Link and Image.
     * Based on the action code from the parent component data Dialog will populated.
     */
    ngOnInit(): void {
        this.title = this.data.action;
        this.bookForm = this.formBuilder.group({
            'title': [null, [Validators.required]],
            'publishDate': [null, [Validators.required]],
            'purchaseLink': [null, [Validators.required, Validators.pattern('(https?://)?([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})(:[0-9]+)?(/.*)?')]],
            'image': [null, Validators.required]
        });
        if (this.title == 'Edit') {
            this.bookForm.controls['title'].setValue(this.data.authorData.title);
            this.bookForm.controls['publishDate'].setValue(this.data.authorData.PublishDate);
            this.bookForm.controls['purchaseLink'].setValue(this.data.authorData.purchaseLink);
            this.imageSrc = this.data.authorData.imageUrl;
            this.bookForm.patchValue({ image: this.data.authorData.imageUrl });
        }
    }

    /**
     * Getting the choosed image from the user and converting into the image source to display into the UI
     * @event 
     */

    uploadImage(event: any) {
        this.file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;
        reader.readAsDataURL(this.file);
    }

    /**
     * constructing the author data sending back to parent component while dialog close.
     * Showing Toast message at bottom after the action completed
     */
    saveAuthor() {
        var authorData = {
            data: {
                'title': this.bookForm.get('title')?.value,
                'PublishDate': this.bookForm.get('publishDate')?.value,
                'purchaseLink': this.bookForm.get('purchaseLink')?.value,
                'imageUrl': this.imageSrc,
            },
            index: this.data.idx
        }
        this.dialogRef.close(authorData);
        this.snackBar.open(this.data.action === 'Edit' ? "Book Updated Successfully" : "Book Added Successfully", "Ok", { 'duration': 2000 });
    }
}