import { PolyMod, MixinType } from "https://polymodloader.com";

class NitroMod extends PolyMod {
  init(pml) {
    this.pml = pml;
    this.nitroAtivo = false;
    this.forcaNitro = 1.65;

    pml.registerBindCategory("Nitro Mod");

    pml.registerKeybind(
      "Ativar Nitro",
      "nitro_keydown",
      "keydown",
      "ShiftLeft",
      "ShiftRight",
      () => { this.nitroAtivo = true; }
    );

    pml.registerKeybind(
      "Desativar Nitro",
      "nitro_keyup",
      "keyup",
      "ShiftLeft",
      "ShiftRight",
      () => { this.nitroAtivo = false; }
    );

    this.criarHUD();
    this.aplicarNitro(pml);
  }

  criarHUD() {
    this.hud = document.createElement("div");
    this.hud.innerText = "NITRO PRONTO [SHIFT]";
    Object.assign(this.hud.style, {
      position: "fixed",
      bottom: "25px",
      right: "25px",
      padding: "10px 18px",
      backgroundColor: "rgba(15, 15, 20, 0.8)",
      color: "#00ffcc",
      fontFamily: "sans-serif",
      fontWeight: "bold",
      fontSize: "14px",
      borderRadius: "8px",
      border: "2px solid #00ffcc",
      zIndex: "9999",
      pointerEvents: "none"
    });
    document.body.appendChild(this.hud);
  }

  aplicarNitro(pml) {
    const atualizarVisual = () => {
      if (this.nitroAtivo) {
        this.hud.innerText = "🔥 NITRO ATIVO! 🔥";
        this.hud.style.color = "#ff5500";
        this.hud.style.borderColor = "#ff5500";
      } else {
        this.hud.innerText = "NITRO PRONTO [SHIFT]";
        this.hud.style.color = "#00ffcc";
        this.hud.style.borderColor = "#00ffcc";
      }
      requestAnimationFrame(atualizarVisual);
    };
    requestAnimationFrame(atualizarVisual);

    pml.registerClassMixin("MainLoop", "update", MixinType.HEAD, (args) => {
      if (this.nitroAtivo && args && args.length > 0) {
        args[0] *= this.forcaNitro;
      }
    });
  }
}

export let polyMod = new NitroMod();
