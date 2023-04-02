var callbacks = {};

const subscribe = (eventName,callback)=>{
    if(!callbacks[eventName]){
        callbacks[eventName] = new Set();
    }

    callbacks[eventName].add(callback);
};

const publish = (eventName,payload)=>{
    if(callbacks[eventName]){
        callbacks[eventName].forEach(callback=>{
            try {
                callback(payload);
            } catch (error) {
                console.log(error);
            };
        })
    }
}

const unsubscribe = (eventName,callback)=>{
    if(callbacks[eventName]){
        callbacks[eventName].delete(callback);
    }

}

export default{subscribe,unsubscribe,publish};