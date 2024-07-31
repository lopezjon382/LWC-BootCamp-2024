import { LightningElement} from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import CONTACT_FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import CONTACT_LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import CONTACT_EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import CONTACT_PHONE_FIELD from '@salesforce/schema/Contact.Phone';
export default class handsOnExcerciseToast extends LightningElement {
    firstName = '';
    lastName = '';
    email = '';
    phone = '';

    handleChange(event){
        const field = event.target.name;
        if(field === 'firstName'){
            this.firstName = event.target.value;
        }else if(field === 'lastName'){
            this.lastName = event.target.value;
        }else if(field === 'email'){
            this.email = event.target.value;
        }else if(field === 'phone'){
            this.phone = event.target.value;
        }
    }
    handleButtonClick() {
        const recordInput = {
            apiName: CONTACT_OBJECT.objectApiName,
            fields: {
                [CONTACT_FIRST_NAME_FIELD.fieldApiName] : this.firstName,
                [CONTACT_LAST_NAME_FIELD.fieldApiName] : this.lastName,
                [CONTACT_EMAIL_FIELD.fieldApiName] : this.email,
                [CONTACT_PHONE_FIELD.fieldApiName] : this.phone
            }
        };
        createRecord(recordInput)
            .then(contact => {
                const toastEvent = new ShowToastEvent({
                    title: "Contact Created",
                    message: "Record ID: " + contact.id,
                    variant: "success"
                });
                this.dispatchEvent(toastEvent);
            })
            .catch(error => {
                console.log(error);
                const toastEvent = new ShowToastEvent({
                    title: "Error Creating Contact",
                    message: "See console log for error details",
                    variant: "error"
                });
                this.dispatchEvent(toastEvent);
            });
    }
}