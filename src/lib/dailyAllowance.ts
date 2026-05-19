export type DailyAllowanceRate = {
  id: string;
  title: string;
  capital: number;
  outras: number;
  description: string;
};

export const DEFAULT_DAILY_ALLOWANCE_RATES: DailyAllowanceRate[] = [
  {
    id: "servidor_capital",
    title: "Servidor - Capital",
    capital: 500,
    outras: 500,
    description: "Servidor padrão em viagem para capital",
  },
  {
    id: "servidor_outras",
    title: "Servidor - Outras Localidades",
    capital: 400,
    outras: 400,
    description: "Servidor padrão em outras localidades",
  },
  {
    id: "motorista_saude",
    title: "Motorista da Saúde",
    capital: 360,
    outras: 360,
    description: "Valor único independente da localidade",
  },
  {
    id: "secretaria_admin",
    title: "Secretário(a) de Administração",
    capital: 800,
    outras: 500,
    description: "Diferentes valores por localidade",
  },
  {
    id: "prefeito_vice",
    title: "Prefeito/Vice-Prefeito",
    capital: 1000,
    outras: 800,
    description: "Maiores valores devido ao cargo",
  },
];

export const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });