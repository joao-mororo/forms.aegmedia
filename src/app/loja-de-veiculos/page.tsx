"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getUTMParams, redirect, validateWhatsapp } from "@/lib/utils";
import PhoneInput from "@/components/phone-input";

const FormularioDuasEtapas = () => {
  const [isSending, setIsSending] = useState(false);
  const [step, setStep] = useState(1);
  const [leadID] = useState(crypto.randomUUID().toString());
  const [savedData, setSavedData] = useState<any>();
  const [formData, setFormData] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    nome: "",
    email: "",
    nome_empresa: "",
    telefone: "",
    faturamento: "",
    cargo: "",
    inicio_projeto: "",
    descricao: "",
  });
  const webhook = "https://hook.us1.make.com/f9pfb3xy23fdpim1v52fib9et7yrngyg";

  useEffect(() => {
    const UTMParams = getUTMParams();
    setFormData((prevData) => ({
      ...prevData,
      ...UTMParams,
    }));
  }, []);

  // Salvamento automático
  useEffect(() => {
    const interval = setInterval(() => {
      let newData = {
        ...formData,
        id: leadID,
      };

      setSavedData((prevSavedData: any) => {
        if (!prevSavedData) {
          return newData;
        }
        if (JSON.stringify(prevSavedData) !== JSON.stringify(newData)) {
          axios.post(
            "https://hook.us1.make.com/i46jfxwbtl6f38micf98jgc2rdh32sd3",
            newData
          );
          return newData; // Atualize o estado
        }
        return prevSavedData; // Não atualize se for igual
      });
    }, 3000);

    return () => clearInterval(interval); // Limpa o intervalo quando o componente desmontar
  }, [formData, leadID]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNextStep = async (e: any) => {
    e.preventDefault();
    setIsSending(true);
    if (step === 1) {
      // Send step 1 data
      try {
        await axios.post(webhook, { ...formData, etapa: "etapa 1" });
        setStep(2);
        setIsSending(false);
      } catch (error) {
        alert("Ocorreu um erro ao enviar os dados. Tente novamente.");
        setIsSending(false);
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSending(true);
    // Send combined data
    try {
      await axios.post(webhook, { ...formData, etapa: "etapa 1" });
      if (formData.cargo === "Dono" || formData.cargo === "Gerente") {
        redirect("https://lp.aegmedia.com.br/auto-obrigado");
      } else {
        redirect("https://lp.aegmedia.com.br/auto-obrigadoref");
      }
      setIsSending(false);
    } catch (error) {
      alert("Ocorreu um erro ao enviar os dados. Tente novamente.");
      setIsSending(false);
    }
  };

  return (
    <div className="bg-transparent border border-gray-300 rounded-xl">
      {step === 1 && (
        <form
          id="formStep1"
          onSubmit={handleSubmit}
          className="py-[35px] px-[20px] flex flex-col gap-1 min-w-full"
        >
          <input type="hidden" name="utm_source" value={formData.utm_source} />
          <input type="hidden" name="utm_medium" value={formData.utm_medium} />
          <input
            type="hidden"
            name="utm_campaign"
            value={formData.utm_campaign}
          />
          <input type="hidden" name="utm_term" value={formData.utm_term} />
          <input
            type="hidden"
            name="utm_content"
            value={formData.utm_content}
          />
          <input type="hidden" name="etapa" value="etapa 1" />

          <div className="mb-4">
            {/* <label className="block text-gray-700">Nome</label> */}
            <input
              placeholder="Nome"
              type="text"
              name="nome"
              required
              className="mt- 1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.nome}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            {/* <label className="block text-gray-700">Email</label> */}
            <input
              placeholder="Email"
              type="email"
              name="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            {/* <label className="block text-gray-700">Nome da Empresa</label> */}
            <input
              type="text"
              placeholder="Nome da Empresa"
              name="nome_empresa"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.nome_empresa}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            {/* <label className="block text-gray-700">Telefone</label> */}
            <PhoneInput
              mask="(99) 99999-9999"
              type="tel"
              placeholder="DDD + Telefone"
              value={formData.telefone}
              onChange={handleChange}
              name="telefone"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="mb-4">
            {/* <label className="block text-gray-700">Cargo</label> */}
            <select
              name="cargo"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.cargo}
              onChange={handleChange}
            >
              <option value="">Cargo</option>
              {["Dono", "Gerente", "Vendedor", "Outro"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            {/* <label className="block text-gray-700">Faturamento Mensal</label> */}
            <select
              name="faturamento"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.faturamento}
              onChange={handleChange}
            >
              <option value="">Quantos veículos você vende por mês?</option>
              {[
                "1 a 4 carros por mês",
                "5 a 10 carros por mês",
                "11 a 20 carros por mês",
                "21 a 30 carros por mês",
                "31 a 50 carros por mês",
                "Acima de 50 carros por mês",
              ].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 bg-green-600 text-white p-3 rounded w-full disabled:opacity-80"
            disabled={isSending}
          >
            Enviar agora mesmo
          </button>
        </form>
      )}

      {step === 2 && (
        <form
          id="formStep2"
          onSubmit={handleSubmit}
          className="py-[35px] px-[20px] flex flex-col gap-1 min-w-full"
        >
          <p className="text-gray-300">
            Recebemos o seu cadastro, agora é só terminar de preencher as
            informações para ser atendido com mais agilidade
          </p>

          <div className="mb-4">
            {/* <label className="block text-gray-700">
              Quando pretende iniciar o projeto?
            </label> */}
            <select
              name="inicio_projeto"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.inicio_projeto}
              onChange={handleChange}
            >
              <option value="">Quando pretende iniciar o projeto?</option>
              <option value="Imediatamente">Imediatamente</option>
              <option value="Em até três meses">Em até três meses</option>
              <option value="Em seis meses">Em seis meses</option>
              <option value="Ainda não sei">Ainda não sei</option>
            </select>
          </div>

          <div className="mb-4">
            {/* <label className="block text-gray-700">
              Me fale um pouco sobre seus objetivos e principais
              dificuldades em seu negócio
            </label> */}
            <textarea
              placeholder="Me fale um pouco sobre seus objetivos e principais dificuldades em seu negócio"
              name="descricao"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.descricao}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-4 bg-green-600 text-white p-3 rounded w-full disabled:opacity-80"
            disabled={isSending}
          >
            Enviar agora mesmo
          </button>
        </form>
      )}
    </div>
  );
};

export default FormularioDuasEtapas;
