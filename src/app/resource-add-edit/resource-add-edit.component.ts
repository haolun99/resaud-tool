import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResourceService } from '../services/resource.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-resource-add-edit',
  templateUrl: './resource-add-edit.component.html',
  styleUrls: ['./resource-add-edit.component.scss']
})
export class ResourceAddEditComponent implements OnInit{

  resForm : FormGroup;

  environment: string[] = [
    'BA',
    'BE',
    'BU',
    'IB',
    'TS',
    'SB',
    'WS',
    'UT'
  ]

  constructor(
    private _fb : FormBuilder, 
    private _resService: ResourceService, 
    private _dialogRef: MatDialogRef<ResourceAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
    ) {
    this.resForm = this._fb.group({
      resclas: '',
      owner: '',
      date: '',
      active: '',
      environment: '',
      updated: '',

    });
  }

  ngOnInit(): void {
    this.resForm.patchValue(this.data);
  }

onFormSubmit() {
  if(this.resForm.valid){
    if(this.data){
      this._resService.updateResource(this.data.id, this.resForm.value).subscribe({
        next: (val: any) => {
            this._coreService.openSnackBar('Resource detail updated');
            this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }else{
      this._resService.addResource(this.resForm.value).subscribe({
        next: (val: any) => {
            this._coreService.openSnackBar('Resource detail added');
            this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
    
  }
}

}
