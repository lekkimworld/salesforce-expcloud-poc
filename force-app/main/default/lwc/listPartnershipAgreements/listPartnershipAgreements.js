import { LightningElement, wire } from 'lwc';
import { gql, graphql } from 'lightning/uiGraphQLApi';
import { NavigationMixin } from 'lightning/navigation';

export default class ListPartnershipAgreements extends NavigationMixin(LightningElement) {
    errors;
    agreements;
    @wire(graphql, {
        query: gql`
        query {
            uiapi {
                query {
                    Partnership_Agreement__c {
                        totalCount
                        edges {
                            node {
                                Id
                                Name {value}
                                Start_Date__c {value}
                                End_Date__c {value}
                                Account__r {
                                    Id
                                    Name {value}
                                }
                            }

                        }
                    }
                }
            }
        }`
    }) getPartnershipAgreements({data, errors}) {
        if (errors) {
            this.errors = errors;
        }
        if (data) {
            this.agreements = data.uiapi.query.Partnership_Agreement__c.edges.map(edge => {
                return edge.node;
            })
        }
    }

    handleOnClick(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        const id = evt.target.dataset.id;
        const type = evt.target.dataset.type;
        const pageRef = {
            type: 'standard__recordPage',
            attributes: {
                recordId: id,
                objectApiName: type,
                actionName: 'view'
            }
        };
        this[NavigationMixin.Navigate](pageRef);
    }

}