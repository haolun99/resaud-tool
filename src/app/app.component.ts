import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResourceAddEditComponent } from './resource-add-edit/resource-add-edit.component';
import { ResourceService } from './services/resource.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  displayedColumns: string[] = ['resclas', 'owner', 'date', 'active', 'environment','updated', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _resService: ResourceService, private _coreService: CoreService) {}

  ngOnInit(): void {
    this.getResourceList();
  }

  openAddEditResourceForm() {
    const dialogRef = this._dialog.open(ResourceAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
        this.getResourceList();
        }
      },
    });
  }

  getResourceList() {
    this._resService.getResourceList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: 
        console.log,
     
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteResource(id: number) {
    this._resService.deleteResource(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Resource deleted!', 'done');
        this.getResourceList();
      },
      error: console.log,
    });
  }
  
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(ResourceAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
        this.getResourceList();
        }
      },
    });
    
  }

}
