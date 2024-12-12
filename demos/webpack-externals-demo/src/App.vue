<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <el-button type="primary">Element UI Button</el-button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      message: 'Hello, Webpack Externals Demo!'
    }
  }
}
</script>
