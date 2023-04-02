import { LightningElement, wire } from 'lwc';
import getVilles from '@salesforce/apex/ListVille.getVilles';
import pubSub from 'c/pubSub';



export default class PicklistVille extends LightningElement {

    villes = '';
    selectedValue ;

    @wire(getVilles) wiredVilles({error,data})
    {

        if(data){
            this.villes = data;
            console.log(this.villes);
        }else if(error){
            console.log(error);
        }
    };
    
handleClick(){
    let message = {
        "message" : 'Hello pubsub',
        "selectedVille" : this.selectedValue
    };
    pubSub.publish('simple_event',message);
}
// select = document.getElementById("cities"); 
    
handleSelectedCities(event){
    this.selectedValue = event.target.value;
    this.handleClick();
}
}
