import Image from "next/image";
import { Quote } from "lucide-react";
import Form from "@/components/form";

// Talvez eu traga flores da próxima vez;
// Ou, com alguma esperança, eu não venha;

export default function Home() {
  return (
    <main className="w-full h-screen grid grid-cols-7">
      <div className="hidden sm:flex flex-col justify-center bg-black bg-[url('/bg-image.png')] bg-top bg-cover text-white col-span-3 rounded-tr-xl rounded-br-xl p-16 gap-6">
        <h1 className="text-6xl font-bold text-cyan-500">
          Não seja só mais um no mercado
        </h1>
        <p className="text-lg">
          Veja abaixo as empresas que contaram com <br /> a ajuda da AEG Media
          para alavancar suas vendas
        </p>
        <Image
          className="bg-transparent"
          src={"/logos-clientes-lp.webp"}
          alt="next image"
          width={"300"}
          height={"300"}
        />
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
        <div className="flex flex-col gap-20">
          <div>
            <p className="opacity-50">É um prazer te receber aqui!</p>
            <Form />
          </div>

          {/* Citação */}
          <div className="rounded-xl shadow-md">
            <div className="flex flex-col items-center sm:flex-row p-4 gap-3 text-lg">
              <Quote className="text-cyan-500" size={24} />
              <p className="opacity-50 font-bold">
                Esse mês foi nosso melhor resultado com o time interno em toda a
                história da Lidere
              </p>
            </div>
            <p className="bg-cyan-100 text-cyan-600 p-2 pl-4">
              Reinaldo, Lidere PV
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
