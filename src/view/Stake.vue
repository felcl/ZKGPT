<script setup>
import { contractAddress, TokenConfig } from "../config";
import {dateFormat} from '../utils/tool'
import Axios from '../Axios'
import { contract, web3 ,init} from "../web3";
import { ElNotification } from 'element-plus'
import { useStore } from "vuex";
import { watch, computed, ref ,reactive} from "vue";
import BigNumber from "big.js";
BigNumber.NE = -40;
BigNumber.PE = 40;
const store = useStore();
const balanceOfEHT = ref("0");
const balanceOfUSDT = ref("0");
const balanceOfCRBLP = ref("0");
const balanceOfCZZLP = ref("0");
const inAllowance = ref(false);
const inPledge = ref(false);
const inLPPledge = ref(false);
const amount = ref("");
const LPAmount = ref("");
const allowanceUSDT = ref("0");
const allowanceCRBLP = ref("0");
const allowanceCZZLP = ref("0");
const StakeInfo = reactive({
  CRBLP:null,
  CZZLP:null,
  USDT:null,
  ETH:null,
})

const Type = ref("ETH");
const LPType = ref("CRBLP");
const address = computed(() => {
  return store.state.address;
});
const ifApprove = computed(() => {
  if (Type.value === "ETH") {
    return false;
  }
  let allowance = Type.value === "USDT" ? allowanceUSDT.value : 0;
  if (!amount.value && new BigNumber(allowance).gt(0)) {
    return false;
  }
  if (amount.value && new BigNumber(amount.value).lte(allowance)) {
    return false;
  }
  return true;
});
const ifLPApprove = computed(() => {
  let allowance =
    LPType.value === "CRBLP" ? allowanceCRBLP.value : allowanceCZZLP.value;
  if (!LPAmount.value && new BigNumber(allowance).gt(0)) {
    return false;
  }
  if (LPAmount.value && new BigNumber(LPAmount.value).lte(allowance)) {
    return false;
  }
  return true;
});
function changeType(type) {
  Type.value = type;
}
function changeLPType(type) {
  LPType.value = type;
}
function changeNumPut(event, key) {
  let type = key === "amount" ? Type.value : LPType.value;
  let value = event.target.value;
  if (/^\./g.test(value)) {
    value = "0" + value;
  }
  let putVal = value.replace(/[^\d.]/g, "");
  let accuracy = TokenConfig[type].decimals ? TokenConfig[type].decimals : 18;
  let putArr = putVal.split(".");
  if (putArr[1] && putArr[1].length > accuracy) {
    putArr[1] = putArr[1].slice(0, accuracy);
  }
  putVal = putArr.join(".");
  if (key === "amount") {
    amount.value = putVal;
  }
  if (key === "LPAmount") {
    LPAmount.value = putVal;
  }
}
function getBalanceOf(address, token) {
  contract[token].methods
    .balanceOf(address)
    .call()
    .then((res) => {
      res = new BigNumber(res).div(10 ** TokenConfig[token].decimals);
      if (token === "USDT") {
        balanceOfUSDT.value = res;
      }
      if (token === "CRBLP") {
        balanceOfCRBLP.value = res;
      }
      if (token === "CZZLP") {
        balanceOfCZZLP.value = res;
      }
      console.log(res.toString(), token + " - balanceOf");
    });
}
function getAllowance(toAddress, token) {
  contract[token].methods
    .allowance(address.value, toAddress)
    .call()
    .then((res) => {
      res = new BigNumber(res).div(10 ** TokenConfig[token].decimals);
      if (token === "USDT") {
        allowanceUSDT.value = res;
      }
      if (token === "CRBLP") {
        allowanceCRBLP.value = res;
      }
      if (token === "CZZLP") {
        allowanceCZZLP.value = res;
      }
      console.log(res.toString(), token + " - allowance");
    });
}
function getStakeInfo(){
  Axios.get(`/api/cryptobrain/common/pledges/${address.value}`).then(res=>{
    if(res.data.code === 200){
      res.data.result.forEach(item => {
        item.intBearing = Math.floor( item.createTime / 86400000)  * 86400000 + 57600000
        StakeInfo[item.symbol] = item 
      });
    }
    console.log(res,"用户质押信息")
  })
}
function approve(toAddress, token) {
    if(!address.value){
        return ElNotification({
            title: 'Warning',
            message: '请链接钱包',
            type: 'warning',
        })
    }
  inAllowance.value = true;
  // let amount = new BigNumber(new BigNumber(balanceOfUSDT.value).lte(0) ? '999999' : balanceOfUSDT.value).times(10 * 10 ** TokenConfig[Type.value].decimals).toString()
  let amount = new BigNumber("999999")
    .times(10 * 10 ** TokenConfig[token].decimals)
    .toString();
  contract[token].methods
    .approve(toAddress, amount)
    .send({ from: address.value })
    .then((res) => {
        return ElNotification({
            title: 'Success',
            message: '授权成功',
            type: 'success',
        })
      }).catch((err)=>{
        return ElNotification({
            title: 'Warning',
            message: '授权失败',
            type: 'warning',
        })
      })
    .finally(() => {
      inAllowance.value = false;
    });
}
function pledge(amount, PledgeName) {
    console.log(PledgeName,amount)
  if (PledgeName === "usdtPledge" || PledgeName === "ethPledge") {
    inPledge.value = true;
  } else {
    inLPPledge.value = true;
  }
  if (PledgeName === "ethPledge") {
    return contract.CryptoBrainMain.methods[PledgeName]()
      .send({ from: address.value, value: amount })
      .then((res) => {
        return ElNotification({
            title: 'Success',
            message: '质押成功',
            type: 'success',
        })
      }).catch((err)=>{
        return ElNotification({
            title: 'Warning',
            message: '质押失败',
            type: 'warning',
        })
      }).finally(() => {
        if (PledgeName === "usdtPledge" || PledgeName === "ethPledge") {
          inPledge.value = false;
        } else {
          inLPPledge.value = false;
        }
      });
  }
  contract.CryptoBrainMain.methods[PledgeName](amount)
    .send({ from: address.value })
    .then((res) => {
      console.log(res);
    })
    .finally(() => {
      if (PledgeName === "usdtPledge" || PledgeName === "ethPledge") {
        inPledge.value = false;
      } else {
        inLPPledge.value = false;
      }
    });
}
function subscribe() {
  contract.USDT.events
    .Approval({
      filter: {},
      fromBlock: "latest",
    })
    .on("data", function (event) {
      console.log(event.returnValues.owner);
      if (event.returnValues.owner === address.value) {
        allowanceUSDT.value = new BigNumber(event.returnValues.value).div(
          10 ** TokenConfig.USDT.decimals
        );
      }
      console.log(event.returnValues.value); // same results as the optional callback above
    });
  contract.CRBLP.events
    .Approval({
      filter: {},
      fromBlock: "latest",
    })
    .on("data", function (event) {
      console.log(event.returnValues.owner);
      if (event.returnValues.owner === address.value) {
        allowanceCRBLP.value = new BigNumber(event.returnValues.value).div(
          10 ** TokenConfig.CRBLP.decimals
        );
      }
      console.log(event.returnValues.value); // same results as the optional callback above
    });
  contract.CZZLP.events
    .Approval({
      filter: {},
      fromBlock: "latest",
    })
    .on("data", function (event) {
      console.log(event.returnValues.owner);
      if (event.returnValues.owner === address.value) {
        allowanceCZZLP.value = new BigNumber(event.returnValues.value).div(
          10 ** TokenConfig.CZZLP.decimals
        );
      }
      console.log(event.returnValues.value); // same results as the optional callback above
    });
}
function verify() {
    if(!address.value){
        return ElNotification({
            title: 'Info',
            message: '请链接钱包',
            type: 'warning',
        })
    }
  if (inPledge.value) {
    return ElNotification({
        title: 'Info',
        message: '请勿重复提交',
        type: 'info',
    })
  }
  if (!amount.value) {
    return ElNotification({
        title: 'Info',
        message: '请输入要质押的数量',
        type: 'info',
    })
  }
  if (new BigNumber(amount.value).lte(0)) {
    return ElNotification({
        title: 'Info',
        message: '质押数量必须大于0',
        type: 'info',
    })
  }
  let balanceOf =
    Type.value === "USDT" ? balanceOfUSDT.value : balanceOfEHT.value;
  if (new BigNumber(amount.value).gt(balanceOf)) {
    return ElNotification({
        title: 'Info',
        message: '质押数量超出可用余额',
        type: 'info',
    })
  }
  let Equivalent = new BigNumber(amount.value).times(
    10 ** TokenConfig[Type.value].decimals
  );
  pledge(
    Equivalent.toString(),
    Type.value === "USDT" ? "usdtPledge" : "ethPledge"
  );
}
function LPverify() {
    if(!address.value){
        return ElNotification({
            title: 'Info',
            message: '请链接钱包',
            type: 'warning',
        })
    }
  if (inLPPledge.value) {
    return ElNotification({
        title: 'Info',
        message: '交易中请勿重复提交',
        type: 'info',
    })
  }
  if (!LPAmount.value) {
    return ElNotification({
        title: 'Info',
        message: '请输入要质押的数量',
        type: 'info',
    })
  }
  if (new BigNumber(LPAmount.value).lte(0)) {
    return ElNotification({
        title: 'Info',
        message: '质押数量必须大于0',
        type: 'info',
    })
  }
  let balanceOf =
    LPType.value === "CRBLP" ? balanceOfCRBLP.value : balanceOfCZZLP.value;
  if (new BigNumber(LPAmount.value).gt(balanceOf)) {
    return ElNotification({
        title: 'Info',
        message: '质押数量超出可用余额',
        type: 'info',
    })
  }
  let Equivalent = new BigNumber(LPAmount.value).times(
    10 ** TokenConfig[LPType.value].decimals
  );
  pledge(
    Equivalent.toString(),
    LPType.value === "CRBLP" ? "crbLpPledge" : "czzLpPledge"
  );
}
watch(
  address,
  (address) => {
    if (address) {
    if(Object.keys(contract).length === 0){
        init()
      }
      getStakeInfo()
      //获取余额
      getBalanceOf(address, "USDT");
      getBalanceOf(address, "CRBLP");
      getBalanceOf(address, "CZZLP");
      getAllowance(contractAddress.CryptoBrainMain, "USDT");
      getAllowance(contractAddress.CryptoBrainMain, "CRBLP");
      getAllowance(contractAddress.CryptoBrainMain, "CZZLP");
      subscribe();
      web3.eth.getBalance(address).then((res) => {
        balanceOfEHT.value = new BigNumber(res).div(10 ** 18);
        console.log(new BigNumber(res).div(10 ** 18).toString(), "ETH");
      });
    }
  },
  { immediate: true }
);
// console.log(contract)
</script>

<template>
  <div class="Stake">
    <div class="StakeTitle">Stake CRB Ether</div>
    <div class="StakeSubTitle">
      Stake ETH or USDT and receive CRB while staking.
    </div>
    <div class="StakeItem">
      <div class="putBox">
        <div class="label">Type</div>
        <div class="btnRow">
          <div class="bgBtn flexCenter" @click="changeType('ETH')">
            <div :class="['flexCenter', { Active: Type !== 'ETH' }]">ETH</div>
          </div>
          <div class="bgBtn flexCenter" @click="changeType('USDT')">
            <div :class="['flexCenter', { Active: Type !== 'USDT' }]">USDT</div>
          </div>
        </div>
        <div class="label">Date</div>
        <div class="btnRow">
          <div class="bgBtn flexCenter">6 day</div>
        </div>
        <div class="label">Locked amount</div>
        <input
          type="text"
          class="amount"
          v-model="amount"
          @input="($event) => changeNumPut($event, 'amount')"
        />

        <div
          class="submit flexCenter"
          v-if="ifApprove"
          @click="approve(contractAddress.CryptoBrainMain, Type)"
        >
          <svg viewBox="25 25 50 50" v-if="inAllowance">
            <circle cx="50" cy="50" r="20"></circle>
          </svg>
          <span> approve </span>
        </div>
        <div class="submit flexCenter" v-else @click="verify">
          <svg viewBox="25 25 50 50" v-if="inPledge">
            <circle cx="50" cy="50" r="20"></circle>
          </svg>
          <span> Submit </span>
        </div>
      </div>
      <div class="StakeInfo">
        <div class="InfoRow">
          <span>Stake Date</span>
          <span>{{ StakeInfo[Type] ? dateFormat('YYYY-mm-dd HH:MM',new Date(StakeInfo[Type].createTime)) : "--" }}</span>
        </div>
        <div class="InfoRow">
          <span>Value Date</span>
          <span>{{ StakeInfo[Type] ? dateFormat('YYYY-mm-dd HH:MM',new Date(StakeInfo[Type].intBearing)) : "--" }}</span>
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
    <div class="StakeTitle interval">Stake CZZ Ether</div>
    <div class="StakeSubTitle">
      Stake XX-ETH or YY-ETH and receive CZZ while staking.
    </div>
    <div class="StakeItem">
      <div class="putBox">
        <div class="label">Type</div>
        <div class="btnRow">
          <div class="bgBtn flexCenter" @click="changeLPType('CRBLP')">
            <div :class="['flexCenter', { Active: LPType !== 'CRBLP' }]">
              CRB+ETH/LP
            </div>
          </div>
          <div class="bgBtn flexCenter" @click="changeLPType('CZZLP')">
            <div :class="['flexCenter', { Active: LPType !== 'CZZLP' }]">
              CZZ+ETH/LP
            </div>
          </div>
        </div>
        <div class="label">Date</div>
        <div class="btnRow">
          <div class="bgBtn flexCenter">30 day</div>
        </div>
        <div class="label">Locked amount</div>
        <input
          type="text"
          class="amount"
          v-model="LPAmount"
          @input="($event) => changeNumPut($event, 'LPAmount')"
        />

        <div
          class="submit flexCenter"
          v-if="ifLPApprove"
          @click="approve(contractAddress.CryptoBrainMain, LPType)"
        >
          <svg viewBox="25 25 50 50" v-if="inAllowance">
            <circle cx="50" cy="50" r="20"></circle>
          </svg>
          <span> approve </span>
        </div>
        <div class="submit flexCenter" v-else @click="LPverify">
          <svg viewBox="25 25 50 50" v-if="inLPPledge">
            <circle cx="50" cy="50" r="20"></circle>
          </svg>
          <span> Submit </span>
        </div>
      </div>
      <div class="StakeInfo">
        <div class="InfoRow">
          <span>Stake Date</span>
          <span>{{ StakeInfo[LPType] ? dateFormat('YYYY-mm-dd HH:MM',new Date(StakeInfo[LPType].createTime)) : "--" }}</span>
        </div>
        <div class="InfoRow">
          <span>Value Date</span>
          <span>{{ StakeInfo[LPType] ? dateFormat('YYYY-mm-dd HH:MM',new Date(StakeInfo[LPType].intBearing)) : "--" }}</span>
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

<style lang="scss" scoped>
.Stake {
  background: #27173a;
  min-height: 100vh;
  padding-top: 10rem;
  @media (max-width: 767px) {
    padding-top: 20rem;
  }
  .StakeTitle {
    font-size: 1.5rem;
    line-height: 1;
    color: #ffffff;
    text-align: center;
    margin-top: 3.5rem;
    @media (max-width: 1024px) {
      font-size: 3rem;
    }
    @media (max-width: 425px) {
      font-size: 4rem;
    }
  }
  .StakeSubTitle {
    font-size: 14px;
    line-height: 1;
    color: rgba(255, 255, 255, 0.494714);
    text-align: center;
    margin-top: 8px;
    @media (max-width: 425px) {
      font-size: 12px;
    }
  }
  .StakeItem {
    display: flex;
    flex-direction: column;
    width: 37.5rem;
    background: #1d2444;
    border-radius: 2.5rem;
    margin: 20px auto 0;
    @media (max-width: 768px) {
      width: 45rem;
    }
    @media (max-width: 425px) {
      width: 65rem;
    }
    @media (max-width: 375px) {
      width: 80rem;
    }
    .putBox {
      flex: 1;
      padding: 3.4rem 4rem 0;
      box-sizing: border-box;
      .label {
        font-size: 14px;
        line-height: 1.2;
        color: #ffffff;
      }
      .btnRow {
        display: flex;
        justify-content: space-between;
        margin: 14px 0 30px;
        // .bgBtn {
        //   background: linear-gradient(90deg, #536dfe 0%, #b41fff 100%);
        //   border-radius: 0.6rem;
        //   width: 11rem;
        //   height: 2.8rem;
        //   color: #ffffff;
        //   @media (max-width: 768px) {
        //     width: 16rem;
        //     height: 4rem;
        //   }
        //   @media (max-width: 425px) {
        //     width: 24rem;
        //     height: 6rem;
        //   }
        //   @media (max-width: 375px) {
        //     width: 30rem;
        //     height: 8rem;
        //   }
        // }
        .bgBtn {
        cursor: pointer;
          background: linear-gradient(90deg, #536dfe 0%, #b41fff 100%);
          border-radius: 0.6rem;
          overflow: hidden;
          padding: 1px;
          color: #ffffff;
          width: 11rem;
          height: 2.8rem;
          @media (max-width: 768px) {
            width: 16rem;
            height: 4rem;
          }
          @media (max-width: 425px) {
            width: 24rem;
            height: 6rem;
          }
          @media (max-width: 375px) {
            width: 30rem;
            height: 8rem;
          }
          .Active {
            background: #1d2444;
            width: 100%;
            height: 100%;
            border-radius: 0.6rem;
          }
        }
      }
      .amount {
        width: 100%;
        height: 2.8rem;
        border-radius: 0.6rem;
        background: rgba(41, 50, 95, 1);
        // mix-blend-mode: overlay;
        // opacity: 0.4;
        border: none;
        margin-top: 14px;
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
        cursor: pointer;
        width: 100%;
        background: linear-gradient(90deg, #536dfe 0%, #b41fff 100%);
        border-radius: 0.6rem;
        height: 2.8rem;
        color: #fff;
        margin: 2.3rem 0 1.7rem;
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
.flexCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
svg {
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
