<script setup>
import { useStore } from "vuex";
import { watch , computed , ref} from "vue";
import Axios from '../Axios'
import { AddrHandle , dateFormat} from '../utils/tool'
const store = useStore();
const InvitationList = ref([])
const withdrawList = ref([])
const type = ref(1)
const address = computed(() => {
  return store.state.address;
});
const token = computed(() => {
  return store.state.token;
});
function getInvitationList(){
    Axios.get(`/api/cryptobrain/common/invites/${address.value}`).then(res=>{
        InvitationList.value = res.data.result
        console.log(res,"获取用户邀请列表")
    })
    
}
watch(
  address,
  (address) => {
    if (address) {
        getInvitationList()
    }
  },
  { immediate: true }
);
watch(
    token,
  (token) => {
    if (token) {
        Axios.post(`/api/cryptobrain/common/withdrawList`,{
        "page": 1,
        "rows": 10
        }).then(res=>{
            withdrawList.value = res.data.result
            console.log(res,"获取用户邀请列表")
        })
    }
  },
  { immediate: true }
);
</script>

<template>
    <div class="Team">
        <div class="title">Team</div>
        <div class="TeamBox">
            <div class="Totalpeople">
                Total people
            </div>
            <div class="TotalNum">7</div>
            <div class="Link">http://sadfs.dadsf.com/sdadsf <img src="../assets/Home/copy.png" alt=""></div>
            <div class="Receive">
                <div class="Award ">
                    <div class="Label">Award </div>
                    <div class="Num">2000  </div>
                </div>
                <div class="ReceiveBtn flexCenter">Receive</div>
            </div>
            <div class="Tabs">
                <div :class="['tabItem','flexCenter',{'active':type === 1}]" @click="type = 1">Invitation record</div>
                <div :class="['tabItem','flexCenter',{'active':type === 2}]" @click="type = 2">Pick up record</div>
            </div>
            <div class="record" v-for="item in InvitationList">
                <div class="left">{{ AddrHandle(item.token,7,7) }}</div>
                <div class="right">
                    <div>+{{ item.amount }}</div>
                    <div>{{dateFormat('YYYY-mm-dd HH:MM',new Date(item.createTime))}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.Team{
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
    .TeamBox{
        width: 37.5rem;
        padding-bottom: 5rem;
        min-height: 37.5rem;
        @media (max-width:1068px) {
            width: 50rem;
        }
        @media (max-width:768px) {
            width: 65rem;
        }
        @media (max-width:425px) {
            width: 90%;
        }
        margin:2rem auto 0;
        background: #1D2444;
        border-radius: 3.25rem 3.25rem 0 0px;
        overflow: hidden;
        .Totalpeople{
            color: #FFFFFF;
            font-size: 14px;
            text-align: center;
            margin-top: 18px;
        }
        .TotalNum{
            font-weight: 500;
            color: #FFFFFF;
            font-size: 2rem;
            text-align: center;
        }
        .Link{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.9rem;
            font-weight: 500;
            color: #FFFFFF;
            img{
                width: 16px;
                height: 16px;
                margin-left: 18px;
            }
        }
        .Receive{
            color: #FFFFFF;
            font-size: 20px;
            line-height: 1.5;
            display: flex;
            justify-content: space-between;
            margin: 30px 5rem 0;
            align-items: center;
            .Award{
                .Label{
                    font-size: 14px;
                }
                .Num{
                    font-size: 1.5rem;
                }
            }
            .ReceiveBtn{
                width: 8.9rem;
                height: 2.8rem;
                font-size: 1rem;
                font-weight: 400;
                color: #FFFFFF;
                background: linear-gradient(90deg, #536DFE 0%, #B41FFF 100%);
                border-radius: 0.6rem;
                @media (max-width:550px) {
                    width: 13rem;
                    height: 3.5rem;
                }
                @media (max-width:400px) {
                    width: 15rem;
                    height: 4.5rem;
                }
            }
        }
        .Tabs{
            margin:3rem auto 2rem;
            width: 23.35rem;
            height: 2.9rem;
            background: #293356;
            border-radius: 29px;
            padding:4px 6px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            @media (max-width:1068px) {
                width: 30rem;
                height: 4rem;
            }
            @media (max-width:768px) {
                margin:5rem auto 4rem;
                width: 45rem;
                height: 5rem;
            }
            @media (max-width:600px) {
                width: 55rem;
                height: 7rem;
            }
            @media (max-width:400px) {
                width: 70rem;
            }
            .tabItem{
                width: 9.75rem;
                @media (max-width:1068px) {
                    width: 12rem;
                }
                @media (max-width:768px) {
                    width: 18rem;
                }
                @media (max-width:600px) {
                    width: 23rem;
                    font-size: 12px;
                }
                @media (max-width:400px) {
                    width: 30rem;
                }
                height: 100%;
                border-radius: 1.45rem;
                color: #FFFFFF;
                font-size: 14px;
            }
            .active{
                background: #1D2444;
            }
        }
        .record{
            margin: 0 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            @media (max-width:768px) {
                margin: 0 3rem;
            }
            .left{
                color: #FFFFFF;
                font-size: 16px;
                @media (max-width:768px) {
                    font-size: 12px;
                }
            }
            .right{
                text-align: right;
                color: #FFFFFF;
                font-size: 16px;
                @media (max-width:768px) {
                    font-size: 12px;
                }
            }
        }
    }
}
</style>