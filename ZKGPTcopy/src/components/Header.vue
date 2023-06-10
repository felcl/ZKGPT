<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { AddrHandle } from "../utils/tool";
import { connect, web3 ,changeNetwork} from "../web3";
// import { signTypedData, createTypeData, DomainData } from "../Axios/login";
// import Axios from "../Axios";
import {chainConfig} from '../config'
import { useRouter, useRoute } from "vue-router";
import HomeActiveIcon from "../assets/Home/HomeActiveIcon.png";
import HomeIcon from "../assets/Home/HomeIcon.png";
import StakeActiveIcon from "../assets/Home/StakeActiveIcon.png";
import StakeIcon from "../assets/Home/StakeIcon.png";
import Rewards from "../assets/Home/Rewards.png";
import RewardsActive from "../assets/Home/RewardsActive.png";
const router = useRouter();
const route = useRoute();
const store = useStore();
let address = computed(() => {
  return store.state.address;
});
const goPath = (path) => {
  router.push(path);
};
const Connect = async () => {
  if (!address.value) {
    let chainId = await window.ethereum.request({ method: "eth_chainId" });
    if(chainId !== chainConfig.chainId){
        changeNetwork()
        store.commit('SETADDRESS','')
    }else{
      connect(async (address) => {
        if(address){
            store.commit('SETADDRESS',address)
          }
      });
    }
  }
};

const leftMenuSwitch = () => {
  store.commit("SETLEFTMENU", !store.state.leftMenu);
};
onMounted(() => {
  console.log(route.path);
});
</script>

<template>
  <div class="Header">
    <div class="HeaderLeft">
      <img src="../assets/Home/logo.png" class="Logo" alt="" />
      <div class="menu">
        <div class="menuItem" :class="{ActiveMenuItem:route.path === '/'}" @click="goPath('/')">
          <div>
            <img :src="route.path === '/' ? HomeActiveIcon : HomeIcon" alt="" />
            <span>HOME</span>
          </div>
          <div class="ActiveBorder"></div>
        </div>
        <div class="menuItem"  :class="{ActiveMenuItem:route.path === '/Stake'}" @click="goPath('/Stake')">
          <div>
            <img
              :src="route.path === '/Stake' ? StakeActiveIcon : StakeIcon"
              alt=""
            />
            <span>STAKE</span>
          </div>
          <div class="ActiveBorder"></div>
        </div>
        <div class="menuItem"  :class="{ActiveMenuItem:route.path === '/Rewares'}" @click="goPath('/Rewares')">
          <div>
            <img
              :src="route.path === '/Rewares' ? RewardsActive : Rewards"
              alt=""
            />
            <span>REWARDS</span>
          </div>
          <div class="ActiveBorder"></div>
        </div>
      </div>
    </div>
    <div class="connect" @click="Connect">
      <div class="content" :class="['content', { Connected: !!address }]">
        {{ address ? AddrHandle(address) : "Connect wallet" }}
      </div>
    </div>
    <img
      class="MenuIcon"
      @click="leftMenuSwitch"
      src="../assets/Home/menu.png"
      alt=""
    />
  </div>
</template>

<style lang="scss" scoped>
.Header {
  max-width: 1400px;
  width: 100%;
  // margin: 0 13rem;
  box-sizing: border-box;
  height: 5.5rem;
  position: absolute;
  top: 2.75rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1450px) {
    padding: 0 5rem;
  }
  @media (max-width: 767px) {
    height: 8.5rem;
  }
  .HeaderLeft {
    display: flex;
  }
  .connect {
    width: 9.5rem;
    height: 2.4rem;
    background: linear-gradient(90deg, #536dfe 0%, #b41fff 100%);
    border-radius: 0.55rem;

    font-size: 0.9rem;
    line-height: 1rem;
    padding: 1px;
    .content {
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.55rem;
      width: 100%;
      height: 100%;
    }
    .Connected {
      background: #27173a;
    }
    @media (max-width: 1024px) {
      width: 12rem;
    }
    @media (max-width: 488px) {
      display: none;
    }
  }
  .Logo {
    width: 8.75rem;
    @media (max-width: 1024px) {
      width: 10rem;
    }
    @media (max-width: 768px) {
      width: 12rem;
    }
    @media (max-width: 488px) {
      width: 14rem;
    }
  }
  .MenuIcon {
    display: none;
    @media (max-width: 488px) {
      width: 6rem;
      display: block;
    }
  }
  .menu {
    margin-left: 3.2rem;
    display: flex;
    @media (max-width: 488px) {
      // margin-left: 2.5rem;
      display: none;
    }
    .menuItem {
      display: flex;
      flex-direction: column;
      justify-content: center;
      // align-items: center;
      margin-right: 3.2rem;
      cursor: pointer;
      img {
        width: 18px;
        height: 18px;
        @media (max-width: 768px) {
          width: 2rem;
          height: 2rem;
        }
        @media (max-width: 488px) {
          width: 4rem;
          height: 4rem;
        }
      }
      span {
        font-size: 18px;
        line-height: 1;
        color: #ffffff;
        margin-left: 0.6rem;
        @media (max-width: 768px) {
          font-size: 2rem;
        }
        @media (max-width: 488px) {
          font-size: 2.5rem;
        }
      }
    }

    .ActiveMenuItem{
      span{
        color: #B220FF;
      }
      .ActiveBorder{
        border-bottom: 1px solid #B220FF;
        width: 100%;
      }
    }
    .ActiveBorder{
      border: 1px solid transparent;
      width: 0px;
      transition: all 0.3s;
    }
    .menuItem:hover .ActiveBorde{
        border-bottom: 1px solid #B220FF;
        width: 100%;
    }
  }
}
</style>
