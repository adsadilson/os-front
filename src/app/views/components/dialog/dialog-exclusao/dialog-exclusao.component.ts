import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  id: string;
  nome: string;
}

@Component({
  selector: 'app-dialog-exclusao',
  templateUrl: './dialog-exclusao.component.html',
  styleUrls: ['./dialog-exclusao.component.css']
})
export class DialogExclusaoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogExclusaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,){ }

  ngOnInit(): void {
    
  }


  onCancel(): void {
    this.dialogRef.close();
  }

}
