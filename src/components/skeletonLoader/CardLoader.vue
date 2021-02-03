<template>
  <div class="cardLoader">
    <div class="img loading"></div>
    <div class="descLoader">
      <h6 class="loading"></h6>
      <ul>
        <li class="loading"></li>
        <li class="loading"></li>
        <li class="loading"></li>
      </ul>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
@import "../../scss/variable.scss";
.loading {
  position: relative;
  background-color: #aea9a9;
  border-radius: 10px;
  overflow: hidden;
}
.cardLoader {
  border-radius: 5px;
  margin-bottom: 60px;
  box-shadow: var(--boxShadow);
  width: 100%;
  min-height: 200px;
  .descLoader {
    padding: 10px 20px;
    padding-bottom: 30px;
  }
  overflow: hidden;
  background-color: var(--element-color);
  .img {
      border-radius: 0;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    height: 200px;
    width: 100%;
  }
  h6 {
    width: 70%;
    height: 20px;
    margin-bottom: 10px;
  }
  ul li {
    width: 50%;
    height: 10px;
    margin-bottom: 5px;
    list-style: none;
  }
}

.loading::after {
  display: block;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(transparent),
    color-stop(rgba(255, 255, 255, 0.2)),
    to(transparent)
  );

  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: loading 0.8s infinite;
}

/* Loading Animation */
@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}

@media only screen and (max-width: 400px) {
  .cardLoader {
    width: 250px;
  }
}
</style>
