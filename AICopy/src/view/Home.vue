<script setup>
import copy from "copy-to-clipboard";
import 'vue3-video-play/dist/style.css'
import { videoPlay } from 'vue3-video-play'
import {useRouter} from 'vue-router'
import {reactive} from 'vue'
import { ElNotification } from 'element-plus'
import video from '../assets/video/AiGPT.mp4'
import videoBg from '../assets/Home/videoBg.png'
const router = useRouter()
const options = reactive({
  width: '100%', //播放器高度
  height: '100%', //播放器高度
  color: "#409eff", //主题色
  title: '', //视频名称
  src: video, //视频源
  muted: true, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: true, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false,  //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制器
})
const copyFun = (text)=>{
    copy(text)
    ElNotification({
        title: 'Success',
        message: 'Replicating Success',
        type: 'success',
    })
}
const goPath=(path)=>{
  router.push(path)
}
</script>

<template>
  <div class="bgColor">
    <div class="Home">
      <div class="firstScreen">
        <!-- <img src="../assets/Home/font/Artificial Intellige.svg" alt=""> -->
        <div class="title ">
            Artificial Intelligence for<br/>
            Cryptocurrencies
        </div>
        <div class="Title1024">
            Artificial Intelligence for Cryptocurrencies
        </div>
        <div class="subTitle">
            FUTURE TECHNOLOGY
        </div>
        <!-- <span class="StakeBtn flexCenter" @click="goPath('/Stake')">Stake now</span> -->
        <span class="StakeBtn flexCenter">Coming soon</span>
        <!-- <div class="totalRow">
          <div class="TotalItem">
            <div class="totalLabel">Total staked tokens</div>
            <div class="totalValue">$11,983,033,282</div>
          </div>
          <div class="TotalItem">
            <div class="totalLabel">Total rewards paid</div>
            <div class="totalValue">$572,854,126</div>
          </div>
          <div class="TotalItem dnone">
            <div class="totalLabel">Stakers</div>
            <div class="totalValue">11,983,033,282</div>
          </div>
        </div> -->
        <!-- <div class="FriendlyLinks">
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
              </div> -->
      </div>
       <div class="CenterTitle">Future technology</div>
      <!--<div class="CenterSubTitle">
        Lido lets you stake tokens from many networks. Choose a network below to
        get started.
      </div> -->
      <div class="FUTURE">
        <div class="FUTURELeft">
            <div>AIGPT is a revolutionary product and technology</div>
            <div class="">AIGPT is an artificial intelligence encryption analysis robot based on cryptocurrency. It will first play a role by understanding the user's situation, and tailor the investment portfolio for the user through risk preferences and investment goals, providing users with the ultimate experience.</div>
        </div>
        <div class="FUTURERight">
            <div class="item">
                <div class="imgBox flexCenter" style="background: #189CD7;">
                    <img src="../assets/Home/Icon.png" alt="">
                </div>
                <span>Personalized experience</span>
            </div>
            <div class="item">
                <div class="imgBox flexCenter" style="background: #FF4E78;">
                    <img src="../assets/Home/Icon.png" alt="">
                </div>
                <span>Real-time information</span>
            </div>
            <div class="item">
                <div class="imgBox flexCenter" style="background: #41E571;">
                    <img src="../assets/Home/Icon.png" alt="">
                </div>
                <span>Automated trading</span>
            </div>
            <div class="item">
                <div class="imgBox flexCenter" style="background: #F6D647;">
                    <img src="../assets/Home/Icon.png" alt="">
                </div>
                <span>Portfolio Management</span>
            </div>
            <div class="item">
                <div class="imgBox flexCenter" style="background: #F61133;">
                    <img src="../assets/Home/Icon.png" alt="">
                </div>
                <span>Decentralized infrastructure</span>
            </div>
            
        </div>
      </div>
      <div class="CenterTitle">Branding</div>
      <div class="videoBox">
        <videoPlay v-bind="options" :poster='videoBg'/>
      </div>
      <div class="CenterTitle">Distribution</div>
      <div class="CenterSubTitle">
        AIGPT lets you stake tokens from many networks. Choose a network below to get started.
      </div>
      <div class="DistributionRow">
        <div class="DistributionItem">
            <div class="Content flexCenter">
                The initial circulating supply of CRB (accounting for 30% of the overall token supply) is fully distributed to the community through the seed pool in the first 6 days, achieving 100% of the initial circulating supply. After 6 days, there will be no release of CRB for at least 2 months, and no other form of token sale.
            </div>
            <div class="Title flexCenter">CRB allocation model</div>
        </div>
        <div class="DistributionItem">
            <div class="Content flexCenter">
                <img src="../assets/Home/Pie.png" alt="">
            </div>
            <div class="Title flexCenter">Tokenomics</div>
        </div>
        <div class="DistributionItem">
            <div class="Content flexCenter">
                As a governance token, CZZ is mainly obtained through liquidity mining.100% of the total supply (18,000 coins) will be distributed through liquidity mining within three months. Liquidity mining reward: 18000 (100% of total supply)
            </div>
            <div class="Title flexCenter">CZZ allocation model</div>
        </div>
      </div>
      <div class="CenterTitle">Team</div>
      <div class="CenterSubTitle">
        AIGPT lets you stake tokens from many networks. Choose a network below to get started.
      </div>
      <div class="TeamRow">
        <div class="TeamItme">
            <img src="../assets/Home/team1.png" alt="">
            <div class="name">Jacob Cooper</div>
            <div class="subName">Chief Brand Officer</div>
            <div class="introduce">
                Jacob Cooper is an experienced marketing professional with 6+ years of expertise in brand development and management. As the Chief Brand Officer, he's committed to creating impactful brand strategies and delivering innovative brand experiences.
            </div>
        </div>
        <div class="TeamItme">
            <img src="../assets/Home/team2.png" alt="">
            <div class="name">Ahmar Khan</div>
            <div class="subName">Chief Marketing Officer</div>
            <div class="introduce">
                Ahmar Khan is a successful CMO focused on growth and customer experiences. With an eye for trends, he leads impactful campaigns as the Chief Marketing Officer to drive business growth.
            </div>
        </div>
        <div class="TeamItme">
            <img src="../assets/Home/team3.png" alt="">
            <div class="name">Denis Bozkurt</div>
            <div class="subName">Chief Operating Officer</div>
            <div class="introduce">
                Denis Bozkurt is a results-driven COO focused on operational excellence. As Chief Operating Officer, he optimizes resources, streamlines operations, and delivers quality products/services.
            </div>
        </div>
      </div>
      <div class="CenterTitle">Join our community</div>
      <div class="CenterSubTitle">
        Learn more about AlGPT, chat with us and have your say in the future of the AlGPT ecosystem
      </div>
      <div class="join">
        <a href="https://aigpt-organization.gitbook.io/aigpt-whitepaper-3/" target="_blank">
          <div class="joinBanner">
            <img src="../assets/Home/book.png" alt="">
            <div>
              <div class="bannerMain">AIGPT WHITE PAPER</div>
              <div class="bannerSub">Join the community and ask questions</div>
            </div>
          </div>
        </a>
        <div class="contactRow">
          <a href="https://t.me/AIGPT_official" target="_blank">
            <div  class="contactItem">
                <div class="icon">
                    <img src="../assets/Home/Telegram.png" alt="" />
                </div>
                <div class="Title">
                    <div class="mainTitle">Telegram</div>
                    <div class="subTitle">Join chat</div>
                </div>
            </div>
          </a>
            <div class="separate"></div>
            <a href="https://twitter.com/AIGPT_Official" target="_blank">
              <div  class="contactItem" @click="copyFun('https://twitter.com/AIGPT_Official')">
                  <div class="icon">
                      <img src="../assets/Home/Twitter.png" alt="" />
                  </div>
                  <div class="Title">
                      <div class="mainTitle">Twitter</div>
                      <div class="subTitle">Follow @AIGPT_Official</div>
                  </div>
              </div>
            </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bgColor {
  background: #371768;
}
.Home {
  background: url("../assets/Home/bg.png") 0 0 / 100%  no-repeat;
  min-height: 100vh;
  padding-top: 12.7rem;
  overflow: hidden;
  @media (max-width:1024px) {
    background: url("../assets/Home/bg2.png") 0 0 / 100%  no-repeat;
  }
  .firstScreen {
    margin: 0 auto  15rem;
    max-width: 1440px;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    @media (max-width: 1450px) {
      padding: 0 5rem;
    }
    @media (max-width:1024px) {
        align-items: center;
        margin-top: 20rem;
        padding: 0;
    }
    .title {
        font-size: 60px;
        line-height: 1.2;
        letter-spacing:2px;
      color: #ffffff;
      font-family: bitte;
      font-weight: bold;
      @media (max-width:1024px) {
            display: none;
      }
    }
    .Title1024{
      font-family: american typewriter;
      font-weight: bold;
        font-size: 3rem;
        line-height: 1;
        color: #ffffff;
        text-align: center;
        display: none;
        font-family: bitte;
        font-weight: bold;
        @media (max-width:1024px) {
            display: block;
        }
        @media (max-width: 767px){
            font-size: 26px;
            line-height: 36px;
        }
        @media (max-width: 488px) {
            font-size: 7rem;
        }
    }
    .subTitle {
      font-size: 18px;
      line-height: 1;
      color: #ffffff;
      margin-top: 2.8rem;
      @media (max-width: 1024px) {
        font-size: 14px;
      }
    }
    .StakeBtn {
      width: max-content;
      padding: 0.9rem 3.1rem;
      background: linear-gradient(90deg, #536DFE 0%, #B41FFF 100%);
      border-radius: 0.5rem;
      margin-top: 2.5rem;
      font-weight: 500;
      color: #FFFFFF;
      font-size: 18px;
      cursor: pointer;
      @media (max-width:768px) {
            width: 100%;
            max-width: 260px;
            height: 48px;
            font-size: 16px;
            border-radius: 10px;
        }
    }
    .StakeBtn:hover{
      background: #fff;
      color: #000;
    }
    .dnone{
        @media (max-width:800px) {
            display: none;
        }
    }
    .totalRow {
      display: flex;
      margin: 9rem 0 6.5rem;
      justify-content: space-around;
      max-width: 1440px;
      margin:30px auto;
      width: 100%;
      @media (max-width:488px) {
        margin:130px auto 30px;
      }
      .TotalItem {
        @media (max-width:488px) {
          margin-bottom: 16px;
        }
        .totalLabel {
          color: #ffffff;
          font-size: 14px;
          text-align: center;
          @media (max-width:560px) {
            font-size: 12px;
          }
          @media (max-width:450px) {
            text-align: left;
          }
        }
        .totalValue {
          font-weight: 500;
          color: #ffffff;
          font-size: 30px;
          @media (max-width:768px) {
            font-size: 22px;
          }
          @media (max-width:560px) {
            font-size: 16px;
          }
        }
      }
    }
  }
  .CenterTitle {
    font-family: american typewriter;
    letter-spacing:2px;
      font-weight: bold;
    margin-top: 3.5rem;
    font-size: 1.8rem;
    line-height: 1;
    color: #ffffff;
    text-align: center;
    font-family: bitte;
    font-weight: bold;
    @media (max-width:1024px) {
      font-size: 2.8rem;
    }
    @media (max-width:768px) {
      font-size: 3.5rem;
    }
    @media (max-width:488px) {
      font-size: 5rem;
    }
    @media (max-width:375px) {
      font-size: 6rem;
    }
  }
  .CenterSubTitle {
    margin-top: 12px;
    font-size: 14px;
    line-height: 2;
    color: #fff;
    text-align: center;
    padding: 0 20px;
  }
  .FUTURE{
    display: flex;
    justify-content: center;
    margin-top: 37px;
    @media (max-width:1024px) {
        justify-content: space-between;
        padding: 0 20px;
    }
    @media (max-width:920px) {
        flex-direction: column;
    }
    .FUTURELeft{
        display: flex;
        flex-direction: column;
        justify-content:space-between;
        @media (max-width:920px) {
            align-items: center;
        }
        @media (max-width:480px) {
            width: auto;
        }
        div{
            width: 432px;
            height: 261px;
            color: #FFFFFF;
            display: flex;
            padding:20px 53px;
            box-sizing: border-box;
            text-align: center;
            @media (max-width:480px) {
                width: 100%;
                padding:10px 15px;
            }
        }
        div:nth-child(1){
            background: url('../assets/Home/FUTURE1.png') no-repeat center center / 100% 100%;
            font-size: 30px;
            align-items: center;
            @media (max-width:768px) {
                font-size: 22px;
            }
            @media (max-width:480px) {
                align-items: center;
            }
        }
        div:nth-child(2){
            font-size: 18px;
            align-items: center;
            text-align: center;
            text-align:justify;
            background: url('../assets/Home/FUTURE2.png') no-repeat center center / 100% 100%;
            margin-top: 25px;
            @media (max-width:488px) {
                font-size: 16px;
            }
        }
    }
    .FUTURERight{
        margin-left: 114px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        @media (max-width:1024px) {
            margin-left: 0;
        }
        @media (max-width:920px) {
            margin-top: 25px;
            align-items: center;
        }
        .item{
            width: 432px;
            height: 90px;
            background: #3E2470;
            box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.15);
            border-radius: 20px;
            padding: 0 30px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            @media (max-width:920px) {
                margin-bottom: 25px;
            }
            @media (max-width:480px) {
                width: 100%;
            }
            // img{
            //     width: 48px;
            //     height: 48px;
            // }
            .imgBox{
                width: 48px;
                height: 48px;
                border-radius: 50%;
                img{
                    width: 65%;
                    // height: 60%;
                }
            }
            span{
                font-size: 22px;
                @media (max-width:768px) {
                    font-size: 16px;
                }
                color: #FFFFFF;
                margin-left: 24px;
            }
        }
    }
  }
  .videoBox{
    width: 538px;
    height: 303px;
    border-radius: 10px;
    overflow: hidden;
    margin:20px auto 0;
    @media (max-width:550px) {
      width: 95%;
    }
  }
  .DistributionRow{
    max-width: 1440px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin: auto;
    flex-wrap: wrap;
    @media (max-width:920px) {
        flex-direction: column;
        align-items: center;
    }
    .DistributionItem{
        width: 432px;
        height: 328px;
        display: flex;
        flex-direction: column;
        margin-top: 40px;
        @media (max-width:480px) {
            width: 100%;
        }
        .Title{
            height: 23%;
            color: #FFFFFF;
            font-size: 24px;
        }
        .Content{
            flex: 1;
            color: #FFFFFF;
            font-size: 16px;
            padding: 0 40px;
            line-height: 24px;
            text-align: justify;
            img{
                max-width: 100%;
            }
        }
    }
    .DistributionItem:nth-child(1){
        background: url('../assets/Home/DistributionItem1.png') no-repeat 0 0 / 100% 100%;
    }
    .DistributionItem:nth-child(2){
        background: url('../assets/Home/DistributionItem2.png') no-repeat 0 0 / 100% 100%;
    }
    .DistributionItem:nth-child(3){
        background: url('../assets/Home/DistributionItem3.png') no-repeat 0 0 / 100% 100%;
    }
  }
  .TeamRow{
    display: flex;
    max-width: 1440px;
    justify-content: space-around;
    margin: 54px auto 0;
    @media (max-width:920px) {
        flex-direction: column;
        align-items: center;
    }
    .TeamItme{
        width: 300px;
        height: 431px;
        border-radius: 8px;
        background: #3E2470;
        box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.15);
        @media (max-width:920px) {
            margin-bottom: 20px;
        }
        img{
            width: 100%;
        }
        .name{
            margin-top: 8%;
            text-align: center;
            font-size: 20px;
            color: #FFFFFF;
        }
        .subName{
            margin-bottom: 8%;
            text-align: center;
            font-size: 12px;
            color: #FFFFFF;
        }
        .introduce{
            font-size: 12px;
            text-align: justify;
            color: #FFFFFF;
            padding: 0 20px;
        }
    }
  }
  .publicize {
    width: 43.9rem;
    // min-height: 21.65rem;
    background: #ffffff;
    border-radius: 1.4rem;
    margin: 50px auto 0;
    overflow: hidden;
    @media (max-width:1136px) {
      width: 50rem;
    }
    @media (max-width:868px) {
      width: 60rem;
    }
    @media (max-width:588px) {
      width: 70rem;
    }
    @media (max-width:488px) {
      width: 75rem;
    }
    @media (max-width:388px) {
      width: 85rem;
    }
    .publicizeMain {
      display: flex;
      align-items: center;
      padding: 4.75rem 7rem 3.5rem;
      .Icon {
        margin-right: 7.25rem;
        @media (max-width:388px) {
          margin-right: 5rem;
        }
        .iconBox {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #eff2f6;
        }
        span {
          font-weight: 500;
          color: #283852;
          font-size: 18px;
        }
      }
      .Info {
        .text {
          color: #808080;
          font-weight: 500;
          font-size: 14px;
          text-align: center;
        }
        .data {
          display: flex;
          justify-content: space-between;
          margin-top: 2.5rem;
          @media (max-width:768px) {
            flex-direction: column;
          }
          .APR {
            display: flex;
            flex-direction: column;
            align-items: center;
            .APRValue {
              font-weight: 500;
              color: #1fb51a;
              font-size: 20px;
            }
            span {
              color: #808080;
              font-size: 14px;
            }
          }
          .separate {
            height: 50px;
            border-left: 1px solid #979797;
            @media (max-width:768px) {
              display: none;
            }
          }
          .staked {
            display: flex;
            flex-direction: column;
            align-items: center;
            .stakedValue {
              font-weight: 600;
              color: #2c2c2c;
              font-size: 20px;
            }
            span {
              font-weight: 400;
              color: #808080;
              font-size: 14px;
            }
          }
        }
      }
    }
    .StakeNow {
      // width: 200px;
      // height: 56px;
      width: max-content;
      padding: 0.75rem 2.75rem;
      background: #00a0e9;
      border-radius: 0.5rem;
      margin:0 auto 2.7rem;
      font-weight: 500;
      color: #ffffff;
    }
  }
  .join {
    padding: 0 0 130px;
    margin-top: 3.5rem;
    .CenterTitle{
        color: #00A0E9;
    }
    .CenterSubTitle{
        color: #3E3E3E;
        max-width: 53.75rem;
        margin: auto;
    }
    .joinBanner{
        width: 53.75rem;
        height: 11.2rem;
        background: url('../assets/Home/joinBanner.png') no-repeat 0 0 / 100% 100%;
        margin:55px auto 35px;
        display: flex;
        align-items: center;
        padding-left: 7rem;
        box-sizing: border-box;
        color: #fff;
        img{
          margin-right: 20px;
          @media (max-width:768px) {
            width: 38px;
          }
        }
        .bannerMain{
          font-size: 36px;
          @media (max-width:1024px) {
            font-size: 26px;
          }
          @media (max-width:768px) {
            font-size: 18px;
          }
        }
        .bannerSub{
          font-size: 14px;
          @media (max-width:768px) {
            font-size: 12px;
          }
        }
        @media (max-width:768px) {
          width: 65rem;
          height: 14rem;
        }
        @media (max-width:488px) {
          width: 75rem;
          height: 20rem;
        }
        @media (max-width:375px) {
          width: 80rem;
          height: 23rem;
        }
    }
    .contactRow{
        width: 53.75rem;
        display: flex;
        justify-content: space-between;
        margin: auto;
        @media (max-width:768px) {
          width: 65rem;
          flex-direction: column;
        }
        @media (max-width:488px) {
          width: 75rem;
        }
        @media (max-width:375px) {
          width: 80rem;
        }
        a{
          flex: 1;
        }
        .contactItem{
            // height: 8rem;
            flex: 1;
            box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.15);
            border-radius: 1.4rem;
            background: #3E2470;
            padding: 2.5rem 2rem 2.5rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            @media (max-width:1024px) {
            //   height: 8rem;
            }
            @media (max-width:768px) {
                margin-bottom: 20px;
                padding: 3rem 2rem 3rem;
            }
            @media (max-width:650px) {
            //   height: 10rem;
            }
            @media (max-width:500px) {
            //   height: 14rem;
            }
            .icon{
              width: 2.7rem;
              height: 2.7rem;
              @media (max-width:768px) {
                width: 27px;
                height: 27px;
              }
              img{
                  width: 100%;
                }
                margin-right: 1.5rem;
            }
            .Title{
                .mainTitle{
                    font-size: 20px;
                    font-weight: 500;
                    color: #fff;
                    @media (max-width:500px) {
                      font-size: 16px;
                    }
                }
                .subTitle{
                    font-weight: 400;
                    color: #D4D4D4;
                    font-size: 14px;
                    @media (max-width:500px) {
                      font-size: 12px;
                    }
                }
            }
        }
        .separate{
            width: 2rem;
        }
    }
  }
}
.flexCenter{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
