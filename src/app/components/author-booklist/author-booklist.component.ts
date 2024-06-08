import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SortPipe } from '../../pipes/sort.pipe';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEditBookComponent } from '../../fragment/add-edit-book/add-edit-book.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AlertPopupComponent } from '../alert-popup/alert-popup.component';
import { SpinnerService } from '../spinner/spinner.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


type Sorting = "asc" | "desc";

@Component({
  selector: 'app-author-booklist',
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    SortPipe,
    MatDialogModule,
    MatToolbarModule,
    MatSnackBarModule
  ],
  templateUrl: './author-booklist.component.html',
  styleUrl: './author-booklist.component.css',
})
export class AuthorBooklistComponent implements OnInit, OnDestroy {

  onDestory$: Subject<boolean> = new Subject();
  authorData: any;
  authorDataBookLists!: any;
  sortOption: any = 'title';
  sortOrder: Sorting = 'asc';

  constructor(private httpService: HttpService, public dialog: MatDialog, private snackBar: MatSnackBar, public spinner: SpinnerService) { }

  /**
   * Inital API call from backend 
   */
  ngOnInit(): void {
    this.spinner.show();
    this.httpService.getBooks()
      .pipe(takeUntil(this.onDestory$))
      .subscribe({
        next: (authorResponse: any) => {
          this.authorData = authorResponse.data;
          this.authorDataBookLists = authorResponse.data.books;
          this.spinner.hide();
        },
        error: (err: HttpErrorResponse) => {
          this.dialogOpen(err.error.message, "", false, true);
          this.spinner.hide();
        }
      })
  }

  /**
   * Add Books Functionality
   */
  addBook() {
    const dialogRef = this.dialog.open(AddEditBookComponent, {
      data: { action: 'Add' },
      panelClass: "dialog-responsive"
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authorDataBookLists = this.authorDataBookLists.concat([result.data]);
      }
    });
  }

  /**
   * Edit Books Functionality
   *  @data : any = User seleted author data
   *  @id : any
   */
  editBook(data: any, index: any) {
    const dialogRef = this.dialog.open(AddEditBookComponent, {
      data: { authorData: data, idx: index, action: 'Edit' },
      panelClass: "dialog-responsive"
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updatedData = this.authorDataBookLists.map((x: any, index: any) => (index === result.index ? { ...result.data } : x));
        this.authorDataBookLists = updatedData;
      }
    });
  }

  /**
   * Delete Books Functionality
   *  @data : any = User seleted author data
   */

  deleteBook(data: any) {
    this.dialogOpen(`Do you want to delete ${data.title} book?`, data, true, true);
  }

  /**
   * trackBy Functionality
   *  @item : any
   */

  trackByFn(item: any) {
    return item.title;
  }

  /**
   * Open the Purchase URL in another tab
   *  @url : string
   */

  openURL(url: string) {
    window.open(url, '_blank');
  }

   /**
   *  Open Common Dialog Window for Http Error Response and Delete functionality
   *  @message : string = constructed message passed to dialog window 
   *  @value : any = Pass value to process any operation
   *  @ok : boolean = Need to show OK button in dialog window 
   *  @cancel : boolean = Need to show Cancel button in dialog window 
   */

  dialogOpen(message: string, value: any, ok: boolean, cancel: boolean) {
    const dialogRef = this.dialog.open(AlertPopupComponent, {
      data: { title: "Alert", message: message, showOk: ok, showCancel: cancel },
      panelClass: "dialog-responsive"
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authorDataBookLists = this.authorDataBookLists.filter((author: any) => author.title !== value.title);
        this.snackBar.open("Book Deleted Successfully", "Ok", { 'duration': 2000 });
      }
    });
  }

  /**
   * Unsubscribe HTTP call 
   */

  ngOnDestroy(): void {
    this.onDestory$.next(true);
    this.onDestory$.unsubscribe();
  }
}
