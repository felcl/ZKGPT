import Token from './ABI/ERC20Token.json';
import CryptoBrainMain from './ABI/CryptoBrainMain.json';
export const contractAddress = {
    //正式
    "USDT": "0x96bE30aB12976Bc148D0294119F6201C484bA302",
    "CryptoBrainMain": "0x0913B1193aC8997b8789B94f04f8B1CaD24D8c94",
}
export const ABI  = {
    "USDT": Token,
    "CryptoBrainMain": CryptoBrainMain,
}
export const TokenConfig = {
    USDT:{
        decimals:6
    }
}