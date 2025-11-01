export class YoutubeEmbed extends HTMLElement {
  static get observedAttributes() {
    return ["data-url"];
  }
  attributeChangedCallback(prop, oldValue, newValue) {

    if (prop === "data-url" && newValue) {
      const url = this.dataset.url;

      const videoId = url.split("v=")[1].split("&")[0];
      this.innerHTML = `
        <iframe width="100%" height="300"
        src="https://www.youtube.com/embed/${videoId}"
        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    }
  }
}
customElements.define("youtube-embed", YoutubeEmbed);
