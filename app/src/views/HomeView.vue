<template>
  <el-main>
    <Content>
      <Spacer>
        <h1>GASP: Guide to Assess Security and Privacy</h1>

        <p>
          This guide allows to evaluate a web service that includes artificial
          intelligence processes on its security level and on its respect for
          users' privacy.
        </p>

        <div align="center">
          <router-link
            class="router-link"
            to="/explanation"
            data-test="navToExplanation"
          >
            <el-button type="primary"> Go to the evaluation </el-button>
          </router-link>

          <router-link class="router-link" to="/restore">
            <el-button> Restoration </el-button>
          </router-link>
        </div>
      </Spacer>

      <Spacer>
        <Card title="About this project">
          <p>
            <b>GASP</b> has been created by Loïc Guibert during his Master
            thesis which aimed to answer the following research question:
            <i
              >How to help organizations to evaluate their web services that use
              artificial intelligence processes, by measuring the risk levels of
              both ICT security and user privacy?</i
            >
          </p>

          <p>
            This application is one of the thesis outputs. A state of the art on
            the biggest risks linked to ICT security and to users' privacy
            protection has been made. A new proposal on how to design and create
            a guide to evaluate systems has been proposed, with this application
            implementing this proposal.
          </p>

          <div align="center" class="thesis">
            <a class="embedded" href="./thesis.pdf" target="_blank">
              <el-button>
                <el-icon class="el-icon--left">
                  <Document />
                </el-icon>
                Thesis report
              </el-button>
            </a>
            <a
              class="embedded"
              href="https://github.com/GuibertLo/gasp"
              target="_blank"
            >
              <GithubIcon></GithubIcon>
              <el-button>
                <el-icon class="el-icon--left">
                  <img class="github-icon" src="@/assets/img/github-mark.svg" />
                </el-icon>
                Thesis repository
              </el-button>
            </a>
          </div>
        </Card>
      </Spacer>

      <Spacer>
        <Card title="Contact">
          <p>
            Please contact us if you wish to ask questions, to share
            improvements or to provide any feedback.
          </p>
          <div align="center">
            <a class="embedded" href="mailto:contact@ohmygasp.com">
              <el-button>
                <el-icon class="el-icon--left">
                  <Message />
                </el-icon>
                Send an email
              </el-button>
            </a>
          </div>
        </Card>
      </Spacer>

      <Card title="Download the application">
        <p>
          <b>GASP</b> can be installed as a Progressive Web Application (PWA):
          it means that compatible browsers can save such websites as native
          applications.
        </p>

        <p>
          Why downloading this application? The only use case is to save it on
          your computer for an offline usage. Otherwise, you do not have any
          need to download it.
        </p>

        <p>
          Unfortunately, not all browsers support this feature. Installation
          procedures are given below.
        </p>

        <el-collapse class="browsers-collapse" accordion>
          <el-collapse-item name="1">
            <template #title>
              Chrome<el-icon class="pwa-icon">
                <Cellphone />
              </el-icon>
            </template>

            <Tip
              backgroundColour="#F5F5F5"
              borderColour="grey"
              title="Installation"
            >
              <p>
                When accessing to the <b>GASP</b> website, click on the pop-up
                that should appear on the bottom of the browser view.
              </p>
              <div align="center">
                <img
                  alt="browser installation"
                  class="pwa-image"
                  src="@/assets/img/pwa-chrome-mobile.png"
                />
              </div>
              <p>
                Alternatively, click on the browser settings button and click on
                the "Install app" option.
              </p>
              <div align="center">
                <img
                  alt="browser installation"
                  class="pwa-image"
                  src="@/assets/img/pwa-chrome-mobile2.png"
                />
              </div>
            </Tip>

            <Tip backgroundColour="#F5F5F5" borderColour="grey" title="Usage">
              <p>
                Asccess to the <b>GASP</b> website via the newly installed icon
                on your mobile home screen, or as usual via the website address.
              </p>
              <p>
                <a
                  href="https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DAndroid"
                  alt="Further inforamtion on PWA from Google"
                  target="_blank"
                  >More information from Google</a
                >
              </p>
            </Tip>
          </el-collapse-item>

          <el-collapse-item name="2">
            <template #title>
              Chrome<el-icon class="pwa-icon">
                <Monitor />
              </el-icon>
            </template>

            <Tip
              backgroundColour="#F5F5F5"
              borderColour="grey"
              title="Installation"
            >
              <p>
                When accessing to the <b>GASP</b> website, click on the
                corresponding icon in the navigation bar. The browser will then
                prompt you a dialog to install the application.
              </p>
              <div align="center">
                <img
                  alt="browser installation"
                  class="pwa-image"
                  src="@/assets/img/pwa-chrome-desktop.png"
                />
              </div>
            </Tip>

            <Tip backgroundColour="#F5F5F5" borderColour="grey" title="Usage">
              <p>
                Access to the <b>GASP</b> website as usual, or via the Chrome
                Apps tab.
              </p>
              <p>
                <a
                  href="https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DDesktop"
                  alt="Further inforamtion on PWA from Google"
                  target="_blank"
                  >More information from Google</a
                >
              </p>
            </Tip>
          </el-collapse-item>

          <el-collapse-item name="3">
            <template #title>
              Firefox<el-icon class="pwa-icon">
                <Cellphone />
              </el-icon>
            </template>

            <Tip
              backgroundColour="#F5F5F5"
              borderColour="grey"
              title="Installation"
            >
              <p>
                When accessing to the <b>GASP</b> website, click on the browser
                settings button and click on the "Install" option.
              </p>
              <div align="center">
                <img
                  alt="browser installation"
                  class="pwa-image"
                  src="@/assets/img/pwa-firefox-mobile.png"
                />
              </div>
            </Tip>

            <Tip backgroundColour="#F5F5F5" borderColour="grey" title="Usage">
              <p>
                Access to the <b>GASP</b> website via the newly installed icon
                on your mobile home screen, or as usual via the website address.
              </p>
              <p>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Installing"
                  alt="Further inforamtion on PWA from Mozilla"
                  target="_blank"
                  >More information from Mozilla</a
                >
              </p>
            </Tip>
          </el-collapse-item>

          <el-collapse-item name="4">
            <template #title>
              Firefox<el-icon class="pwa-icon">
                <Monitor />
              </el-icon>
            </template>

            <Tip
              backgroundColour="#F5F5F5"
              borderColour="grey"
              title="No support"
            >
              <p>
                Unfortunately, Firefox Desktop does not support PWAs, but the
                <a
                  href="https://addons.mozilla.org/en-US/firefox/addon/pwas-for-firefox/"
                  alt="firefox add-on"
                  target="_blank"
                  >Progressive Web Apps for Firefox</a
                >
                open-source add-on allows such usage. Please refer to the link
                for further information.
              </p>
            </Tip>
          </el-collapse-item>
        </el-collapse>
      </Card>
    </Content>
  </el-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Content from "@/components/Content.vue";
import Spacer from "@/components/Spacer.vue";
import Card from "@/components/Card.vue";
import Tip from "@/components/Tip.vue";
import { Cellphone, Document, Monitor, Message } from "@element-plus/icons-vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "HomeView",

  components: {
    Card,
    Content,
    Spacer,
    Document,
    Tip,
    Monitor,
    Cellphone,
    RouterLink,
    Message,
  },
});
</script>

<style scoped>
.router-link,
a.embedded {
  text-decoration: none;
  color: inherit;
}

.router-link:first-of-type,
.thesis .embedded:first-of-type {
  margin-right: 18px;
}

.pwa-image {
  max-width: 80%;
  max-height: auto;
}
.pwa-icon {
  margin-left: 15px;
}

.github-icon {
  max-width: 100%;
  min-width: 100%;
}
</style>
