'use server';

import { signIn } from "@/lib/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

export async function handleLogin(
  email: string, 
  password: string,
  turnstileToken: string
) {
  try {
    // Validar token Turnstile
    const isValidToken = await verifyTurnstileToken(turnstileToken);
    if (!isValidToken) {
      return { error: 'Verificação de segurança falhou' };
    }

    // Verificar se usuário existe
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return { error: 'Usuário não encontrado. Crie uma conta primeiro.' };
    }

    if (!user.password) {
      return { error: 'Esta conta usa login social (Google/GitHub).' };
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (result?.error) {
      return { error: 'Email ou senha incorretos' };
    }

  } catch (error) {
    console.error('Erro no login:', error);
    return { error: 'Erro ao fazer login' };
  }
  
  redirect('/dashboard');
}

export async function handleRegister(
  name: string,
  email: string, 
  password: string,
  turnstileToken: string
) {
  try {
    // Validar token Turnstile
    const isValidToken = await verifyTurnstileToken(turnstileToken);
    if (!isValidToken) {
      return { error: 'Verificação de segurança falhou' };
    }

    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { error: 'Este email já está cadastrado. Faça login.' };
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    });

    // Fazer login automaticamente
    await signIn("credentials", {
      email,
      password,
      redirect: false
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    return { error: 'Erro ao criar conta' };
  }

  redirect('/dashboard');
}

export async function handleProviderLogin(provider: 'google' | 'github') {
  await signIn(provider, { redirectTo: '/dashboard' });
}