import {Component , EventEmitter , Input , OnDestroy , OnInit , Output} from '@angular/core';
import {FormBuilder , FormControl , FormGroup , Validators} from '@angular/forms';
import {InputParams} from '../../models/input-params';
import {isNullOrUndefined} from 'util';
import {DatapassingService} from '../../services/datapassing.service';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  enteredCity: string;

  @Output() public citySubmitted = new EventEmitter<string>(); // city enterted and hit submit
  @Output() public citySelected = new EventEmitter<any>(); // selected city from dropdownlist
  @Output() public paramsSelected = new EventEmitter<InputParams>(); // selected filter parameters


  @Input() cityList = []; // list of cities
  selectedCity = []; // selected city
  @Input() cityListDropdownSetting = []; // city list dropdownsetting


  @Input() categoryList = []; // list of categories
  selectedCategory = []; // selected category
  @Input() categoryListDropDownSetting = {}; // categorty list dropdownsetting

  @Input() cuisinesList = []; // cuisine list
  selectedCuisine = []; // selected cuisine
  @Input() cuisinesListDropDownSetting = {}; // cuisine list dropdownsetting

  inputForm: FormGroup;
  additionalForm: FormGroup;



  constructor(private fb: FormBuilder, private fb1: FormBuilder, private _dataPassingService: DatapassingService) { }

  ngOnInit() {

  this.inputForm = this.fb.group({
    city: ['', Validators.required]
  });
    this.additionalForm = this.fb1.group({
      restaurantCity: [''],
      restaurantCategory: [''],
      restaurantCuisine: ['']
    });
  }

  // accepts entered city and pass it to the parent
  onSubmit() {
    this.additionalForm.reset();
    this.enteredCity = this.inputForm.get('city').value;
    this.citySubmitted.emit(this.enteredCity);


  }

  // gets cuisine list
  getCuisines(selectedCity: any) {
    this.citySelected.emit(selectedCity);
  }

  // gets filtered restaurants
  getRestaurantResults() {
    var filterParams = new InputParams();
    const selectedlocation = this.additionalForm.get('restaurantCity').value.length !== 0 ? this.additionalForm.get('restaurantCity').value[0].id : '';
    const selectedCategory = this.additionalForm.get('restaurantCategory').value.length !== 0  ? this.additionalForm.get('restaurantCategory').value[0].id : '';
    const selectedCuisine = this.additionalForm.get('restaurantCuisine').value.length !== 0 ? this.additionalForm.get('restaurantCuisine').value[0].id : ''

    filterParams = Object.assign({}, filterParams, {location: selectedlocation,
      category: selectedCategory, cuisine: selectedCuisine});
    this.paramsSelected.emit(filterParams);
  }

  // resets filter
  ResetForm(){
    this.inputForm.reset();
    this.additionalForm.reset();
    this.cityList = [];
    this._dataPassingService.nullifyArray(true);
  }



}
