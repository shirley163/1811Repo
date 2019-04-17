// app.js
/**
 * 1.App()函数调用,只能调用一次;
 * 2.传Object类型参数, 三个生命周期函数
 */
App({
  globalInfo: null, // 全局属性; 存储是用户信息
  onLaunch: function() {
    // 1.读取全局缓存(内存)中所有数据, 赋值给数组变量timeArray
    var timeArray = wx.getStorageSync('logs') || []
    // 2.生成新时间戳; 添加数组的最前面
    timeArray.unshift(Date.now())
    // 3.数组所用数据写回全局缓存中
    wx.setStorageSync('logs', timeArray)

    var that = this
    // 获取用户授权状态API(函数); 异步接口(函数)
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({ // 异步接口(函数)
            success: function (res) {
              // userInfo常量赋值给globalInfo
              that.globalInfo = res.userInfo
              // 判断全局唯一对象是否有userInfoFunc属性; 如果有, 调用userInfoFunc对应匿名函数, 同时把用户信息传给index.js
              if (that.userInfoFunc) {
                that.userInfoFunc(res.userInfo)
              }
            }
          })
        }
      }
    })
  },
  onShow: function() {
    console.log('app.js--onShow: 小程序启动成功; 或者从后台进入前台')
  },
  onHide: function() {
    console.log('app.js--onHide: 小程序从前台进入后台')
  }
})