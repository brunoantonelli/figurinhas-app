<template>
  <div class="Box-bm-root">
    <div class="Box-header-bodies">Buscar Match</div>
    <div class="Box-body-bodies">
      <div class="Box-card-white" v-if="!existLocalization">
        <span class="Span-bm-info">
          Ops, parece que você ainda não atualizou sua localização. Atualize seu
          perfil para continuar.
        </span>
      </div>
      <div class="Box-buscar">
        <div class="Box-usuarios">
      </div>
      </div>  
    </div>
  </div>
</template>

<script>
import api from "@/service/api";
export default {
  name: "BuscarMatch",
  data() {
    return {
      existLocalization: true,
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    api
      .existLocalization(token)
      .then((res) => {
        if (res.status === 204) {
          this.existLocalization = false;
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.$router.replace("/login-user");
        } else {
          this.$router.replace("/critical-error");
        }
      });
  },
};
</script>

<style scoped>

.Box-buscar {
  display: grid;
  grid-template-columns: 1fr 1fr ;
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
  justify-content: center;
  align-content: center;
}
.Box-bm-root {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: linear-gradient(rgb(229, 120, 160), rgb(135, 43, 77));
}

.Box-card-white {
  padding: 10px;
}

.Span-bm-info {
  font-weight: bold;
}

.Box-usuarios {
  display: flex;
  height: 90px;
  width: 350px;
  border: 2px solid rgb(135, 43, 77);
  border-radius: 5px;
}

</style>
