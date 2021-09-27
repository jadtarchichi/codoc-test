<template>
  <div>
    <!-- HEADER -->
    <Header />

    <!-- Body -->
    <Cohorts />
  </div>
</template>

<script>
import Header from "./components/HeaderApp.vue";
import Cohorts from "./components/Cohorts";
import $ from "jquery";
import "./styles/main.scss";

function disableCopyToClipboard() {
  var aux = document.createElement("input");
  aux.setAttribute("value", "Capture d'écran non autorisée");
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  // Remove it from the body
  document.body.removeChild(aux);
  alert("Print screen disabled!");
}

export default {
  name: "App",
  created() {
    // Disable print screen
    $(window).keyup(function (e) {
      if (e.keyCode == 44) {
        disableCopyToClipboard();
      }
    });

    // Disable print page
    $(document).on("keydown", function (e) {
      if (
        e.ctrlKey &&
        (e.key == "p" ||
          e.charCode == 16 ||
          e.charCode == 112 ||
          e.keyCode == 80)
      ) {
        alert("Impression non autorisée");
        e.cancelBubble = true;
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    });
    // Disable save page
    $(document).bind("keydown", function (e) {
      if (e.ctrlKey && e.which == 83) {
        e.preventDefault();
        alert("Enregistrement non autorisé");
        return false;
      }
    });
  },
  components: {
    Header,
    Cohorts,
  },
};
</script>
