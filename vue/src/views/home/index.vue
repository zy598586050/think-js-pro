<template>
  <div class="content-box">
    <nut-navbar title="功能演示" :left-show="false"></nut-navbar>
    <div class="cell-box">
      <nut-cell title="微信内支付" class="cell-item">
        <template v-slot:link>
          <nut-button size="small" type="success" @click="inWxPay">去支付</nut-button>
        </template>
      </nut-cell>
      <nut-cell title="微信外支付" class="cell-item">
        <template v-slot:link>
          <nut-button size="small" type="success" @click="h5WxPay">去支付</nut-button>
        </template>
      </nut-cell>
      <nut-cell title="支付宝支付" class="cell-item">
        <template v-slot:link>
          <nut-button size="small" type="success" @click="aliPay">去支付</nut-button>
        </template>
      </nut-cell>
      <nut-cell title="阿里验证码" class="cell-item">
        <template v-slot:link>
          <nut-button size="small" type="success" @click="sendSMS">去发送</nut-button>
        </template>
      </nut-cell>
      <nut-cell title="上传到阿里云OSS" class="cell-item">
        <template v-slot:link>
            <nut-uploader url="/api/v1/upload" @progress="onProgress" @success="uploadOk" :clear-input="true">
                <nut-button size="small" type="success">去上传</nut-button>
            </nut-uploader>
        </template>
      </nut-cell>
      <nut-progress :percentage="progressPercentage"
        stroke-color="linear-gradient(270deg, rgba(18,126,255,1) 0%,rgba(32,147,255,1) 32.815625%,rgba(13,242,204,1) 100%)"
        :status="progressPercentage==100?'':'active'" style="margin-top: 20px;margin-bottom: 20px">
      </nut-progress>
      <nut-cell>
          <nut-avatar size="large" :icon="icon"></nut-avatar>
          <nut-input v-model="icon" :clearable="false" placeholder="头像地址展示" style="padding-left: 0"></nut-input>
      </nut-cell>
    </div>
  </div>
</template>

<script>
import wx from 'weixin-jsapi'
import { Toast } from '@nutui/nutui'
export default{
    data(){
        return {
            progressPercentage: 0, // 进度条
            icon: ''
        }
    },
    created(){
        this.initJsSdk()
        // 微信内就重定向获取code
        if(this.is_weixin){
            this.goRedirect()
        }
    },
    computed: {
        // 判断是否是在微信打开
        is_weixin(){
            const ua = window.navigator.userAgent.toLowerCase()
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                return true
            }else{
                return false
            }
        }
    },
    methods: {
        // 重定向
        goRedirect(isForce = false){
            let code = this.getQueryString('code')
            if(!code || isForce){
                const appid = 'wx520c63a7a02b8859'
                const redirect_uri = encodeURIComponent('http://h5pay.zhangyubk.com')
                window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`)
            }
        },
        // 载入jssdk
        initJsSdk(){
            let url = window.location.href
            this.$api.jssdk({url: url.split("#")[0]}).then(result => {
                wx.config(result.data)
            })
        },
        // 微信内调起支付
        inWxPay(){
            if(this.is_weixin){
                let code = this.getQueryString('code')
                this.$api.wxpay({code}).then(result => {
                    wx.ready(() => {
                        wx.chooseWXPay({
                            ...result.data,
                            timestamp: result.data.timeStamp,
                            success: () => {
                                // 支付成
                            },
                            cancel: () => {
                                // 取消支付
                            },
                            fail: (e) => {
                                // 支付失败
                                console.log(e)
                            }
                        })
                    })
                })
            }else{
                Toast.warn('请在微信内支付')
            }
        },
        // 微信外H5支付
        h5WxPay(){
            if(this.is_weixin){
                Toast.warn('请在微信外浏览器支付')
            }else{
                this.$api.h5pay().then(result => {
                    window.location.replace(result.data.h5_url)
                })
            }
        },
        // 支付宝支付
        aliPay(){
            this.$api.alipay().then(result => {
                window.location.replace(result.data)
            })
        },
        // 获取URL参数
        getQueryString(name){
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
            let r = window.location.search.substr(1).match(reg)
            if (r != null) return unescape(r[2])
            return null
        },
        // 下发短信验证
        sendSMS(){
            this.$api.sendSms().then(result => {
                Toast.text('已发送')
            })
        },
        // 上传回调
        onProgress({ percentage }){
            this.progressPercentage = percentage
        },
        uploadOk({responseText}){
            this.icon = JSON.parse(responseText).data.url
        }
    }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
.content-box{
  height: 100vh;
  background: #f7f8fa;
}
.cell-box{
  padding: 0 17px;
}
.cell-item{
  align-items: center;
}
.avatar-box{
    display: flex;
}
</style>