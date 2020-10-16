<template>
    <div class="nav">
      <ul>
        <li><img src="@/assets/logo.png" alt=""></li>
        <li>要闻</li>
        <li>娱乐</li>
        <li>财经</li>
        <li>体育</li>
        <li>图片</li>
        <li>时尚</li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style scoped>
.nav {
  overflow: hidden;
  border-bottom: 1px solid #ccc;
}
.nav ul{
  list-style: none;
  overflow: hidden;
  padding: 0;
}
.nav ul li{
  float:left;
  height:50px;
  line-height: 50px;
  padding:0px 25px;
}
.nav ul li:hover{
  color:rgb(33, 88, 207);
  cursor: pointer;
}
</style>
