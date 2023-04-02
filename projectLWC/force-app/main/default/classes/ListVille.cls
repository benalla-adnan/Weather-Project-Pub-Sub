public with sharing class ListVille {
    public ListVille() {

    }
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getVilles(){
        
        List<AggregateResult> villes = [
            SELECT BillingCity
            FROM Account where BillingCity != null
            GROUP BY BillingCity
                    
               ];
        return villes;
    }
}