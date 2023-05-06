<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { AddrHandle } from "../utils/tool";
import { connect, web3 } from "../web3";
import { signTypedData, createTypeData, DomainData } from "../Axios/login";
import Axios from "../Axios";
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
const Connect = () => {
  if (!address.value) {
    connect(async (address) => {
      store.commit("SETADDRESS", address);
      let hasAddress = await Axios.get(
        `/api/cryptobrain/common/hasAddress/${address}`
      );
      console.log(hasAddress)
      if (hasAddress.data.error) {
        // console.log('用户未注册请注册')
        register(address);
      }else{
        login(address)
      }
    });
  }
};
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
  const sign = await signTypedData(web3, address, typedData);
  let Register = await Axios.post("/api/cryptobrain/common/userLogin", {
    address: address,
    expireTime: expireTime,
    signature: sign.sig,
  })
  console.log(Register)
  store.commit("SETTOKEN", Register.data.result.token);
}
async function register(address) {
  let inviteCode = router.currentRoute.value.query.address
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
  console.log(sign);
  let Register = await Axios.post("/api/cryptobrain/common/userRegister", {
    address: address,
    expireTime: expireTime,
    inviteCode: inviteCode,
    signature: sign.sig,
  })
  store.commit("SETTOKEN", Register.data.result.token);
  console.log(Register)
}
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
        <div class="menuItem" @click="goPath('/')">
          <img :src="route.path === '/' ? HomeActiveIcon : HomeIcon" alt="" />
          <span>HOME</span>
        </div>
        <div class="menuItem" @click="goPath('/Stake')">
          <img
            :src="route.path === '/Stake' ? StakeActiveIcon : StakeIcon"
            alt=""
          />
          <span>STAKE</span>
        </div>
        <div class="menuItem" @click="goPath('/Rewares')">
          <img
            :src="route.path === '/Rewares' ? RewardsActive : Rewards"
            alt=""
          />
          <span>REWARDS</span>
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
  position: fixed;
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
    @media (max-width: 425px) {
      display: none;
    }
  }
  .Logo {
    width: 4.75rem;
    @media (max-width: 425px) {
      width: 6rem;
    }
  }
  .MenuIcon {
    display: none;
    @media (max-width: 425px) {
      width: 6rem;
      display: block;
    }
  }
  .menu {
    margin-left: 7.5rem;
    display: flex;
    @media (max-width: 425px) {
      // margin-left: 2.5rem;
      display: none;
    }
    .menuItem {
      display: flex;
      align-items: center;
      margin-right: 3.2rem;
      cursor: pointer;
      img {
        width: 18px;
        height: 18px;
        @media (max-width: 768px) {
          width: 2rem;
          height: 2rem;
        }
        @media (max-width: 425px) {
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
        @media (max-width: 425px) {
          font-size: 2.5rem;
        }
      }
    }
  }
}
</style>
