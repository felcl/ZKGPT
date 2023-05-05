import Token from './ABI/ERC20Token.json';
import CryptoBrainMain from './ABI/CryptoBrainMain.json';
export const contractAddress = {
    //正式
    "USDT": "0x96bE30aB12976Bc148D0294119F6201C484bA302",
    "CRBLP": "0x7C86fD5Dd88D016C314FB2054DbdD47fbC2aC9a3",
    "CZZLP": "0xfE0E7effd9602c66741F779758525Bd004762cC5",
    "CryptoBrainMain": "0x66e5Fa4b5319ce26094F9B6B7A8fD7e9BBD250c4",
}
export const ABI  = {
    "USDT": Token,
    "CRBLP": Token,
    "CZZLP": Token,
    "CryptoBrainMain": CryptoBrainMain,
}
export const TokenConfig = {
    ETH:{
        decimals:18
    },
    USDT:{
        decimals:6
    },
    CRBLP:{
        decimals:18
    },
    CZZLP:{
        decimals:18
    },
}