import Image from "next/image";
import QuoteCarousel from "@/components/quote-carousel";
import SocialProof from "@/components/social-proof";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Typ() {
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
        <SocialProof />
      </div>
      <div className="col-span-7 p-8 sm:col-span-4 flex flex-col items-center justify-between sm:py-7 sm:px-16">
        <header>
          <Image
            src={"/aeglogopreta.webp"}
            alt="next image"
            width={80}
            height={80}
            className="w-auto h-auto"
          />
        </header>
        <div className="flex flex-col gap-20 w-full sm:w-[80%]">
          <div className="flex flex-col gap-6 mt-10">
            <p className="opacity-50">Tudo certo por aqui!</p>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Obrigado pelo seu <span className="text-cyan-500">interesse!</span>
            </h2>
            <p className="text-lg">
              Recebemos os seus dados com sucesso. Em breve, um de nossos especialistas entrará em contato para entender melhor como podemos ajudar o seu negócio.
            </p>
            <Link href="https://api.whatsapp.com/send?phone=558189544447&text=Ol%C3%A1,%20vim%20pelo%20form%20da%20AEG%20Media,%20quero%20saber%20mais%20sobre%20as%20solu%C3%A7%C3%B5es!" target="_blank">
              <Button className="bg-cyan-500 hover:bg-cyan-800 font-bold text-base mt-4 px-8 py-6">
                FALAR COM UM VENDEDOR
              </Button>
            </Link>
          </div>

          {/* Citação */}
          <QuoteCarousel />
        </div>
        <div>
          <p>© Copyright {new Date().getFullYear()} AEG Media</p>
        </div>
      </div>
    </main>
  );
}
