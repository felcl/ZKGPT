<template>
  <div class="Stake">
    <div class="StakeTitle">Stake XX Ether</div>
    <div class="StakeSubTitle">Stake XX-ETH or YY-ETH and receive YY while staking.</div>
    <div class="StakeItem">
        <div class="putBox">
            <div class="label">Type</div>
            <div class="btnRow">
                <div class="bgBtn flexCenter">ETH</div>
                <div class="outLineBtn">
                    <div class="btnCon flexCenter">USDT{{ balanceOfUSDT }}</div>
                </div>
            </div>
            <div class="label">Date</div>
            <div class="btnRow">
                <div class="bgBtn flexCenter">6 day</div>
            </div>
            <div class="label">Locked amount</div>
            <input type="text" class="amount">
            <!-- <div class="submit flexCenter" @click="approve(contractAddress.CryptoBrainMain,100 * 10 ** 6)">approve</div> -->
            <div class="submit flexCenter" @click="pledge(10000 * 10 ** 6)">Submit</div>
        </div>
        <div class="StakeInfo">
            <div class="InfoRow">
                <span>Stake Date</span>
                <span>2023-04-22 00:17</span>
            </div>
            <div class="InfoRow">
                <span>Value Date</span>
                <span>2023-04-22 08:00</span>
            </div>
            <div class="InfoRow">
                <span>Interest Period</span>
                <span>6 Days</span>
            </div>
            <div class="InfoRow">
                <span>Est. APR</span>
                <span>2.7%</span>
            </div>
            <div class="InfoRow">
                <span>Estimated Interests</span>
                <span>- -</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import {contractAddress} from '../config'
import {contract} from '../web3'
import Web3 from "web3"
import { useStore } from 'vuex'
import { watch,computed,ref } from 'vue'
import BigNumber from 'big.js'
const store = useStore()
const balanceOfUSDT = ref('0')
const address = computed(() => {
    return store.state.address
})
function getBalanceOf(address){
    contract.USDT.methods.balanceOf(address).call().then(res=>{
        res = new BigNumber(res).div(10 ** 6)
        balanceOfUSDT.value = res
        console.log(res)
    })
}
function approve(toAddress,amount){
    contract.USDT.methods.approve(toAddress,amount).send({from: address.value}).then(res=>{
        console.log(res)
    })
}
function pledge(amount){
    console.log(Web3.utils.toWei('0.1'))
    debugger
    contract.CryptoBrainMain.methods.usdtPledge(amount).send({from: address.value}).then(res=>{
        console.log(res)
    })
}
watch(
    address,
    (address)=>{
        if(address){
            getBalanceOf(address)
            console.log(address)
        }
    },
    {immediate: true }
)
// console.log(contract)
</script>

<style lang="scss" scoped>
.Stake{
    background: #27173A;
    min-height: 100vh;
    padding-top: 10rem;
    @media (max-width:767px) {
        padding-top: 20rem;
    }
    .StakeTitle{
        font-size: 1.5rem;
        line-height: 1;
        color: #FFFFFF;
        text-align: center;
        @media (max-width:1024px) {
            font-size: 3rem;
        }
        @media (max-width:425px) {
            font-size: 4rem;
        }
    }
    .StakeSubTitle{
        font-size: 14px;
        line-height: 1;
        color: rgba(255, 255, 255, 0.494714);
        text-align: center;
        margin-top: 8px;
        @media (max-width:425px) {
            font-size: 12px;
        }
    }
    .StakeItem{
        display: flex;
        flex-direction: column;
        width: 37.5rem;
        background: #1D2444;
        border-radius: 2.5rem;
        margin:20px auto 0;
        @media (max-width:768px) {
            width: 45rem;
        }
        @media (max-width:425px) {
            width: 65rem;
        }
        @media (max-width:375px) {
            width: 80rem;
        }
        .putBox{
            flex: 1;
            padding: 3.4rem 4rem 0;
            box-sizing: border-box;
            .label{
                font-size: 14px;
                line-height: 1.2;
                color: #FFFFFF;

            }
            .btnRow{
                display: flex;
                justify-content:space-between;
                margin: 14px 0 30px;
                .bgBtn{
                    background: linear-gradient(90deg, #536DFE 0%, #B41FFF 100%);
                    border-radius: 0.6rem;
                    width: 11rem;
                    height: 2.8rem;
                    color: #FFFFFF;
                    @media (max-width:768px) {
                        width: 16rem;
                        height: 4rem;
                    }
                    @media (max-width:425px) {
                        width: 24rem;
                        height: 6rem;
                    }
                    @media (max-width:375px) {
                        width: 30rem;
                        height: 8rem;
                    }
                }
                .outLineBtn{
                    background: linear-gradient(90deg, #536DFE 0%, #B41FFF 100%);
                    border-radius: 0.6rem;
                    overflow: hidden;
                    padding:1px;
                    color: #FFFFFF;
                    width: 11rem;
                    height: 2.8rem;
                    @media (max-width:768px) {
                        width: 16rem;
                        height: 4rem;
                    }
                    @media (max-width:425px) {
                        width: 24rem;
                        height: 6rem;
                    }
                    @media (max-width:375px) {
                        width: 30rem;
                        height: 8rem;
                    }
                    .btnCon{
                        background: #1D2444;
                        width: 100%;
                        height: 100%;
                        border-radius: 0.5rem;
                    }
                }
            }
            .amount{
                width: 100%;
                height: 2.8rem;
                border-radius: 0.6rem;
                background: rgba(41, 50, 95,1);
                // mix-blend-mode: overlay;
                // opacity: 0.4;
                border: none;
                margin-top: 14px;
                outline: none;
                color: rgba(255, 255, 255, 0.617691);
                padding: 0 26px;
                box-sizing: border-box;
                font-size: 14px;
                @media (max-width:768px) {
                    height: 3.8rem;
                }
                @media (max-width:425px) {
                    height: 6.5rem;
                }
                @media (max-width:375px) {
                    height: 8.5rem;
                }
            }
            .submit{
                width: 100%;
                background: linear-gradient(90deg, #536DFE 0%, #B41FFF 100%);
                border-radius: 0.6rem;
                height: 2.8rem;
                color: #fff;
                margin: 2.3rem 0 1.7rem;
                @media (max-width:768px) {
                    height: 3.8rem;
                    margin: 3.4rem 0 3.4rem;
                }
                @media (max-width:425px) {
                    height: 6.5rem;
                }
                @media (max-width:375px) {
                    height: 8.5rem;
                }
            }
        }
        .StakeInfo{
            width: 100%;
            background: linear-gradient(90deg, #536DFE 0%, #B41FFF 100%);
            border-radius: 2.5rem;
            padding: 1.9rem 4rem;
            box-sizing: border-box;
            .InfoRow{
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.6rem;
                span{
                    color: rgba(255, 255, 255, 0.617691);
                    font-size: 0.7rem;
                }
            }
        }
    }
}
.flexCenter{
    display: flex;
    justify-content:center;
    align-items: center;
}
</style>