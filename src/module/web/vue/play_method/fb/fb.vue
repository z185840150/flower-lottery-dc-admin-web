<template lang="pug">
  div#football
    el-menu.fb-header-nav(mode="horizontal", default-active="hhad")
      el-menu-item(index="hhad") 胜平负/让球胜平负
      el-menu-item(index="score") 比分
      el-menu-item(index="goals") 总进球
      el-menu-item(index="half") 半全场
      el-menu-item(index="mix") 混合过关
    router-view
</template>
<script>
export default {
  
}
</script>