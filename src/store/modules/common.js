const common = {
  namespaced: true,
  state: () => ({
    userInfo: { name: 'xck' }
  }),
  mutations: {
  },
  actions: {
    login: async function({ commit, state }) {
      const { oauthProvider, appid, secret } = getApp().globalData
      if (!oauthProvider) {
        console.error('provider 无法获取')
        return ''
      }
      uni.login({
        provider: oauthProvider,
        success: (data) => {
          console.log('login', data)
          // #ifdef MP-WEIXIN
          wx.authorize({
            scope: 'scope.userInfo',
            success (res) {
              console.log('wx.authorize: ', res)
            }
          })
          wx.request({
            method: 'GET',
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${data.code}&grant_type=authorization_code`,
            success: function(res) {
              console.log(res.data);
            }
          });
          // #endif
          // uni.getUserInfo({
          //   provider: 'weixin',
          //   success: function (infoRes) {
          //     console.log('用户昵称为：' + JSON.stringify(infoRes));
          //   }
          // });
          // commit('login')
          // setTimeout(function() { //模拟异步请求服务器获取 openid
          //   const openid = '123456789'
          //   console.log('uni.request mock openid[' + openid + ']');
          //   commit('setOpenid', openid)
          //   resolve(openid)
          // }, 1000)
        },
        fail: (err) => {
          console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
          reject(err)
        }
      })
    }
  },
  getters: {
  }
}

export default common