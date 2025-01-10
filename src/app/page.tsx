import Image from "next/image";
import { Quote } from "lucide-react";
import Form from "@/components/form";

export default function Home() {
  return (
    <main className="w-full h-screen grid grid-cols-7">
      <div className="hidden sm:flex flex-col justify-center bg-black text-white col-span-3 rounded-tr-xl rounded-br-xl p-16 gap-9">
        <h1 className="text-6xl font-bold text-cyan-500">
          Junte-se <br /> às maiores
        </h1>
        <p className="text-lg">
          Veja abaixo as empresas que contaram com <br /> a ajuda da AEG Media
          para alavancar suas vendas
        </p>
        <div className="grid grid-cols-4 gap-10">
          <Image
            className="bg-white"
            src={"/next.svg"}
            alt="next image"
            width={"100"}
            height={"100"}
          />
          <Image
            className="bg-white"
            src={"/next.svg"}
            alt="next image"
            width={"100"}
            height={"100"}
          />
          <Image
            className="bg-white"
            src={"/next.svg"}
            alt="next image"
            width={"100"}
            height={"100"}
          />
          <Image
            className="bg-white"
            src={"/next.svg"}
            alt="next image"
            width={"100"}
            height={"100"}
          />
          <Image
            className="bg-white"
            src={"/next.svg"}
            alt="next image"
            width={"100"}
            height={"100"}
          />
          <Image
            className="bg-white"
            src={"/next.svg"}
            alt="next image"
            width={"100"}
            height={"100"}
          />
          <Image
            className="bg-white"
            src={"/next.svg"}
            alt="next image"
            width={"100"}
            height={"100"}
          />
        </div>
      </div>
      <div className="col-span-7 p-8 sm:col-span-4 flex flex-col items-center justify-between sm:py-7 sm:px-16">
        <header>
          <Image
            src={"/aeglogopreta.webp"}
            alt="next image"
            width={"80"}
            height={"80"}
          />
        </header>
        <div>
          <p className="opacity-50">É um prazer te receber aqui!</p>
          <Form />

          {/* Citação */}
          <div className="rounded-xl shadow-md">
            <div className="flex p-4 gap-3 text-lg">
              <Quote className="text-cyan-500" size={24} />
              <p className="opacity-50 font-bold">
                Eu sinceramente não me vejo trabalhando sem vocês. Não
                crescendo, não aprimorando...
              </p>
            </div>
            <p className="bg-cyan-100 text-cyan-600 p-2 pl-4">
              Marcos Marra, Sócio da Litoral Verde Viagens
            </p>
          </div>
        </div>
        <div>
          <p>© Copyright {new Date().getFullYear()} AEG Media</p>
        </div>
      </div>
    </main>
  );
}
