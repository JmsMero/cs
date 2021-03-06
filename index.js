!function (e, t) {
  "undefined" != typeof module && module.exports ? module.exports = t() : "function" == typeof define && (define.amd || define.cmd) ? define(t) : e.Ali = t.call(e)
}(this, function () {
  "use strict";

  function e(e) {
    return "string" === o(e)
  }

  function t(e) {
    return "number" === o(e)
  }

  function o(e) {
    return Object.prototype.toString.call(e).replace(/\[object (\w+)\]/, "$1").toLowerCase()
  }

  function a(e, t) {
    for (var o in t) e[o] = t[o];
    return e
  }

  function r(e, t) {
    e.errorCode && console.error(t + " 鍙戠敓寮傚父: errorCode: " + e.errorCode + ", errorMessage: " + e.errorMessage)
  }

  function n(e) {
    for (var t, o, a = i.alipayVersion.split("."), e = e.split("."), r = 0; r < a.length; r++) {
      if (t = parseInt(e[r], 10) || 0, o = parseInt(a[r], 10) || 0, o > t) return 1;
      if (t > o) return -1
    }
    return 0
  }

  if (!(navigator.userAgent.indexOf("AlipayClient") < 0)) {
    var i = {};
    return i.ua = navigator.userAgent, i.isAlipay = i.ua.indexOf("AlipayClient") > -1, i.alipayVersion = function () {
      return i.isAlipay ? i.ua.match(/AlipayClient\/(.*)/)[1] : void 0
    }(), i.appinfo = {
      engine: "alipay",
      engineVer: i.alipayVersion,
      name: "alipay",
      ver: i.alipayVersion
    }, i.call = function () {
      var e = [].slice.call(arguments);
      if ("function" == typeof e[e.length - 1]) {
        var t = e[e.length - 1];
        e[e.length - 1] = function (o) {
          var o = o ? o : {};
          o.errorCode = o.error ? +o.error : 0, o.errorMessage = 0 == o.errorCode ? "璋冪敤鎴愬姛" : o.errorMessage, r(o, e[0]), t(o)
        }
      }
      var o = function () {
        window.AlipayJSBridge.call.apply(null, e)
      };
      window.AlipayJSBridge ? o() : i.on("AlipayJSBridgeReady", o)
    }, i.ready = function (e) {
      i.on("AlipayJSBridgeReady", e)
    }, i.toast = function (t, o) {
      var r = {text: ""};
      e(t) && (t = {text: t}), a(r, t), r.content = r.text, i.call("toast", r, o)
    }, i.setTitle = function (t, o) {
      var r = {type: "title"};
      e(t) && (t = {text: t}), a(r, t), null == r.text ? console.error("setTitle: text 鍙傛暟蹇呭～锛�") : r.title = r.text, i.call("setTitle", r), o({})
    }, i.showTitle = function (e) {
      i.call("showTitlebar"), e({})
    }, i.hideTitle = function (e) {
      i.call("hideTitlebar"), e({})
    }, i.showLoading = function (t, o) {
      var r = {};
      e(t) && (t = {text: t}), a(r, t), i.call("showLoading", t), o({})
    }, i.hideLoading = function (e) {
      i.call("hideLoading"), e({})
    }, i.pushWindow = function (t, o) {
      var r = {url: ""};
      e(t) && (t = {url: t}), a(r, t), r.param && n("8.3") < 0 && /android/i.test(i.ua) && console.warn("Ali.pushWindow: android 鐗� param 鍙傛暟璇峰湪 8.3 鍙婁互涓婄増鏈娇鐢�");
      var l = document.createElement("a");
      l.href = r.url, r.url = l.href, i.call("pushWindow", r), o({})
    }, i.popWindow = function (e) {
      i.popTo({step: -1}), e({})
    }, i.popTo = function (e, o) {
      var r = {};
      t(e) && (e = {step: e}), a(r, e), r.index = r.step, i.call("popTo", r, o)
    }, i.login = function (e) {
      i.call("login", e)
    }, i.tradePay = function (e, t) {
      i.call("tradePay", e, t)
    }, i.h5TradePay = function (e, t) {
      console.error("鏀粯瀹濅笉鏀寔 Ali.h5TradePay锛屾敮浠樺疂璇蜂娇鐢� Ali.tradePay"), t({errorCode: 1, errorMessage: "鎺ュ彛涓嶅瓨鍦�"})
    }, i.geolocation = {}, i.geolocation.getCurrentPosition = function (e, t) {
      if (1 == arguments.length) var t = e, e = {timeout: 15e3};
      var o = setTimeout(function () {
        o = null, console.error("geolocation.getCurrentPosition: timeout");
        var e = {errorCode: 5, errorMessage: "璋冪敤瓒呮椂"};
        t(e)
      }, e.timeout);
      i.call("getLocation", function (e) {
        o && (clearTimeout(o), e.coords = {}, e.coords.latitude = +e.latitude, e.coords.longitude = +e.longitude, e.city = e.city ? e.city : e.province, e.province = e.province, e.cityCode = e.citycode, e.address = e.pois, t(e))
      })
    }, i.shake = {}, i.shake.watch = function (e, t) {
      i.call("watchShake", e, t)
    }, i.vibration = {}, i.vibration.vibrate = function (e, o) {
      var r = {};
      t(e) && (e = {duration: e}), a(r, e), i.call("vibrate", r), o({})
    }, i.network = {}, i.network.getType = function (e, t) {
      if (1 == arguments.length) var t = e, e = {timeout: 15e3};
      var o = setTimeout(function () {
        o = null, console.error("network.getType: timeout");
        var e = {errorCode: 5, errorMessage: "璋冪敤瓒呮椂"};
        t(e)
      }, e.timeout);
      i.call("getNetworkType", function (e) {
        o && (clearTimeout(o), e.networkAvailable = "fail" !== e.networkType, e.is3G = e.is2G = e.isE = e.isG = e.isH = !1, e.isWifi = "wifi" === e.networkType, e.isOnline = e.networkAvailable, e.type = e.networkType, t(e, e.networkAvailable))
      })
    }, i.calendar = {}, i.calendar.add = function (e, t) {
      n("8.3") < 0 ? (console.error("Ali.calendar.add: 鍦� 8.3 鍙婁互涓婄増鏈娇鐢�"), t({
        errorCode: 1,
        errorMessage: "鎺ュ彛涓嶅瓨鍦�"
      })) : i.call("addEventCal", e, t)
    }, i.photo = function (e, t) {
      var o = {format: "jpg", dataType: "dataurl", quality: 75, allowEdit: !1, src: void 0};
      a(o, e), o.imageFormat = o.format, "remoteurl" == o.dataType && (o.dataType = "dataurl"), o.dataType = o.dataType.slice(0, -3) + o.dataType.slice(-3).toUpperCase(), i.call("photo", o, function (e) {
        e.dataURL && (e.dataURL = "data:image/" + o.imageFormat + ";base64," + e.dataURL), e.photo = e.dataURL || e.fileURL, e.errorMessage = 10 == e.error ? "鐢ㄦ埛鍙栨秷" : e.errorMessage, t(e)
      })
    }, i.contacts = {}, i.contacts.get = function (e, t) {
      if (1 == arguments.length) var t = e, e = {multiple: !1};
      i.call("contact", function (e) {
        switch (e.results = [], e.results[0] = {phoneNumber: e.mobile, email: void 0, name: e.name}, e.errorCode) {
          case 10:
            e.errorMessage = "娌℃湁鏉冮檺";
            break;
          case 11:
            e.errorMessage = "鐢ㄦ埛鍙栨秷鎿嶄綔"
        }
        t(e)
      })
    }, ["startApp", "showOptionMenu", "hideOptionMenu", "setOptionMenu", "showToolbar", "hideToolbar", "closeWebview", "sendSMS", "scan", "getSessionData", "setSessionData", "showAlert", "alert", "confirm", "checkJSAPI", "checkApp", "isInstalledApp", "share", "openInBrowser", "deposit", "remoteLogging", "alipayContact", "getConfig", "getCities", "rsa", "getWifiList", "connectWifi", "notifyWifiShared", "thirdPartyAuth", "getThirdPartyAuthcode", "setToolbarMenu", "exitApp", "actionSheet", "hideBackButton", "getJSCoreVar", "JSCoreMethod", "startPackage", "getSharedData", "setSharedData", "removeSharedData", "setClipboard", "startDownload", "stopDownload", "getDownloadInfo", "detectBeacons", "startBeaconsBeep", "stopBeaconsBeep", "startIndoorLocation", "stopIndoorLocation", "addEventCal", "startSpeech", "stopSpeech", "rpc", "getWifiInfo", "clearAllCookie", "getMtopToken", "getClientInfo", "sinasso", "getClipboard", "checkBLEAvalability", "scanBeacons", "isSpeechAvailable", "speechRecognizer", "contactSync"].forEach(function (e) {
      i[e] = function () {
        var t = [].slice.call(arguments);
        i.call.apply(null, [e].concat(t))
      }
    }), i.on = function (e, t) {
      e.split(/\s+/g).forEach(function (e) {
        document.addEventListener(e, t, !1)
      })
    }, i
  }
});
