import React from "react";
import Image from "next/image";
import belloscar from "@/assets/client-avatars/belloscar.webp";
import mk from "@/assets/client-avatars/mk.webp";
import nick from "@/assets/client-avatars/nick.webp";
import petrolina from "@/assets/client-avatars/petrolina.webp";
import pinheiro from "@/assets/client-avatars/pinheiro.webp";

export default function SocialProof() {
  const avatars = [
    belloscar,
    mk,
    pinheiro,
    nick,
    petrolina,
  ];

  return (
    <div className="flex items-center gap-3 mt-4">
      <div className="flex -space-x-3">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className={`w-12 h-12 rounded-full border-[3px] border-black flex items-center justify-center bg-white overflow-hidden shadow-sm`}
          >
            <Image 
              src={avatar} 
              alt={`Logo empresa ${index + 1}`} 
              className="w-full h-full object-cover"
              placeholder="blur"
            />
          </div>
        ))}
      </div>
      <p className="text-white text-sm sm:text-base max-w-[180px] leading-snug">
        + de <span className="text-cyan-500 font-bold text-lg">500</span> empresas já tomaram essa decisão
      </p>
    </div>
  );
}
