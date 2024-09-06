import { z } from "zod";

export const userRegisterSchema = z
  .object({
    name: z.string().min(1, { message: "O campo nome é obrigatório" }),
    email: z
      .string()
      .min(1, { message: "O campo email é obrigatório" })
      .email({ message: "Email inválido" }),
    password: z
      .string()
      .min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
    password_confirmation: z.string().min(8, {
      message: "A confirmação de senha deve ter no mínimo 8 caracteres",
    }),
    phone: z
      .string()
      .min(1, { message: "O campo telefone é obrigatório" })
      .regex(/^\(\d{2}\) \d{5}-\d{4}$/, { message: "Telefone inválido" }),
    cpf: z
      .string()
      .min(1, { message: "O campo CPF é obrigatório" })
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "CPF inválido" }),
    zipcode: z
      .string()
      .min(1, { message: "O campo CEP é obrigatório" })
      .regex(/^\d{5}-\d{3}$/, { message: "CEP inválido" }),
    address: z.string().min(1, { message: "O campo endereço é obrigatório" }),
    city: z.string().min(1, { message: "O campo cidade é obrigatório" }),
    terms: z.boolean({ message: "Você deve aceitar os termos de uso" }),
  })
  .refine(
    (data) => {
      return data.password === data.password_confirmation;
    },
    {
      message: "As senhas devem coincidir",
      path: ["password_confirmation"],
    }
  );

export type UserRegister = z.infer<typeof userRegisterSchema>;
