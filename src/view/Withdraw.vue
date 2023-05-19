<script setup>
import { computed, ref, watch, reactive } from "vue";
import { contract ,init} from "../web3";
import Axios from '../Axios'
import { useStore } from "vuex";
import { TokenConfig } from "../config";
import { ElNotification } from 'element-plus'
import BigNumber from "big.js";
BigNumber.NE = -40;
BigNumber.PE = 40;
const store = useStore();
const amount = ref("");
const value = ref("");
const rbalance = ref(0);
const zbalance = ref(0);
const Type = ref("CRB");
const inRedeem = ref(false);
const token = computed(() => {
  return store.state.token;
});
const address = computed(() => {
  return store.state.address;
});
watch(
  token,
  (token) => {
    if (token) {
        getBalance()
    }
  },
  { immediate: true }
);
function getBalance(){
    Axios.post('/api/cryptobrain/common/account').then(res=>{
        rbalance.value = res.data.result.rbalance
        zbalance.value = res.data.result.zbalance
        console.log(res,"用户账户信息")
    })
}
const Withdraw = function(){
    Axios.post('/api/cryptobrain/common/userWithdraw',{
        "symbol": Type.value,
        "withDrawAmount": amount.value
    }).then(res=>{
        if(res.data.error){
            ElNotification({
                title: 'Warning',
                message: res.data.error,
                type: 'warning',
            })
        }else{
            getBalance()
            ElNotification({
                title: 'Info',
                message: 'Submitted successfully',
                type: 'Info',
            })
        }
        console.log(res,"提现信息")
    })
}
function verify() {
    if(!address.value){
        return ElNotification({
            title: 'Info',
            message: 'Please link the wallet',
            type: 'info',
        })
    }
  if (inRedeem.value) {
    return ElNotification({
        title: 'Info',
        message: 'Please do not resubmit',
        type: 'info',
    })
  }
  if (!amount.value) {
    return ElNotification({
        title: 'Info',
        message: 'Please enter the withdrawal quantity',
        type: 'info',
    })
  }
  let amountNum = new BigNumber(amount.value);
  if (amountNum.lte(0)) {
    return ElNotification({
        title: 'Info',
        message: 'Please enter the correct withdrawal quantity',
        type: 'info',
    })
  }
  let balance = 0
  if(Type.value === 'CRB'){
    balance = rbalance.value
  }
  if(Type.value === 'CZZ'){
    balance = zbalance.value
  }
  if (amountNum.gt(balance)) {
    return ElNotification({
        title: 'Info',
        message: 'The withdrawal quantity cannot be greater than the withdrawal balance',
        type: 'info',
    })
  }
  Withdraw();
}
function changeNumPut(event) {
  let value = event.target.value;
  if (/^\./g.test(value)) {
    value = "0" + value;
  }
  let putVal = value.replace(/[^\d.]/g, "");
  let accuracy = 18;
  let putArr = putVal.split(".");
  if (putArr[1] && putArr[1].length > accuracy) {
    putArr[1] = putArr[1].slice(0, accuracy);
  }
  putVal = putArr.join(".");
  amount.value = putVal;
}
function ChangeType(type) {
  amount.value = ''
  value.value = "";
  Type.value = type;
}
</script>

<template>
  <div class="Redeem">
    <div class="title">Withdraw</div>
    <div class="RedeemBox">
      <div class="Tabs">
        <div
          :class="['TabItem', 'flexCenter', { Active: Type === 'CRB' }]"
          @click="ChangeType('CRB')"
        >
          CRB
        </div>
        <div
          :class="['TabItem', 'flexCenter', { Active: Type === 'CZZ' }]"
          @click="ChangeType('CZZ')"
        >
          CZZ
        </div>
      </div>
      <div class="label">Withdraw Amount</div>
      <div class="amount">
        <input
          type="text"
          v-model="amount"
          :placeholder=" Type === 'CZZ' ? zbalance : rbalance"
          @input="changeNumPut($event)"
        />
        <span @click="amount = Type === 'CZZ' ? zbalance : rbalance">MAX</span>
      </div>
      <div class="submit flexCenter" @click="verify">
        <svg viewBox="25 25 50 50" class="inRedeem" v-if="inRedeem">
          <circle cx="50" cy="50" r="20"></circle>
        </svg>
        <span> Submit </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.Redeem {
  background: #27173a;
  padding-top: 10rem;
  box-sizing: border-box;
  min-height: 100vh;
  .title {
    font-size: 1.5rem;
    color: #ffffff;
    line-height: 1;
    text-align: center;
    @media (max-width: 1024px) {
      font-size: 3rem;
    }
    @media (max-width: 425px) {
      font-size: 4rem;
    }
  }
  .RedeemBox {
    width: 37.5rem;
    margin: 2rem auto 0;
    background: #1d2444;
    border-radius: 2.5rem;
    overflow: hidden;
    @media (max-width: 768px) {
      width: 50rem;
    }
    @media (max-width: 680px) {
      width: 60rem;
    }
    .Tabs {
      margin: 2.85rem 4rem 0;
      height: 2.9rem;
      background: #293356;
      border-radius: 29px;
      padding: 4px 0;
      display: flex;
      justify-content: center;
      .TabItem {
        width: 6.25rem;
        cursor: pointer;
        height: 100%;
        border-radius: 1.45rem;
        margin: 0 2.5rem;
        color: #ffffff;
        font-size: 14px;
      }
      .Active {
        background: #1d2444;
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
      display: flex;
      align-items: center;
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
      input{
        height: 100%;
        border: none;
        padding: 0;
        flex: 1;
        color: rgba(255, 255, 255, 0.617691);
        margin-right: 16px;
        background: transparent;
        outline: none;
      }
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
      cursor: pointer;
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
          font-size:14px;
        }
      }
    }
    .SelectToken {
      margin: 0 4rem;
      height: 2.8rem;
      width: calc(100% - 8rem);
      .el-input__wrapper {
        background-color: rgb(41, 50, 95) !important;
        box-shadow: none !important;
      }
    }
  }
}
.inRedeem {
  width: 1.5em;
  transform-origin: center;
  animation: rotate 2s linear infinite;
}

circle {
  fill: none;
  stroke: #fc2f70;
  stroke-width: 5;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dashoffset: -125px;
  }
}
</style>
