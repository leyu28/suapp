$(function () {
  fetch('../68.config.js')
    .then(response => response.text())  // 解析 JSON 数据
    .then(data => {
      eval(data)
      // 获取PC的windows设置下载地址
      let windows = pc.windows
      $('#windows_url').attr('href', windows);
      // 获取PC的Mac设置下载地址
      let mac = pc.mac
      $('#mac_url').attr('href', mac);
      // 获取APP的ios企业版下载地址
      let ios_enterprise = app.ios_enterprise
      $('#ios_enterprise_url').attr('href', ios_enterprise);
      // 获取APP的android下载地址【中文(en)的安卓，直接下载,不跳转 download.html，其他的跳转download.html】
      let android = app.android
      $('#android_url').attr('href', android);
    })
    .catch(error => {
      console.log('加载配置文件时出错:', error);
    });
});
