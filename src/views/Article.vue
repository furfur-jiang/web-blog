<template>
  <el-container class="container">
    <div class="btngroups">
      <!-- TODO：查变形 -->
      <el-button style="display: none;"></el-button>
      <el-button circle>
        <img src="../assets/good-black.svg" />
      </el-button>
      <el-button circle>
        <img src="../assets/comment-black.svg" />
      </el-button>
      <el-button circle>
        <img src="../assets/collect-black.svg" />
      </el-button>
    </div>
    <el-card class="article">
      <h1>高频面试题之防抖节流及代码实现</h1>
      <div class="user-card">
        <div class="user-message">
          <img src="../assets/logo.png" />
          <div>
            <span class="user-name">furfur</span>
            <span class="user-time">2019年10月24日 09:15 阅读1999</span>
          </div>
        </div>
        <el-button type="primary" plain size="small">+ 关注</el-button>
      </div>
      <v-html>
        <section
          id="nice"
          data-tool="mdnice编辑器"
          data-website="https://www.mdnice.com"
          style="
            font-size: 16px;
            color: black;
            padding: 0 10px;
            line-height: 1.6;
            word-spacing: 0px;
            letter-spacing: 0px;
            word-break: break-word;
            word-wrap: break-word;
            text-align: left;
            font-family: Optima-Regular, Optima, PingFangSC-light,
              PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times,
              'Times New Roman', serif;
            margin-top: -10px;
          "
        >
          <h2
            data-tool="mdnice编辑器"
            style="
              margin-top: 30px;
              margin-bottom: 15px;
              padding: 0px;
              font-weight: bold;
              color: black;
              border-bottom: 2px solid rgb(239, 112, 96);
              font-size: 1.3em;
            "
          >
            <span class="prefix" style="display: none;"></span>
            <span
              class="content"
              style="
                display: inline-block;
                font-weight: bold;
                background: rgb(239, 112, 96);
                color: #ffffff;
                padding: 3px 10px 1px;
                border-top-right-radius: 3px;
                border-top-left-radius: 3px;
                margin-right: 3px;
              "
            >
              理论
            </span>
            <span class="suffix"></span>
            <span
              style="
                display: inline-block;
                vertical-align: bottom;
                border-bottom: 36px solid #efebe9;
                border-right: 20px solid transparent;
              "
            ></span>
          </h2>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            <strong style="font-weight: bold; color: black;">函数节流</strong>
            ：一个函数执行一次后，只有大于设定的周期后才会执行第二次；需要频繁触发函数，处于优化性能角度，在规定时间内只让函数触发一次，后面不生效
          </p>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            <strong style="font-weight: bold; color: black;">函数防抖</strong>
            ：一个需要频繁触发的函数，在规定时间内，只让最后一次生效，前面的无效
          </p>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            区别在于：函数节流是周期性进行触发，也就是规定时间内触发的次数也是固定的；函数防抖则不固定，会被打断，打断就需要重新积蓄时长。
            <img
              src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/7/1728eedb725e5a7c~tplv-t2oaga2asx-image.image"
              alt="在这里插入图片描述"
              style="display: block; margin: 0 auto; max-width: 100%;"
            />
            打王者的时候， 技能用完需要一段时间冷却，这就是节流；
          </p>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            但是你回城被打断了就得重新回城，这就跟防抖一个道理。
          </p>
          <h2
            data-tool="mdnice编辑器"
            style="
              margin-top: 30px;
              margin-bottom: 15px;
              padding: 0px;
              font-weight: bold;
              color: black;
              border-bottom: 2px solid rgb(239, 112, 96);
              font-size: 1.3em;
            "
          >
            <span class="prefix" style="display: none;"></span>
            <span
              class="content"
              style="
                display: inline-block;
                font-weight: bold;
                background: rgb(239, 112, 96);
                color: #ffffff;
                padding: 3px 10px 1px;
                border-top-right-radius: 3px;
                border-top-left-radius: 3px;
                margin-right: 3px;
              "
            >
              实践
            </span>
            <span class="suffix"></span>
            <span
              style="
                display: inline-block;
                vertical-align: bottom;
                border-bottom: 36px solid #efebe9;
                border-right: 20px solid transparent;
              "
            ></span>
          </h2>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            节流函数 throttle （不带参数，带参数）
          </p>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            防抖函数 debounce （不带参数，带参数）
          </p>
          <h3
            data-tool="mdnice编辑器"
            style="
              margin-top: 30px;
              margin-bottom: 15px;
              padding: 0px;
              font-weight: bold;
              color: black;
              font-size: 20px;
            "
          >
            <span class="prefix" style="display: none;"></span>
            <span class="content">节流函数 throttle</span>
            <span class="suffix" style="display: none;"></span>
          </h3>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            节流函数 throttle有两种实现形式，分别是
            <strong style="font-weight: bold; color: black;">时间戳</strong>
            和
            <strong style="font-weight: bold; color: black;">定时器</strong>
          </p>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            简单实现一下节流函数 throttle （先不考虑传参）
          </p>
          <pre
            class="custom"
            data-tool="mdnice编辑器"
            style="
              margin-top: 10px;
              margin-bottom: 10px;
              border-radius: 5px;
              box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;
            "
          ><span style="display: block; background: url(https://imgkr.cn-bj.ufileos.com/97e4eed2-a992-4976-acf0-ccb6fb34d308.png); height: 30px; width: 100%; background-size: 40px; background-repeat: no-repeat; background-color: #1E1E1E; margin-bottom: -7px; border-radius: 5px; background-position: 10px 10px;"></span><code class="hljs" style="overflow-x: auto; padding: 16px; color: #DCDCDC; display: block; font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; font-size: 12px; -webkit-overflow-scrolling: touch; padding-top: 15px; background: #1E1E1E; border-radius: 5px;"><span class="hljs-function" style="color: #DCDCDC; line-height: 26px;"><span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">function</span> <span class="hljs-title" style="color: #DCDCDC; line-height: 26px;">throttle</span>(<span class="hljs-params" style="color: #DCDCDC; line-height: 26px;">fn, delay</span>) </span>{
<span/>    <span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">let</span> start = <span class="hljs-number" style="color: #B8D7A3; line-height: 26px;">0</span>
<span/>    <span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">return</span> <span class="hljs-function" style="color: #DCDCDC; line-height: 26px;"><span class="hljs-params" style="color: #DCDCDC; line-height: 26px;">()</span> =&gt;</span> {
<span/>        <span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">let</span> end = <span class="hljs-built_in" style="color: #4EC9B0; line-height: 26px;">Date</span>.now()
<span/>        <span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">if</span> (end - start &gt; delay) {
<span/>            <span class="hljs-comment" style="color: #57A64A; font-style: italic; line-height: 26px;">//修正this指向</span>
<span/>            fn.call(<span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">this</span>)
<span/>            <span class="hljs-comment" style="color: #57A64A; font-style: italic; line-height: 26px;">//注意同步时间</span>
<span/>            start = end
<span/>        }
<span/>    }
<span/>}
<span/></code></pre>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            节流函数使用，滚动屏幕测试，设置一下样式使得出现滚动条
          </p>
          <pre
            class="custom"
            data-tool="mdnice编辑器"
            style="
              margin-top: 10px;
              margin-bottom: 10px;
              border-radius: 5px;
              box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;
            "
          ><span style="display: block; background: url(https://imgkr.cn-bj.ufileos.com/97e4eed2-a992-4976-acf0-ccb6fb34d308.png); height: 30px; width: 100%; background-size: 40px; background-repeat: no-repeat; background-color: #1E1E1E; margin-bottom: -7px; border-radius: 5px; background-position: 10px 10px;"></span><code class="hljs" style="overflow-x: auto; padding: 16px; color: #DCDCDC; display: block; font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; font-size: 12px; -webkit-overflow-scrolling: touch; padding-top: 15px; background: #1E1E1E; border-radius: 5px;"><span class="hljs-selector-tag" style="color: #D7BA7D; line-height: 26px;">html</span>,
<span/><span class="hljs-selector-tag" style="color: #D7BA7D; line-height: 26px;">body</span> {
<span/> <span class="hljs-attribute" style="color: #9CDCFE; line-height: 26px;">height</span>: <span class="hljs-number" style="color: #B8D7A3; line-height: 26px;">500%</span>;
<span/>}
<span/></code></pre>
          <pre
            class="custom"
            data-tool="mdnice编辑器"
            style="
              margin-top: 10px;
              margin-bottom: 10px;
              border-radius: 5px;
              box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;
            "
          ><span style="display: block; background: url(https://imgkr.cn-bj.ufileos.com/97e4eed2-a992-4976-acf0-ccb6fb34d308.png); height: 30px; width: 100%; background-size: 40px; background-repeat: no-repeat; background-color: #1E1E1E; margin-bottom: -7px; border-radius: 5px; background-position: 10px 10px;"></span><code class="hljs" style="overflow-x: auto; padding: 16px; color: #DCDCDC; display: block; font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; font-size: 12px; -webkit-overflow-scrolling: touch; padding-top: 15px; background: #1E1E1E; border-radius: 5px;">document.onscroll = throttle(_ =&gt; {
<span/> console.<span class="hljs-built_in" style="color: #4EC9B0; line-height: 26px;">log</span>(`触发${Date.now()}`)
<span/>}, <span class="hljs-number" style="color: #B8D7A3; line-height: 26px;">200</span>)
<span/></code></pre>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            <img
              src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/7/1728eedb739efce2~tplv-t2oaga2asx-image.image"
              alt="在这里插入图片描述"
              style="display: block; margin: 0 auto; max-width: 100%;"
            />
            由截图可以看出时间间距在200以上，节流成功
          </p>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            现在来看看节流的传参
          </p>
          <pre
            class="custom"
            data-tool="mdnice编辑器"
            style="
              margin-top: 10px;
              margin-bottom: 10px;
              border-radius: 5px;
              box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;
            "
          ><span style="display: block; background: url(https://imgkr.cn-bj.ufileos.com/97e4eed2-a992-4976-acf0-ccb6fb34d308.png); height: 30px; width: 100%; background-size: 40px; background-repeat: no-repeat; background-color: #1E1E1E; margin-bottom: -7px; border-radius: 5px; background-position: 10px 10px;"></span><code class="hljs" style="overflow-x: auto; padding: 16px; color: #DCDCDC; display: block; font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; font-size: 12px; -webkit-overflow-scrolling: touch; padding-top: 15px; background: #1E1E1E; border-radius: 5px;"><span class="hljs-function" style="color: #DCDCDC; line-height: 26px;"><span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">function</span> <span class="hljs-title" style="color: #DCDCDC; line-height: 26px;">throttle</span>(<span class="hljs-params" style="color: #DCDCDC; line-height: 26px;">fn, delay</span>) </span>{
<span/>    <span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">let</span> start = <span class="hljs-number" style="color: #B8D7A3; line-height: 26px;">0</span>
<span/>    <span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">return</span> <span class="hljs-function" style="color: #DCDCDC; line-height: 26px;">(<span class="hljs-params" style="color: #DCDCDC; line-height: 26px;">...args</span>) =&gt;</span> {
<span/>        <span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">let</span> end = <span class="hljs-built_in" style="color: #4EC9B0; line-height: 26px;">Date</span>.now()
<span/>        <span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">if</span> (end - start &gt; delay) {
<span/>            <span class="hljs-comment" style="color: #57A64A; font-style: italic; line-height: 26px;">//修正this指向</span>
<span/>            fn.apply(<span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">this</span>, args)
<span/>            <span class="hljs-comment" style="color: #57A64A; font-style: italic; line-height: 26px;">//注意同步时间</span>
<span/>            start = end
<span/>        }
<span/>    }
<span/>}
<span/><span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">let</span> inputs = <span class="hljs-built_in" style="color: #4EC9B0; line-height: 26px;">document</span>.getElementById(<span class="hljs-string" style="color: #D69D85; line-height: 26px;">'inputs'</span>)
<span/><span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">let</span> fn = throttle(<span class="hljs-function" style="color: #DCDCDC; line-height: 26px;"><span class="hljs-params" style="color: #DCDCDC; line-height: 26px;">e</span> =&gt;</span> {
<span/>    <span class="hljs-built_in" style="color: #4EC9B0; line-height: 26px;">console</span>.log(<span class="hljs-string" style="color: #D69D85; line-height: 26px;">`触发<span class="hljs-subst" style="color: #DCDCDC; line-height: 26px;">${<span class="hljs-built_in" style="color: #4EC9B0; line-height: 26px;">Date</span>.now()}</span>,输入的值为<span class="hljs-subst" style="color: #DCDCDC; line-height: 26px;">${e.target.value}</span>`</span>)
<span/>}, <span class="hljs-number" style="color: #B8D7A3; line-height: 26px;">200</span>)
<span/><span class="hljs-comment" style="color: #57A64A; font-style: italic; line-height: 26px;">//监听input输入事件</span>
<span/>inputs.addEventListener(<span class="hljs-string" style="color: #D69D85; line-height: 26px;">'input'</span>, fn)
<span/></code></pre>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            html部分写个输入框
          </p>
          <pre
            class="custom"
            data-tool="mdnice编辑器"
            style="
              margin-top: 10px;
              margin-bottom: 10px;
              border-radius: 5px;
              box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;
            "
          ><span style="display: block; background: url(https://imgkr.cn-bj.ufileos.com/97e4eed2-a992-4976-acf0-ccb6fb34d308.png); height: 30px; width: 100%; background-size: 40px; background-repeat: no-repeat; background-color: #1E1E1E; margin-bottom: -7px; border-radius: 5px; background-position: 10px 10px;"></span><code class="hljs" style="overflow-x: auto; padding: 16px; color: #DCDCDC; display: block; font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; font-size: 12px; -webkit-overflow-scrolling: touch; padding-top: 15px; background: #1E1E1E; border-radius: 5px;"><span class="hljs-tag" style="color: #9B9B9B; line-height: 26px;">&lt;<span class="hljs-name" style="color: #569CD6; line-height: 26px;">input</span> <span class="hljs-attr" style="color: #9CDCFE; line-height: 26px;">id</span>=<span class="hljs-string" style="color: #D69D85; line-height: 26px;">"inputs"</span> <span class="hljs-attr" style="color: #9CDCFE; line-height: 26px;">type</span>=<span class="hljs-string" style="color: #D69D85; line-height: 26px;">"text"</span>&gt;</span>
<span/></code></pre>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            <img
              src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/7/1728eedb745260c0~tplv-t2oaga2asx-image.image"
              alt="在这里插入图片描述"
              style="display: block; margin: 0 auto; max-width: 100%;"
            />
            可以看出在我狂敲1的操作下，被节流了几次
          </p>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            与不传参的区别在于：
            注意看到传参是时候修改this指向的从call变成apply，便于传入多个参数，接收参数的地方用三个点
            <code
              style="
                font-size: 14px;
                word-wrap: break-word;
                padding: 2px 4px;
                border-radius: 4px;
                margin: 0 2px;
                background-color: rgba(27, 31, 35, 0.05);
                font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
                word-break: break-all;
                color: rgb(239, 112, 96);
              "
            >
              ...
            </code>
            进行展开
          </p>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            上面使用的是时间戳的形式实现节流，还有一个方式是利用定时器实现节流函数
          </p>
          <pre
            class="custom"
            data-tool="mdnice编辑器"
            style="
              margin-top: 10px;
              margin-bottom: 10px;
              border-radius: 5px;
              box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;
            "
          ><span style="display: block; background: url(https://imgkr.cn-bj.ufileos.com/97e4eed2-a992-4976-acf0-ccb6fb34d308.png); height: 30px; width: 100%; background-size: 40px; background-repeat: no-repeat; background-color: #1E1E1E; margin-bottom: -7px; border-radius: 5px; background-position: 10px 10px;"></span><code class="hljs" style="overflow-x: auto; padding: 16px; color: #DCDCDC; display: block; font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; font-size: 12px; -webkit-overflow-scrolling: touch; padding-top: 15px; background: #1E1E1E; border-radius: 5px;"><span class="hljs-function" style="color: #DCDCDC; line-height: 26px;"><span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">function</span> <span class="hljs-title" style="color: #DCDCDC; line-height: 26px;">throttle</span>(<span class="hljs-params" style="color: #DCDCDC; line-height: 26px;">fn, delay</span>) </span>{
<span/>    <span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">let</span> timer = <span class="hljs-literal" style="color: #569CD6; line-height: 26px;">null</span>;
<span/>    <span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">let</span> flag = <span class="hljs-literal" style="color: #569CD6; line-height: 26px;">true</span>; <span class="hljs-comment" style="color: #57A64A; font-style: italic; line-height: 26px;">//中间媒介   </span>
<span/>    <span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">return</span> <span class="hljs-function" style="color: #DCDCDC; line-height: 26px;">(<span class="hljs-params" style="color: #DCDCDC; line-height: 26px;">...args</span>) =&gt;</span> {
<span/>        <span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">if</span> (!flag) <span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">return</span>;
<span/>        clearTimeout(timer);
<span/>        flag = <span class="hljs-literal" style="color: #569CD6; line-height: 26px;">false</span>; <span class="hljs-comment" style="color: #57A64A; font-style: italic; line-height: 26px;">//标志flag为false，使得不会影响后面的执行</span>
<span/>        timer = setTimeout(<span class="hljs-function" style="color: #DCDCDC; line-height: 26px;"><span class="hljs-params" style="color: #DCDCDC; line-height: 26px;">()</span> =&gt;</span> {
<span/>            fn.apply(<span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">this</span>, args);
<span/>            flag = <span class="hljs-literal" style="color: #569CD6; line-height: 26px;">true</span>;
<span/>        }, delay)
<span/>    }
<span/>}
<span/></code></pre>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            利用标志flag为中间媒介，当flag为true时候，可以进入函数；当flag为false，不可以进入函数，因此不会影响后面的执行
          </p>
          <hr
            data-tool="mdnice编辑器"
            style="
              height: 1px;
              margin: 0;
              margin-top: 10px;
              margin-bottom: 10px;
              border: none;
              border-top: 1px solid black;
            "
          />
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            现在我们继续来看防抖函数，也就是需要
            <strong style="font-weight: bold; color: black;">
              蓄能的才能回城
            </strong>
            的函数
          </p>
          <h3
            data-tool="mdnice编辑器"
            style="
              margin-top: 30px;
              margin-bottom: 15px;
              padding: 0px;
              font-weight: bold;
              color: black;
              font-size: 20px;
            "
          >
            <span class="prefix" style="display: none;"></span>
            <span class="content">防抖函数 debounce</span>
            <span class="suffix" style="display: none;"></span>
          </h3>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            需要一个定时器进行辅助，在规定的时间内，如果没有被打断，则可以执行函数
            先来一个不传参数的防抖函数
          </p>
          <pre
            class="custom"
            data-tool="mdnice编辑器"
            style="
              margin-top: 10px;
              margin-bottom: 10px;
              border-radius: 5px;
              box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;
            "
          ><span style="display: block; background: url(https://imgkr.cn-bj.ufileos.com/97e4eed2-a992-4976-acf0-ccb6fb34d308.png); height: 30px; width: 100%; background-size: 40px; background-repeat: no-repeat; background-color: #1E1E1E; margin-bottom: -7px; border-radius: 5px; background-position: 10px 10px;"></span><code class="hljs" style="overflow-x: auto; padding: 16px; color: #DCDCDC; display: block; font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; font-size: 12px; -webkit-overflow-scrolling: touch; padding-top: 15px; background: #1E1E1E; border-radius: 5px;"><span class="hljs-function" style="color: #DCDCDC; line-height: 26px;"><span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">function</span> <span class="hljs-title" style="color: #DCDCDC; line-height: 26px;">debounce</span>(<span class="hljs-params" style="color: #DCDCDC; line-height: 26px;">fn, delay</span>) </span>{
<span/>    <span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">let</span> timer = <span class="hljs-literal" style="color: #569CD6; line-height: 26px;">null</span>
<span/>    <span class="hljs-comment" style="color: #57A64A; font-style: italic; line-height: 26px;">//清除定时器</span>
<span/>    <span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">return</span> <span class="hljs-function" style="color: #DCDCDC; line-height: 26px;"><span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">function</span> (<span class="hljs-params" style="color: #DCDCDC; line-height: 26px;"></span>) </span>{
<span/>        clearTimeout(timer)
<span/>        <span class="hljs-comment" style="color: #57A64A; font-style: italic; line-height: 26px;">//重新设置定时器</span>
<span/>        timer = setTimeout(<span class="hljs-function" style="color: #DCDCDC; line-height: 26px;"><span class="hljs-params" style="color: #DCDCDC; line-height: 26px;">()</span>=&gt;</span> {
<span/>            fn.apply(<span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">this</span>)
<span/>        }, delay)
<span/>    }
<span/>}
<span/></code></pre>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            利用按钮点击进行测试
          </p>
          <pre
            class="custom"
            data-tool="mdnice编辑器"
            style="
              margin-top: 10px;
              margin-bottom: 10px;
              border-radius: 5px;
              box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;
            "
          ><span style="display: block; background: url(https://imgkr.cn-bj.ufileos.com/97e4eed2-a992-4976-acf0-ccb6fb34d308.png); height: 30px; width: 100%; background-size: 40px; background-repeat: no-repeat; background-color: #1E1E1E; margin-bottom: -7px; border-radius: 5px; background-position: 10px 10px;"></span><code class="hljs" style="overflow-x: auto; padding: 16px; color: #DCDCDC; display: block; font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; font-size: 12px; -webkit-overflow-scrolling: touch; padding-top: 15px; background: #1E1E1E; border-radius: 5px;"><span class="hljs-built_in" style="color: #4EC9B0; line-height: 26px;">document</span>.getElementById(<span class="hljs-string" style="color: #D69D85; line-height: 26px;">'btn'</span>).onclick = debounce(<span class="hljs-function" style="color: #DCDCDC; line-height: 26px;"><span class="hljs-params" style="color: #DCDCDC; line-height: 26px;">_</span> =&gt;</span> {
<span/> <span class="hljs-built_in" style="color: #4EC9B0; line-height: 26px;">console</span>.log(<span class="hljs-string" style="color: #D69D85; line-height: 26px;">`触发<span class="hljs-subst" style="color: #DCDCDC; line-height: 26px;">${<span class="hljs-built_in" style="color: #4EC9B0; line-height: 26px;">Date</span>.now()}</span>`</span>)
<span/>}, <span class="hljs-number" style="color: #B8D7A3; line-height: 26px;">200</span>)
<span/></code></pre>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            html
          </p>
          <pre
            class="custom"
            data-tool="mdnice编辑器"
            style="
              margin-top: 10px;
              margin-bottom: 10px;
              border-radius: 5px;
              box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;
            "
          ><span style="display: block; background: url(https://imgkr.cn-bj.ufileos.com/97e4eed2-a992-4976-acf0-ccb6fb34d308.png); height: 30px; width: 100%; background-size: 40px; background-repeat: no-repeat; background-color: #1E1E1E; margin-bottom: -7px; border-radius: 5px; background-position: 10px 10px;"></span><code class="hljs" style="overflow-x: auto; padding: 16px; color: #DCDCDC; display: block; font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; font-size: 12px; -webkit-overflow-scrolling: touch; padding-top: 15px; background: #1E1E1E; border-radius: 5px;"><span class="hljs-tag" style="color: #9B9B9B; line-height: 26px;">&lt;<span class="hljs-name" style="color: #569CD6; line-height: 26px;">button</span> <span class="hljs-attr" style="color: #9CDCFE; line-height: 26px;">id</span>=<span class="hljs-string" style="color: #D69D85; line-height: 26px;">"btn"</span>&gt;</span>按钮<span class="hljs-tag" style="color: #9B9B9B; line-height: 26px;">&lt;/<span class="hljs-name" style="color: #569CD6; line-height: 26px;">button</span>&gt;</span>
<span/></code></pre>
          <figure
            data-tool="mdnice编辑器"
            style="margin: 0; margin-top: 10px; margin-bottom: 10px;"
          >
            <img
              src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/7/1728eedb767d3606~tplv-t2oaga2asx-image.image"
              alt
              style="display: block; margin: 0 auto; max-width: 100%;"
            />
          </figure>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            由截图可以看出，多次点击，只有时间超过200的间隔才有生效，在疯狂点击（点击时差200内）情况下，会持续没有输出效果，也就是被打断多次，无法执行函数
          </p>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            现在可以进行传递参数，原理和节流的传参方式一致
          </p>
          <pre
            class="custom"
            data-tool="mdnice编辑器"
            style="
              margin-top: 10px;
              margin-bottom: 10px;
              border-radius: 5px;
              box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;
            "
          ><span style="display: block; background: url(https://imgkr.cn-bj.ufileos.com/97e4eed2-a992-4976-acf0-ccb6fb34d308.png); height: 30px; width: 100%; background-size: 40px; background-repeat: no-repeat; background-color: #1E1E1E; margin-bottom: -7px; border-radius: 5px; background-position: 10px 10px;"></span><code class="hljs" style="overflow-x: auto; padding: 16px; color: #DCDCDC; display: block; font-family: Operator Mono, Consolas, Monaco, Menlo, monospace; font-size: 12px; -webkit-overflow-scrolling: touch; padding-top: 15px; background: #1E1E1E; border-radius: 5px;"><span class="hljs-function" style="color: #DCDCDC; line-height: 26px;"><span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">function</span> <span class="hljs-title" style="color: #DCDCDC; line-height: 26px;">debounce</span>(<span class="hljs-params" style="color: #DCDCDC; line-height: 26px;">fn, delay</span>) </span>{
<span/>    <span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">let</span> timer = <span class="hljs-literal" style="color: #569CD6; line-height: 26px;">null</span>
<span/>    <span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">return</span> <span class="hljs-function" style="color: #DCDCDC; line-height: 26px;">(<span class="hljs-params" style="color: #DCDCDC; line-height: 26px;">...args</span>) =&gt;</span> {
<span/>        clearTimeout(timer);
<span/>        timer = setTimeout(<span class="hljs-function" style="color: #DCDCDC; line-height: 26px;"><span class="hljs-params" style="color: #DCDCDC; line-height: 26px;">()</span> =&gt;</span> {
<span/>            fn.apply(<span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">this</span>, args);
<span/>        }, delay)
<span/>    }
<span/>}
<span/><span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">let</span> inputs = <span class="hljs-built_in" style="color: #4EC9B0; line-height: 26px;">document</span>.getElementById(<span class="hljs-string" style="color: #D69D85; line-height: 26px;">"inputs"</span>)
<span/><span class="hljs-keyword" style="color: #569CD6; line-height: 26px;">let</span> fn = debounce(<span class="hljs-function" style="color: #DCDCDC; line-height: 26px;">(<span class="hljs-params" style="color: #DCDCDC; line-height: 26px;">e</span>) =&gt;</span> {
<span/>    <span class="hljs-built_in" style="color: #4EC9B0; line-height: 26px;">console</span>.log(e.target.value)
<span/>}, <span class="hljs-number" style="color: #B8D7A3; line-height: 26px;">200</span>)
<span/><span class="hljs-comment" style="color: #57A64A; font-style: italic; line-height: 26px;">//监听input事件</span>
<span/>inputs.addEventListener(<span class="hljs-string" style="color: #D69D85; line-height: 26px;">"input"</span>, fn)
<span/></code></pre>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            <img
              src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/7/1728eedb76a30247~tplv-t2oaga2asx-image.image"
              alt="在这里插入图片描述"
              style="display: block; margin: 0 auto; max-width: 100%;"
            />
            由上图可知，疯狂敲1会一直积蓄，函数不执行，稍微停顿才能执行输出，实现防抖的效果
          </p>
          <h2
            data-tool="mdnice编辑器"
            style="
              margin-top: 30px;
              margin-bottom: 15px;
              padding: 0px;
              font-weight: bold;
              color: black;
              border-bottom: 2px solid rgb(239, 112, 96);
              font-size: 1.3em;
            "
          >
            <span class="prefix" style="display: none;"></span>
            <span
              class="content"
              style="
                display: inline-block;
                font-weight: bold;
                background: rgb(239, 112, 96);
                color: #ffffff;
                padding: 3px 10px 1px;
                border-top-right-radius: 3px;
                border-top-left-radius: 3px;
                margin-right: 3px;
              "
            >
              总结
            </span>
            <span class="suffix"></span>
            <span
              style="
                display: inline-block;
                vertical-align: bottom;
                border-bottom: 36px solid #efebe9;
                border-right: 20px solid transparent;
              "
            ></span>
          </h2>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            <strong style="font-weight: bold; color: black;">节流函数</strong>
            ：一个函数执行一次后，只有大于设定的周期后才会执行第二次；类似游戏中的技能用完需要一段时间冷却。实际可以应用于获取短信验证码的按钮。
          </p>
          <p
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
            "
          >
            <strong style="font-weight: bold; color: black;">防抖函数</strong>
            ：一个需要频繁触发的函数，在规定时间内，只让最后一次生效，前面的无效；类似游戏中你回城被打断了就得重新回城。实际可以应用于搜索框。
          </p>
          <blockquote
            data-tool="mdnice编辑器"
            style="
              display: block;
              font-size: 0.9em;
              overflow: auto;
              overflow-scrolling: touch;
              border-left: 3px solid rgba(0, 0, 0, 0.4);
              color: #6a737d;
              padding-top: 10px;
              padding-bottom: 10px;
              padding-left: 20px;
              padding-right: 10px;
              margin-bottom: 20px;
              margin-top: 20px;
              border-left-color: rgb(239, 112, 96);
              background: #fff9f9;
            "
          >
            <p
              style="
                font-size: 16px;
                padding-top: 8px;
                padding-bottom: 8px;
                margin: 0px;
                color: black;
                line-height: 26px;
              "
            >
              欢迎关注我的个人公众号，写文不易，有用的话请点个赞，Thanks♪(･ω･)ﾉ
            </p>
          </blockquote>
          <figure
            data-tool="mdnice编辑器"
            style="margin: 0; margin-top: 10px; margin-bottom: 10px;"
          >
            <img
              src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/7/1728eedb7726eb94~tplv-t2oaga2asx-image.image"
              alt="在这里插入图片描述"
              style="display: block; margin: 0 auto; max-width: 100%;"
            />
            <figcaption
              style="
                margin-top: 5px;
                text-align: center;
                color: #888;
                font-size: 14px;
              "
            >
              在这里插入图片描述
            </figcaption>
          </figure>
          <p
            id="nice-suffix-juejin-container"
            class="nice-suffix-juejin-container"
            data-tool="mdnice编辑器"
            style="
              font-size: 16px;
              padding-top: 8px;
              padding-bottom: 8px;
              margin: 0;
              line-height: 26px;
              color: black;
              margin-top: 20px !important;
            "
          >
            本文使用
            <a
              href="https://mdnice.com"
              style="
                text-decoration: none;
                word-wrap: break-word;
                font-weight: bold;
                color: rgb(239, 112, 96);
                border-bottom: 1px solid rgb(239, 112, 96);
              "
            >
              mdnice
            </a>
            排版
          </p>
        </section>
      </v-html>
    </el-card>
    <el-card class="meaasge-card">
      <UserMessage />
      <div class="partition"></div>
      <div class="message-get">
        <div class="message-get-sub">
          <div><img src="../assets/good-active.svg" /></div>
          <span>获得点赞11</span>
        </div>
        <div class="message-get-sub">
          <div><img src="../assets/eye-active.svg" /></div>
          <span>文章被阅读1234</span>
        </div>
      </div>
    </el-card>
  </el-container>
</template>

<script>
import UserMessage from '../components/UserMessage'
export default {
  name: 'Article',
  components: {
    UserMessage,
  },
  data() {
    return {
      id: null,
    }
  },
  created() {
    this.id = this.$route.query.id
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  .btngroups {
    position: fixed;
    transform: translate(-100px, 50px);
    display: flex;
    flex-direction: column;
    margin: 30px;
    > * {
      margin: 10px 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.article {
  position: relative;
  width: 820px;
}

.user-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;

  .user-message {
    display: flex;
    div {
      display: flex;
      flex-direction: column;
      margin: 0 20px;
      .user-time {
        color: #8a919f;
      }
    }
  }
  img {
    width: 35px;
    height: 35px;
    border-radius: 35px;
    max-width: 100%;
    max-height: 100%;
  }
}
.meaasge-card {
  transform: translate(20px, 0);
  width: 250px;
  height: 180px;
  .partition:after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #dcdee2;
    position: relative;
    bottom: 0;
    left: 0;
  }
  .message-get {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    .message-get-sub {
      margin: 6px 0;
      display: flex;
      div {
        background: #e1efff;
        width: 25px;
        height: 25px;
        border-radius: 25px;
        line-height: 25px;
        text-align: center;
        margin-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
