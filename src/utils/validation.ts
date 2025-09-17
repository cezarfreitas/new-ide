// Funções de validação para formulários

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

// Validação de telefone brasileiro
export function validatePhone(phone: string): ValidationResult {
  if (!phone || phone.trim() === '') {
    return {
      isValid: false,
      message: 'Telefone é obrigatório'
    };
  }

  // Remove todos os caracteres não numéricos
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Verifica se tem pelo menos 10 dígitos (telefone fixo) ou 11 dígitos (celular)
  if (cleanPhone.length < 10) {
    return {
      isValid: false,
      message: 'Telefone deve ter pelo menos 10 dígitos'
    };
  }

  if (cleanPhone.length > 11) {
    return {
      isValid: false,
      message: 'Telefone deve ter no máximo 11 dígitos'
    };
  }

  // Verifica se é um telefone válido (começa com 2-9 para DDD e 2-9 para o número)
  const ddd = cleanPhone.substring(0, 2);
  const number = cleanPhone.substring(2);

  // DDD deve estar entre 11 e 99
  if (parseInt(ddd) < 11 || parseInt(ddd) > 99) {
    return {
      isValid: false,
      message: 'DDD inválido'
    };
  }

  // Para celular (11 dígitos), o terceiro dígito deve ser 9
  if (cleanPhone.length === 11 && number[0] !== '9') {
    return {
      isValid: false,
      message: 'Celular deve começar com 9 após o DDD'
    };
  }

  return {
    isValid: true
  };
}

// Validação de email
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      message: 'Email é obrigatório'
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: 'Email inválido'
    };
  }

  return {
    isValid: true
  };
}

// Validação de nome
export function validateName(name: string): ValidationResult {
  if (!name || name.trim() === '') {
    return {
      isValid: false,
      message: 'Nome é obrigatório'
    };
  }

  if (name.trim().length < 2) {
    return {
      isValid: false,
      message: 'Nome deve ter pelo menos 2 caracteres'
    };
  }

  return {
    isValid: true
  };
}

// Validação de mensagem
export function validateMessage(message: string): ValidationResult {
  if (!message || message.trim() === '') {
    return {
      isValid: false,
      message: 'Mensagem é obrigatória'
    };
  }

  if (message.trim().length < 10) {
    return {
      isValid: false,
      message: 'Mensagem deve ter pelo menos 10 caracteres'
    };
  }

  return {
    isValid: true
  };
}

// Formatação de telefone para exibição
export function formatPhone(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 11) {
    // Celular: (11) 99999-9999
    return `(${cleanPhone.substring(0, 2)}) ${cleanPhone.substring(2, 7)}-${cleanPhone.substring(7)}`;
  } else if (cleanPhone.length === 10) {
    // Fixo: (11) 9999-9999
    return `(${cleanPhone.substring(0, 2)}) ${cleanPhone.substring(2, 6)}-${cleanPhone.substring(6)}`;
  }
  
  return phone; // Retorna original se não conseguir formatar
}

// Máscara de telefone para input
export function phoneMask(value: string): string {
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length <= 2) {
    return cleanValue;
  } else if (cleanValue.length <= 7) {
    return `(${cleanValue.substring(0, 2)}) ${cleanValue.substring(2)}`;
  } else if (cleanValue.length <= 11) {
    return `(${cleanValue.substring(0, 2)}) ${cleanValue.substring(2, 7)}-${cleanValue.substring(7)}`;
  }
  
  return `(${cleanValue.substring(0, 2)}) ${cleanValue.substring(2, 7)}-${cleanValue.substring(7, 11)}`;
}
