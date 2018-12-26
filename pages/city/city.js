// pages/city/city.js
const App = getApp();
const api = require('../../utils/api.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    trips: [],
    start: 0,
    loading: false,
    windowWidth: App.systemInfo.windowWidth,
    windowHeight: App.systemInfo.windowHeight,
    index: 0 ,//默认是数组的第一个城市,
    array: ['杭州', '厦门'],
    cityarray: [
        {
          "cityname": "杭州",
        "cityimage": "http://www.sgmacwx.top/cwx/img/hz/city_hz.jpg",
          "reachers": [
            {
              "bgimg": "http://www.sgmacwx.top/cwx/img/hz/city_hz_img1.jpg",
              "txt1": "老杭城韵味",
              "txt2": "市井杭州",
              "cityid":"180101"
            },
            {
              "bgimg": "http://www.sgmacwx.top/cwx/img/hz/city_hz_img2.jpg",
              "txt1": "美食集结地",
              "txt2": "品杭州美食",
              "cityid": "180102"
            },
            {
              "bgimg": "http://www.sgmacwx.top/cwx/img/hz/city_hz_img3.jpg",
              "txt1": "网红拍照地",
              "txt2": "随手拍大片",
              "cityid": "180103"
            },
            {
              "bgimg": "http://www.sgmacwx.top/cwx/img/hz/city_hz_img4.jpg",
              "txt1": "西湖夜景",
              "txt2": "音乐喷泉",
              "cityid": "180104"
            },
            {
              "bgimg": "http://www.sgmacwx.top/cwx/img/hz/city_hz_img5.jpg",
              "txt1": "探寻西湖之美",
              "txt2": "西湖十景",
              "cityid": "180105"
            }
          ]
        },
        {
          "cityname": "厦门",
          "cityimage": "http://www.sgmacwx.top/cwx/img/xm/city_xm.jpeg",
          "reachers": [
            {
              "bgimg": "http://www.sgmacwx.top/cwx/img/xm/city_xm_img1.jpg",
              "txt1": "玩鼓浪屿",
              "txt2": "万国建筑群",
              "cityid": "180201"
            },
            {
              "bgimg": "http://www.sgmacwx.top/cwx/img/xm/city_xm_img2.jpg",
              "txt1": "老闽南风情",
              "txt2": "情怀和故事",
              "cityid": "180202"
            },
            {
              "bgimg": "http://www.sgmacwx.top/cwx/img/xm/city_xm_img3.jpg",
              "txt1": "逛厦门大学",
              "txt2": "中国最美校园",
              "cityid": "180203"
            },
            {
              "bgimg": "http://www.sgmacwx.top/cwx/img/xm/city_xm_img4.jpeg",
              "txt1": "浪漫沙滩",
              "txt2": "看日出日落",
              "cityid": "180204"
            },
            {
              "bgimg": "http://www.sgmacwx.top/cwx/img/xm/city_xm_img5.jpg",
              "txt1": "美食集结地",
              "txt2": "尝各种美食",
              "cityid": "180205"
            }
          ]
        } 
    ]
  },
  /*
  点击跳转页面
  */
  goTrip(e) {
    const dn = e.currentTarget.dataset;
    // console.log(e)
    wx.navigateTo({
      url: `../trip/trip?id=${dn.id}&name=${dn.name}`,
    });
  },
  /**
   * 切换城市
  */
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    console.log(e.detail.value)
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.loadMore();
  },
 
  onPullDownRefresh() {
    this.loadMore(null, true);
  },

  loadMore(e, needRefresh) {
    
    const self = this;
    const loading = self.data.loading;
    const data = {
      next_start: self.data.start,
    };
    if (loading) {
      return;
    }
    self.setData({
      loading: true,
    });
    api.getHotTripList({
      data,
      success: (res) => {
        let newList = res.data.data.elements;;
        
        if (needRefresh) {
          wx.stopPullDownRefresh();
        } else {
          newList = self.data.trips.concat(newList);
        }
        self.setData({
          trips: newList,
        });
        const nextStart = res.data.data.next_start;//下拉刷新后的数据拼接在后面
        self.setData({
          start: nextStart,
          loading: false,
        });
      },
    });
  },

})