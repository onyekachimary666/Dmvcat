/* Launch configuration — fill these values before launch. */
window.DMVCAT_CONFIG = {
  token: {
    name: "$DMVCAT",
    ticker: "DMVCAT",
    chain: "Solana",
    contractAddress: "", // REQUIRED: do not invent this.
  },
  links: {
    pumpFun: "", // REQUIRED: paste the exact Pump.fun token URL.
    x: "",       // REQUIRED: official X profile URL.
    telegram: "", // REQUIRED: official Telegram URL.
  },
  trading: {
    // Keep false until a real DexScreener pair exists.
    dexScreenerEnabled: false,
    dexScreenerEmbedUrl: "", // REQUIRED only when enabled.
    ticket: "A-047",
  },
  assets: [
    {
      name: "DMVCAT Badge",
      file: "/assets/brand/dmvcat-logo.png",
      download: "/assets/brand/dmvcat-logo.png",
      type: "PNG"
    }
  ]
};
