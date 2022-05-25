---
title: 详解http
categories:
  - 前端
  - vue
tags:
  - http
  - 请求方法
  - get
  - post
  - 请求头
  - 状态码
  - https
---

HTTP，中文名为超文本传输协议（HyperText Transfer Protocol），是一个基于 TCP 协议，在客户端和服务器之间请求和响应的标准，设计 HTTP 最初的目的是为了提供一种发布和接收 HTML 页面的方法。

> 通过 HTTP 或者 HTTPS 协议请求的资源由统一资源标识符（Uniform Resource Identifiers，URI）来标识。

HTTP 通常使用 TCP/IP 协议，事实上 HTTP 可以在任何互联网协议或其他网络上实现，仅需要这种互联网协议可以保证可靠的传输就行，恰好 TCP 实现了这点。

### http 的基本性质

- 简单的

  报文能够比较轻松地读懂

- 可扩展的
  HTTP headers 让协议扩展变得非常容易。只要服务端和客户端就新 headers 达成语义一致，新功能就可以被轻松加入进来。
- 无状态的

  在同一个连接中，两个执行成功的请求之间是没有关系的。不过可以通过 cookie，创建一个有状态的会话，让每次请求都能共享相同的上下文信息，达成相同的状态。

### http 的请求方法

根据 HTTP 标准，HTTP 请求可以使用多种请求方法。

- HTTP1.0 定义了三种请求方法：GET、POST 和 HEAD 方法。
- HTTP1.1 新增了六种请求方法：OPTIONS、PUT、PATCH、DELETE、TRACE 和 CONNECT 方法。

具体内容为：

- **get 从服务器上请求获取资源，并返回请求结果。**
- head 同 get，只不过它不返回请求的资源正文，仅一些元数据。
- **post 向服务器的指定资源提交数据，达到新建或修改资源的目的。**
- put 向指定资源位置上传其最新内容。
- delete 请求服务器删除 Request-URI 所标识的资源。
- trace 回显服务器收到的请求，主要用于测试或诊断。
- options 使服务器传回该资源所支持的所有 HTTP 请求方法，可以测试服务器功能是否正常运作。
- connect 能够将连接改为隧道方式的代理服务器，通常用于 SSL 加密服务器的链接。
- patch 用于将局部修改应用到资源（后来增加的）。

请求方法中，重复的执行结果和一次的一样，这样的方法具有“幂等性”，以上 get、head、put、delete、options 和 trace 都是幂等的。

#### get 和 post 的区别

从标准来看，get 和 post 的总体区别：

- GET 用于获取信息，是无副作用的，是幂等的，且可缓存
- POST 用于修改服务器上的数据，有副作用，非幂等，不可缓存

<center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);display:inline;margin:0" 
    src="https://cdn.jsdelivr.net/gh/DSzhongweizi/Resources/article/20200822171211.png" width=700 />
    <br>
    <div style="color:orange; border-bottom: 1px solid #d9d9d9;
    display: inline-block;
    color: #999;">get和post请求区别</div>
</center>

##### 注意

- get 请求的参数格式并非一定要使用`? &`，可以服务器上自定义，get 请求的所谓长度限制主要来源于浏览器和服务器
- post 从传输角度看，也是基于 http 的明文传输，并非比 get 安全，加密传输要使用 https
- post 请求的 header 和 body 不一定分开发，产生两个 tcp 数据包只是个别浏览器或框架的策略选择

### http 的请求头

> HTTP 协议的请求和响应报文中必定包含 HTTP 首部，首部内容为客户端和服务器分别处理请求和响应提供所需要的信息

通常 HTTP 首部字段由首部字段名和字段值，中间以":"分割组成，字段值对应单个 HTTP 首部字段可以有多个值：

> cache-control: public, max-age=0

#### 首部字段类型

HTTP 首部字段根据实际用途分为 4 中类型，简单可以分为：

- 常用请求头：`Accept`、`Cache-Control`、`Connection`、`Cookie`、`Content-Type`、`If-Modified-Since`、`If-None-Match`、`Origin`、`Referer`、`User-Agent`、`Upgrade`
- 常用响应头：`Access-Control-Allow-Origin`、`Cache-Control`、`Connection`、`Content-Type`、`ETag`、`Expires`、`Last-Modified`、`Set-Cookie`、`Upgrade`

##### 通用首部字段：

请求报文和响应报文两方都会使用到的首部。

- **Cache-Control 控制缓存行为**
- Connection 逐跳首部、连接的管理
  > 管理持久连接 `Connection : Keep-Alive`
- Date 创建报文的日期时间
- Pragma 报文指令
- Transfer-Encoding 指定报文传输主体的编码方式
- **Upgrade 升级为其他协议**
- Via 代理服务器的相关信息
- Warning 错误通知

##### 请求首部字段：

从客户端向服务器发送请求报文时使用的首部，补充了请求的附加内容、客户端信息、响应内容相关优先级等信息。

- **Accept 用户代理可以处理的媒体类型**
- Accept-Charset 优先的字符集
- Accept-Encoding 优先的内容编码
- Authorization Web 认证信息
- Except 期待服务器的特定行为
- Host 请求资源所在的服务器
- **if-Match 比较实体标记（ETag）**
- **if-Modified-Since 比较资源的更新时间**
- Range 实体的字节范围请求
- **Refer 实体的请求资源发起 url**
- TE 传输编码的优先级
- **User-Agent HTTP 客户端程序的信息**

##### 响应首部字段：

从服务器端向客户端返回响应报文时使用的首部，补充了响应时的附加内容，也会要求客户端附加额外的内容信息。

- Accept-Ranges 是否接受字节范围请求
- **Age 推算资源创建经过的时间**
- **ETag 资源的唯一标识性匹配信息字符串**
- Location 令客户端重定向至指定 UPI
- Proxy-Authenticate 代理服务器对客户端的认证信息
- WWW-Authenticate 服务器对客户端的认证信息
- Server HTTP 服务器的安装信息
- Vary 代理服务器的管理信息

##### 实体首部字段：

针对请求报文和响应报文的实体部分使用到的首部，补充了资源内容更新时间等与实体有关的信息。

- Allow 资源可支持的 HTTP 方法
- Content-Encoding 实体主体适用的编码方式
- Content-Language 实体主体的自然语言
- Content-Length 实体主体的大小
- Content-Location 替代对应资源的 URI
- Content-MD5 实体主体的报文摘要
- Content-Range 实体主体的位置范围
- **Content-Type 实体主体的媒体类型**
- **EXpires 实体主体过期的日期时间**
- **Last-Modified 资源的最后修改日期时间**

### http 的状态码

- 1xx 请求正在处理
- 2xx 请求成功
- 3xx 重定向
- 4xx 客户端错误
- 5xx 服务器错误

#### 常见状态码

- 200 OK 请求正常处理
- 204 请求处理成功——但是没有任何资源返回给客户端(一般用于只需客户端向服务端发送消息)
- 206 对资源的某一部分请求——响应报文中包含由 Content-Range 指定范围的实体内容
- 301 永久重定向——如果把资源对应的 URI 保存为书签，则此时书签会根据 Localtion 首部字段提示的 URI 重新保存
- 302 临时重定向——临时地从旧地址 A 跳转到地址 B
- 303 和 301，302 类似——当使用 post 方法访问一个资源时，把客户端以 get 的方式重定向到对应的 URI，返回 303 状态码
- 304 资源已经找到，但是不满足条件，所以不把资源返回给客户端，常用于协商缓存
- 400 请求报文内有语法错误
- 401 该状态码表示发送的请求需要通过 HTTP 认证，初次收到 401 响应浏览器弹出认证的对话窗口。若收到第二次 401 状态码，则说明第一次验证失败
- 403 请求资源的访问被服务器拒绝，一般是未获得文件系统的访问权限，访问权限出现问题
- 404 服务器上找不到请求资源 或路径错误
- 405 请求方法被服务端识别，但是服务端禁止使用该方法。可以用 OPTIONS 来查看服务器允许哪些访问方法
- 500 服务器端在执行请求时出错，一般是因为 web 应用出现 bug
- 502 代理服务器或网关从上游服务器中收到无效响应
- 503 服务器暂时处于超负载或停机维护，目前无法处理请求

### 持久连接

在 HTTP 1.1 中，引入了保持连线的机制，一个连接可以重复在多个请求/回应使用，TCP 连接默认不关闭，可以被多个请求复用，不用显式声明`Connection: keep-alive`

> 持续连线的方式可以大大减少等待时间，因为在发出第一个请求后，双方不需要重新运行 TCP 握手程序。

连接可以由任何一方中断，或者在一定时间后自动中断，对于每种浏览器，同时支持的连接数也不尽相同。

### 流水线技术

持久连接请求是顺序发出的，HTTP 1.1 在标准中还提出了 Pipelining，试图并行请求，但在现代浏览器中这个功能几乎是默认关闭的，原因主要在于：

服务端要遵循 HTTP/1.1 协议，必须按照客户端发送的请求顺序来回复请求，这样整个连接还是先进先出的，队头阻塞（HOL blocking）可能会发生，造成延迟。

### http2.0

> 2.0 版本将数据分割为帧、消息和流

http2.0 是 1.x 版本的增强版，解决了很多老版本的问题，使 web 请求和响应速度更快更安全，它具有以下特点：

- 二进制分帧——1.x 版本是基于文本传输解析（样式多，健壮性要求高）的，2.0 版本将数据分割成更小的帧，并进行二进制编码
- 多路复用——1.x 版本对同一个域有请求数量限制，请求资源很多时会导致队头阻塞，2.0 版本的一个 tcp 连接可以同时请求多个流（多个帧组成一个流），乱序的帧在接受端可以通过特殊标识符重新组装成完整的数据
- Header 压缩——1.x 版本每次请求都会在请求头中携带 cookie，2.0 版本采用压缩算法编码头部，并建立一个头部键值索引表，在请求的时候只需要携带键名请求就行
- 服务端推送——2.0 版本服务器可以主动推送某些资源给客户端，不用客户端请求了再推送，这可以减少很多时间的。
- 更安全——2.0 版本对 tls 的安全性进一步加强，淘汰了一堆不再安全的加密算法，尽管 2.0 版本本身并没有强制使用 ssl，不过大多数浏览器厂商都实现了 https.2.0。
