<script setup>
import '../assets/style/Rewares.scss'
import Axios from '../Axios'
import { useStore } from "vuex";
import { watch, computed, ref ,reactive} from "vue";
const store = useStore();
import {useRouter,useRoute} from 'vue-router'
import { AddrHandle } from '../utils/tool'
const router = useRouter()
const address = computed(() => {
  return store.state.address;
});
watch(
  address,
  (address) => {
    if (address) {
        Promise.all([
            Axios.post(`/api/cryptobrain/common/rewardList/${address}/1`,{
                "page": 0,
                "rows": 0
            }),
            Axios.post(`/api/cryptobrain/common/rewardList/${address}/2`,{
                "page": 0,
                "rows": 0
            })
        ]).then(resArr=>{
            console.log(resArr,"收益信息")
        })
    }
  },
  { immediate: true }
);
const goPath=(path)=>{
  router.push(path)
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
                <span>{{AddrHandle('0x3Bd8CA9023897224b01fE25b33137b67A89ec70F',7,7)}}</span>
                <img src="../assets/Home/copy.png" alt="">
            </div>
            <div class="link"> <span>http://sadfs.dadsf.com/sdadsf <img src="../assets/Home/copy.png" alt=""></span> <div class="Team flexCenter" @click="goPath('/Team')">Team</div></div>
        </div>
        <div class="balance">
            <div class="balanceItem">
                <div class="label">CRB</div>
                <div class="Num">2000</div>
            </div>
            <div class="balanceItem">
                <div class="label">CZZ</div>
                <div class="Num">2000</div>
            </div>
            <div>
                <div class="Withdraw flexCenter">Withdraw</div>
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
        <div class="recordItem">
            <div>
                <div>STAKE</div>
                <div>CRB</div>
            </div>
            <div class="textRight">
                <div>+1221 CRB</div>
                <div>2023.02.22 12:11:11</div>
            </div>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>