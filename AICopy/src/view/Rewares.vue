<script setup>
import '../assets/style/Rewares.scss'
import Axios from '../Axios'
import { useStore } from "vuex";
import { watch, computed, ref ,reactive,onMounted,onUnmounted} from "vue";
import { ElNotification } from 'element-plus'
import copy from "copy-to-clipboard";
import { contract , init} from "../web3";
import {useRouter,useRoute} from 'vue-router'
import { AddrHandle , dateFormat , NumSplic} from '../utils/tool'
const store = useStore();
const router = useRouter()
const InviteUrl = ref('')
const CRBAmount = ref(0)
const CZZAmount = ref(0)
const rbalance = ref(0);
const zbalance = ref(0);
const pledgeCRB = ref(false);
const pledgeCZZ = ref(false);
const showCountdownCRB = ref(false);
const showCountdownCZZ = ref(false);
const income = ref([])
const timeDowm = ref('')
const address = computed(() => {
  return store.state.address;
});
const token = computed(() => {
  return store.state.token;
});
let Time = ref(null)
onMounted(()=>{
    Time = setInterval(()=>{
        timeDowm.value = countdown()
    },1000)
})
onUnmounted(()=>{
    if(Time !== null){
        clearInterval(Time)
    }
})
watch(
    token,
    (token)=>{
        CRBAmount.value = 0
        CZZAmount.value = 0
        income.value = []
        InviteUrl.value = ""
        rbalance.value = 0
        zbalance.value = 0
        if(token){
            Axios.post('/api/cryptobrain/common/account').then(res=>{
                CRBAmount.value = res.data.result.rbalance
                CZZAmount.value = res.data.result.zbalance
                console.log(res,"用户账户信息")
            })
            Axios.post(`/api/cryptobrain/common/nextReward/${address.value}`).then(res=>{
                console.log(res,"收益是否发放完成")
                if(res.data.code === 200){
                    showCountdownCRB.value = res.data.result.CRB
                    showCountdownCZZ.value = res.data.result.CZZ
                }
            })
            Promise.all([
                Axios.post(`/api/cryptobrain/common/rewardList/${address.value}/1`,{
                    "page": 1,
                    "rows": 10
                }),
                Axios.post(`/api/cryptobrain/common/rewardList/${address.value}/2`,{
                    "page": 1,
                    "rows": 10
                }),
                Axios.post(`/api/cryptobrain/common/withdrawList`,{
                    "page": 1,
                    "rows": 10
                })
            ]).then(resArr=>{
                let incomeArr = []
                resArr.forEach((element,index) => {
                    if(index === 2){
                        element.data.result.list = element.data.result.list.map(item=>{
                            return {
                                ...item,
                                amount:item.wamount,
                                symbol:item.wsymbol,
                                type:'ws'
                            }
                        })
                        console.log(element.data.result.list)
                    }
                    incomeArr.push(...element.data.result.list)
                });
                console.log(incomeArr,"--------------")
                incomeArr.sort((itemA,itemB)=>{
                    return itemB.createTime - itemA.createTime
                })
                income.value = incomeArr
            })
            getBalance()
            Axios.get('/api/cryptobrain/common/getInviteCode').then(res=>{
                console.log(res,"用户邀请码")
                InviteUrl.value = location.origin+ location.pathname+'#/?Invite='+res.data.result
                console.log(location)
            })
        }
    },
    {immediate:true}
)
watch(
  address,
  (address) => {
    if (address) {
        if(Object.keys(contract).length === 0){
            init()
        }
        contract.CryptoBrainMain.methods
        .userPledgeInfo(address)
        .call()
        .then((res) => {
            if(res.ethAmount !== '0' || res.usdtAmount !== '0'){
                pledgeCRB.value = true
            }
            if(res.crblpAmount !== '0' || res.czzlpAmount !== '0'){
                pledgeCZZ.value = true
            }
          console.log(res, "用户质押量");
        });
    }else{
        ElNotification({
            title: 'Warning',
            message: 'Please link the wallet',
            type: 'warning',
        })
    }
  },
  { immediate: true }
);
const goPath=(path)=>{
  router.push(path)
}
const copyFun = (text)=>{
    copy(text)
    ElNotification({
        title: 'Success',
        message: 'Replicating Success',
        type: 'success',
    })
}
function getBalance(){
    Axios.post('/api/cryptobrain/common/account').then(res=>{
        rbalance.value = res.data.result.rbalance
        zbalance.value = res.data.result.zbalance
        console.log(res,"用户账户信息")
    })
}
function countdown(){
    let nowTime = new Date().getTime()
    let endTime = Math.ceil(nowTime / 86400000) * 86400000 -28800000
    var lefttime = endTime - nowTime
    return Math.floor(lefttime/(1000*60*60)%24)+':'+Math.floor(lefttime/(1000*60)%60)+':'+Math.floor(lefttime/1000%60)
}
</script>
<template>
  <div class="Rewares">
    <div class="StakeTitle">Reward History</div>
    <div class="StakeSubTitle">Track your Ethereum staking rewards with AIGPT.</div>
    <div class="RewaresInfo">
        <div class="InfoRow">
            <div class="address">
                <div class="headImg">
                    <img src="" alt="">
                </div>
                <span>{{ address ? AddrHandle(address,7,7) : 'Please link the wallet'}}</span>
                <img @click="copyFun(address)" src="../assets/Home/copy.png" alt="">
            </div>
            <div class="link"> <span>{{ InviteUrl ? AddrHandle(InviteUrl,14,14) : ''}} <img src="../assets/Home/copy.png" v-if="InviteUrl" @click="copyFun(InviteUrl)" alt=""></span> <div class="Team flexCenter" @click="goPath('/Team')">Team</div></div>
        </div>
        <div class="balance">
            <div class="balanceItem">
                <div class="label">CRB</div>
                <div class="Num">{{ NumSplic(rbalance,2) }}</div>
                <div class="countdown">{{showCountdownCRB ? timeDowm:' '}}</div>
            </div>
            <div class="balanceItem">
                <div class="label">CZZ</div>
                <div class="Num">{{ NumSplic(zbalance,2) }}</div>
                <div class="countdown" >{{showCountdownCZZ ? timeDowm:" " }}</div>
            </div>
            <div>
                <div class="Withdraw flexCenter" @click="goPath('/Withdraw')">Withdraw</div>
                <div class="Withdraw flexCenter" style="margin-top: 0.5rem;">
                    <div class="content flexCenter" @click="goPath('/Redeem')">
                        Redeem
                    </div>
                    </div>
            </div>
        </div>
        <div class="HistoryLabel">
            <div class="topbar">
                <span class="label">History</span>
                <span class="more" @click="goPath('/History')">more></span>
            </div>
        </div>
        <div class="recordItem" v-for="item in income.slice(0,15)">
            <div>
                <div>{{item.type === 'ws' ? 'WITHDRAW': 'STAKE'}}</div>
                <div>{{item.symbol}}</div>
            </div>
            <div class="textRight">
                <div>+{{ item.amount + " " + item.symbol }}</div>
                <div>{{dateFormat('YYYY-mm-dd HH:MM',new Date(item.createTime))}}</div>
            </div>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>