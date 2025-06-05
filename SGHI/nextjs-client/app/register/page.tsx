'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.br'


const formSchema = z.object({
  name: z.string().min(1, { message: "Campo nome não pode estar vazio" }),
  dateofbirth: z.coerce.date().refine(date => date <= new Date(), { message: "Data de nascimento inválida" }),
  address: z.string().min(1, { message: "Campo endereço não pode estar vazio" }),
  phone: z.string()
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length === 10 || val.length === 11, {
      message: "Telefone deve ter DDD + número válido",
    }),
  sex: z.string().min(1, { message: "Selecione o sexo" }),
  healthplan: z.string().min(1, { message: "Selecione o plano de saúde" }),
})

type FormData = z.infer<typeof formSchema>

export default function Register() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dateofbirth: undefined,
      address: "",
      phone: "",
      sex: "",
      healthplan: ""
    }
  })

  function onSubmit(data: FormData) {
    console.log({
      ...data,
      phone: data.phone,
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen">    
        <Card className="w-full max-w-lg">
        <CardHeader>
            <CardTitle>Registro de pacientes</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Nome */}
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                        <Input placeholder="Nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* Telefone */}
                <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                        <Cleave
                        {...field}
                        options={{ phone: true, phoneRegionCode: 'BR' }}
                        placeholder="(99) 99999-9999"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
                                    ring-offset-background file:border-0 file:bg-transparent file:text-sm 
                                    file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
                                    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                                    disabled:cursor-not-allowed disabled:opacity-50"
                        onChange={(e) => field.onChange(e.target.value)}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* Endereço */}
                <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                        <Input placeholder="Endereço" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* Data de nascimento */}
                <FormField
                control={form.control}
                name="dateofbirth"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Data de nascimento</FormLabel>
                    <FormControl>
                        <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <div className="flex justify-between gap-4">
                    {/* Sexo */}
                    <div className="w-1/2">
                        <FormField
                        control={form.control}
                        name="sex"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Sexo</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="M">Masculino</SelectItem>
                                    <SelectItem value="F">Feminino</SelectItem>
                                </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>

                    {/* Plano de Saúde */}
                    <div className="w-1/2">
                        <FormField
                        control={form.control}
                        name="healthplan"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Plano de Saúde</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="a">Plano A</SelectItem>
                                    <SelectItem value="b">Plano B</SelectItem>
                                </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    </div>


                <div className="w-full flex items-center justify-center">
                    {/* Botão */}
                    <Button type="submit"  className=" max-w-lg mx-auto">ENVIAR</Button>
                </div>
            </form>
            </Form>
        </CardContent>
        </Card>
    </div>
  )
}
