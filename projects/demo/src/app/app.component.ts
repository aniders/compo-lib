import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { SelectOptions } from '../../../compo-lib/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnInit {

  public sharedForm: FormGroup;
  public baseSelectOptions: SelectOptions;
  public singleSelectOptions: SelectOptions;
  public searchSelectOptions: SelectOptions;
  public dataList: string[];

  constructor(private fb: FormBuilder) {
  }


  ngOnInit(): void {


    this.baseSelectOptions = {
      label: 'Seachable Multi Select',
      placeholder: 'Select value',
      isMultiple: true,
      isSearchable: true,
      required: false
    };

    this.singleSelectOptions = {
      label: 'Searchable Select',
      placeholder: 'Select value',
      isMultiple: false,
      isSearchable: true,
      required: false
    };

    this.searchSelectOptions = {
      label: 'Single Select',
      placeholder: 'Select value',
      isMultiple: false,
      isSearchable: false,
      required: false
    };


    this.dataList = ['Abc', 'Dsf', 'Affsd', 'Abc', 'Ddsf', 'Affsd','Abc', 'Csf', 'Affsd',];
    

    this.sharedForm = this.fb.group({
      'inputForm': new FormControl(''),
      'select':new FormControl(''),
      'singleSelect':new FormControl(''),
      'searchSelect':new FormControl('')
    });

  }
}
