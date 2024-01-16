const form = document.querySelector("#form");
let userName = document.querySelector("#username");
const emailInput = document.querySelector("#email");
let passwordInput = document.querySelector("#password");
let eyeIcon = document.querySelector(".bi-eye-fill");
let labelUsuario = document.querySelector("#label-usuario");
let labelPassword = document.querySelector("#label-password");
let input = document.querySelector("input");
let msg = document.querySelector(".paragraph");
let users = new Array();
let confirmed = false;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Verifica se o campo usuário está vazio ou com menos de 3 dígitos
  if (userName.value.length < 3) {
    labelUsuario.setAttribute(
      "style",
      "color: red; transform: translateY(-32px) scale(0.9)"
    );
    labelUsuario.innerHTML = "O nome de usuário deve ter pelo menos 3 dígitos";
    userName.value = "";
    userName.focus();
    input.setAttribute("style", "display: block");
    //userName.remove();
    return;
  } else {
    labelUsuario.innerHTML = "Usuário";
    labelUsuario.setAttribute("style", "color: #fff");
    if (!validatePassword(passwordInput.value, 8)) {
      labelPassword.setAttribute(
        "style",
        "color: red; transform: translateY(-14px) scale(.9)"
      );
      labelPassword.innerHTML = "A senha deve ter pelo menos 8 dígitos";
      passwordInput.value = "";
      passwordInput.focus();
      return;
    } else {
      labelPassword.innerHTML = "Senha";
      labelPassword.setAttribute(
        "style",
        "color: #fff; transform: translateY(-14px) scale(.9)"
      );
      // Busca usuário no cadastro e valida a senha
      if (localStorage.hasOwnProperty("users")) {
        users = JSON.parse(localStorage.getItem("users"));
      }
      for (let i = 0; i < users.length; i++) {
        if (
          users[i].user === userName.value &&
          users[i].password === passwordInput.value
        ) {
          msg.setAttribute("style", "color: #fff");
          msg.innerHTML = "*** Logou com sucesso ***";
          confirmed = true;
          return;
        }
        //return;
      }
      if (!confirmed) {
        msg.innerHTML = "usuario/senha não conferem";
        msg.setAttribute("style", "color: red");
        return;
      }
    }
  }

  // Função que valida a senha
  function validatePassword(password, minDigits) {
    if (password.length >= minDigits) {
      return true;
    } else {
      return false;
    }
  }

  // Caso todos os campos estejam validados, envia o form
  form.submit();
});

// esconde ou mostra a senha digitada no campo senha
eyeIcon.addEventListener("click", () => {
  if (passwordInput.getAttribute("type") == "password") {
    passwordInput.setAttribute("type", "text");
    eyeIcon.classList.remove("bi-eye-fill");
    eyeIcon.classList.add("bi-eye-slash-fill");
  } else {
    passwordInput.setAttribute("type", "password");
    eyeIcon.classList.remove("bi-eye-slash-fill");
    eyeIcon.classList.add("bi-eye-fill");
  }
});
