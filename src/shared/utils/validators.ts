/**
 * Utilidades de validación
 */

export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  required: (value: string | null | undefined): boolean => {
    return value !== null && value !== undefined && value.trim() !== '';
  },
  
  minLength: (value: string, min: number): boolean => {
    return value.length >= min;
  },
  
  maxLength: (value: string, max: number): boolean => {
    return value.length <= max;
  },
  
  password: (password: string): boolean => {
    // Mínimo 8 caracteres, al menos una letra y un número
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  },

  /**
   * Valida que un nombre solo contenga letras (incluyendo acentos y caracteres internacionales)
   * No permite números ni símbolos especiales
   */
  name: (name: string): boolean => {
    if (!name || name.trim() === '') return false;
    // Permite letras (incluyendo acentos, ñ, ü), espacios, guiones y apóstrofes
    // Caracteres válidos: letras unicode, espacios, guiones (-), apóstrofes (')
    const nameRegex = /^[\p{L}\s'-]+$/u;
    return nameRegex.test(name.trim());
  },

  /**
   * Verifica si un nombre contiene números
   */
  nameHasNumbers: (name: string): boolean => {
    const numberRegex = /\d/;
    return numberRegex.test(name);
  },

  /**
   * Verifica si un nombre contiene símbolos no permitidos
   * (todo excepto letras, espacios, guiones y apóstrofes)
   */
  nameHasInvalidSymbols: (name: string): boolean => {
    // Si hay caracteres que no son letras, espacios, guiones o apóstrofes
    const invalidSymbolsRegex = /[^\p{L}\s'-]/u;
    return invalidSymbolsRegex.test(name);
  },

  /**
   * Obtiene un mensaje de error específico para la validación de nombre
   */
  getNameError: (name: string): string | null => {
    if (!name || name.trim() === '') {
      return null; // No mostrar error si está vacío
    }
    
    if (name.trim().length < 2) {
      return 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (validators.nameHasNumbers(name)) {
      return 'El nombre no puede contener números';
    }
    
    if (validators.nameHasInvalidSymbols(name)) {
      return 'El nombre solo puede contener letras, espacios y guiones';
    }
    
    return null;
  },
};

