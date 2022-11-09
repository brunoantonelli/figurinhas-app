<template>
  <div className="Box-h-root">
    <div className="Box-h-menu" id="h-menu">
      <div class="Box-h-menu-header">
        <button class="Button-h-menu-icon" @click.prevent="clickMenu">
          <CoHamburgerMenu size="30" color="black" />
        </button>
      </div>
      <div class="Box-h-menu-body" id="h-menu-body">
        <div class="Box-h-color" v-for="item in menuItens" :key="item">
          <button class="Button-h-menu-item" :id="item" :value="item" @click.prevent="clickItem($event)">
            {{ item }}
          </button>
        </div>
      </div>
    </div>
    <div className="Box-h-body" id="h-body" v-if="indexItem === 0">
      <BuscarMatch />
    </div>
    <div className="Box-h-body" id="h-body" v-if="indexItem === 1">
      <MinhasFigurinhas />
    </div>
    <div className="Box-h-body" id="h-body" v-if="indexItem === 2">
      <Perfil />
    </div>
  </div>
</template>

<script>
import api from "@/service/api";
import { CoHamburgerMenu } from "oh-vue-icons/icons";
import BuscarMatch from "../bodies/BuscarMatch.vue";
import MinhasFigurinhas from "../bodies/MinhasFigurinhas.vue";
import Perfil from "../bodies/PerfilUsuario.vue";


export default {
  name: "HomePage",
  components: {
    CoHamburgerMenu,
    BuscarMatch,
    MinhasFigurinhas,
    Perfil,
  },
  data() {
    return {
      menuOpen: true,
      indexItem: 0,
      menuItens: ["Buscar Match", "Minhas Figurinhas", "Perfil"],
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    api.ping(token).catch((err) => {
      console.log(err.response.status);
      if (err.response.status === 401) {
        this.$router.replace("/login-user");
      } else {
        this.$router.replace("/critical-error");
      }
    });
    const atualItem = document.getElementById(this.menuItens[this.indexItem]);
    atualItem.style.backgroundColor = "rgb(160, 160, 241)";
  },

  updated() {
    const itens = document.getElementsByClassName("Button-h-menu-item");
    const atualItem = document.getElementById(this.menuItens[this.indexItem]);
    for (let i = 0; i < itens.length; i++) {
      itens[i].style.backgroundColor = "transparent";
    }
    atualItem.style.backgroundColor = "rgb(135, 43, 77)";
  },

  methods: {
    clickMenu() {
      const menu = document.getElementById("h-menu");
      const body = document.getElementById("h-body");
      const menuBody = document.getElementById("h-menu-body");

      if (this.menuOpen) {
        this.menuOpen = false;
        menu.style.width = "50px";
        body.style.width = "calc(100% - 50px)";
        menuBody.style.visibility = "hidden";
      } else {
        this.menuOpen = true;
        menu.style.width = "230px";
        body.style.width = "calc(100% - 230px)";
        menuBody.style.visibility = "visible";
      }
    },

    clickItem(e) {
      const textClicado = e.srcElement._value.toString();
      this.indexItem = this.menuItens.indexOf(textClicado);
    },
  },
};
</script>

<style scoped>
.Box-h-root {
  display: flex;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgb(229, 120, 160), rgb(135, 43, 77));
}

.Box-h-menu {
  display: flex;
  flex-direction: column;
  height: calc(100% - 2px);
  width: 230px;
  border: 1px solid black;
}

.Box-h-menu-header {
  display: flex;
  justify-content: flex-end;
  height: 50px;
  width: 100%;
  background: white;
  border-bottom: 1px solid black;
}

.Button-h-menu-icon {
  display: flex;
  height: 100%;
  width: 50px;
  border: none;
  background-color: rgb(135, 43, 77);
  cursor: pointer;
}

.Box-h-menu-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  color: white;
  height: calc(100% - 70px);
  width: calc(100% - 20px);
  margin: 10px;
  gap: 10px;
}

.Button-h-menu-item {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  height: 60px;
  width: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: 5px;
  color: white;
}

.Box-h-color {
  display: flex;
  border-radius: 5px;
}

.Box-h-color:hover {
  background-color: rgb(135, 43, 77);
}

.Box-h-body {
  display: flex;
  height: 100%;
  width: calc(100% - 20px);
}
</style>
