<script setup>
import { onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import Axios from "./Axios";
import {ref} from 'vue'
import {ElNotification} from 'element-plus'
import { init, web3 ,contract,connect,changeNetwork} from "./web3";
import { useRouter, useRoute } from "vue-router";
import { signTypedData, createTypeData, DomainData } from "./Axios/login";
import { GetQueryString } from './utils/tool'
import {chainConfig} from './config'
import Layout from "./Layout/Layout.vue";
const router = useRouter();
const store = useStore();
// const centerDialogVisible = ref(false)
const InvitationLink = ref('')
const address = computed(() => {
  return store.state.address;
});
const token = computed(() => {
  return store.state.token;
});
watch(token, (token) => {
  if(!token && address.value){
    gethasAddress(address.value)
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
        let inviteCode = GetQueryString('Invite') || ""
        // if(inviteCode){
        //   centerDialogVisible.value = false
          register(address);
        // }else{
        //   centerDialogVisible.value = true
        // }
        // console.log('用户未注册请注册')
      }else{
        // centerDialogVisible.value = false
        login(address)
      }
}
function InvitationRegister(){
  if(!InvitationLink.value){
    return ElNotification({
        title: 'Warning',
        message: 'Please enter the invitation link',
        type: 'warning',
    })
  }
  let inviteCode = GetQueryString('Invite',InvitationLink.value)
  if(inviteCode){
    register(address.value,inviteCode);
  }else{
    return ElNotification({
        title: 'Warning',
        message: 'Please enter the correct invitation link',
        type: 'warning',
    })
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
        message: 'Please sign or some data cannot be obtained',
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
  if(Register.data.code === 200){
    store.commit("SETTOKEN", Register.data.result.token);
  }else{
    ElNotification({
        title: 'Warning',
        message: Register.data.error,
        type: 'warning',
    })
  }
  // store.commit("SETTOKEN", Register.data.result.token);
}
async function register(address,inviteCodeAfferent='') {
  //router.currentRoute.value.query.address
  let inviteCode = GetQueryString('Invite') || inviteCodeAfferent
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
  let Register = await Axios.post("/api/cryptobrain/common/userRegister", {
    address: address,
    expireTime: expireTime,
    inviteCode: inviteCode,
    signature: sign.sig,
  })
  if(Register.data.code === 200){
    store.commit("SETTOKEN", Register.data.result.token);
  }else{
    ElNotification({
        title: 'Warning',
        message: Register.data.error,
        type: 'warning',
    })
  }
}
onMounted(async () => {
  document.body.style.setProperty("--el-component-size", "2.8rem");
  document.body.style.setProperty('--el-border-radius-small', '20px')
  // document.body.style.setProperty('--el-text-color-regular', 'rgba(255, 255, 255, 0.617691)')
<<<<<<< HEAD
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
            // if(!token.value){
            //   gethasAddress(address)
            // }
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
      console.log((info-0)  === (chainConfig.chainId-0))
      if((info-0)  === (chainConfig.chainId-0)){
        connect(address=>{
          if(address){
            store.commit('SETADDRESS',address)
          }
        })
      }else{
        store.commit('SETADDRESS','')
        // changeNetwork(()=>{
        //   connect(address=>{
        //     if(address){
        //       store.commit('SETADDRESS',address)
        //     }
        //   })
        // })
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
=======
  // if(window.ethereum){
  //   //用户账号初始化合约
  //   let chainId = await window.ethereum.request({ method: "eth_chainId" });
  //   if(chainId !== chainConfig.chainId){
  //     store.commit('SETADDRESS','')
  //     changeNetwork(()=>{
  //       connect(async (address)=>{
  //         if(address){
  //             store.commit('SETADDRESS',address)
  //         }
  //       })
  //     })
  //   }else{
  //     connect(async (address)=>{
  //       if(address){
  //           store.commit('SETADDRESS',address)
  //           // if(!token.value){
  //           //   gethasAddress(address)
  //           // }
  //       }
  //     })
  //   }
  //   window.ethereum.on('connect', connectInfo=>{
  //     // if(connectInfo.chainId !== chainConfig.chainId){
  //     //   changeNetwork()
  //     // }
  //     console.log("链接",connectInfo)
  //   });
  //   //链改变事件
  //   window.ethereum.on('networkChanged', info=>{
  //     console.log((info-0)  === (chainConfig.chainId-0))
  //     if((info-0)  === (chainConfig.chainId-0)){
  //       connect(address=>{
  //         if(address){
  //           store.commit('SETADDRESS',address)
  //         }
  //       })
  //     }else{
  //       store.commit('SETADDRESS','')
  //       // changeNetwork(()=>{
  //       //   connect(address=>{
  //       //     if(address){
  //       //       store.commit('SETADDRESS',address)
  //       //     }
  //       //   })
  //       // })
  //     }
  //     console.log('切换链',info)
  //     // this.chainId = info
  //   });
  //   // window.ethereum.on('disconnect', res=>{
  //   //   console.log("链接已断开",res)
  //   //   // store.commit('SETADDRESS','')
  //   // });
  //   window.ethereum.on('accountsChanged', accounts=>{
  //     if(accounts[0]){
  //         store.commit('SETADDRESS',accounts[0])
  //         changeNetwork()
  //     }else{
  //         store.commit('SETADDRESS','')
  //     }
  //     store.commit("SETTOKEN", '');
  //     console.log("切换账号",accounts)
  //   });
  // }else{
  //   console.log("未安装钱包")
  // }
>>>>>>> 29eedcf4846931ab7ad1b1f2277af6d687639209
});
</script>

<template>
  <Layout></Layout>
  <!-- <el-dialog v-model="centerDialogVisible" title="Invitation binding" width="30%" center :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <input class="InvitationInput" placeholder="Please enter the bound link" v-model="InvitationLink" type="text">
    <div class="enter" @click="InvitationRegister">Confirm</div>
  </el-dialog> -->
</template>

<style lang="scss" scoped>
.InvitationInput{
width: 100%;
height: 46px;
background: #F5FBFF;
border-radius: 14px;
border: none;
outline: none;
padding: 0 25px;
box-sizing: border-box;
}
.enter{
  width: 100%;
  height: 46px;
  background: linear-gradient(360deg, #299FEF 0%, #69C0FA 100%);
  border-radius: 12px;
  margin-top: 30px;
  color: #FFFFFF;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
