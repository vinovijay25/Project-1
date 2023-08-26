import { Component, OnInit , ViewChild,EventEmitter,Output,ElementRef} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { College_typeService } from 'src/app/admin/core/services/college_type.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl,Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-setting3',
  templateUrl: './setting3.component.html',
  styleUrls: ['./setting3.component.scss']
})
export class Setting3Component {


  college_typeid:any;
  roles:any;
  college_types:any;
  result:any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();

  UserForm: FormGroup;

  showOptions: boolean = false; // Declare showOptions property
  isEditMode: boolean = false;  // Declare isEditMode property


  @Output()
  isLoadingEmit = new EventEmitter<boolean>();
  @Output()
  onAlertEmit = new EventEmitter<any>();

  constructor(private college_typeService :  College_typeService , private modalService:NgbModal,
    private fb:FormBuilder ) {
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
  
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    
      lengthMenu: [10, 25, 50, 100],
      searching: true,
      order: [[0, 'asc']],
      language: {
        searchPlaceholder: 'Search'
      }
    };

    this.GetCollege_types();
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

  GetCollege_types(){
    this.emitLoading(true);
    var table = $('#myTable').DataTable();
    table.destroy();
      this.college_typeService.getCollege_types().subscribe((result)=>{
      this.college_types = result;
      this.dtTrigger.next(null);
      this.emitLoading(false);
    });
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
      this.GetCollege_types();
      this.modalService.dismissAll();
    });
  }

  OnEditSubmit() {
    const selectedOptions = [];
  
    // Check if each option is selected and add its label to the selectedOptions array
    this.optionCheckboxes.forEach(option => {
      if (this.UserForm.get(option.controlName).value) {
        selectedOptions.push(option.label);
      }
    });
  
    const collegeTypeData = {
      college_type_name: selectedOptions.join(', '), // Join selected options with a comma
      options: {
        option1: this.UserForm.get('option1').value,
        option2: this.UserForm.get('option2').value,
        option3: this.UserForm.get('option3').value,
        option4: this.UserForm.get('option4').value,
        option5: this.UserForm.get('option5').value,
      },
    };
  
    this.college_typeService.updateCollege_type(this.college_typeid, collegeTypeData).subscribe((res) => {
      this.emitLoading(false);
      this.emitAlert('alert-warning', 'College type updated successfully.');
      
      // Reset form and close modal after submission
      // this.UserForm.reset();
      this.modalService.dismissAll();
    
      // Get the updated college types
      this.GetCollege_types();
    });
  }
  

  



 



  

}





// OnEditSubmit() {
//   const collegeTypeData = {
//     college_type_name: this.UserForm.get('college_type_name').value,
//     options: {
//       option1: this.UserForm.get('option1').value,
//       option2: this.UserForm.get('option2').value,
//       option3: this.UserForm.get('option3').value,
//       option4: this.UserForm.get('option4').value,
//       option5: this.UserForm.get('option5').value,
//     },
//   };

//   this.college_typeService.updateCollege_type(this.college_typeid, collegeTypeData).subscribe((res) => {
//     this.emitLoading(false);
//     this.emitAlert('alert-warning', 'College type updated successfully.');
    
   
//     this.UserForm.reset();
//     this.modalService.dismissAll();

  
//     this.GetCollege_types();
//   });
// }





// OpenModel(content: any, _id: any) {
//   this.college_typeid = _id;
//   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
//   this.showOptions = true; // Show options by default
//   this.isEditMode = !!_id; // Determine edit mode
  
//   if (_id != null) {
//     this.college_typeService.GetCollegeById(_id).subscribe((result) => {
//       this.result = result; // Assign the result data
//       this.showOptions = result.options.option1 || result.options.option2 || result.options.option3 || result.options.option4 || result.options.option5;
      
//       // Populate the form with fetched data
//       this.UserForm.patchValue({
//         college_type_name: result.college_type_name,
//         option1: result.options.option1,
//         option2: result.options.option2,
//         option3: result.options.option3,
//         option4: result.options.option4,
//         option5: result.options.option5,
//       });
//     });
//   } else {
//     this.UserForm.reset(); // Reset form for new entry
//   }
// }


