---
title: tcp和udp
cover: false
categories:
  - 前端
  - 网络协议
tags:
  - tcp
  - udp
abbrlink: b02473e2
date: 2020-08-22 17:29:34
---
tcp（传输控制协议）和udp（用户数据报协议）属于传输层协议，网络的各层模型：

<center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);display:inline;margin:0" 
    src="https://cdn.jsdelivr.net/gh/DSzhongweizi/Resources/article/20200822173401.png" width=700 />
    <br>
    <div style="color:orange; border-bottom: 1px solid #d9d9d9;
    display: inline-block;
    color: #999;">网络的各层模型</div>
</center>

## tcp和udp的区别
tcp和udp的区别简单概括为：
- tcp面向连接的字节流传输，可以保证数据无差错、不重复、不丢失，且有序到达，提供拥塞控制，是可靠的传输
- udp面向无连接的报文传输，是不可靠的传输，尽最大努力的交付
<center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);display:inline;margin:0" 
    src="https://cdn.jsdelivr.net/gh/DSzhongweizi/Resources/article/20200822175412.png" width=700 />
    <br>
    <div style="color:orange; border-bottom: 1px solid #d9d9d9;
    display: inline-block;
    color: #999;">tcp和udp的区别</div>
</center>

## tcp的三次握手
tcp的三次握手，就是为了能让客户端和服务器，互相知晓对方收发正常的一个状态，通俗理解：
- 第一次：服务器知道客户端发正常，自己收正常
	> 服务器：收到了，客户端发正常，我收正常
- 第二次：客户端知道自己收发正常，服务器收发正常
	> 客户端：噫，我发出去的有回信了，那我收发是正常的，服务器收发也正常了
- 第三次：服务器知道自己收发正常，客户端收发正常
	> 服务端：噫，我发出去的有回信了，那我收发都正常了，客户端收发也正常了

<center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);display:inline;margin:0" 
    src="https://cdn.jsdelivr.net/gh/DSzhongweizi/Resources/article/20200822201446.png" width=700 />
    <br>
    <div style="color:orange; border-bottom: 1px solid #d9d9d9;
    display: inline-block;
    color: #999;">tcp和udp的区别</div>
</center>

### 两次为什么不可以？四次呢？
两次只能让
- 客户端知道自己收发正常，服务器收发也正常
- 服务器知道自己收正常，客户端发正常，但不知道自己发正常与否，客户端收正常与否

四次多余了，吃饱饭撑着没事干。
## tcp的四次挥手
四次挥手就是tcp连接的释放，释放必须是一方主动释放，另一方被动释放，主动方可以是客户端或者服务器：
- 第一次：主动方告诉被动方，自己不发送数据了，随后进入半关闭状态
- 第二次：被动方接收到主动方的请求，并回话告诉主动方自己知道请求了，并请求主动方等会
- 第三次：被动方处理完剩余的事（突然收到被甩的请求，得缓一下），告诉主动方，我准备释放了，随后进入半关闭状态
- 第四次：主动方收到被动方释放的请求，返回告诉被动方自己知道了，被动方接受到后关闭连接，主动方这时会等一会再自己关闭（也不知道被动方是否真的关闭了，等一会看看吧）

通俗说法：
- 主动方：我要关闭了
- 被动方：知道了，请等我处理一下剩下的事
- 被动方：处理完了，我也要关闭了
- 主动方：知道了
    被动方接收到关闭，主动方过一会也关闭
