<template>
   <div class="History">
    <div class="StakeTitle">History</div>
    <div class="HistoryInfo">
        <div class="tabs">
            <div class="tabItem flexCenter tabActive">CRB</div>
            <div class="tabItem flexCenter">CZZ</div>
            <div class="tabItem flexCenter">Withdraw</div>
        </div>
    </div>
  </div>
</template>

<script strup>
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
        .tabItem{
            color: #FFFFFF;
            font-size: 14px;
            width: 125px;
            height: 50px;
            border-radius: 29px;
        }
        .tabActive{
            background: #1D2444;
        }
    }
</style>