import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'
import Vault from '../components/Vault'
import Landing from "../components/Layout/Landing"
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

   const [step, setStep] = useState<"login" | "register" | "vault">("login")

  return (
    <main
      className={` ${inter.className}`}
    >
      {/* <Landing/> */} 
      {step === "register" && <RegisterForm/>}
      {step === "login" && <LoginForm/>}
      {step === "vault" && <Vault/>}

    </main>
  )
}
