const Util = {

    param_extract: (req) => {
        let data = {}
        if (req.fields) 
            data = req.fields
        else if (req.body)
            data = req.body
        return data
    },
    
    resp: function(res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return res;
    }
}

module.exports = Util