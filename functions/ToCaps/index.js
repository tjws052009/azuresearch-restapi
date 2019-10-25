module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function to make text all caps.');

    if ((req.body && req.body.values)) {
        let output = [];
        let values = req.body.values;

        values.forEach(function(value, index) {
            let returnValue = {
                recordId: value.recordId,
                errors: null,
                warnings: null
            };
            let data = value.data;
            let outputData = {};

            try {
                if (typeof data.text === "string") {
                    outputData.text = data.text.toUpperCase();
                } else if (Array.isArray(data.text)) {
                    let outputArray = [];
                    data.text.forEach(function(el, ind) {
                        outputArray.push(el.toUpperCase());
                    });
                    outputData.text = outputArray;
                } else {
                    outputData.text = data.text;
                }

            } catch(err) {
                returnValue.errors = [
                    { message: err.message }
                ]
            }

            returnValue.data = outputData;
            output.push(returnValue);
        });
        
        context.res = {
            headers: { "Content-Type": "application/json" },
            body: { "values": output }
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};