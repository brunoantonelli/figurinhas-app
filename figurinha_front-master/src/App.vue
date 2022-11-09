<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  user-select: none;
  height: 100vh;
  width: 100vw;
  margin: 0;
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  height: 100%;
  width: 100%;
}

.Box-layout-noAuth {
  height: 100%;
  width: 100%;
  background: linear-gradient( rgb(229, 120, 160),rgb(135, 43, 77));
}

.Form-geral {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
}

.Box-card-blue {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 100px;
  margin-bottom: 100px;
  border-radius: 5px;
  background: #d3d9f4;
  box-shadow: 0px 0px 10px -5px black;
  height: 400px;
  width: 80%;
  max-width: 320px;
  min-width: 190px;
}

.Box-card-white {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 80%;
  max-width: 320px;
  min-width: 190px;
  margin-top: 100px;
  margin-bottom: 100px;
  border-radius: 5px;
  background: white;
  box-shadow: 0px 0px 10px -5px black;
}

.Container-my-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.Button-my-button {
  width: 93%;
  height: 30px;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 3px 10px -7px black;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: #f0f0f0;
  background-color: rgb(229, 120, 160);
}

.Button-my-button:hover {
  background-color: #872b4d;
}

.Button-my-button:active {
  background-color: #9e3e61;
}

.Container-span-my-link {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 85%;
  margin-bottom: 3px;
}

.Link-my-link {
  font-size: 13px;
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
}

.Link-my-link:hover {
  color: rgb(229, 120, 160);
}

.Link-my-link:active {
  color: rgb(229, 120, 160);
}

.Box-header-bodies {
  display: flex;
  height: 50px;
  width: calc(100% - 12px);
  background-color :rgb(135, 43, 77);
  color: white;
  border: 1px solid rgb(93, 22, 48);
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  font-weight: bolder;
  font-size: 20px;
}

.Box-body-bodies {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: calc(100% - 50px);
  width: 100%;
}
</style>
