<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import {init} from './web3'
import Layout from './Layout/Layout.vue'
const store = useStore()
onMounted(()=>{
    if(window.ethereum){
      //用户账号初始化合约
      init(address=>{
        if(address)
        store.commit('SETADDRESS',address)
      })
      window.ethereum.on('connect', connectInfo=>{
        console.log("链接",connectInfo)
      });
      //链改变事件
      window.ethereum.on('chainChanged', info=>{
        // this.chainId = info
      });
      window.ethereum.on('disconnect', res=>{
        console.log("链接已断开",res)
        store.commit('SETADDRESS','')
      });
      window.ethereum.on('accountsChanged', accounts=>{
        if(accounts[0]){
            store.commit('SETADDRESS',accounts[0])
        }else{
            store.commit('SETADDRESS','')
        }
        console.log("切换账号",accounts)
      });
    }else{
      console.log("未安装钱包")
    }
})

</script>

<template>
    <Layout></Layout>
</template>

<style lang="scss" scoped>

</style>
