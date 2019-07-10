    const ApiError = function(message,status = 400){
        const error = new Error(message)
        error.status = status
        return error;
    }
    
    const dataGet = async function(data,key,fallback = null){
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

    const extractFilters = function(queryParams,allowedFilters){
        // const allowedFilters = ['status','batch_number','campaign_code'];
        let appliedFilters = [];

        Object.keys(queryParams).map((f) => {
            if(allowedFilters.indexOf(f) != -1){
            appliedFilters[f] = queryParams[f]
            }
        })

        if(Object.keys(appliedFilters).length === 0){
            throw ApiError("At least one filter parameter is required",400); 

            // return res.status(400).json({
            //     success: false,
            //     message: "At least one filter parameter is required"
            //     })
    
        }

        return appliedFilters;
    }

    const transformResponseToCoreStyle = function(result){
        return {
            error: false,
            meta: {
                pageNumber: result.paginator.page,
                dataLength: result.paginator.dataLength
            },
            data: result.data
        }
    }

    /**
     * Wrap route function for errors
     * @param  {function} func controller function to be listened for errors
     * @return {void}
    */
    const wrap = function(func) {
        return async function (req, res, next) {
            try {
                return await func(req, res, next);
            } catch (err) {
                next(err);
            }
        };
    }

    export {transformResponseToCoreStyle,dataGet,extractFilters,wrap,ApiError}