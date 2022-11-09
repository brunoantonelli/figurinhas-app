<template>
  <div class="Box-bm-root">
    <div class="Box-header-bodies">Perfil</div>
    <div class="Box-body-bodies">
      <div class="Box-pu-info-geral">Informações Gerais</div>
      <div class="Box-pu-geral-info">
        <div className="Box-mi-root">
          <div className="Box-mi-title">
            <span className="Span-mi-title"> NOME </span>
          </div>
          <span className="Span-bm-info" v-if="!isEditing"> {{ name }} </span>
          <input
            v-if="isEditing"
            className="Input-mi"
            id="i-name"
            name="f-name"
            type="text"
            value="Editar nome"
          />
        </div>
        <div className="Box-mi-root">
          <div className="Box-mi-title">
            <span className="Span-mi-title"> E-MAIL </span>
          </div>
          <span className="Span-bm-info" v-if="!isEditing"> {{ email }} </span>
          <input
            v-if="isEditing"
            className="Input-mi"
            id="i-email"
            name="email"
            type="text"
            value="Editar email"
          />
        </div>
        <div className="Box-mi-root">
          <div className="Box-mi-title">
            <span className="Span-mi-title"> TELEFONE </span>
          </div>
          <span className="Span-bm-info" v-if="!isEditing"> {{ phone }} </span>
          <input
            v-if="isEditing"
            className="Input-mi"
            id="i-telefone"
            name="phone"
            type="tel"
            value="Editar telefone"
          />
        </div>
        <div className="Box-mi-root">
          <button class="Button-pu-pass" v-if="isEditing">MUDAR SENHA</button>
        </div>
      </div>
      <div class="Box-pu-info-geral">Localização</div>
      <div class="Box-pu-localization">
        <div className="Box-mi-root">
          <div className="Box-mi-title">
            <span className="Span-mi-title"> CIDADE </span>
          </div>
          <span className="Span-bm-info" v-if="!isEditing"> {{ city }} </span>
          <input
            v-if="isEditing"
            className="Input-mi"
            id="i-city"
            name="city"
            type="text"
            value="Editar cidade"
          />
        </div>
        <div className="Box-mi-root">
          <div className="Box-mi-title">
            <span className="Span-mi-title"> BAIRRO </span>
          </div>
          <span className="Span-bm-info" v-if="!isEditing">
            {{ district }}
          </span>
          <input
            v-if="isEditing"
            className="Input-mi"
            id="i-district"
            name="district"
            type="text"
            value="Editar bairro"
          />
        </div>
        <div className="Box-mi-root">
          <div className="Box-mi-title">
            <span className="Span-mi-title"> LOGRADOURO </span>
          </div>
          <span className="Span-bm-info" v-if="!isEditing"> {{ place }} </span>
          <input
            v-if="isEditing"
            className="Input-mi"
            id="i-place"
            name="place"
            type="text"
            value="Editar rua"
          />
        </div>
      </div>
      <button
        class="Button-pu-save"
        v-if="!isEditing"
        @click.prevent="changeMode"
      >
        EDITAR
      </button>
      <button class="Button-pu-save" v-if="isEditing" @click.prevent="save">
        SALVAR
      </button>
    </div>
  </div>
</template>
  
<script>
import api from "@/service/api";
export default {
  name: "PerfilUsuario",
  data() {
    return {
      existLocalization: true,
      isEditing: false,
      name: "Nenhum",
      email: "Nenhum",
      phone: "Nenhum",
      city: "Nenhum",
      district: "Nenhum",
      place: "Nenhum",
    };
  },

  mounted() {
    const token = localStorage.getItem("token");
    api
      .getUserPerfil(token)
      .then((res) => {
        this.name = res.data.name;
        this.email = res.data.email;
        if (res.data.tel) {
          this.phone = res.data.tel;
        }
        if (res.data.localization) {
          this.city = res.data.localization.city;
          this.district = res.data.localization.district;
          this.place = res.data.localization.place;
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
  updated() {
    if (this.isEditing) {
      document.getElementById("i-name").value = this.name;
      document.getElementById("i-email").value = this.email;
      document.getElementById("i-telefone").value =
        this.phone === "Nenhum" ? null : this.phone;
      document.getElementById("i-city").value =
        this.city === "Nenhum" ? null : this.city;
      document.getElementById("i-place").value =
        this.place === "Nenhum" ? null : this.place;
      document.getElementById("i-district").value =
        this.district === "Nenhum" ? null : this.district;
    }
  },

  methods: {
    changeMode() {
      this.isEditing = !this.isEditing;
    },
    async save() {
      const token = localStorage.getItem("token");
      this.name = document.getElementById("i-name").value;
      this.email = document.getElementById("i-email").value;
      this.phone = document.getElementById("i-telefone").value;
      this.city = document.getElementById("i-city").value;
      this.place = document.getElementById("i-place").value;
      this.district = document.getElementById("i-district").value;
      api
        .updatePerfil(
          this.name,
          this.email,
          this.phone,
          this.city,
          this.district,
          this.place,
          token
        )
        .then((res) => {
          localStorage.setItem("token", res.data.newToken);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$router.replace("/login-user");
          } else {
            this.$router.replace("/critical-error");
          }
        });
      this.isEditing = false;
    },
  },
};
</script>
  
<style scoped>
.Box-bm-root {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: linear-gradient(rgb(229, 120, 160), rgb(135, 43, 77));
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
  width: 95%;
  border-radius: 10px;
  border: 2px solid rgb(93, 22, 48);
  margin-bottom: 20px;
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
  width: 100%;
  font-size: 20px;
  padding-left: 10px;
  border-radius: 5px;
  border: none;
  color: rgb(93, 22, 48);
  opacity: 50%;
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
  