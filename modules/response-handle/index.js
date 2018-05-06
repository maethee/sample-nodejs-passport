/**
 *  Custom validation
 *  @desc match and return validation object
 *  @author Maethee chokkuchantorn
 *  @company Fly digital
 * */

const i18n = require('i18n');
const errors = require('./error-messages');
class handleError {
    constructor(name,ops){
        let _ops = typeof ops === 'object' ? ops : {};
        let _error = errors[name] || {message: "Error",code: 400};

        this.message = i18n.__l(`validate.${name}`)[0] ;
        this.name = name;
        this.code = _error.code || 400;
        //this.statusCode = _ops.statusCode || 400;
    }
    getCode(){
        return this.code;
    }
}


let _responseError = function (args) {
    return new handleError(args);
}

let _responseDone = function ({res ,result, message}) {

    let _data = {
        code: 0,
        message : message || "done",
        result: result
    }
    res.send(_data);
}

module.exports = {
    responseError: _responseError,
    responseDone: _responseDone
};
