'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { LogIn } from 'lucide-react'
import Image from 'next/image'
import logoImg from "../../../../public/logo-odonto.png"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { handleProviderLogin, handleLogin } from '../_actions/login'
import { Turnstile } from '@marsidev/react-turnstile'
import { toast } from "sonner"

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  rememberMe: z.boolean().optional()
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginPage = () => {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    if (!turnstileToken) {
      toast.warning('Por favor, complete a verificação de segurança')
      return
    }
  
    try {
      const result = await handleLogin(data.email, data.password, turnstileToken);
      
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      
      // Se chegou aqui, o login foi bem-sucedido
    } catch (error) {
      console.error(error)
    }
  }

  const handleRegisterGoogle = async () => {
    try {
      await handleProviderLogin('google');
    } catch (error) {
      console.error('Erro ao entrar com Google:', error)
    }
  }

  const handleRegisterGitHub = async () => {
    try {
      await handleProviderLogin('github');
    } catch (error) {
      console.error('Erro ao entrar com GitHub:', error)
    }
  }

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

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
            Acesse sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Entre com suas credenciais para continuar
          </p>
        </div>

        <div className="mt-8 space-y-6">
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

            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="mt-1"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  {...register('rememberMe')}
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                  Lembrar-me
                </label>
              </div>

              <Link href="/forgot-password" className="text-sm font-medium text-primary hover:text-primary/80">
                Esqueceu a senha?
              </Link>
            </div>

            {siteKey ? (
              <div className="flex justify-center">
                <Turnstile
                  siteKey={siteKey}
                  onSuccess={(token) => {
                    console.log('Turnstile token recebido:', token)
                    setTurnstileToken(token)
                  }}
                  onError={(error) => {
                    console.error('Erro Turnstile:', error)
                    setTurnstileToken(null)
                  }}
                  onExpire={() => {
                    console.log('Token expirado')
                    setTurnstileToken(null)
                  }}
                  options={{
                    theme: 'light',
                    size: 'normal'
                  }}
                />
              </div>
            ) : (
              <div className="text-center text-sm text-red-500">
                Chave do Turnstile não configurada
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2"
              disabled={isSubmitting || !turnstileToken}
            >
              <LogIn className="w-5 h-5" />
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 px-2 text-muted-foreground">
                Ou continue com
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full" onClick={handleRegisterGoogle}>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="w-full" onClick={handleRegisterGitHub}>
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link href="/register" className="font-medium text-primary hover:text-primary/80">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage