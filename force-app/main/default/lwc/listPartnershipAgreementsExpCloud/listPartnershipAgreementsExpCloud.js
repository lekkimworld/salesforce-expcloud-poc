import { LightningElement, wire } from 'lwc';
import getPartnershipAgreements from '@salesforce/apex/PartnershipAgreementsController.getPartnershipAgreements';

export default class ListPartnershipAgreements extends LightningElement {
    errors;
    agreements;
    @wire(getPartnershipAgreements) 
    getPartnershipAgreements({data, error}) {
        if (error) {
            this.errors = [error];
        }
        if (data) {
            this.agreements = data;
        }
    }

}