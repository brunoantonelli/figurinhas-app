<template>
  <div className="Box-layout-noAuth">
    <div className="Box-cc-root">
      <div className="Box-card-blue">
        <MyTitle title="Fazer Login" />
        <form className="Form-geral" autoComplete="on">
          <div className="Box-mi-root">
            <div className="Box-mi-title">
              <span className="Span-mi-title"> E-MAIL </span>
            </div>
            <input
              className="Input-mi"
              id="i-email"
              name="email"
              type="text"
              placeholder="Digite seu e-mail"
            />
            <div className="Box-mi-warning">
              <span className="Span-mi-warning">
                {{ emailWar }}
              </span>
            </div>
          </div>
          <div className="Box-mi-root">
            <div className="Box-mi-title">
              <span className="Span-mi-title"> SENHA </span>
            </div>
            <input
              className="Input-mi"
              id="i-pass"
              name="pass"
              type="password"
              placeholder="Digite sua senha"
            />
            <div className="Box-mi-warning">
              <span className="Span-mi-warning">
                {{ passWar }}
              </span>
            </div>
          </div>
          <div className="Container-my-button">
            <div className="Container-span-my-link">
              <a className="Link-my-link" href="/create-account"> Criar uma conta</a>
            </div>
            <div className="Container-span-my-link">
              <a className="Link-my-link" href="/login-problem"> Problemas ao logar</a>
            </div>
            <button className="Button-my-button" @click.prevent="login">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import MyTitle from "@/components/MyTitle.vue";
import api from "@/service/api";

export default {
  name: "LoginUser",
  data() {
    return {
      passWar: undefined,
      emailWar: undefined,
    };
  },
  components: {
    MyTitle,
  },
  methods: {
    async login() {
      const email = document.getElementById("i-email").value.toString();
      const pass = document.getElementById("i-pass").value.toString();

      if (this.validFields()) {
        api
          .login(email, pass)
          .then((res) => {
            if (res.status === 204) {
              this.passWar = "Credenciais incorretas";
              this.emailWar = "Credenciais incorretas";
            } else {
              localStorage.setItem("token", res.data.token);
              this.$router.replace("/home");
            }
          })
          .catch(() => {
            this.$router.push("/critical-error");
          });
      }
    },

    validFields() {
      this.emailWar = undefined;
      this.passWar = undefined;

      const email = document.getElementById("i-email").value.toString();
      const pass = document.getElementById("i-pass").value.toString();
      if (email === "" || !email.includes("@")) {
        this.emailWar = "Email inválido";
        return false;
      } else if (pass === "" || pass.length < 6) {
        this.passWar = "Senha deve conter no mínimo 6 carateres";
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
.Box-cc-root {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}


.Box-card-blue {
  background-color: rgb(135, 43, 77);
  height: 300px;
}

.Box-mi-root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.Box-mi-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 85%;
  margin-bottom: 3px;
}

.Span-mi-title {
  color: #ffffff;
  font-weight: bold;
  font-size: 12px;
}

.Input-mi {
  width: 90%;
  border: none;
  border-bottom: 2px solid rgb(229, 120, 160);
  height: 35px;
  font-size: 15px;
  border-radius: 5px;
  padding-left: 5px;
}

.Input-mi:focus {
  outline: none;
}

.Box-mi-warning {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 90%;
  margin-top: 3px;
}

.Span-mi-warning {
  color: #fe0000;
  font-weight: bold;
  font-size: 12px;
}

</style>
