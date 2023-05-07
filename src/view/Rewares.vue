<script setup>
import '../assets/style/Rewares.scss'
import Axios from '../Axios'
import { useStore } from "vuex";
import { watch, computed, ref ,reactive} from "vue";
const store = useStore();
import { ElNotification } from 'element-plus'
import copy from "copy-to-clipboard";
import {useRouter,useRoute} from 'vue-router'
import { AddrHandle , dateFormat} from '../utils/tool'
const router = useRouter()
const InviteUrl = ref('')
const CRBAmount = ref(0)
const CZZAmount = ref(0)
const income = reactive([])
const address = computed(() => {
  return store.state.address;
});
const token = computed(() => {
  return store.state.token;
});
watch(
    token,
    (token)=>{
        if(token){
            Axios.get('/api/cryptobrain/common/getInviteCode').then(res=>{
                console.log(res,"用户邀请码")
                InviteUrl.value = location.href+'?Invite='+res.data.result
                // console.log(location.href+'?Invite='+res.data.result)
            })
        }
    },
    {immediate:true}
)
watch(
  address,
  (address) => {
    if (address) {
        Promise.all([
            Axios.post(`/api/cryptobrain/common/rewardList/${address}/1`,{
                "page": 1,
                "rows": 10
            }),
            Axios.post(`/api/cryptobrain/common/rewardList/${address}/2`,{
                "page": 1,
                "rows": 10
            })
        ]).then(resArr=>{
            resArr.forEach(element => {
                income.push(...element.data.result.list)
                element.data.result.list.forEach(item=>{
                    if(item.symbol === 'CRB'){
                        CRBAmount.value = CRBAmount.value += item.amount
                    }
                    if(item.symbol === 'CZZ'){
                        CZZAmount.value = CZZAmount.value += item.amount
                    }
                })
            });
            console.log(resArr,"收益信息")
        })
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
const Withdraw = function(symbol){
    Axios.post('/api/cryptobrain/common/userWithdraw',{
        "symbol": symbol,
        "withDrawAmount": 10
    }).then(res=>{
        console.log(res,"提现信息")
    })
}
</script>
<template>
  <div class="Rewares">
    <div class="StakeTitle">Stake XX Ether</div>
    <div class="StakeSubTitle">Stake XX-ETH or YY-ETH and receive YY while staking.</div>
    <div class="RewaresInfo">
        <div class="InfoRow">
            <div class="address">
                <div class="headImg">
                    <img src="" alt="">
                </div>
                <span>{{ address ? AddrHandle(address,7,7) : '请链接钱包'}}</span>
                <img @click="copyFun(address)" src="../assets/Home/copy.png" alt="">
            </div>
            <div class="link"> <span>{{ InviteUrl }} <img src="../assets/Home/copy.png"  @click="copyFun(InviteUrl)" alt=""></span> <div class="Team flexCenter" @click="goPath('/Team')">Team</div></div>
        </div>
        <div class="balance">
            <div class="balanceItem">
                <div class="label">CRB</div>
                <div class="Num">{{ CRBAmount }}</div>
            </div>
            <div class="balanceItem">
                <div class="label">CZZ</div>
                <div class="Num">{{ CZZAmount }}</div>
            </div>
            <div>
                <div class="Withdraw flexCenter" @click="Withdraw('CRB')">Withdraw</div>
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
                <span class="more">more></span>
            </div>
        </div>
        <div class="recordItem" v-for="item in income">
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