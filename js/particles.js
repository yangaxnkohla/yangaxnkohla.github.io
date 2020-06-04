tsParticles.load("main-container", {
  fpsLimit: 60,
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#f00",
      animation: {
        enable: true,
        speed: 20,
        sync: true
      }
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 1
    },
    size: {
      value: 6,
      random: {
        enable: true,
        minimumValue: 3
      },
      animation: {
        enable: true,
        speed: 5,
        minimumValue: 3,
        sync: false
      }
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      warp: true
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      resize: true
    }
  },
  retina_detect: true,
  // background: {
  //   color: "#000"
  // }
});

