'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'
import Image from 'next/image'
import logoImg from "../../../../public/logo-odonto.png"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido')
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

const ForgotPasswordPage = () => {
  const [emailSent, setEmailSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      console.log(data)
      // Adicionar lógica de recuperação de senha aqui
      setEmailSent(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Image
            src={logoImg}
            alt="Logo OdontoPRO"
            priority
            quality={100}
            className="h-auto w-48"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {emailSent ? 'Email enviado!' : 'Esqueceu sua senha?'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {emailSent 
              ? 'Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.'
              : 'Sem problemas! Digite seu email e enviaremos instruções para redefinir sua senha.'}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {!emailSent ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="mt-1"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                <Mail className="w-5 h-5" />
                {isSubmitting ? 'Enviando...' : 'Enviar instruções'}
              </Button>
            </form>
          ) : (
            <div className="rounded-lg bg-green-50 border border-green-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">
                    Email enviado com sucesso!
                  </p>
                  <p className="mt-1 text-sm text-green-700">
                    Caso não encontre o email, verifique sua caixa de spam.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <Link 
              href="/login" 
              className="text-sm font-medium text-primary hover:text-primary/80"
            >
              Voltar para login
            </Link>
          </div>

          {emailSent && (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Não recebeu o email?{' '}
                <button 
                  onClick={() => setEmailSent(false)}
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Reenviar
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage