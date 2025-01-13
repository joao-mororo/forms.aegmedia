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
import { getUTMParams, redirect } from "@/lib/utils";
import axios from "axios";
// import { PhoneInput } from "./phone-input";

const Form = () => {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step > 1 ? step - 1 : step);
  const [isSending, setIsSending] = useState(false);
  const webhook = "https://webhook.site/9a0809b4-95c8-4c43-a973-a6021f27340c";
  const [data, setData] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    name: "",
    email: "",
    phone: "",
    businessName: "",
    authority: "",
    segment: "",
    budget: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target || e;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (step < 7) {
      nextStep();
    } else {
      setIsSending(true);
      axios
        .post(webhook, data)
        .then((res) => {
          setIsSending(false);
          redirect(
            data.authority === "Proprietário"
              ? "https://lp.aegmedia.com.br/conv-obrigado"
              : "https://lp.aegmedia.com.br/conv-obrigadoref"
          );
        })
        .catch((err) => {
          console.error(err);
          setIsSending(false);
        });
    }
  };

  useEffect(() => {
    const UTMParams = getUTMParams();
    setData((prevData) => ({
      ...prevData,
      ...UTMParams,
    }));
  }, []);

  return (
    <form className="mt-2 mb-10" onSubmit={handleSubmit}>
      {step === 1 && (
        <div className="flex flex-col gap-8">
          <Label className="text-xl sm:text-3xl font-bold">
            Como devemos te chamar?
          </Label>
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
          <Label className="text-xl sm:text-3xl font-bold">
            Qual seu número de WhatsApp, {data.name}?
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
          {/* <PhoneInput
            className="text-lg"
            type="tel"
            name="phone"
            placeholder="Digite o DDD + Telefone"
            required
            onChange={(e) => handleChange({ name: "phone", value: e })}
            value={data.phone}
            defaultCountry="BR"
          /> */}
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-8">
          <Label className="text-xl sm:text-3xl font-bold">
            Qual seu melhor e-mail?
          </Label>
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
          <Label className="text-xl sm:text-3xl font-bold">
            Qual o nome do seu negócio?
          </Label>
          <Input
            className="text-lg"
            type="text"
            name="businessName"
            placeholder="Digite o nome da sua empresa ou associação"
            required
            onChange={handleChange}
            value={data.businessName}
          />
        </div>
      )}

      {step === 5 && (
        <div className="flex flex-col gap-8">
          <Label className="text-xl sm:text-3xl font-bold">
            Qual o seu cargo?
          </Label>
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

      {step === 6 && (
        <div className="flex flex-col gap-8">
          <Label className="text-xl sm:text-3xl font-bold">
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

      {step === 7 && (
        <div className="flex flex-col gap-8">
          <Label className="text-xl sm:text-3xl font-bold">
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
          disabled={isSending}
          className="bg-cyan-500 hover:bg-cyan-800 font-bold text-base"
        >
          {isSending ? (
            "ENVIANDO..."
          ) : (
            <>
              PROSSEGUIR <StepForward />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default Form;
