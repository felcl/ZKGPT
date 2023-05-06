<script setup>
import { onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import Axios from "./Axios";
import { init, web3 } from "./web3";
import { signTypedData, createTypeData, DomainData } from "./Axios/login";
import Layout from "./Layout/Layout.vue";
const store = useStore();
const address = computed(() => {
  return store.state.address;
});
const token = computed(() => {
  return store.state.token;
});
watch(token, (token) => {
  if(token){
    
  }
}, { immediate: true });
watch(
  address,
  async (address) => {
    if (address) {
      // Axios.get(`/api/cryptobrain/common/hasAddress/${address}`).then(res=>{
      //   console.log(res,"用户是否注册")
      // })
      // Axios.post('/api/cryptobrain/common/userLogin',{
      //   "address": address,
      //   "expireTime": 0,
      //   "signature": "string"
      // }).then(res=>{
      //   console.log(res)
      // })
      // Axios.post('/api/cryptobrain/common/userRegister',{
      //   "address": "string",
      //   "expireTime": 0,
      //   "inviteCode": "string",
      //   "signature": "string"
      // }).then(res=>{
      //   console.log(res,"用户注册")
      // })
    }
  },
  { immediate: true }
);
onMounted(() => {
  document.body.style.setProperty("--el-component-size", "2.8rem");
  // document.body.style.setProperty('--el-input-text-color', 'rgba(255, 255, 255, 0.617691)')
  // document.body.style.setProperty('--el-text-color-regular', 'rgba(255, 255, 255, 0.617691)')
  // if(window.ethereum){
  //   //用户账号初始化合约
  //   init(address=>{
  //     if(address){
  //       store.commit('SETADDRESS',address)
  //     }
  //   })
  //   window.ethereum.on('connect', connectInfo=>{
  //     console.log("链接",connectInfo)
  //   });
  //   //链改变事件
  //   window.ethereum.on('chainChanged', info=>{
  //     // this.chainId = info
  //   });
  //   window.ethereum.on('disconnect', res=>{
  //     console.log("链接已断开",res)
  //     store.commit('SETADDRESS','')
  //   });
  //   window.ethereum.on('accountsChanged', accounts=>{
  //     if(accounts[0]){
  //         store.commit('SETADDRESS',accounts[0])
  //     }else{
  //         store.commit('SETADDRESS','')
  //     }
  //     console.log("切换账号",accounts)
  //   });
  // }else{
  //   console.log("未安装钱包")
  // }
});
</script>

<template>
  <Layout></Layout>
</template>

<style lang="scss" scoped></style>
