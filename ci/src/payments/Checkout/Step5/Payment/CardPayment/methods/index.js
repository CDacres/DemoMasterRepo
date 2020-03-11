
function getRelevantNonce() {
    switch (this.paymentType) {
    case 'braintree':
        return this.braintreeNonce;

    case 'paypal':
        return this.paypalNonce;

    default:
        return null;
    }
}

export {
    getRelevantNonce
};
