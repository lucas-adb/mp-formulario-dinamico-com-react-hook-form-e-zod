import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
// import { useHookFormMask, withMask } from "use-mask-input";
import { useHookFormMask } from "use-mask-input";
import { userRegisterSchema } from "../schema";
import type { UserRegister } from "../schema";

export default function Form() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { isSubmitting, errors },
    // } = useForm();
  } = useForm<UserRegister>({ resolver: zodResolver(userRegisterSchema) });

  const registerWithMask = useHookFormMask(register);

  async function handleZipCodeBlur(event: React.FocusEvent<HTMLInputElement>) {
    const zipCode = event.target.value;
    const response = await fetch(
      `https://brasilapi.com.br/api/cep/v2/${zipCode}`
    );

    if (response.ok) {
      const data = await response.json();
      // setAddress({ city: data.city, street: data.street });
      setValue("city", data.city);
      setValue("address", data.street);
    }
  }

  async function onSubmit(data: FieldValues) {
    console.log("Form submitted");
    console.log(data);

    const res = await fetch(
      "https://apis.codante.io/api/register-user/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const resData = await res.json();

    if (!res.ok) {
      console.log(resData);
      for (const field in resData.errors) {
        // setError(field, { type: "manual", message: resData.errors[field] });
        setError(field as keyof UserRegister, {
          type: "manual",
          message: resData.errors[field],
        });
      }
    } else {
      console.log(resData);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="name">Nome Completo</label>
        {/* <input
          type="text"
          id="name"
          {...register("name", {
            required: "O campo nome é obrigatório",
            maxLength: {
              value: 255,
              message: "O nome deve ter no máximo 255 caracteres",
            },
          })}
        /> */}
        <input type="text" id="name" {...register("name")} />
        <div className="min-h-4">
          <p className="text-xs text-red-400 mt-1">
            <ErrorMessage errors={errors} name="name" />
          </p>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="email">E-mail</label>
        {/* <input
          className=""
          type="email"
          id="email"
          {...register("email", {
            required: "O campo e-mail é obrigatório",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "E-mail inválido",
            },
          })}
        /> */}
        <input className="" type="email" id="email" {...register("email")} />
        <div className="min-h-4">
          <p className="text-xs text-red-400 mt-1">
            <ErrorMessage errors={errors} name="email" />
          </p>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="password">Senha</label>
        <div className="relative">
          {/* <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            {...register("password", {
              required: "O campo senha é obrigatório",
              minLength: {
                value: 8,
                message: "A senha deve ter no mínimo 8 caracteres",
              },
            })}
          /> */}
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            {...register("password")}
          />
          <span className="absolute right-3 top-3">
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <EyeIcon size={20} className="text-slate-600 cursor-pointer" />
              ) : (
                <EyeOffIcon
                  size={20}
                  className="text-slate-600 cursor-pointer"
                />
              )}
            </button>
          </span>
        </div>
        <div className="min-h-4">
          <p className="text-xs text-red-400 mt-1">
            <ErrorMessage errors={errors} name="password" />
          </p>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="confirm-password">Confirmar Senha</label>
        <div className="relative">
          {/* <input
            type={isPasswordVisible ? "text" : "password"}
            id="confirm-password"
            {...register("password_confirmation", {
              required: "O campo de confirmação de senha é obrigatório",
              minLength: {
                value: 8,
                message: "A senha deve ter no mínimo 8 caracteres",
              },
              validate(value, formValues) {
                if (value !== formValues.password) {
                  return "As senhas devem coincidir";
                }
              },
            })}
          /> */}
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="confirm-password"
            {...register("password_confirmation")}
          />
          <span className="absolute right-3 top-3">
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <EyeIcon size={20} className="text-slate-600 cursor-pointer" />
              ) : (
                <EyeOffIcon
                  size={20}
                  className="text-slate-600 cursor-pointer"
                />
              )}
            </button>
          </span>
        </div>
        <div className="min-h-4">
          <p className="text-xs text-red-400 mt-1">
            <ErrorMessage errors={errors} name="password_confirmation" />
          </p>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="phone">Telefone Celular</label>
        {/* <input type="text" id="phone" ref={withMask("(99)99999-9999")} /> */}
        {/* <input
          type="text"
          id="phone"
          {...registerWithMask("phone", "(99) 99999-9999", {
            required: "O campo telefone é obrigatório",
            pattern: {
              value: /^\(\d{2}\) \d{5}-\d{4}$/,
              message: "Telefone inválido",
            },
          })}
        /> */}
        <input
          type="text"
          id="phone"
          {...registerWithMask("phone", "(99) 99999-9999")}
        />
        <div className="min-h-4">
          <p className="text-xs text-red-400 mt-1">
            <ErrorMessage errors={errors} name="phone" />
          </p>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="cpf">CPF</label>
        {/* <input
          type="text"
          id="cpf"
          {...registerWithMask("cpf", "999.999.999-99", {
            required: "O campo CPF é obrigatório",
            pattern: {
              value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
              message: "CPF inválido",
            },
          })}
        /> */}
        <input
          type="text"
          id="cpf"
          {...registerWithMask("cpf", "999.999.999-99")}
        />
        <div className="min-h-4">
          <p className="text-xs text-red-400 mt-1">
            <ErrorMessage errors={errors} name="cpf" />
          </p>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="cep">CEP</label>
        {/* <input
          type="text"
          id="cep"
          {...registerWithMask("zipcode", "99999-999", {
            required: "O campo CEP é obrigatório",
            pattern: {
              value: /^\d{5}-\d{3}$/,
              message: "CEP inválido",
            },
          })}
          onBlur={handleZipCodeBlur}
        /> */}
        <input
          type="text"
          id="cep"
          {...registerWithMask("zipcode", "99999-999")}
          onBlur={handleZipCodeBlur}
        />
        <div className="min-h-4">
          <p className="text-xs text-red-400 mt-1">
            <ErrorMessage errors={errors} name="zipcode" />
          </p>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="address">Endereço</label>
        <input
          className="disabled:bg-slate-200"
          type="text"
          id="address"
          disabled
          {...register("address")}
        />
        <div className="min-h-4">
          <p className="text-xs text-red-400 mt-1">
            <ErrorMessage errors={errors} name="address" />
          </p>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="city">Cidade</label>
        <input
          className="disabled:bg-slate-200"
          type="text"
          id="city"
          disabled
          {...register("city")}
        />
        <div className="min-h-4">
          <p className="text-xs text-red-400 mt-1">
            <ErrorMessage errors={errors} name="city" />
          </p>
        </div>
      </div>
      {/* terms and conditions input */}
      <div className="mb-4">
        <input
          type="checkbox"
          id="terms"
          className="mr-2 accent-slate-500"
          {...register("terms")}
        />
        <label
          className="text-sm  font-light text-slate-500 mb-1 inline"
          htmlFor="terms"
        >
          Aceito os{" "}
          <span className="underline hover:text-slate-900 cursor-pointer">
            termos e condições
          </span>
        </label>
        <div className="min-h-4">
          <p className="text-xs text-red-400 mt-1">
            <ErrorMessage errors={errors} name="terms" />
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="bg-slate-500 font-semibold text-white w-full rounded-xl p-4 mt-10 hover:bg-slate-600 transition-colors"
        disabled={isSubmitting}
      >
        {/* Cadastrar */}
        {isSubmitting ? (
          <Loader className="animate-spin mx-auto" />
        ) : (
          "Cadastrar"
        )}
      </button>
    </form>
  );
}
