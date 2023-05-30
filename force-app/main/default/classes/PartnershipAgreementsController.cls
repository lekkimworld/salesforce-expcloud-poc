public with sharing class PartnershipAgreementsController {
    @AuraEnabled(cacheable=true)
    public static List<Partnership_Agreement__c> getPartnershipAgreements() {
        return [SELECT Id, Name, Start_Date__c, End_Date__c, Account__r.Id, Account__r.Name FROM Partnership_Agreement__c];
    }
}