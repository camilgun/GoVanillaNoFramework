export class RegisterPage extends HTMLElement {
  connectedCallback() {
    console.log('RegisterPage connected');
    const template = document.getElementById('template-register');
    const content = template.content.cloneNode(true);
    this.appendChild(content);
  }
}
customElements.define('register-page', RegisterPage);

