<template>
  <div>
    <div id="unity-container" class="unity-desktop">
      <input
        id="email"
        name="email"
        placeholder="adsf@163.com"
        required
        type="email"
      />
      <canvas id="unity-canvas" width="960" height="600"></canvas>
      <div id="unity-loading-bar">
        <div id="unity-logo"></div>
        <div id="unity-progress-bar-empty">
          <div id="unity-progress-bar-full"></div>
        </div>
      </div>
      <div id="unity-warning"></div>
      <div id="unity-footer">
        <div id="unity-webgl-logo"></div>
        <div id="unity-fullscreen-button"></div>
        <div id="unity-build-title">VSVR</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      container: document.querySelector('#unity-container'),
      canvas: document.querySelector('#unity-canvas'),
      loadingBar: document.querySelector('#unity-loading-bar'),
      progressBarFull: document.querySelector('#unity-progress-bar-full'),
      fullscreenButton: document.querySelector('#unity-fullscreen-button'),
      warningBanner: document.querySelector('#unity-warning'),
      buildUrl: 'Build',
      loaderUrl: './Build/WebGL.loader.js',
      DbUrl: './Build/indexedDb.js',
      messageCtrUrl: './Build/messageCtr.js'
    }
  },
  computed: {
    config() {
      return {
        dataUrl: this.buildUrl + '/WebGL.data.unityweb',
        frameworkUrl: this.buildUrl + '/WebGL.framework.js.unityweb',
        codeUrl: this.buildUrl + '/WebGL.wasm.unityweb',
        streamingAssetsUrl: 'StreamingAssets',
        companyName: 'vswork',
        productName: 'VSVR',
        productVersion: '1.9.10',
        showBanner: this.unityShowBanner
      }
    }
  },
  mounted() {
    const scriptInfo = document.createElement('script')
    scriptInfo.type = 'text/javascript'
    scriptInfo.src = './WebGL.loader.js'
    document.head.appendChild(scriptInfo)
    scriptInfo.onload = ()=>{
      // eslint-disable-next-line no-undef
      createUnityInstance(this.canvas, this.config, progress => {
        console.log(progress)
      })
          .then(unityInstance => {
            console.log(unityInstance)
          })
          .catch(message => {
            alert(message)
          })
    }

  },
  methods: {
    updateBannerVisibility() {
      this.warningBanner.style.display = this.warningBanner.children.length
        ? 'block'
        : 'none'
    },
    unityShowBanner(msg, type) {
      const div = document.createElement('div')
      div.innerHTML = msg
      this.warningBanner.appendChild(div)
      if (type == 'error') div.style = 'background: red; padding: 10px;'
      else {
        if (type == 'warning') div.style = 'background: yellow; padding: 10px;'
        setTimeout(function () {
          this.warningBanner.removeChild(div)
          this.updateBannerVisibility()
        }, 5000)
      }
      this.updateBannerVisibility()
    }
  }
}
</script>
