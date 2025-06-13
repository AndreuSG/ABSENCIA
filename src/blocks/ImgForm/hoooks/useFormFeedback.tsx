import { useState, useEffect } from 'react';

type UseFormFeedbackProps = {
  isLoading: boolean;
  hasSubmited: boolean;
  error: string | null;
  inputErrors: Record<string, string | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

export const useFormFeedback = ({
  isLoading,
  hasSubmited,
  error,
  inputErrors,
  containerRef,
}: UseFormFeedbackProps) => {
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setSubmitting(false);
    }
  }, [isLoading]);

  useEffect(() => {
    const hasErrors = Object.values(inputErrors).some(error => error !== null);
    if (hasErrors) setSubmitting(false);
  }, [inputErrors]);

  useEffect(() => {
    if (hasSubmited) {
      const form = containerRef.current?.querySelector('form');
      if (form) {
        form.reset();
      }
    }
  }, [hasSubmited, containerRef]);

  const getFormattedError = () => {
    if (!error) return null;

    if (error.includes('could not serialize access')) {
      return "Demasiadas solicitudes simultáneas. Por favor, inténtelo de nuevo.";
    } else if (error.includes('fetch failed')) {
      return "No se pudo conectar con el servicio de verificación. Compruebe su conexión e inténtelo de nuevo.";
    }else if (error.includes('NetworkError')) {
      return "Problema de conexión. Por favor, inténtelo de nuevo más tarde.";
    }else if (error.includes('reCAPTCHA:')) {
      return "Error de reCAPTCHA. Por favor, inténtelo de nuevo.";
    }
    return "Error al enviar el formulario. Por favor, inténtelo de nuevo.";

  };

  const wrapSubmitHandler = (originalHandler: (e: React.FormEvent<HTMLFormElement>) => void) => {
    return (e: React.FormEvent<HTMLFormElement>) => {
      setSubmitting(true);
      originalHandler(e);
    };
  };

  return {
    submitting,
    isButtonDisabled: isLoading || submitting,
    errorMessage: getFormattedError(),
    wrapSubmitHandler,
  };
};
