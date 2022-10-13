import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  matches: ["https://*.thinkpro.vn/*"],
  css: ["./style.css"]
}

window.addEventListener("load", () => {
  let tool_ui = `<div class="css-selector-tool">
                    <div class="close-btn">
                        <button class="close-btn-click">Close</button>
                    </div>
                    <div class="css-selector-header">
                        <p class="text-xl css-selector-text">html > body > div#__nuxt > div#__layout > div.__default > main.page-laptop.pt-5 > div.bg-white.pb-8 > div.container > section.section-hero.flex.space-x-4 > div.section-hero-banner > div.swiper-root > div.swiper-container > div.swiper-wrapper > div.swiper-slide > a > .blur-up.h-full.w-full.object-cover.t-img</p>
                        <button class="copy-css-btn">Copy</button>
                    </div>
                    <div class="css-selector-content"></div>
                </div>`

  const wrapObject = document.querySelector("body>div")
  if (wrapObject !== null) {
    wrapObject.innerHTML += tool_ui
  }
})
