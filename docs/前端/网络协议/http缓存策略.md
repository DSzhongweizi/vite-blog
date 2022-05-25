---
title: http缓存策略
cover: false
categories:
  - 前端
  - 网络协议
tags:
  - http
  - 缓存
abbrlink: a0cabc9b
date: 2020-09-24 13:17:50
updated:
---
在已存在缓存数据时，根据是否需要重新向服务器发起请求来分类，我将其分为两大类(强制缓存，对比（协商）缓存)
## 强制缓存

<center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);display:inline;margin:0" 
    src="https://cdn.jsdelivr.net/gh/DSzhongweizi/Resources/article/20200924132158.png" width=700 />
    <br>
    <div style="color:orange; border-bottom: 1px solid #d9d9d9;
    display: inline-block;
    color: #999;">强制缓存规则</div>
</center>

对于强制缓存来说，响应header中会有一种标识两个（响应）字段来标明失效规则。
### Expires
服务端返回的到期时间
- 即下一次请求时，请求时间小于服务端返回的到期时间，直接使用缓存数据
- 属于HTTP 1.0，作用基本忽略

{% note warning %}
到期时间由服务器生成，可能和客户端存在误差
{% endnote %}

### Cache-Control
HTTP 1.1用来替代Expires，优先级高于Expires。
- private：客户端可以缓存（默认值）
- public：客户端和代理服务器都可缓存（前端的同学，可以认为public和private是一样的）
- max-age=xxx：缓存的内容将在 xxx 秒后失效
- no-cache： 需要使用对比缓存来验证缓存数据
- no-store：所有内容都不会缓存，强制缓存，对比缓存都不会触发（对于前端开发来说，缓存越多越好，so...基本上和它说886）

## 对比缓存
<center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);display:inline;margin:0" 
    src="https://cdn.jsdelivr.net/gh/DSzhongweizi/Resources/article/20200924134048.png" width=700 />
    <br>
    <div style="color:orange; border-bottom: 1px solid #d9d9d9;
    display: inline-block;
    color: #999;">对比（协商）缓存规则</div>
</center>

对于对比缓存来说，一共分为两种标识四个字段（请求两个，响应两个）传递，它在请求header和响应header间进行传递。
### Last-Modified  /  If-Modified-Since
- Last-Modified ：服务器在响应请求时，告诉浏览器资源的最后修改时间；
- If-Modified-Since：浏览器在发送请求时，告诉服务器上一次返回资源最后修改时间，服务器收到请求后发现有头If-Modified-Since ，则与被请求资源的最后修改时间进行比对，确定资源是否改动过，以返回状态码200或304。

### Etag  /  If-None-Match（优先级更高）
- Etag：服务器响应请求时，告诉浏览器当前资源在服务器的唯一标识（生成规则由服务器决定）；
- If-None-Match：再次请求服务器时，浏览器通过此字段通知服务器缓存数据的唯一标识，服务器收到请求后发现有头If-None-Match 则与被请求资源的唯一标识进行比对，确定资源是否改动过，以返回状态码200或304。

## 总结
- 对于强制缓存，服务器通知浏览器一个缓存时间，在缓存时间内，下次请求，直接用缓存，不在时间内，执行比较缓存策略。
- 对于比较缓存，将缓存信息中的If-None-Match和If-Modified-Since通过请求发送给服务器，由服务器校验，返回200或304状态码时，浏览器判断是否使用缓存。

### 第一次请求
<center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);display:inline;margin:0" 
    src="https://cdn.jsdelivr.net/gh/DSzhongweizi/Resources/article/20200924135529.png" width=500 />
</center>

### 再次请求
<center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);display:inline;margin:0" 
    src="https://cdn.jsdelivr.net/gh/DSzhongweizi/Resources/article/20200924140014.png" width=500 />
</center>

### 用户操作行为与缓存
<center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);display:inline;margin:0" 
    src="https://cdn.jsdelivr.net/gh/DSzhongweizi/Resources/article/user_behavior_cache.png" width=500 />
</center>

- 强制刷新：当按下ctrl+F5来刷新页面的时候，浏览器将绕过各种缓存(本地缓存和协商缓存)，直接让服务器返回最新的资源；
- 普通刷新：当按下F5来刷新页面的时候，浏览器将绕过本地缓蹲来发送请求到服务器，此时，协商缓存是有效的。
