import { BaseClass } from './../../../../../shared/services/common/baseClass';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Injector } from '@angular/core';
import Utils from 'src/app/shared/services/common/utils';

@Component({
  selector: 'app-cabinet-modal',
  templateUrl: './cabinet-modal.component.html',
  styleUrls: ['./cabinet-modal.component.scss'],
})
export class CabinetModalComponent extends BaseClass implements OnInit {
  billAcceptorList = [];
  cabinetForm: FormGroup;
  cabinetsList = [];
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
      billAcceptor: ['']
    });
  }
  billAcceptorGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])]
    });
  }
  dismissModal() {
    this.modalController.dismiss([]);
  }

  saveModal() {
    console.log('sample');
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
    this.cabinetsList.push(obj);
    this.cabinetForm.patchValue({
      name: '',
      size: '',
      monitorType: '',
      billAcceptor: ''
    });
    this.billAcceptorList = [];
  }
}
