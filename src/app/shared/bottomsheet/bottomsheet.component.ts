import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottomsheet',
  templateUrl: './bottomsheet.component.html',
  styleUrls: ['./bottomsheet.component.scss']
})
export class BottomsheetComponent implements OnInit {

  public sheetRoot: any;
  public sheetTitle: any;
  public sheetDatas: any;

  constructor(
    public sheet: MatBottomSheetRef<BottomsheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public datas: any,
  ) { 

    this.sheetRoot = datas.root;
    this.sheetTitle = datas.title;
    this.sheetDatas = datas.data;
  }

  ngOnInit(): void {
  }

  cancel () {
    this.sheet.dismiss()
  }

 
}
