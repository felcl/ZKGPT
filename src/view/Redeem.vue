<script setup>
import { computed, ref, watch, reactive } from "vue";
import { contract } from "../web3";
import { useStore } from "vuex";
import { TokenConfig } from "../config";
import { ElNotification } from 'element-plus'
import BigNumber from "big.js";
BigNumber.NE = -40;
BigNumber.PE = 40;
const store = useStore();
const amount = ref("");
const value = ref("");
const Type = ref("CRB");
const inRedeem = ref(false);
const PledgeInfo = reactive({
  CRBLP: "0",
  CZZLP: "0",
  ETH: "0",
  USDT: "0",
});
const redeemName = {
  CRBLP: "crbLpRedeem",
  CZZLP: "czzLpRedeem",
  ETH: "ethRedeem",
  USDT: "usdtRedeem",
};
const PledgeConfig = {
  CRB: [
    {
      value: "USDT",
      label: "USDT",
    },
    {
      value: "ETH",
      label: "ETH",
    },
  ],
  CZZ: [
    {
      value: "CRBLP",
      label: "CRBLP",
    },
    {
      value: "CZZLP",
      label: "CZZLP",
    },
  ],
};
const address = computed(() => {
  return store.state.address;
});
watch(
  address,
  (address) => {
    if (address) {
      //获取用户质押量
      contract.CryptoBrainMain.methods
        .userPledgeInfo(address)
        .call()
        .then((res) => {
          PledgeInfo.CRBLP = new BigNumber(res.crblpAmount).div(
            10 ** TokenConfig.CRBLP.decimals
          );
          PledgeInfo.CZZLP = new BigNumber(res.czzlpAmount).div(
            10 ** TokenConfig.CZZLP.decimals
          );
          PledgeInfo.ETH = new BigNumber(res.ethAmount).div(
            10 ** TokenConfig.ETH.decimals
          );
          PledgeInfo.USDT = new BigNumber(res.usdtAmount).div(
            10 ** TokenConfig.USDT.decimals
          );
          console.log(res, "用户质押量");
        });
    }
  },
  { immediate: true }
);
function redeem(redeemName) {
  let redeemAmount = new BigNumber(amount.value)
    .times(10 ** TokenConfig[value.value].decimals)
    .toString();
  inRedeem.value = true;
  contract.CryptoBrainMain.methods[redeemName](redeemAmount)
    .send({ from: address.value })
    .then((res) => {
      console.log(res);
    })
    .finally(() => {
      inRedeem.value = false;
    });
}
function verify() {
    if(!address.value){
        return ElNotification({
            title: 'Info',
            message: '请链接钱包',
            type: 'info',
        })
    }
  if (inRedeem.value) {
    return ElNotification({
        title: 'Info',
        message: '请勿重复提交',
        type: 'info',
    })
  }
  if (!value.value) {
    return ElNotification({
        title: 'Info',
        message: '请选择赎回币种',
        type: 'info',
    })
  }
  if (!amount.value) {
    return ElNotification({
        title: 'Info',
        message: '请输入赎回数量',
        type: 'info',
    })
  }
  let amountNum = new BigNumber(amount.value);
  if (amountNum.lte(0)) {
    return ElNotification({
        title: 'Info',
        message: '请输入正确赎回数量',
        type: 'info',
    })
  }
  if (amountNum.gt(PledgeInfo[value.value])) {
    return ElNotification({
        title: 'Info',
        message: '赎回量不能大于质押量',
        type: 'info',
    })
  }
  redeem(redeemName[value.value]);
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
  value.value = "";
  Type.value = type;
}
</script>

<template>
  <div class="Redeem">
    <div class="title">Redeem</div>
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
      <div class="label">Redeem Amount</div>
      <input
        type="text"
        class="amount"
        v-model="amount"
        @input="changeNumPut($event)"
      />
      <div class="label">Distribute</div>
      <el-select v-model="value" class="SelectToken" placeholder="选择赎回币种">
        <el-option
          v-for="item in PledgeConfig[Type]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <div class="submit flexCenter" @click="verify">
        <svg viewBox="25 25 50 50" class="inRedeem" v-if="inRedeem">
          <circle cx="50" cy="50" r="20"></circle>
        </svg>
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
          font-size: 0.7rem;
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
