const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/styles/variables.scss"; 
          @import "@/assets/styles/reset.scss";
          @import "@/assets/styles/mixins/mixins.scss";
          @import "@/assets/styles/mixins/block.scss";
          @import "@/assets/styles/mixins/text.scss";
          @import "@/assets/styles/mixins/btn.scss";
        `
      }
    }
  }
})
