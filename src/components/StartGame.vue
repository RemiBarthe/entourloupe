<template>
  <v-container class="container-start">
    <h1 class="text-center titre-cosmos">Entourloupe</h1>

    <p class="ss-titre">
      Le jeu de bluff à jouer entre amis
    </p>

    <v-card class="mx-auto" max-width="500" dark color="#512b58">
      <v-card-title>
        <h2 class="headline">Créer ou rejoindre une partie</h2>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-text-field
          label="Ton nom"
          v-model="nameUser"
          maxlength="20"
          counter="20"
        />
      </v-card-text>

      <v-card-text>
        <v-text-field label="Code de la partie à rejoindre" v-model="idRoom" />
      </v-card-text>

      <v-card-text>
        <span class="subheading">Choisis un avatar</span>

        <v-chip-group
          v-model="avatarSelected"
          column
          color="white"
          mandatory
          class="avatar-group"
        >
          <v-chip
            v-for="avatar in avatars"
            :key="avatar"
            name="avatar"
            class="chip-cosmos"
            ><v-icon>{{ avatar }}</v-icon></v-chip
          >
        </v-chip-group>
      </v-card-text>

      <v-card-actions>
        <v-btn
          block
          color="#ea9085"
          @click="joinRoom"
          :disabled="!isValid"
          elevation="0"
        >
          Créer partie
        </v-btn>
      </v-card-actions>

      <v-card-actions>
        <v-btn
          block
          color="#ea9085"
          @click="joinRoom"
          :disabled="!isValidRoom"
          elevation="0"
        >
          Rejoindre partie
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="checkGameIsStarted">
      La partie est déjà en cours ..
      <v-btn color="red" text @click="checkGameIsStarted = false">
        Fermer
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { Avatars } from "../assets/avatars.js";

export default {
  name: "StartGame",

  data: () => ({
    nameUser: null,
    idRoom: null,
    avatarSelected: null,
    idUser: Date.now(),
    avatars: Avatars,
    checkGameIsStarted: false
  }),
  mounted() {
    const uri = window.location.search.substring(1);
    const params = new URLSearchParams(uri);
    this.idRoom = params.get("r") ? params.get("r") : this.idRoom;
  },
  computed: {
    isValid() {
      if (this.nameUser && !this.idRoom) {
        if (this.nameUser.trim()) {
          return true;
        }
      }
      return false;
    },
    isValidRoom() {
      if (this.nameUser && this.idRoom) {
        if (this.nameUser.trim() && this.idRoom.trim()) {
          return true;
        }
      }
      return false;
    }
  },
  methods: {
    joinRoom() {
      this.$store.dispatch("joinRoom", {
        idRoom: this.idRoom ? this.idRoom.trim() : this.idUser,
        isHost: !this.idRoom
      });

      setTimeout(() => {
        if (this.$store.state.round === 0) {
          this.$store.dispatch("addUser", {
            id: this.idUser,
            name: this.nameUser,
            avatar: this.avatars[this.avatarSelected],
            idRoom: this.idRoom ? this.idRoom.trim() : this.idUser,
            isHost: !this.idRoom
          });

          if (!this.idRoom) {
            this.$store.dispatch("setQuestions", this.idUser);
          } else {
            this.$store.dispatch("getQuestions", this.idRoom.trim());
          }
        } else {
          this.checkGameIsStarted = true;
        }
      }, 500);
    }
  }
};
</script>

<style scoped>
.container-start {
  min-height: 100vh;
  flex-flow: column wrap;
  display: flex;
  justify-content: center;
}
.titre-cosmos {
  width: 100%;
  color: #fff;
  font-size: 5rem;
  letter-spacing: 2.6rem;
  text-indent: 2.6rem;
  font-family: Teko, sans-serif;
  text-shadow: 8px 8px #000;
  text-transform: uppercase;
}

.ss-titre {
  color: #fff;
  text-align: center;
  font-style: italic;
  font-size: 1.2rem;
  margin-top: -15px;
  margin-bottom: 40px;
}

.chip-cosmos {
  background-color: #512b58 !important;
}

.avatar-group /deep/ .v-slide-group__content {
  justify-content: space-between;
}

@media screen and (min-width: 725px) and (max-width: 1280px) {
  .titre-cosmos {
    font-size: 3rem;
    letter-spacing: 1.56rem;
    text-indent: 1.56rem;
  }
}

@media screen and (max-width: 725px) {
  .titre-cosmos {
    font-size: 1.56rem;
    letter-spacing: 0.94rem;
    text-indent: 0.94rem;
  }

  .ss-titre {
    margin-top: 0;
  }
}
</style>
