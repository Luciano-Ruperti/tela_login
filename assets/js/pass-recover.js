const form = document.querySelector("#form");
const emailInput = document.querySelector("#email");
let msg = document.querySelector(".paragraph");
const resendLink = document.querySelector("#resend-link");
let labelEmail = document.querySelector("#label-email");

form.addEventListener(
  "submit",
  (event) => {
    event.preventDefault(event);

    // Verifica se email está preenchido e se é válido
    if (emailInput.value === "" || !isEmailValid(emailInput.value)) {
      labelEmail.setAttribute(
        "style",
        "color: red; transform: translateY(-28px) scale(0.9)"
      );
      labelEmail.innerHTML = "Por favor, digite um email válido";
      emailInput.value = "";
      emailInput.focus();
      return;
    } else if (localStorage.hasOwnProperty("users")) {
      users = JSON.parse(localStorage.getItem("users"));
      // verifica se o email é cadastrado
      for (let i = 0; i < users.length; i++) {
        console.log(i);
        if (users[i].email === emailInput.value) {
          msg.setAttribute("style", "color:#fff");
          msg.innerText = "*** Mensagem enviada ***";
          labelEmail.innerHTML = "E-mail";
          labelEmail.setAttribute(
            "style",
            "color: #fff; transform: translateY(-28px) scale(0.9)"
          );
          return;
        }
      }
      if (msg.innerText !== "*** Mensagem enviada ***") {
        msg.setAttribute("style", "color:red");
        msg.innerText = "O e-mail informado não está cadastrado";
        labelEmail.innerHTML = "E-mail";
        labelEmail.setAttribute(
          "style",
          "color: #fff; transform: translateY(-28px) scale(0.9)"
        );
        return;
      }
    }
  },

  resendLink.addEventListener("click", () => {
    msg.innerText = "Enviamos novamente, por favor verifique seu email";
    return;
  })
);

// Função para validar o email
function isEmailValid(email) {
  // Regex para validar email
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,3}$/
  );

  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
}
