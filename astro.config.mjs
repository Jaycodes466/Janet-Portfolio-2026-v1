import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  fonts: [
    {
      provider: fontProviders.google(),
      name: "DM Sans",
      cssVariable: "--font-sans",
      weights: ["700", "400"],
      subsets: ["latin"],
    },
    {
      provider: fontProviders.google(),
      name: "Lora",
      cssVariable: "--font-serif",
      weights: ["600"],
      subsets: ["latin"],
    },
    {
      provider: fontProviders.google(),
      name: "Courgette",
      cssVariable: "--font-script",
      weights: ["400"],
      subsets: ["latin"],
    },
  ],
});
