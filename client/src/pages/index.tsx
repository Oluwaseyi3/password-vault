import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'
import Vault from '../components/Vault'
import Landing from "../components/Layout/Landing"
const inter = Inter({ subsets: ['latin'] })

export interface VaultItem {
  website: string;
  username: string;
}

export default function Home() {

   const [step, setStep] = useState<"login" | "register" | "vault">("login")
   const [vault, setVault] = useState<VaultItem[]>([])
   const [vaultKey, setVaultKey] = useState('')


  return (
    <main
      className={` ${inter.className}`}
    >
      {/* <RegisterForm setStep={setStep} setVaultKey={setVaultKey} /> */}
      {step === "register" && 
      <RegisterForm setStep={setStep} setVaultKey={setVaultKey} />}
      {step === "login" && <LoginForm/>}
      {step === "vault" && <Vault/>}

    </main>
  )
}
