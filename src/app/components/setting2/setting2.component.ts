import { Component, OnInit , ViewChild,EventEmitter,Output} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { College_typeService } from 'src/app/admin/core/services/college_type.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl,Validators, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-setting2',
  templateUrl: './setting2.component.html',
  styleUrls: ['./setting2.component.scss']
})
export class Setting2Component{

  college_typeid:any;
  roles:any;
  college_types:any;
  result:any;

 

  UserForm: FormGroup;

  showOptions: boolean = false; // Declare showOptions property
  isEditMode: boolean = false;  // Declare isEditMode property


  @Output()
  isLoadingEmit = new EventEmitter<boolean>();
  @Output()
  onAlertEmit = new EventEmitter<any>();

  constructor(private college_typeService :  College_typeService , private modalService:NgbModal,
    private fb:FormBuilder,private router: Router  ) {
      this.UserForm = this.fb.group({
        college_type_name: '', // Initialize with an empty string
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false,
      });
    }

    optionCheckboxes = [
      { id: 'option1', controlName: 'option1', label: 'Option 1' },
      { id: 'option2', controlName: 'option2', label: 'Option 2' },
      { id: 'option3', controlName: 'option3', label: 'Option 3' },
      { id: 'option4', controlName: 'option4', label: 'Option 4' },
      { id: 'option5', controlName: 'option5', label: 'Option 5' }
    ];
  
    // ... Rest of the component code ...

    
  
  ngOnInit(): void{  
  
   
  }

  emitLoading(_isLoading)
  {
    this.isLoadingEmit.emit(_isLoading);
  }

  emitAlert(type,message)
  {
    const alertData = {type:type,message:message};
    this.onAlertEmit.emit(alertData);
  }


 
 
  OpenModel(content: any, _id: any) {
    this.college_typeid = _id; // Assign the received _id to the component's college_typeid property
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }); // Open the modal using the provided content and modal configuration
    this.showOptions = true; // Show options by default
    this.isEditMode = !!_id; // Determine if it's an edit mode by checking if _id is not null
    
    if (_id != null) {
      // If in edit mode, fetch college type data by its _id
      this.college_typeService.GetCollegeById(_id).subscribe((result) => {
        this.result = result; // Assign the result data from the service response
        // Determine whether to show options based on the fetched data
        this.showOptions = result.options.option1 || result.options.option2 || result.options.option3 || result.options.option4 || result.options.option5;
        
        // Populate the form with the fetched data
        this.UserForm.patchValue({
          college_type_name: result.college_type_name, // Set the college type name
          option1: result.options.option1, // Set the value of option1 checkbox
          option2: result.options.option2, // Set the value of option2 checkbox
          option3: result.options.option3, // Set the value of option3 checkbox
          option4: result.options.option4, // Set the value of option4 checkbox
          option5: result.options.option5, // Set the value of option5 checkbox
        });
      });
    } else {
      // If not in edit mode (creating new entry), reset the form
      this.UserForm.reset();
    }
  }
  
  

  OnAddUser() {
    const selectedOptions = [];

    if (this.UserForm.get('option1').value) selectedOptions.push('Option 1');
    if (this.UserForm.get('option2').value) selectedOptions.push('Option 2');
    if (this.UserForm.get('option3').value) selectedOptions.push('Option 3');
    if (this.UserForm.get('option4').value) selectedOptions.push('Option 4');
    if (this.UserForm.get('option5').value) selectedOptions.push('Option 5');

    const collegeTypeData = {
      college_type_name: selectedOptions.join(', '), // Store selected options as comma-separated text
      options: {
        option1: this.UserForm.get('option1').value,
        option2: this.UserForm.get('option2').value,
        option3: this.UserForm.get('option3').value,
        option4: this.UserForm.get('option4').value,
        option5: this.UserForm.get('option5').value,
      }
    };

    this.college_typeService.addCollege_type(collegeTypeData).subscribe(() => {
      
      this.modalService.dismissAll();
      this.router.navigate(['/admin/settings']);
    });
  }


  


}