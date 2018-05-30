import {Component , EventEmitter , Input , OnInit , Output} from '@angular/core';
import {FormBuilder , FormControl , FormGroup , Validators} from '@angular/forms';
import {InputParams} from '../../models/input-params';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  enteredCity: string;

  @Output() public citySubmitted = new EventEmitter<string>();
  @Output() public citySelected = new EventEmitter<any>();
  @Output() public paramsSelected = new EventEmitter<InputParams>();


  @Input() cityList = [];
  selectedCity = [];
  @Input() cityListDropdownSetting = [];


  @Input() categoryList = [];
  selectedCategory = [];
  @Input() categoryListDropDownSetting = {};

  @Input() cuisinesList = [];
  selectedCuisine = [];
  @Input() cuisinesListDropDownSetting = {};

  inputForm: FormGroup;
  additionalForm: FormGroup;

  constructor(private fb: FormBuilder, private fb1: FormBuilder) { }

  ngOnInit() {

  this.inputForm = this.fb.group({
    city: ['', Validators.required]
  });
  }

  onSubmit() {
    this.enteredCity = this.inputForm.get('city').value;
    this.citySubmitted.emit(this.enteredCity);
    console.log(this.enteredCity);

    this.additionalForm = this.fb1.group({
      restaurantCity: [''],
      restaurantCategory: [''],
      restaurantCuisine: ['']
    });
  }

  getCuisines(selectedCity: any) {
    this.citySelected.emit(selectedCity);
  }

  getRestaurantResults() {
    var filterParams = new InputParams();
    filterParams = Object.assign({}, filterParams, {location: this.additionalForm.get('restaurantCity').value[0].id,
      category: this.additionalForm.get('restaurantCategory').value[0].id,
      cuisine: this.additionalForm.get('restaurantCuisine').value[0].id});
    this.paramsSelected.emit(filterParams);
    console.log(filterParams);
  }

}
