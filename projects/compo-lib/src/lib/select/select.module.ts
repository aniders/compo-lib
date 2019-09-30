import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { MatFormFieldModule, MatInputModule, MatSelectModule  } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [SelectComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,

  ],
  exports: [ SelectComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SelectModule { }
