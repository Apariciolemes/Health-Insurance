<template>
  <div class="menu">
    <div class="menu__horizontal">
      <ul class="nav">
        <li class="nav-item mx-3 d-flex align-items-center">
          <font-awesome-icon icon="file-medical" class="mr-2 icons" />
          <router-link to="/"> Planos </router-link>
        </li>
        <li class="nav-item mx-3 d-flex align-items-center">
          <font-awesome-icon icon="user-ninja" class="mr-2 icons" />
          <router-link to="/author"> Autor </router-link>
        </li>
        <li class="nav-item mx-3 d-flex align-items-center">
          <font-awesome-icon icon="link" class="mr-2 icons" />
          <a
            href="https://www.linkedin.com/in/aparicio-l-b2b67310b/"
            target="_blank"
          >
            Acessar meu LinkedIn
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.menu {
  padding-bottom: 100px;
  .icons {
    color: #ffff;
  }
  .open-menu {
    position: fixed;
    top: 60px;
    z-index: 5;
  }
  &__horizontal {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 100%;
    background: #1976d2;
    position: fixed;
    z-index: 5;
    li {
      font-size: 16px;
      color: #ffff;
      font-family: "SF Pro Display SemiBold";
      a {
        color: #ffff;
      }
    }
  }
}
</style>
