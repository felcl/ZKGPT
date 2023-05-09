<template>
   <div class="History">
    <div class="StakeTitle">History</div>
    <div class="HistoryInfo">
        <div class="tabs">
            <div class="tabItem flexCenter" :class="{'tabActive':tabVal === 1}" @click="changeTab(CRBrewardList,1)">CRB</div>
            <div class="tabItem flexCenter" :class="{'tabActive':tabVal === 2}" @click="changeTab(CZZrewardList,2)">CZZ</div>
            <div class="tabItem flexCenter" :class="{'tabActive':tabVal === 3}" @click="changeTab(INVTERrewardList,3)">Withdraw</div>
        </div>
        <div class="HistoryList">
            <div class="HistoryItem" v-for="item in RendList">
                <div>
                    <div>{{tabVal !== 3 ? 'STAKE':'INVTER'}}</div>
                    <div>{{ item.symbol }}</div>
                </div>
                <div class="right">
                    <div>+{{ item.amount }} {{ item.symbol }}</div>
                    <div>{{ dateFormat('YYYY-mm-dd HH:MM',new Date(item.createTime)) }}</div>
                </div>
            </div>
        </div>
        
    </div>
  </div>
</template>

<script setup>
import Axios from '../Axios';
import { useStore } from "vuex";
import { watch, computed, ref ,reactive,} from "vue";
import { dateFormat} from '../utils/tool'
const store = useStore();
const tabVal = ref(1)
const CRBrewardList = ref([])
const RendList = ref([])
const CZZrewardList = ref([])
const INVTERrewardList = ref([])
const token = computed(() => {
  return store.state.token;
});
const address = computed(() => {
  return store.state.address;
});
watch(token,(token)=>{
    if(token){
        Axios.post(`/api/cryptobrain/common/rewardList/${address.value}/1`,{
                "page": 1,
                "rows": 10
        }).then(res=>{
            console.log(res,'领取记录')
            if(!res.data.error){
                CRBrewardList.value = res.data.result.list
                if(tabVal.value === 1){
                    RendList.value = res.data.result.list
                }
            }
        })
        Axios.post(`/api/cryptobrain/common/rewardList/${address.value}/2`,{
            "page": 1,
            "rows": 10
        }).then(res=>{
            console.log(res,'领取记录')
            if(!res.data.error){
                CZZrewardList.value = res.data.result.list
                if(tabVal.value === 2){
                    RendList.value = res.data.result.list
                }
            }
        })
        Axios.post(`/api/cryptobrain/common/rewardList/${address.value}/3`,{
            "page": 1,
            "rows": 10
        }).then(res=>{
            console.log(res,'领取记录')
            if(!res.data.error){
                INVTERrewardList.value = res.data.result.list
                if(tabVal.value === 3){
                    RendList.value = res.data.result.list
                }
            }
        })
    }
},{
    immediate:true
})
function changeTab(List,index){
    tabVal.value = index
    RendList.value = List
}
</script>

<style lang="scss" scoped>
    .tabs{
        margin: 3rem 4rem 0; 
        height: 58px;
        background: #293356;
        border-radius: 29px;
        padding: 4px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        @media (max-width:1024px) {
            height: 48px;
        }
        @media (max-width:768px) {
            height: 43px;
        }
        .tabItem{
            color: #FFFFFF;
            font-size: 14px;
            width: 125px;
            height:100%;
            border-radius: 29px;
            cursor: pointer;
        }
        .tabActive{
            background: #1D2444;
        }
    }
    .HistoryList{
        margin: 55px 30px;
        .HistoryItem{
            display: flex;
            justify-content:space-between;
            font-size: 12px;
            color: #FFFFFF;
            margin-bottom: 16px;
            .right{
                text-align: right;
            }
        }
        .HistoryItem:nth-last-child(1){
            margin-bottom: 0;
        }
    }
</style>