import Token from './ABI/ERC20Token.json';
import CryptoBrainMain from './ABI/CryptoBrainMain.json';
export const contractAddress = {
    //测试
    "USDT": "0xe397931904107c80616A982929545947d0364c90",
    "CRBLP": "0x0c1c61840426006678B818011Be928E774597543",
    "CZZLP": "0x31C63564220Cb37c488AcB5aa61630737D7B13A8",
    "CryptoBrainMain": "0x154FdD4fa0C15c5243ffEF33f24f4e824411EE64",
    //正式
    // "USDT": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    // "CRBLP": "0x0c1c61840426006678B818011Be928E774597543",
    // "CZZLP": "0x31C63564220Cb37c488AcB5aa61630737D7B13A8",
    // "CryptoBrainMain": "0x154FdD4fa0C15c5243ffEF33f24f4e824411EE64",
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
//测试
export const chainConfig = {
    chainId: '0x66eed',
    chainName: 'Arbitrum Goerli Testnet',
    nativeCurrency: {
        name: 'AGOR',
        symbol: 'AGOR',
        decimals: 18,
    },
    rpcUrls: ['https://endpoints.omniatech.io/v1/arbitrum/goerli/public'],
    blockExplorerUrls: ['https://goerli-rollup-explorer.arbitrum.io'],
}
//正式
// export const chainConfig = {
//     chainId: '0xa4b1',
//     chainName: 'Arbitrum One',
//     nativeCurrency: {
//         name: 'ETH',
//         symbol: 'ETH',
//         decimals: 18,
//     },
//     rpcUrls: ['https://arb1.croswap.com/rpc'],
//     blockExplorerUrls: ['https://arbiscan.io'],
// }