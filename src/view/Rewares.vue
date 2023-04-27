<template>
  <div class="Rewares">
    <div class="StakeTitle">Stake XX Ether</div>
    <div class="StakeSubTitle">Stake XX-ETH or YY-ETH and receive YY while staking.</div>
    <div class="RewaresInfo">
        <div class="address">
            <div class="headImg">
                <img src="" alt="">
            </div>
            <div class="InfoRow">
                <div class="addr">
                    <span>{{AddrHandle('0x3Bd8CA9023897224b01fE25b33137b67A89ec70F',7,7)}}</span>
                    <img src="../assets/Home/StakeIcon.png" alt="">
                </div>
                <div class="link">
                    <span>http://sadfs.dadsf.com/sdadsf</span>
                    <img src="../assets/Home/StakeIcon.png" alt="">
                </div>
            </div>
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
            <div class="Withdraw flexCenter">Withdraw</div>
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

<script setup>
import '../assets/style/Rewares.scss'
import { AddrHandle } from '../utils/tool'
</script>

<style lang="scss" scoped>
</style>