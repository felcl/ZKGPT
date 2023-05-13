<script setup>
import '../assets/style/Rewares.scss'
import Axios from '../Axios'
import { useStore } from "vuex";
import { watch, computed, ref ,reactive} from "vue";
import { ElNotification } from 'element-plus'
import copy from "copy-to-clipboard";
import {useRouter,useRoute} from 'vue-router'
import { AddrHandle , dateFormat , NumSplic} from '../utils/tool'
const store = useStore();
const router = useRouter()
const InviteUrl = ref('')
const CRBAmount = ref(0)
const CZZAmount = ref(0)
const rbalance = ref(0);
const zbalance = ref(0);
const income = ref([])
const address = computed(() => {
  return store.state.address;
});
const token = computed(() => {
  return store.state.token;
});
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
                resArr.forEach(element => {
                    incomeArr.push(...element.data.result.list)
                });
                income.value = incomeArr
            })
            getBalance()
            Axios.get('/api/cryptobrain/common/getInviteCode').then(res=>{
                console.log(res,"用户邀请码")
                InviteUrl.value = location.origin+'/TEST/#/?Invite='+res.data.result
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
        
    }else{
        ElNotification({
            title: 'Warning',
            message: '请链接钱包',
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
        message: '复制成功',
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
                <span>{{ address ? AddrHandle(address,7,7) : '请链接钱包'}}</span>
                <img @click="copyFun(address)" src="../assets/Home/copy.png" alt="">
            </div>
            <div class="link"> <span>{{ InviteUrl ? AddrHandle(InviteUrl,14,14) : '登录后获取邀请码'}} <img src="../assets/Home/copy.png"  @click="copyFun(InviteUrl)" alt=""></span> <div class="Team flexCenter" @click="goPath('/Team')">Team</div></div>
        </div>
        <div class="balance">
            <div class="balanceItem">
                <div class="label">CRB</div>
                <div class="Num">{{ NumSplic(rbalance,2) }}</div>
            </div>
            <div class="balanceItem">
                <div class="label">CZZ</div>
                <div class="Num">{{ NumSplic(zbalance,2) }}</div>
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
                <div>STAKE</div>
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