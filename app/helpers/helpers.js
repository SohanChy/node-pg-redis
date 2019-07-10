
    export const dataGet = async function(data,key,fallback = null){
        let keysInOrder = key.split(".");
        
        let dataIterator = data;
        let currentKey = keysInOrder.shift();

        while(currentKey !== undefined){
            if(Object.prototype.hasOwnProperty.call(dataIterator,currentKey)){
                dataIterator = dataIterator[currentKey]
                currentKey = keysInOrder.shift();
            }
            else {
                return fallback;
            }
        }
        return dataIterator;
    }
module.exports = {dataGet}