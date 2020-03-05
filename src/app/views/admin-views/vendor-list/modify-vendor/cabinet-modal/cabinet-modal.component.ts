import { BaseClass } from './../../../../../shared/services/common/baseClass';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Injector, Input } from '@angular/core';
import Utils from 'src/app/shared/services/common/utils';

@Component({
  selector: 'app-cabinet-modal',
  templateUrl: './cabinet-modal.component.html',
  styleUrls: ['./cabinet-modal.component.scss'],
})
export class CabinetModalComponent extends BaseClass implements OnInit {
  billAcceptorList = [];
  cabinetForm: FormGroup;
  @Input() cabinetsList = [];
  @Input() isEditable: string;
  validationMessages = {
    name: [
      {type: 'required', message: 'Cabinet Name is Required'}
    ],
    billAcceptor: [
      {type: 'required', message: 'Bill Acceptor is Required'}
    ]
  };
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    public injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.initCabinetForm();
  }

  initCabinetForm() {
    this.cabinetForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      size: [''],
      monitorType: [''],
      billAcceptor: [''],
      _id: ['']
    });
  }
  billAcceptorGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])]
    });
  }
  dismissModal() {
    this.modalController.dismiss(this.cabinetsList);
  }

  saveModal() {
    this.modalController.dismiss(this.cabinetsList);
  }

  addBillAcceptor(i) {
    if (Utils.isValidInput(this.cabinetForm.get('billAcceptor').value)) {
      const obj = {
        name: this.cabinetForm.get('billAcceptor').value
      };
      this.billAcceptorList.push(obj);
      this.cabinetForm.get('billAcceptor').setValue('');
    }
  }

  addCabinet() {
    const obj = this.cabinetForm.value;
    obj['billAcceptor'] = this.billAcceptorList;
    const index = this.cabinetsList.findIndex(res=> res._id === obj._id);
    if (index === -1) {
      this.cabinetsList.push(obj);
    } else {
      this.cabinetsList[index] = obj;
    }
    this.cabinetForm.patchValue({
      name: '',
      size: '',
      monitorType: '',
      billAcceptor: '',
      _id: ''
    });
    this.billAcceptorList = [];
  }

  cabinetSelected(cabinet) {
    this.cabinetForm.patchValue({
      name: cabinet.name,
      size: cabinet.size,
      monitorType: cabinet.monitorType,
      billAcceptor: '',
      _id: cabinet._id
    });
    this.billAcceptorList = cabinet.billAcceptor;
  }
}
