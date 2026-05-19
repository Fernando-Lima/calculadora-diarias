import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, MapPin, Clock, User, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { DailyAllowanceRate } from "@/lib/dailyAllowance";

interface CalculationResult {
  totalHours: number;
  dailyCount: number;
  hasHalfDay: boolean;
  totalValue: number;
  dailyRate: number;
}

type DailyAllowanceCalculatorProps = {
  rates: DailyAllowanceRate[];
};

const DailyAllowanceCalculator = ({ rates }: DailyAllowanceCalculatorProps) => {
  const [cargo, setCargo] = useState("");
  const [localidade, setLocalidade] = useState<"capital" | "outras" | "">("");
  const [dataHoraSaida, setDataHoraSaida] = useState("");
  const [dataHoraChegada, setDataHoraChegada] = useState("");
  const [resultado, setResultado] = useState<CalculationResult | null>(null);

  const calculateDailyAllowance = () => {
    if (!cargo || !localidade || !dataHoraSaida || !dataHoraChegada) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    const saida = new Date(dataHoraSaida);
    const chegada = new Date(dataHoraChegada);

    if (chegada <= saida) {
      toast.error("A data/hora de chegada deve ser posterior à saída");
      return;
    }

    const duracaoMs = chegada.getTime() - saida.getTime();
    const duracaoTotal = duracaoMs / (1000 * 60 * 60);
    const diariasInteiras = Math.floor(duracaoTotal / 24);
    const resto = duracaoTotal % 24;
    const hasHalfDay = resto >= 14;
    const diarias = diariasInteiras + (hasHalfDay ? 0.5 : 0);
    const cargoInfo = rates.find((rate) => rate.id === cargo);

    if (!cargoInfo) {
      toast.error("Cargo não encontrado");
      return;
    }

    const dailyRate = localidade === "capital" ? cargoInfo.capital : cargoInfo.outras;
    const totalValue = diarias * dailyRate;

    setResultado({
      totalHours: Math.round(duracaoTotal * 100) / 100,
      dailyCount: diarias,
      hasHalfDay,
      totalValue,
      dailyRate,
    });
    toast.success("Cálculo realizado com sucesso!");
  };

  const resetForm = () => {
    setCargo("");
    setLocalidade("");
    setDataHoraSaida("");
    setDataHoraChegada("");
    setResultado(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-primary text-primary-foreground shadow-elegant">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
            <Calculator className="h-8 w-8" />
            Calculadora de Diárias
          </CardTitle>
          <CardDescription className="text-primary-foreground/80 text-lg">
            Sistema para cálculo de diárias de servidores públicos
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Dados da Viagem
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cargo">Cargo/Função</Label>
              <Select value={cargo} onValueChange={(value) => setCargo(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cargo" />
                </SelectTrigger>
                <SelectContent>
                  {rates.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="localidade">Localidade de Destino</Label>
              <Select value={localidade} onValueChange={(value) => setLocalidade(value as "capital" | "outras")}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a localidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="capital">Capital</SelectItem>
                  <SelectItem value="outras">Outras Localidades</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="saida" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Data e Hora de Saída
                </Label>
                <Input id="saida" type="datetime-local" value={dataHoraSaida} onChange={(e) => setDataHoraSaida(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chegada" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Data e Hora de Chegada
                </Label>
                <Input id="chegada" type="datetime-local" value={dataHoraChegada} onChange={(e) => setDataHoraChegada(e.target.value)} />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={calculateDailyAllowance} className="flex-1 bg-gradient-primary hover:opacity-90 transition-smooth">
                <Calculator className="h-4 w-4 mr-2" />
                Calcular
              </Button>
              <Button variant="outline" onClick={resetForm} className="px-6">
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>

        {resultado && (
          <Card className="shadow-elegant animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <DollarSign className="h-5 w-5" />
                Resultado do Cálculo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Duração Total</p>
                  <p className="text-lg font-semibold">{resultado.totalHours}h</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Valor da Diária</p>
                  <p className="text-lg font-semibold">R$ {resultado.dailyRate.toFixed(2)}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Quantidade de Diárias</p>
                <p className="text-lg font-semibold">
                  {resultado.dailyCount} diária{resultado.dailyCount !== 1 ? "s" : ""}
                  {resultado.hasHalfDay && <span className="text-sm text-muted-foreground ml-2">(inclui meia diária)</span>}
                </p>
              </div>

              <div className="border-t pt-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Valor Total a Receber</p>
                  <p className="text-3xl font-bold text-primary bg-gradient-accent bg-clip-text text-transparent">
                    R$ {resultado.totalValue.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="text-xs text-muted-foreground bg-muted p-3 rounded-md">
                <p><strong>Fórmula aplicada:</strong></p>
                <p>• Duração total: {resultado.totalHours} horas</p>
                <p>• Diárias inteiras: {Math.floor(resultado.totalHours / 24)}</p>
                <p>• Resto: {Math.round((resultado.totalHours % 24) * 100) / 100} horas</p>
                {resultado.hasHalfDay && <p>• Como resto ≥ 14h, adicionada meia diária</p>}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DailyAllowanceCalculator;
