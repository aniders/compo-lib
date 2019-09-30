import { Component, OnInit, ViewChild, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatOption } from '@angular/material';
import { SelectOptions } from './select-options';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'dnd-select',
  templateUrl: './select.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./select.component.scss']
})


export class SelectComponent implements OnInit {
  
  @ViewChild('allSelected', { static: true }) private allSelected: MatOption;

  private _data = new BehaviorSubject<string[]>([]);
  private _disabled = new BehaviorSubject<boolean>(false);
  private _setSelected = new BehaviorSubject<string>('');

  searchTextboxControl = new FormControl();
  selectedValues = [];
  singleSelectedValue: string = '';
  filteredOptions: Observable<string[]> = of([]);
  isAllSelected: boolean = false;

  floatLabel: string = 'always';

  constructor() { }


  @Input()
  options: SelectOptions;

  @Input()
  set data(value: string[]) {
    this._data.next(value);
  };

  get data() {
    return this._data.getValue();
  }

  @Input()
  set disabled(value: boolean) {
    this._disabled.next(value);
  };

  get disabled() {
    return this._disabled.getValue();
  }

  @Input()
  set setSelected(value: string) {
    this._setSelected.next(value);
  };

  get setSelected() {
    return this._setSelected.getValue();
  }

  @Input()
  selectFormControl?: FormControl;

  @Output() selected = new EventEmitter<any>();


  ngOnInit() {
    if(!this.selectFormControl) {
      this.selectFormControl = new FormControl({ value: null, disabled: false });
    }
    this.floatLabel = (this.options.label && this.options.label.trim().length > 0) ? 'always' : 'never';

    this._data
      .subscribe(x => {
        this.selectedValues = [];
        this.filteredOptions = this.searchTextboxControl.valueChanges
          .pipe(
            startWith<string>(''),
            map(name => this._filter(name))
          );
      });

    this._disabled.subscribe(x => {
      if (this.selectFormControl) {
        this.disabled ? this.selectFormControl.disable() : this.selectFormControl.enable()
      }
    });
    this._setSelected.subscribe(x => {
      if (this.selectFormControl) {
        this.selectFormControl.patchValue(this.setSelected);
      }
    });
  }



  /**
   * Used to filter data based on search input 
   */
  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();

    if (this.options.isMultiple) {
      // Set selected values to retain the selected checkbox state 
      this.setSelectedValues();
      if (!this.isAllSelected) {
        this.selectFormControl.patchValue(this.selectedValues);
      } else {
        this.selectFormControl.patchValue([this.allSelected.value]);
      }
    } 
    if (!this.data) {
      return [];
    } else {
      let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
      return filteredList;
    }
  }

  /**
   * Remove from selected values based on uncheck
   */
  selectionChange(event) {
    if (event.isUserInput && event.source.selected == false) {
      //Unchecked
      let index = this.selectedValues.indexOf(event.source.value);
      this.selectedValues.splice(index, 1);
    } else if (event.isUserInput && event.source.selected == true) {
      // checked 
      if (this.options.isMultiple) {
        if (this.selectedValues.indexOf(event.source.value) == -1) {
          this.selectedValues.push(event.source.value);
        }
      } else {
        this.singleSelectedValue = event.source.value;
      }

    }
  }

  openedChange(opened: boolean) {
    if (opened == true) {
      // Set search textbox value as empty while opening selectbox 
      this.searchTextboxControl.patchValue('');
    } else if (!opened && this.options.isMultiple) {
      // select closed
      if (!this.isAllSelected) {
        this.selectFormControl.patchValue(this.selectedValues);
      }
      this.selected.emit(this.selectedValues);
    } else if (!opened && !this.options.isMultiple) {
      this.selected.emit(this.singleSelectedValue);
    }
  }

  /**
   * Clearing search textbox value 
   */
  clearSearch(event) {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
  }

  /**
   * Set selected values to retain the state 
   */
  setSelectedValues() {
    if (this.selectFormControl.value && this.selectFormControl.value.length > 0) {
      this.selectFormControl.value.forEach((e) => {
        if (this.selectedValues.indexOf(e) == -1 && e !== this.allSelected.value) {
          this.selectedValues.push(e);
        }
      });
    }
  }

  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.isAllSelected = true;
      this.selectFormControl.patchValue([this.allSelected.value]);
      this.selectedValues = this.data;
    } else {
      this.isAllSelected = false;
      this.selectFormControl.patchValue([]);
      this.selectedValues = [];
    }
  }
}
