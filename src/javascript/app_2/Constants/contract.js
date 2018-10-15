import { localize } from '_common/localize';

export const getContractTypeDisplay = () => ({
    ASIANU      : localize('Asian Up'),
    ASIAND      : localize('Asian Down'),
    CALL        : localize('Higher'),
    CALLE       : localize('Higher or equal'),
    PUT         : localize('Lower'),
    PUTE        : localize('Lower or equal'),
    DIGITMATCH  : localize('Digit Matches'),
    DIGITDIFF   : localize('Digit Differs'),
    DIGITODD    : localize('Digit Odd'),
    DIGITEVEN   : localize('Digit Even'),
    DIGITOVER   : localize('Digit Over'),
    DIGITUNDER  : localize('Digit Under'),
    EXPIRYMISS  : localize('Ends Outside'),
    EXPIRYRANGE : localize('Ends Between'),
    EXPIRYRANGEE: localize('Ends Between'),
    LBFLOATCALL : localize('Close-Low'),
    LBFLOATPUT  : localize('High-Close'),
    LBHIGHLOW   : localize('High-Low'),
    RANGE       : localize('Stays Between'),
    UPORDOWN    : localize('Goes Outside'),
    ONETOUCH    : localize('Touches'),
    NOTOUCH     : localize('Does Not Touch'),
});
