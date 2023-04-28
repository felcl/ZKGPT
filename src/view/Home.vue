<script setup>
</script>

<template>
    <div class="bgColor">
        <div class="Home">
          <div class="firstScreen">
              <div class="title">Artificial Intelligence for <br>Cryptocurrencies</div>
              <div class="subTitle">FUTURE TECHNOLOGY</div>
              <div class="text">
                zkGPT is an artificial intelligence encryption analysis robot based on cryptocurrency. It will first play a role by understanding the user's situation, and tailor the investment portfolio for the user through risk 
                preferences and investment goals, providing users with the ultimate experience.
              </div>
              <div class="FriendlyLinks">
                  <a href="">
                      <img src="../assets/Home/InsIcon.png" alt="">
                  </a>
                  <a href="">
                      <img src="../assets/Home/facebookIcon.png" alt="">
                  </a>
                  <a href="">
                      <img src="../assets/Home/TwitterIcon.png" alt="">
                  </a>
                  <a href="">
                      <img src="../assets/Home/youtubeIcon.png" alt="">
                  </a>
              </div>
          </div>
          <div class="secondScreen">
              <div class="title" style="margin-bottom: 20px;">
                  ZKGPT is a revolutionary <br>
                  product and technology
              </div>
              <div class="text">
                  ·Personalized experience<br/>
                  ·Real-time information<br/>
                  ·Automated trading<br/>
                  ·Portfolio Management<br/>
                  ·Decentralized infrastructure<br/>
              </div>
          </div>
          <div class="CenterTitle">
              Distribute
          </div>
          <div class="CenterSubTitle">
            CRB allocation model
          </div>
          <div class="CenterText">
            The initial circulating supply of XX (accounting for 30% of the overall token supply) is fully distributed to the community through the seed pool in the first 6 days, achieving 100% of the initial circulating supply. After 6 days, 
            there will be no release of CRB for at least 2 months, and no other form of token sale.
          </div>
          <div class="CenterSubTitle pieSubTitle">
            The specific distribution of CRB
          </div>
          <div class="pie">
             <img src="../assets/Home/Pie.png" alt="">
          </div>
          <div class="CenterSubTitle">
            CZZ allocation model
          </div>
          <div class="CenterText">
            As a governance token, CZZ is mainly obtained through liquidity mining.
            100% of the total supply (18,000 coins) will be distributed through liquidity mining within three months. Liquidity mining reward: 18000 (100% of total supply)
          </div>
          <div class="Disclaimer">
            Disclaimer
          </div>
          <div class="DisclaimerText">
            This document is for general information purposes only. It does not constitute investment advice, recommendation or inducement to buy or sell any investment object. 
            It should not be used to evaluate any investment decisions, nor should it be construed as accounting, legal, tax or other investment advice.
          </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.bgColor{
    background: #27173A;
}
.Home{
    background: url('../assets/Home/bg.png') 0 0 / 100% no-repeat;
    min-height: 100vh;
    padding-top: 18.7rem;
    overflow: hidden;
    .firstScreen{
        margin: 0 5rem;
        overflow: hidden;
        .title{
            font-size: 3.7rem;
            line-height: 1;
            color: #FFFFFF;
            @media (max-width:425px) {
                font-size: 5rem;
            }
        }
        .subTitle{
            font-size: 1.2rem;
            line-height: 1;
            color: #FFFFFF;
            margin-top: 2.8rem;
            @media (max-width:1440px) {
                font-size: 2rem;
            }
            @media (max-width:768px) {
                font-size: 3rem;
            }
            @media (max-width:425px) {
                margin-top: 4rem;
                font-size: 4rem;
            }
        }
        .text{
            max-width: 21.55rem;
            margin-top:0.9rem;
            font-size: 0.7rem;
            line-height: 1.2;
            color: #FFFFFF;
            @media (max-width:1024px) {
                max-width: 26rem;
            }
            @media (max-width:768px) {
                max-width: 35rem;
            }
            @media (max-width:425px) {
                margin-top:1.2rem;
                max-width: 60rem;
            }
        }
        .FriendlyLinks{
            display: flex;
            flex-direction: column;
            margin-top: 2.8rem;
            float: right;
            @media (max-width:425px) {
                display: none;
            }
            a{
                margin-bottom: 1.25rem;
                font-size: 0;
                @media (max-width:425px) {
                    margin-bottom: 3rem;
                }
                img{
                    width: 30px;
                    @media (max-width:425px) {
                        width: 20px;
                    }
                }
            }
            a:last-child{
                margin-bottom: 0;
            }
        }
    }
    .secondScreen{
        margin: 21rem 5rem 0;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .title{
            font-size: 3.7rem;
            line-height: 1;
            color: #FFFFFF;
            text-align: right;
            @media (max-width:425px) {
                font-size: 5rem;
            }
        }
        .text{
            max-width: 21.55rem;
            margin-top:0.9rem;
            font-size: 0.7rem;
            line-height: 1.7;
            color: #FFFFFF;
            @media (max-width:1024px) {
                max-width: 26rem;
            }
            @media (max-width:768px) {
                max-width: 35rem;
            }
            @media (max-width:425px) {
                margin-top:1.2rem;
                max-width: 50rem;
            }
        }
    }
    .CenterTitle{
        margin-top: 24.15rem;
        font-size: 3.7rem;
        line-height: 1;
        color: #FFFFFF;
        text-align: center;
        @media (max-width:425px) {
            font-size: 28px;
        }
    }
    .pieSubTitle{
        margin: 40px auto !important;
    }
    .pie{
        max-width: 90%;
        margin: auto;
        display: flex;
        justify-content: center;
        img{
            width: 750px;
            max-width: 100%;
        }
    }
    .CenterSubTitle{
        margin-top: 4.8rem;
        font-size: 1.2rem;
        line-height: 1;
        text-transform: uppercase;
        color: #FFFFFF;
        text-align: center;
        @media (max-width:425px) {
            font-size: 16px;
        }
    }
    .CenterText{
        font-size: 0.7rem;
        line-height: 1.2;
        text-align: center;
        color: #FFFFFF;
        text-align: center;
        max-width: 474px;
        margin: 1.65rem auto 0;
        @media (max-width:425px) {
            margin: 5rem;
        }
    }
    .Disclaimer{
        font-size: 3.7rem;
        line-height: 1.25;
        color: #FFFFFF;
        text-align: center;
        margin-top: 12.65rem;
        @media (max-width:425px) {
            font-size: 28px;
        }
    }
    .DisclaimerText{
        font-size: 14px;
        line-height: 18px;
        text-align: center;
        color: #FFFFFF;
        margin: 0.9rem auto 16.35rem;
        max-width: 1091px;
        @media (max-width:425px) {
            margin: 0.9rem 5rem 16.35rem;
        }
    }
}
</style>
