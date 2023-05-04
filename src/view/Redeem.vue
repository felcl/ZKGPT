<script setup>
import {computed} from 'vue'
import { contract } from '../web3'
import { useStore } from "vuex";
const store = useStore();
const address = computed(() => {
  return store.state.address;
});
function redeem(){
    contract.CryptoBrainMain.methods.usdtRedeem(10).send({from:address.value}).then(res=>{
        console.log(res)
    })
}
</script>

<template>
  <div class="Redeem">
    <div class="title">Redeem</div>
    <div class="RedeemBox">
        <div class="Tabs">
            <div class="TabItem flexCenter">CRB</div>
            <div class="TabItem flexCenter">CZZ</div>
        </div>
        <div class="label">Redeem Amount</div>
        <input
          type="text"
          class="amount"
        />
        <div class="label">Distribute</div>
        <input
          type="text"
          class="amount"
        />
        <div class="submit flexCenter" @click="redeem">
          <span> Submit </span>
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

<style scoped lang="scss">
.Redeem{
    background: #27173A;
    padding-top: 10rem;
    box-sizing: border-box;
    min-height: 100vh;
    .title{
        font-size: 1.5rem;
        color: #FFFFFF;
        line-height: 1;
        text-align: center;
        @media (max-width:1024px) {
            font-size: 3rem;
        }
        @media (max-width:425px) {
            font-size: 4rem;
        }
    }
    .RedeemBox{
        width: 37.5rem;
        margin:2rem auto 0;
        background: #1D2444;
        border-radius: 2.5rem;
        overflow: hidden;
        @media (max-width: 768px) {
            width: 50rem;
        }
        @media (max-width: 680px) {
            width: 60rem;
        }
        .Tabs{
            margin: 2.85rem 4rem 0;
            height: 2.9rem;
            background: #293356;
            border-radius: 29px;
            padding: 4px 0;
            display: flex;
            justify-content: center;
            .TabItem{
                width: 6.25rem;
                height: 100%;
                background: #1D2444;
                border-radius: 1.45rem;
                margin: 0 2.5rem;
                color: #FFFFFF;
                font-size: 14px;
            }
        }
        .label {
            font-size: 14px;
            line-height: 1.2;
            color: #ffffff;
            margin: 1.8rem 4rem 0.6rem;
        }
        .amount {
            margin: 0 4rem;
            height: 2.8rem;
            width: calc(100% - 8rem);
            box-sizing: border-box;
            display: block;
            border-radius: 0.6rem;
            background: rgba(41, 50, 95, 1);
            // mix-blend-mode: overlay;
            // opacity: 0.4;
            border: none;
            outline: none;
            color: rgba(255, 255, 255, 0.617691);
            padding: 0 26px;
            box-sizing: border-box;
            font-size: 14px;
            @media (max-width: 768px) {
            height: 3.8rem;
            }
            @media (max-width: 425px) {
            height: 6.5rem;
            }
            @media (max-width: 375px) {
            height: 8.5rem;
            }
      }
      .submit {
        background: linear-gradient(90deg, #536dfe 0%, #b41fff 100%);
        border-radius: 0.6rem;
        height: 2.8rem;
        color: #fff;
        margin: 2.3rem 4rem 1.7rem;
        span {
          margin: 0 5px;
        }
        @media (max-width: 768px) {
          height: 3.8rem;
          margin: 3.4rem 0 3.4rem;
        }
        @media (max-width: 425px) {
          height: 6.5rem;
        }
        @media (max-width: 375px) {
          height: 8.5rem;
        }
      }
      .StakeInfo {
        width: 100%;
        background: linear-gradient(90deg, #536dfe 0%, #b41fff 100%);
        border-radius: 2.5rem;
        padding: 1.9rem 4rem;
        box-sizing: border-box;
        .InfoRow {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.6rem;
            span {
            color: rgba(255, 255, 255, 0.617691);
            font-size: 0.7rem;
            }
        }
        }
    }
}
</style>