class Currency {
    add(msm, message, amount) {
        return msm.userdata.math(message.author.id, '+', parseInt(amount), 'snowyycash');
    }
    subtract(msm, message, amount) {
        return msm.userdata.math(message.author.id, '-', parseInt(amount), 'snowyycash')
    }
}

module.exports = Currency;