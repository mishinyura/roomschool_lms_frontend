const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @use "@/assets/styles/variables.scss" as *;
          @use "@/assets/styles/mixins/mixins.scss" as *;
          @use "@/assets/styles/mixins/block.scss" as *;
          @use "@/assets/styles/mixins/text.scss" as *;
          @use "@/assets/styles/mixins/btn.scss" as *;
        `
      }
    }
  }
})
