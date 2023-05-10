import Web3 from "web3"
import {ABI,contractAddress,chainConfig} from './config'
export const contract ={}
export var web3 = null
export const connect =function (callback){
    var web3Provider
    if (window.ethereum) {
        web3Provider = window.ethereum
        try {
            // 请求用户授权
            window.ethereum.enable()
        } catch (error) {
            // 用户不授权时
            console.error('User denied account access')
        }
    }
    web3 = new Web3(web3Provider) //web3js就是你需要的web3实例
    web3.eth.getAccounts(function (error, result) {
        if (!error) { //授权成功后result能正常获取到账号了
            callback(result[0])
        } 
    })
}
export const init = function() {
    // var web3 = new Web3(Web3.givenProvider)
    /* 新版的方式 */
    // var web3Provider
    // if (window.ethereum) {
    //     web3Provider = window.ethereum
    //     try {
    //         // 请求用户授权
    //         window.ethereum.enable()
    //     } catch (error) {
    //         // 用户不授权时
    //         console.error('User denied account access')
    //     }
    // } 
    // web3 = new Web3(web3Provider) //web3js就是你需要的web3实例
    // web3.eth.getAccounts(function (error, result) {
    //     if (!error) { //授权成功后result能正常获取到账号了
    //         callback(result[0])
    //     } 
    // })
    //实例化合约
    for (const key in contractAddress) {
        // //console.log(key,contractAddress[key])
        contract[key]= new web3.eth.Contract(
            ABI[key],
            contractAddress[key]
        )
    }
}
// 添加链节点
export async function changeNetwork(callback) {
    // let cfg = chainBase[id];
    // console.log(cfg);
    if (!window.ethereum) {
      return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const request = (window.ethereum).request;
    // 获取当前链id
    const chainId = await request({ method: "eth_chainId" });
    console.log(`chainId:${chainId}`);
    if (chainId == chainConfig.chainId) {
        console.log(`当前链已经是:${chainConfig.chainName}`);
    } else {
        console.log(`正在切换链为:${chainConfig.chainName}`);
    }
     
    try {
    // 切换
      await request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainConfig.chainId }],
      });
      callback()
      return true;
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = e;
      console.log(err);
      if (err.code === 4902) {
        try {
            // 添加
          await request({
            method: "wallet_addEthereumChain",
            params: [chainConfig],
          });
          callback()
        } catch (addError) {
          console.error(addError);
        }
      } else {
        console.log(`ERROR:${err.message}`);
      }
      return true;
    }
}