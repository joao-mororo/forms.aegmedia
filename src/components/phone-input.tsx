import React from "react";
import { Input } from "./ui/input";

interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    rawValue: string
  ) => void;
  mask: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  mask,
  name,
  ...inputProps
}) => {
  // Função para formatar o valor com a máscara
  const formatValue = (inputValue: string): { masked: string; raw: string } => {
    let rawValue = inputValue.replace(/\D/g, ""); // Remove tudo que não é número
    let maskedValue = "";
    let maskIndex = 0;

    for (let i = 0; i < rawValue.length && maskIndex < mask.length; i++) {
      if (mask[maskIndex] === "9") {
        maskedValue += rawValue[i];
        maskIndex++;
      } else {
        maskedValue += mask[maskIndex];
        maskIndex++;
        i--; // Mantém o índice do número até encontrar um espaço na máscara
      }
    }

    return { masked: maskedValue, raw: rawValue };
  };

  // Handler de mudança de input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { masked, raw } = formatValue(e.target.value);

    // Criação de um evento customizado para manter compatibilidade
    const customEvent = {
      ...e,
      target: {
        ...e.target,
        value: masked, // Exibe o valor formatado no input
        name,
      },
    };

    onChange(customEvent as React.ChangeEvent<HTMLInputElement>, raw);
  };

  return (
    <Input
      name={name}
      type="text"
      value={formatValue(value).masked} // Exibe a versão mascarada do valor
      onChange={handleChange}
      {...inputProps}
    />
  );
};

export default PhoneInput;
