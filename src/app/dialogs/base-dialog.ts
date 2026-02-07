import { MatDialogRef } from "@angular/material/dialog";

export class BaseDialog<DialogComponent> {
    
    constructor(private dialogRef: MatDialogRef<DialogComponent>){
    }

    close() {
  this.dialogRef.close();
}
}
