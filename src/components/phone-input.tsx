import React from "react";
import { Input } from "./ui/input";

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  mask: string; // A máscara que você deseja aplicar
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  mask,
  name, // Certificando-se de que o name é passado corretamente
  ...inputProps // Espalhando todas as outras props do Input
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    let formattedValue = "";

    // Formata o valor de acordo com a máscara
    let maskIndex = 0;
    for (let i = 0; i < inputValue.length && maskIndex < mask.length; i++) {
      if (mask[maskIndex] === "9") {
        formattedValue += inputValue[i];
        maskIndex++;
      } else {
        formattedValue += mask[maskIndex];
        maskIndex++;
        i--; // Decrementa i para não pular o próximo número
      }
    }

    // Cria um evento customizado para disparar o onChange com o valor apenas numérico
    const customEvent = {
      ...e,
      target: {
        ...e.target,
        value: inputValue, // Apenas os números (sem máscara)
        name: name,
      },
    };

    onChange(customEvent as React.ChangeEvent<HTMLInputElement>);
  };

  // Função para formatar o valor com a máscara
  const applyMask = (inputValue: string): string => {
    let formattedValue = "";
    let maskIndex = 0;

    // Formata o valor de acordo com a máscara
    for (let i = 0; i < inputValue.length && maskIndex < mask.length; i++) {
      if (mask[maskIndex] === "9") {
        formattedValue += inputValue[i];
        maskIndex++;
      } else {
        formattedValue += mask[maskIndex];
        maskIndex++;
        i--; // Decrementa i para não pular o próximo número
      }
    }

    return formattedValue;
  };

  return (
    <Input
      name={name} // Passando o name corretamente para o input
      type="text"
      value={applyMask(value)} // Exibe o valor com a máscara
      onChange={handleChange}
      {...inputProps} // Passando todas as props adicionais para o Input
    />
  );
};

export default PhoneInput;
