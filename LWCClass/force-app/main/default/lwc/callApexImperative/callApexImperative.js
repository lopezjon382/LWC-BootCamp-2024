import { LightningElement, api, wire } from 'lwc';
import getContactsBornAfter from '@salesforce/apex/ContactController.getContactsBornAfter';
export default class CallApexImperative extends LightningElement {
    @api minBirthDate;
    contacts;
    handleButtonClick() {
        getContactsBornAfter({ //imperative Apex call
            birthDate: this.minBirthDate
        })
            .then(contacts => {
                this.contacts = contacts;
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleOnChange(event){
        this.minBirthDate = event.target.value;
    }
}