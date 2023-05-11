<script setup>
import { onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import Axios from "./Axios";
import {ElNotification} from 'element-plus'
import { init, web3 ,contract,connect,changeNetwork} from "./web3";
import { useRouter, useRoute } from "vue-router";
import { signTypedData, createTypeData, DomainData } from "./Axios/login";
import { GetQueryString } from './utils/tool'
import {chainConfig} from './config'
import Layout from "./Layout/Layout.vue";
const router = useRouter();
const store = useStore();
const address = computed(() => {
  return store.state.address;
});
const token = computed(() => {
  return store.state.token;
});
watch(token, (token) => {
  if(!token && address.value){
    // gethasAddress(address.value)
  }
}, { immediate: true });
watch(
  address,
  async (address,oldaddress) => {
    console.log(address , oldaddress)
    if (address !== oldaddress && address) {
      gethasAddress(address)
      //初始化合约
      if(Object.keys(contract).length === 0){
        init()
      }
    }
  },
  // { immediate: true }
);
async function gethasAddress(address){
  console.log("判断用户是否存在")
  let chainId = await window.ethereum.request({ method: "eth_chainId" });
      let hasAddress = await Axios.get(
        `/api/cryptobrain/common/hasAddress/${address}`
      );
      if(chainId !== chainConfig.chainId){
        return
      }
      if (hasAddress.data.error) {
        // console.log('用户未注册请注册')
        register(address);
      }else{
        login(address)
      }
}
async function login(address){
  let chainId = await window.ethereum.request({ method: "eth_chainId" });
  const expireTime = new Date().getTime() + 10 * 60 * 1000; //设置注册10分钟有效时间
  const DEMO_TYPES = {
    UserRegister: [
      {
        type: "address",
        name: "owner",
      },
      {
        type: "uint256",
        name: "expireTime",
      },
    ],
  };
  const typedData = createTypeData(
    DEMO_TYPES,
    "UserRegister",
    new DomainData(
      "UserRegisterSign",
      "1.0",
      chainId,
      "0xc33ce8e76fa096ef83aa1f1b1952cafb405a7ff06ac6a3ebe59a8679c7ffc158"
    ),
    {
      owner: address,
      expireTime: expireTime,
    }
  );
  const [sign,err] = await signTypedData(web3, address, typedData).then(res=>{return [res,null]}).catch(err=>{return [null,err]});
  if(err && err.code){
    return ElNotification({
        title: 'Warning',
        message: '请签名否则部分数据无法获取',
        type: 'warning',
    })
  }
  // console.log(sign)
  // debugger
  let Register = await Axios.post("/api/cryptobrain/common/userLogin", {
    address: address,
    expireTime: expireTime,
    signature: sign.sig,
  })
  store.commit("SETTOKEN", Register.data.result.token);
}
async function register(address) {
  //router.currentRoute.value.query.address
  let inviteCode = GetQueryString('Invite') || "N953yICD"
  let chainId = await window.ethereum.request({ method: "eth_chainId" });
  const expireTime = new Date().getTime() + 10 * 60 * 1000; //设置注册10分钟有效时间
  const DEMO_TYPES = {
    UserRegister: [
      {
        type: "address",
        name: "owner",
      },
      {
        type: "uint256",
        name: "expireTime",
      },
    ],
  };
  const typedData = createTypeData(
    DEMO_TYPES,
    "UserRegister",
    new DomainData(
      "UserRegisterSign",
      "1.0",
      chainId,
      "0xc33ce8e76fa096ef83aa1f1b1952cafb405a7ff06ac6a3ebe59a8679c7ffc158"
    ),
    {
      owner: address,
      expireTime: expireTime,
    }
  );
  const sign = await signTypedData(web3, address, typedData);
  console.log(sign)
  debugger
  let Register = await Axios.post("/api/cryptobrain/common/userRegister", {
    address: address,
    expireTime: expireTime,
    inviteCode: inviteCode,
    signature: sign.sig,
  })
  store.commit("SETTOKEN", Register.data.result.token);
  console.log(Register)
}
onMounted(async () => {
  document.body.style.setProperty("--el-component-size", "2.8rem");
  // document.body.style.setProperty('--el-input-text-color', 'rgba(255, 255, 255, 0.617691)')
  // document.body.style.setProperty('--el-text-color-regular', 'rgba(255, 255, 255, 0.617691)')
  if(window.ethereum){
    //用户账号初始化合约
    let chainId = await window.ethereum.request({ method: "eth_chainId" });
    if(chainId !== chainConfig.chainId){
      store.commit('SETADDRESS','')
      changeNetwork(()=>{
        connect(async (address)=>{
          if(address){
              store.commit('SETADDRESS',address)
          }
        })
      })
    }else{
      connect(async (address)=>{
        if(address){
            store.commit('SETADDRESS',address)
            if(!token.value){
              gethasAddress(address)
            }
        }
      })
    }
    window.ethereum.on('connect', connectInfo=>{
      // if(connectInfo.chainId !== chainConfig.chainId){
      //   changeNetwork()
      // }
      console.log("链接",connectInfo)
    });
    //链改变事件
    window.ethereum.on('networkChanged', info=>{
      if(info === chainConfig.chainId){
        connect(address=>{
          if(address){
            store.commit('SETADDRESS',address)
          }
        })
      }else{
        store.commit('SETADDRESS','')
        changeNetwork(()=>{
          connect(address=>{
            if(address){
              store.commit('SETADDRESS',address)
            }
          })
        })
      }
      console.log('切换链',info)
      // this.chainId = info
    });
    // window.ethereum.on('disconnect', res=>{
    //   console.log("链接已断开",res)
    //   // store.commit('SETADDRESS','')
    // });
    window.ethereum.on('accountsChanged', accounts=>{
      if(accounts[0]){
          store.commit('SETADDRESS',accounts[0])
          changeNetwork()
      }else{
          store.commit('SETADDRESS','')
      }
      store.commit("SETTOKEN", '');
      console.log("切换账号",accounts)
    });
  }else{
    console.log("未安装钱包")
  }
});
</script>

<template>
  <Layout></Layout>
</template>

<style lang="scss" scoped></style>
