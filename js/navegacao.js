const siteHeader = document.querySelector('.site-header');
const navToggle = document.querySelector('.site-nav-toggle');
const siteNav = document.querySelector('#site-nav');

if (siteHeader && navToggle && siteNav) {
  const setMenuOpen = (isOpen) => {
    siteHeader.classList.toggle('site-header--nav-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen);
  });

  siteNav.addEventListener('click', (event) => {
    if (event.target.closest('.site-nav__link')) {
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenuOpen(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 761px)').matches) {
      setMenuOpen(false);
    }
  });
}

const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
  const toggleBackToTop = () => {
    backToTop.classList.toggle('back-to-top--visible', window.scrollY > 360);
  };

  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
}

const contatoForm = document.querySelector('.form-contato');
const contatoFields = contatoForm
  ? Array.from(contatoForm.querySelectorAll('[aria-required="true"]'))
  : [];
const contatoStatus = contatoForm
  ? contatoForm.querySelector('.form-contato__status')
  : null;
const contatoTelefone = contatoForm
  ? contatoForm.querySelector('#telefone')
  : null;
let contatoStatusTimeoutId = null;

const contatoFieldLabels = {
  nome: 'Nome completo',
  email: 'Email',
  tipo_evento: 'Tipo de evento',
  data_local: 'Data, cidade e local',
  cerimonial: 'Cerimonial ou produtora',
  telefone: 'Telefone ou WhatsApp',
  comentario: 'Comentário',
};

const getContatoFieldLabel = (input) => {
  const fieldName = input.getAttribute('name');
  return contatoFieldLabels[fieldName] || input.getAttribute('aria-label') || 'Campo';
};

const getErrorMessage = (input) => {
  if (input.validity.valueMissing) {
    return 'Este campo é obrigatório.';
  }

  if (input.type === 'email' && input.validity.typeMismatch) {
    return 'Informe um email válido, por favor.';
  }

  return 'Por favor, corrija este campo.';
};

const clearFieldError = (input) => {
  input.removeAttribute('aria-invalid');
  const errorId = input.getAttribute('aria-describedby');
  const errorElement = errorId ? document.getElementById(errorId) : null;

  if (errorElement) {
    errorElement.textContent = '';
  }
};

const clearContatoStatus = () => {
  if (contatoStatusTimeoutId) {
    window.clearTimeout(contatoStatusTimeoutId);
    contatoStatusTimeoutId = null;
  }

  if (contatoStatus) {
    contatoStatus.textContent = '';
    contatoStatus.classList.remove('form-contato__status--visible');
  }
};

const showTemporaryContatoStatus = (message) => {
  if (!contatoStatus) {
    return;
  }

  clearContatoStatus();
  contatoStatus.textContent = message;
  contatoStatus.classList.add('form-contato__status--visible');
  contatoStatusTimeoutId = window.setTimeout(() => {
    contatoStatus.textContent = '';
    contatoStatus.classList.remove('form-contato__status--visible');
    contatoStatusTimeoutId = null;
  }, 4500);
};

const setFieldError = (input) => {
  input.setAttribute('aria-invalid', 'true');
  const errorId = input.getAttribute('aria-describedby');
  const errorElement = errorId ? document.getElementById(errorId) : null;

  if (errorElement) {
    errorElement.textContent = getErrorMessage(input);
  }
};

const getContatoValue = (formData, fieldName) => formData.get(fieldName)?.toString().trim() || '';

const getCheckboxValue = (formData, fieldName) => (formData.has(fieldName) ? 'Sim' : 'Não');

const hasContatoFormValue = () => {
  if (!contatoForm) {
    return false;
  }

  const fields = Array.from(contatoForm.elements);

  return fields.some((field) => {
    if (field.type === 'button' || field.type === 'submit' || field.type === 'reset') {
      return false;
    }

    if (field.type === 'checkbox' || field.type === 'radio') {
      return field.checked;
    }

    return typeof field.value === 'string' && field.value.trim() !== '';
  });
};

const buildContatoMailto = () => {
  const formData = new FormData(contatoForm);
  const subject = 'Contato pelo site De La Flor';
  const bodyLines = [
    `Nome: ${getContatoValue(formData, 'nome')}`,
    `Email: ${getContatoValue(formData, 'email')}`,
    `Tipo de evento: ${getContatoValue(formData, 'tipo_evento')}`,
    `Data / Cidade / Local: ${getContatoValue(formData, 'data_local')}`,
    `Cerimonial / Produtora: ${getContatoValue(formData, 'cerimonial')}`,
    `Telefone / WhatsApp: ${getContatoValue(formData, 'telefone')}`,
    `Comentario: ${getContatoValue(formData, 'comentario')}`,
    `Autoriza contato para orçamento: ${getCheckboxValue(formData, 'autoriza_contato')}`,
    `Deseja receber novidades: ${getCheckboxValue(formData, 'receber_novidades')}`,
  ];

  return `mailto:lgbteixeira@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
};

const showContatoSuccess = () => {
  if (!contatoStatus) {
    return;
  }

  const nome = contatoForm.querySelector('#nome')?.value.trim();
  const nomeMensagem = nome ? ` ${nome}` : '';
  contatoStatus.textContent = `Informações enviadas com sucesso! Obrigado por entrar em contato conosco${nomeMensagem}`;
  contatoStatus.classList.add('form-contato__status--visible');
};

const formatTelefone = (value) => {
  // DDD (2 dígitos) + celular brasileiro de 9 dígitos: (XX) XXXXX-XXXX
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 2) {
    return digits ? `(${digits}` : '';
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const validateContatoForm = () => {
  let hasError = false;

  contatoFields.forEach((input) => {
    if (!input.validity.valid) {
      setFieldError(input);
      hasError = true;
    } else {
      clearFieldError(input);
    }
  });

  if (hasError) {
    const firstError = contatoFields.find((input) => !input.validity.valid);
    if (firstError) {
      const fieldLabel = getContatoFieldLabel(firstError);
      const message = firstError.validity.valueMissing
        ? `Para enviar, preencha o campo obrigatório: ${fieldLabel}.`
        : getErrorMessage(firstError);

      showTemporaryContatoStatus(message);
      firstError.focus();
    }
    return false;
  }

  return true;
};

const enviarContatoPorEmail = () => {
  if (!contatoForm || !validateContatoForm()) {
    return;
  }

  showContatoSuccess();
  window.location.href = buildContatoMailto();
};

const limparFormularioContato = () => {
  if (!contatoForm) {
    return;
  }

  if (!hasContatoFormValue()) {
    showTemporaryContatoStatus('Não há campos preenchidos para limpar. Este botão serve apenas para limpar o formulário.');
    return;
  }

  contatoForm.reset();
  contatoFields.forEach(clearFieldError);
  clearContatoStatus();
};

window.enviarContatoPorEmail = enviarContatoPorEmail;
window.limparFormularioContato = limparFormularioContato;

if (contatoForm) {
  contatoFields.forEach((input) => {
    input.addEventListener('input', () => {
      clearContatoStatus();

      if (input.validity.valid) {
        clearFieldError(input);
      }
    });
  });

  if (contatoTelefone) {
    contatoTelefone.addEventListener('input', () => {
      contatoTelefone.value = formatTelefone(contatoTelefone.value);
    });
  }

  contatoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    enviarContatoPorEmail();
  });
}
