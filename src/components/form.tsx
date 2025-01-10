"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { StepForward, StepBack } from "lucide-react";
import {
  DEFAULT_AUTHORITIES,
  DEFAULT_BUDGETS,
  DEFAULT_SEGMENTS,
} from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getUTMParams } from "@/lib/utils";

const Form = () => {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step > 1 ? step - 1 : step);
  const [data, setData] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    name: "",
    email: "",
    phone: "",
    authority: "",
    segment: "",
    budget: "",
    // Other fields...
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target || e;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const UTMParams = getUTMParams();
    setData((prevData) => ({
      ...prevData,
      ...UTMParams,
    }));
  }, []);

  return (
    <form className="mt-2 mb-10">
      {step === 1 && (
        <div className="flex flex-col gap-8">
          <Label className="text-2xl font-bold">Como devemos te chamar?</Label>
          <Input
            className="text-lg"
            type="text"
            name="name"
            placeholder="Digite seu nome e sobrenome"
            required
            onChange={handleChange}
            value={data.name}
          />
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-8">
          <Label className="text-2xl font-bold">
            Qual seu número de WhatsApp?
          </Label>
          <Input
            className="text-lg"
            type="tel"
            name="phone"
            placeholder="Digite o DDD + Telefone"
            required
            onChange={handleChange}
            value={data.phone}
          />
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-8">
          <Label className="text-2xl font-bold">Qual seu melhor e-mail?</Label>
          <Input
            className="text-lg"
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            required
            onChange={handleChange}
            value={data.email}
          />
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-col gap-8">
          <Label className="text-2xl font-bold">Qual o seu cargo?</Label>
          <Select
            required
            onValueChange={(value) =>
              handleChange({ name: "authority", value })
            }
          >
            <SelectTrigger className="text-lg">
              <SelectValue placeholder="Selecione seu cargo" />
            </SelectTrigger>
            <SelectContent className="text-lg">
              {DEFAULT_AUTHORITIES.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {step === 5 && (
        <div className="flex flex-col gap-8">
          <Label className="text-2xl font-bold">
            Qual o segmento do seu negócio?
          </Label>
          <Select
            required
            onValueChange={(value) => handleChange({ name: "segment", value })}
          >
            <SelectTrigger className="text-lg">
              <SelectValue placeholder="Selecione o segmento" />
            </SelectTrigger>
            <SelectContent className="text-lg">
              {DEFAULT_SEGMENTS.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {step === 6 && (
        <div className="flex flex-col gap-8">
          <Label className="text-2xl font-bold">
            Qual o faturamento mensal do seu negócio?
          </Label>
          <Select
            required
            onValueChange={(value) => handleChange({ name: "budget", value })}
          >
            <SelectTrigger className="text-lg">
              <SelectValue placeholder="Selecione o faturamento mensal" />
            </SelectTrigger>
            <SelectContent className="text-lg">
              {DEFAULT_BUDGETS.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex gap-4 items-center justify-end mt-4">
        {step > 1 && (
          <p
            onClick={prevStep}
            className="cursor-pointer font-bold hover:underline text-cyan-500 text-base"
          >
            <StepBack />
          </p>
        )}
        <Button
          type="button"
          onClick={nextStep}
          className="bg-cyan-500 hover:bg-cyan-800 font-bold text-base"
        >
          PROSSEGUIR <StepForward />
        </Button>
      </div>
    </form>
  );
};

export default Form;
