import Web3 from "web3"
import {ABI,contractAddress} from './config'
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
export const init = function(callback) {
    // var web3 = new Web3(Web3.givenProvider)
    /* 新版的方式 */
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
    //实例化合约
    for (const key in contractAddress) {
        // //console.log(key,contractAddress[key])
        contract[key]= new web3.eth.Contract(
            ABI[key],
            contractAddress[key]
        )
    }
}