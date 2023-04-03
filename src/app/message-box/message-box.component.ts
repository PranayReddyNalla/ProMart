import { Component,Inject } from '@angular/core';
import {  MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent {
  message: any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<MessageBoxComponent>) {
    if(data){
        this.message = data.message || this.message;
        
    }
}

onConfirmClick(): void {
    this.dialogRef.close(true);
}

}
