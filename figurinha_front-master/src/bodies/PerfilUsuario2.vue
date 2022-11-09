<template>
    <div class="Box-bm-root">
      <div class="Box-header-bodies">Perfil</div>
      <div class="Box-body-bodies">
        <div class="Box-pu-info-geral">
          Informações Gerais
        </div>
        <div class="Box-pu-geral-info">
          <div className="Box-mi-root">
            <div className="Box-mi-title">
              <span className="Span-mi-title"> NOME </span>
            </div>
            <input className="Input-mi" id="i-name" name="f-name" type="text" :placeholder="name" />
          </div>
          <div className="Box-mi-root">
            <div className="Box-mi-title">
              <span className="Span-mi-title"> E-MAIL </span>
            </div>
            <input className="Input-mi" id="i-email" name="email" type="text" value='algum Email' />
          </div>
          <div className="Box-mi-root">
            <div className="Box-mi-title">
              <span className="Span-mi-title"> TELEFONE </span>
            </div>
            <input className="Input-mi" id="i-telefone" name="phone" type="tel" value='2323131' />
          </div>
          <div className="Box-mi-root">
            <button class="Button-pu-pass">
              MUDAR SENHA
            </button>
          </div>
        </div>
        <div class="Box-pu-info-geral">
          Localização
        </div>
        <div class="Box-pu-localization">
          <div className="Box-mi-root">
            <div className="Box-mi-title">
              <span className="Span-mi-title"> CIDADE </span>
            </div>
            <input className="Input-mi" id="i-city" name="city" type="text" value='alguma cidade' />
          </div>
          <div className="Box-mi-root">
            <div className="Box-mi-title">
              <span className="Span-mi-title"> BAIRRO </span>
            </div>
            <input className="Input-mi" id="i-district" name="district" type="text" value='algum Bairro' />
          </div>
          <div className="Box-mi-root">
            <div className="Box-mi-title">
              <span className="Span-mi-title"> LOGRADOURO </span>
            </div>
            <input className="Input-mi" id="i-place" name="place" type="text" value='alguma rua' />
          </div>
        </div>
        <button class="Button-pu-save">
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
        name: '',
        email: '',
        tel: '',
        cidade: '',
        district: '',
        place: '',
      };
    },
    mounted() {
      const token = localStorage.getItem("token");
      api
        .existLocalization(token)
        .then((res) => {
          if (res.status === 204) {
            this.existLocalization = false;
          } else {
            api.getUserPerfil(token)
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
              })
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
    grid-template-areas: 'a a';
    height: 200px;
    width: 95%;
    border-radius: 10px;
    border: 2px solid rgb(93, 22, 48);
    margin-bottom: 20px;
  }
  
  .Box-pu-localization {
    display: grid;
    grid-template-areas: 'a a';
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
    