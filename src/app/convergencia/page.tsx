"use client";

import { useEffect, useRef, useState } from "react";
// import InputMask from "react-input-mask";
import axios from "axios";
import { redirect } from "@/lib/utils";

const FormularioDuasEtapas = () => {
  const [step, setStep] = useState(1);
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
    segmento: "",
    cnpj: "",
    cargo: "",
    inicio_projeto: "",
    descricao: "",
  });

  useEffect(() => {
    // Captura UTM da URL
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setFormData((prevData) => ({
        ...prevData,
        utm_source: urlParams.get("utm_source") || "",
        utm_medium: urlParams.get("utm_medium") || "",
        utm_campaign: urlParams.get("utm_campaign") || "",
        utm_term: urlParams.get("utm_term") || "",
        utm_content: urlParams.get("utm_content") || "",
      }));
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNextStep = async (e: any) => {
    e.preventDefault();
    if (step === 1) {
      // Validate step 1
      if (
        !formData.nome ||
        !formData.email ||
        !formData.nome_empresa ||
        !formData.telefone ||
        !formData.faturamento ||
        !formData.segmento
      ) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      // Send step 1 data
      try {
        await axios.post(
          "https://hook.us1.make.com/iwiumcsjsh1mcydr7unb3jxsqctymk5o",
          { ...formData, etapa: "etapa 1" }
        );
        if (
          ["Até 50 mil", "De 51 a 70 mil", "De 71 a 100 mil"].includes(
            formData.faturamento
          )
        ) {
          redirect("https://lp.aegmedia.com.br/conv-obrigadoref");
        } else {
          setStep(2);
        }
      } catch (error) {
        alert("Ocorreu um erro ao enviar os dados. Tente novamente.");
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Validate step 2
    if (
      !formData.cnpj ||
      !formData.cargo ||
      !formData.inicio_projeto ||
      !formData.descricao
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Send combined data
    try {
      await axios.post(
        "https://hook.us1.make.com/iwiumcsjsh1mcydr7unb3jxsqctymk5o",
        { ...formData, etapa: "etapa 2" }
      );
      redirect("https://lp.aegmedia.com.br/conv-obrigado");
    } catch (error) {
      alert("Ocorreu um erro ao enviar os dados. Tente novamente.");
    }
  };

  return (
    <div className="bg-transparent">
      {step === 1 && (
        <form
          id="formStep1"
          className="py-[35px] px-[20px] border border-gray-300 flex flex-col gap-1 rounded-[10px] min-w-full"
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
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              name="nome"
              required
              className="mt- 1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.nome}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Nome da Empresa</label>
            <input
              type="text"
              name="nome_empresa"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.nome_empresa}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Telefone</label>
            {/* <InputMask
              mask="(99) [9]9999-9999"
              value={formData.telefone}
              onChange={handleChange}
              name="telefone"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            /> */}
            <input
              type="tel"
              value={formData.telefone}
              onChange={handleChange}
              name="telefone"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Faturamento Mensal</label>
            <select
              name="faturamento"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.faturamento}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="Até 50 mil">Até 50 mil</option>
              <option value="De 51 a 70 mil">De 51 mil a 70 mil</option>
              <option value="De 71 a 100 mil">De 71 mil a 100 mil</option>
              <option value="De 101 a 200 mil">De 101 mil a 200 mil</option>
              <option value="De 201 a 400 mil">De 201 mil a 400 mil</option>
              <option value="De 401 mil a 1 milhão">
                De 401 mil a 1 milhão
              </option>
              <option value="De 1 a 4 milhões">De 1 a 4 milhões</option>
              <option value="De 4 a 16 milhões">De 4 a 16 milhões</option>
              <option value="De 16 a 40 milhões">De 16 a 40 milhões</option>
              <option value="Mais de 40 milhões">Mais de 40 milhões</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Segmento</label>
            <select
              name="segmento"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.segmento}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="Serviço">Serviço</option>
              <option value="Varejo">Varejo</option>
              <option value="Indústria">Indústria</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Food Service">Food Service</option>
              <option value="Educação">Educação</option>
              <option value="Imobiliária">Imobiliária</option>
              <option value="SAAS">SAAS</option>
              <option value="Finanças">Finanças</option>
              <option value="Franquia">Franquia</option>
              <option value="Telecom">Telecom</option>
              <option value="Energia Solar">Energia Solar</option>
              <option value="Turismo">Turismo</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleNextStep}
            className="mt-4 bg-green-600 text-white p-3 rounded w-full"
          >
            Enviar agora mesmo
          </button>
        </form>
      )}

      {step === 2 && (
        <form
          id="formStep2"
          onSubmit={handleSubmit}
          className="py-[35px] px-[20px] border border-gray-300 flex flex-col gap-1 rounded-[10px] min-w-full"
        >
          <p>
            Recebemos o seu cadastro, agora é só terminar de preencher as
            informações para ser atendido com mais agilidade
          </p>
          <div className="mb-4">
            <label className="block text-gray-700">CNPJ</label>
            <input
              type="text"
              name="cnpj"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.cnpj}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Cargo</label>
            <select
              name="cargo"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.cargo}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="Proprietário">Proprietário</option>
              <option value="Sócio">Sócio</option>
              <option value="CEO/Diretor Executivo">
                CEO/Diretor Executivo
              </option>
              <option value="Diretor">Diretor</option>
              <option value="Gerente">Gerente</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Coordenador">Coordenador</option>
              <option value="Analista">Analista</option>
              <option value="Assistente/Funcionário">
                Assistente/Funcionário
              </option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              Quando pretende iniciar o projeto
            </label>
            <select
              name="inicio_projeto"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.inicio_projeto}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="Imediatamente">Imediatamente</option>
              <option value="Em até três meses">Em até três meses</option>
              <option value="Em seis meses">Em seis meses</option>
              <option value="Ainda não sei">Ainda não sei</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              Fale um pouco mais sobre seu objeto e/ou negócio
            </label>
            <textarea
              name="descricao"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.descricao}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-4 bg-green-600 text-white p-3 rounded w-full"
          >
            Enviar agora mesmo
          </button>
        </form>
      )}
    </div>
  );
};

export default FormularioDuasEtapas;
