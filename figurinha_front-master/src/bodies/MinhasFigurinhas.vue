<template>
  <div class="Box-bm-root">
    <div class="Box-header-bodies">Minhas Figurinhas</div>
    <div class="Box-body-bodies">
      <div class="Box-mf-sticker">
        <div class="Box-mf-info"></div>
        <div className="Box-mf-actions">
          <input className="Input-mi" />
        </div>
      </div>
      <button class="Button-pu-save">SALVAR</button>
    </div>
  </div>
</template>
  
<script>
import api from "@/service/api";
export default {
  name: "MinhasFigurinhas",
  data() {
    return {
      existLocalization: true,
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    api
      .stickers(token)
      .then((res) => {
        console.log(res.data.stickers);
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
.Box-mf-sticker {
  display: flex;
  height: 150px;
  width: 90px;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.Box-mf-info {
  display: flex;
  height: 90px;
  width: 90px;
  border: 2px solid rgb(135, 43, 77);
  border-radius: 5px;
}
.Box-mf-actions {
  display: flex;
  height: 40px;
  width: 100%;
  justify-content: center;
  align-content: center;
}

.Input-mi {
  display: flex;
  width: 40px;
  height: 40px;
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

.Box-body-bodies {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.Box-pu-geral-info {
  display: grid;
  grid-template-areas: "a a";
  height: 200px;
  width: 9%;
  border-radius: 10px;
  border: 2px solid rgb(93, 22, 48);
  margin-bottom: 2px;
}

.Box-pu-localization {
  display: grid;
  grid-template-areas: "a a";
  height: 200px;
  width: 95%;
  border-radius: 10px;
  border: 2px solid rgb(93, 22, 48);
  margin-bottom: 20px;
}

.Box-mi-root {
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  align-items: center;
}

.Box-mi-title {
  display: flex;
  width: 100%;
}

.Button-pu-pass {
  display: flex;
  height: 45px;
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-top: 13px;
}

.Span-mi-title {
  font-weight: bold;
  font-size: 12px;
}

.Input-mi {
  display: flex;
  height: 40px;
  width: 10%;
  font-size: 20px;
  padding-left: 10px;
  border-radius: 5px;
  border: none;
}

.Box-pu-info-geral {
  display: flex;
  width: 95%;
  margin-top: 20px;
  margin-bottom: 10px;
}

.Button-pu-save {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 70px;
  font-weight: bold;
  cursor: pointer;
}
</style>
  