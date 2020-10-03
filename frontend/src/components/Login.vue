<template>
  <div class="login_container">
    <div class="header">rzotgorz</div>
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #66CCFF;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: aliceblue;
  border-radius: 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}

.avatar_box{
  height: 130px;
  width: 130px;
  border: 1px solid #eeeeee;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
}

.header {
  position: absolute;
  left: 50%;
  top: 20%;
}
</style>
