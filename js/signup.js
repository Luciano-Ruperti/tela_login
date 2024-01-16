const form = document.querySelector("#form");
const userName = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const passwordConfirmation = document.querySelector("#password-confirmation");
let eyeIcon = document.querySelector(".bi-eye-fill");
let eyeIconConf = document.querySelector("#conf-eye-icon");
let labelUsuario = document.querySelector("#label-usuario");
let labelEmail = document.querySelector("#label-email");
let labelPassword = document.querySelector("#label-password");
let msg = document.querySelector(".paragraph");
let labelPasswordConfirmation = document.querySelector(
  "#label-password-confirmation"
);
let users = new Array();

form.addEventListener("submit", (event) => {
  event.preventDefault(event);

  // Verifica se o campo usuário é válido
  if (userName.value.length < 3) {
    labelUsuario.setAttribute(
      "style",
      "color: red; transform: translateY(-32px) scale(.9)"
    );
    labelUsuario.innerHTML = "O nome de usuário deve ter pelo menos 3 dígitos";
    userName.value = "";
    userName.focus();
    return;
  } else {
    labelUsuario.innerHTML = "Usuário";
    labelUsuario.setAttribute("style", "color: #fff");
  }

  // Verifica se email está preenchido e se é válido
  if (emailInput.value === "" || !isEmailValid(emailInput.value)) {
    labelEmail.setAttribute(
      "style",
      "color: red; transform: translateY(-14px) scale(.9)"
    );
    labelEmail.innerHTML = "Por favor, digite um email válido";
    emailInput.value = "";
    emailInput.focus();
    return;
  } else {
    labelEmail.innerHTML = "Email";
    labelEmail.setAttribute("style", "color: #fff");
  }

  // Verifica se a senha é válida
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
    labelPassword.setAttribute("style", "color: #fff");
  }

  // Verifica se a confirmação de senha está correta
  if (passwordConfirmation.value.length === 0) {
    labelPasswordConfirmation.setAttribute(
      "style",
      "color: red; transform: translateY(-14px) scale(.9)"
    );
    labelPasswordConfirmation.innerHTML = "Digite a senha novamente";
    passwordConfirmation.value = "";
    passwordConfirmation.focus();
    return;
  }
  if (passwordConfirmation.value !== passwordInput.value) {
    labelPasswordConfirmation.setAttribute(
      "style",
      "color: red; transform: translateY(-14px) scale(.9)"
    );
    labelPasswordConfirmation.innerHTML =
      "A senha não confere, digite novamente";
    passwordConfirmation.value = "";
    passwordConfirmation.focus();
    return;
  } else {
    // montar array com novo cadastro
    objUser = {
      user: userName.value,
      email: emailInput.value,
      password: passwordInput.value,
    };
    console.log(objUser);
    console.log(typeof objUser);

    // Cadastra o usuario no banco de dados

    function setNewData() {
      if (localStorage.hasOwnProperty("users")) {
        users = JSON.parse(localStorage.getItem("users"));
      }
      // verifica se já é cadastrado
      for (let i = 0; i < users.length; i++) {
        if (users[i].user === objUser.user) {
          msg.setAttribute("style", "color: red");
          msg.innerHTML = "já existe um cadastro com esse nome de usuario";
          return;
        }
        if (users[i].email === objUser.email) {
          msg.setAttribute("style", "color: red");
          msg.innerHTML = "já existe um cadastro com esse endereço de email";
          return;
        }
      }
      users.push(objUser);
      localStorage.setItem("users", JSON.stringify(users));
      msg.setAttribute("style", "color: #fff");
      msg.innerHTML =
        // --------------------------------LINK NÃO FUNCIONA------------------------------------------------
        "Usuário cadastrado com sucesso, você já pode fazer o <a class='link' href='../index.html/'>login</a>";
      return;
    }

    setNewData();
    return;

    // Direciona para a tela de login
    //window.location.href = "../../../index.html";
  }

  // Função que verifica se a senha é válida
  function validatePassword(password, minDigits) {
    if (password.length >= minDigits) {
      return true;
    }
    return false;
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

// esconde ou mostra a senha digitada no campo confirmação de senha
eyeIconConf.addEventListener("click", () => {
  if (passwordConfirmation.getAttribute("type") == "password") {
    passwordConfirmation.setAttribute("type", "text");
    eyeIconConf.classList.remove("bi-eye-fill");
    eyeIconConf.classList.add("bi-eye-slash-fill");
  } else {
    passwordConfirmation.setAttribute("type", "password");
    eyeIconConf.classList.remove("bi-eye-slash-fill");
    eyeIconConf.classList.add("bi-eye-fill");
  }
});

// Função para validar o email
function isEmailValid(email) {
  // Regex para validar email
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,3}$/
  );

  if (emailRegex.test(email)) {
    return true;
  }
  return false;
}
