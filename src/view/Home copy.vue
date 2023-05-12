<script setup>
const vAnimate ={
    mounted: function (el, binding) {
      // 聚焦元素
      binding.addClass = () => {
        const { top } = el.getBoundingClientRect()
        const h = document.documentElement.clientHeight || document.body.clientHeight
        if (top+200 < h) {
          if(el.className.indexOf(binding.value) == -1 ){
            // 初次还未绑定过，则新增类名(注意：下面单引号中间是一个空格！！！)
            el.className = binding.value+' '+el.className
          }
          if (binding.addClass) {
            window.removeEventListener('scroll', binding.addClass)
          }
        }
      }
      window.addEventListener('scroll', binding.addClass,true)
      binding.addClass()
    },
    unmounted: function (el, binding) {
      if (binding.addClass) {
        window.removeEventListener('scroll', binding.addClass)
      }
    }
}
</script>

<template>
    <div class="bgColor">
        <div class="Home">
          <div class="firstScreen">
              <div class="title">Artificial Intelligence for <br>Cryptocurrencies</div>
              <div class="subTitle">FUTURE TECHNOLOGY</div>
              <div class="text">
                AIGPT is an artificial intelligence encryption analysis robot based on cryptocurrency. 
                It will first play a role by understanding the user's situation, and tailor the investment portfolio for the user through risk preferences and investment goals, providing users with the ultimate experience.
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
                AIGPT is a revolutionary product
                and technology
              </div>
              <div class="text">
                  ·Personalized experience<br/>
                  ·Real-time information<br/>
                  ·Automated trading<br/>
                  ·Portfolio Management<br/>
                  ·Decentralized infrastructure<br/>
              </div>
          </div>
          <div class="TextTableRow">
            <div class="Left">
                <div class="CenterTitle">
                    Distribute
                </div>
                <div class="CenterSubTitle">
                    CRB allocation model
                </div>
                <div class="CenterText">
                    Staking/liquidity mining rewards: 52 million (65%)
                    — Initial circulating supply (distributed through the seed pool): 24 million (30%), fully unlocked in the first 6 days<br/>
                    — Reserved for future pledge/LP rewards: 28 million (35%) linearly unlocked within 12 months
                    Ecosystem Reserve, Strategic Partnerships, Operations, Development, and Strategic Sales: 20 million (25%)<br/>
                    — Ecosystem Reserve Tokens unlocked linearly after 9 months<br/>
                    — Up to 8 million (10%) of XX tokens allocated to the ecosystem reserve can be used for future strategies
                    Team and Advisors<br/>
                    — 8 million (10%)
                </div>
                <div class="CenterSubTitle">
                    CZZ allocation model
                </div>
                <div class="CenterText">
                    As a governance token, CZZ is mainly obtained through liquidity mining.
                    100% of the total supply (18,000 coins) will be distributed through liquidity mining within three months. Liquidity mining reward: 18000 (100% of total supply)
                </div>
            </div>
            <div class="Righr">
                <img src="../assets/Home/Pie.png" alt="">
            </div>
          </div>
          <!-- <div class="CenterTitle">
              Distribute
          </div>
          <div class="CenterSubTitle">
            CRB allocation model
          </div>
          <div class="CenterText">
            The initial circulating supply of XX (accounting for 30% of the overall token supply) is fully distributed to the community through the seed pool in the first 6 days, achieving 100% of 
            the initial circulating supply. After 6 days, there will be no release of CRB for at least 2 months, and no other form of token sale.
          </div>
          <div class="CenterSubTitle pieSubTitle">
            Tokenomics
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
          </div> -->
          <div class="Disclaimer">
            Team
          </div>
          <div class="character">
            <div class="characterItem">
                <div class="imgBox">
                    <img src="../assets/Home/character1.png" alt="">
                </div>
                <div class="name">Jacob Cooper</div>
                <div class="position">Chief Brand Officer</div>
                <div class="introduce" v-animate="'scale-up-hor-center'">
                    Jacob Cooper is an experienced marketing professional with 6+ years of expertise in brand development and management. As the Chief Brand Officer, he's committed to creating impactful brand strategies and delivering innovative brand experiences.
                </div>
            </div>
            <div class="characterItem">
                <div class="imgBox">
                    <img src="../assets/Home/character2.png" alt="">
                </div>
                <div class="name">Ahmar Khan</div>
                <div class="position">Chief Marketing Officer</div>
                <div class="introduce" v-animate="'scale-up-hor-center'">
                    Ahmar Khan is a successful CMO focused on growth and customer experiences. With an eye for trends, he leads impactful campaigns as the Chief Marketing Officer to drive business growth.
                </div>
            </div>
            <div class="characterItem">
                <div class="imgBox">
                    <img src="../assets/Home/character3.png" alt="">
                </div>
                <div class="name">Denis Bozkurt</div>
                <div class="position">Chief Operating Officer</div>
                <div class="introduce" v-animate="'scale-up-hor-center'">
                    Denis Bozkurt is a results-driven COO focused on operational excellence. As Chief Operating Officer, he optimizes resources, streamlines operations, and delivers quality products/services.
                </div>
            </div>
          </div>
          <a href="http://18.136.140.46/WhitePaper/ZKGPT%20Whitepaper.pdf" target="_blank">
              <div class="WhitePaper flexCenter">White Paper</div>
          </a>
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
            font-size: 14px;
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
            // flex-direction: column;
            justify-content: center;
            margin-top: 2.8rem;
            // float: right;
            @media (max-width:425px) {
                display: none;
            }
            a{
                margin:0 0.6rem;
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
            font-size: 14px;
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
    .TextTableRow{
        max-width: 1440px;
        margin: auto;
        padding: 0 20px;
        margin-top: 24.15rem;
        display: flex;
        justify-content: space-between;
        .Left,.Righr{
            width: 45%;
            display: flex;
            flex-direction: column;
            justify-content:center;
            img{
                width: 100%;
                @media (max-width: 768px) {
                    max-width: 60%;
                    margin-top: 50px;
                }
            }
            @media (max-width: 768px) {
                width: 100%;
                text-align-last: center;
                align-items: center;
            }
        }
        @media (max-width: 768px) {
            flex-direction: column;
        }
    }
    .CenterTitle{
        // margin-top: 24.15rem;
        font-size: 3.7rem;
        line-height: 1;
        color: #FFFFFF;
        // text-align: center;
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
        margin-top: 2rem;
        font-size: 1.2rem;
        line-height: 1;
        text-transform: uppercase;
        color: #FFFFFF;
        // text-align: center;
        @media (max-width:425px) {
            font-size: 16px;
        }
    }
    .CenterText{
        font-size: 14px;
        line-height: 1.2;
        // text-align: center;
        color: #FFFFFF;
        // text-align: center;
        max-width: 1030px;
        // padding: 0 20px;
        margin: 1.65rem 0 0;
        @media (max-width:425px) {
            margin: 5rem 0;
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
    .character{
        display: flex;
        justify-content: space-around;
        margin-top: 2.5rem;
        @media (max-width:768px) {
            flex-direction: column;
            align-items: center;
        }
        .characterItem{
            max-width: 16.4rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            @media (max-width:1440px) {
                max-width: 20rem;
            }
            @media (max-width:1024px) {
                max-width: 25rem;
            }
            @media (max-width:768px) {
                max-width: 50%;
                margin-bottom: 10rem;
            }
            @media (max-width:767px) {
                max-width: 70%;
                margin-bottom: 10rem;
            }
            @media (max-width:425px) {
                max-width: 90%;
                margin-bottom: 10rem;
            }
            .imgBox{
                width: 200px;
                height: 200px;
                border-radius: 50%;
                margin-bottom: 1.15rem;
                overflow: hidden;
                background: #fff;
                // @media (max-width:768px) {
                //     width: 20rem;
                //     height: 20rem;
                // }
            }
            .imgBox:hover~.introduce{
                animation:scale-up-hor-center .4s cubic-bezier(.39,.575,.565,1.000) both
            }
            .name{
                font-size: 20px;
                color: #FFFFFF;
                line-height: 1.4;
                text-align: center;
                margin-bottom: 0.5rem;
            }
            .position{
                margin-bottom: 1.15rem;
                text-align: center;
                color: #FFFFFF;
                font-size: 12px;
                line-height: 1.5;
            }
            .introduce{
                opacity: 0;
                text-align: center;
                font-size: 12px;
                color: #FFFFFF;
                line-height: 1.5;
            }
        }
    }
    .WhitePaper{
        margin: 6rem auto;
        background: linear-gradient(90deg, #536DFE 0%, #B41FFF 100%);
        border-radius: 11px;
        width: 446px;
        max-width: 90%;
        height: 48px;
        color: #FFFFFF;
        font-size: 18px;
        text-decoration: none;
    }
}
.scale-up-hor-center{
    @media (max-width:768px) {
        animation:scale-up-hor-center .4s cubic-bezier(.39,.575,.565,1.000) both
    }
}
/* ----------------------------------------------
 * Generated by Animista on 2023-5-11 14:49:28
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

 @keyframes scale-up-hor-center{
    0%{
        // display: block;
        transform:scaleX(.4);
        opacity: 0;
    }
    100%{
        transform:scaleX(1);
        opacity: 1;
    }
}
</style>
