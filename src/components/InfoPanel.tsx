import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Info, DollarSign, Clock, MapPin, Pencil } from "lucide-react";
import { toast } from "sonner";
import { DailyAllowanceRate, formatCurrency } from "@/lib/dailyAllowance";

type InfoPanelProps = {
  rates: DailyAllowanceRate[];
  onUpdateRate: (updatedRate: DailyAllowanceRate) => void;
};

const InfoPanel = ({ rates, onUpdateRate }: InfoPanelProps) => {
  const [editingRate, setEditingRate] = useState<DailyAllowanceRate | null>(null);
  const [title, setTitle] = useState("");
  const [capital, setCapital] = useState("");
  const [outras, setOutras] = useState("");

  useEffect(() => {
    if (!editingRate) return;

    setTitle(editingRate.title);
    setCapital(String(editingRate.capital));
    setOutras(String(editingRate.outras));
  }, [editingRate]);

  const handleSave = () => {
    if (!editingRate) return;

    const capitalValue = Number(capital);
    const outrasValue = Number(outras);

    if (!title.trim()) {
      toast.error("Informe o nome do item");
      return;
    }

    if (Number.isNaN(capitalValue) || Number.isNaN(outrasValue) || capitalValue < 0 || outrasValue < 0) {
      toast.error("Informe valores válidos para Capital e Outras");
      return;
    }

    onUpdateRate({
      ...editingRate,
      title: title.trim(),
      capital: capitalValue,
      outras: outrasValue,
    });
    setEditingRate(null);
    toast.success("Item atualizado com sucesso!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Tabela de Valores das Diárias
          </CardTitle>
          <CardDescription>
            Valores aplicados conforme cargo e localidade de destino
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {rates.map((rate) => (
              <div key={rate.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">{rate.title}</h3>
                    <p className="text-sm text-muted-foreground">{rate.description}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setEditingRate(rate)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Capital:</span>
                    <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                      {formatCurrency(rate.capital)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">Outras:</span>
                    <Badge variant="outline" className="border-accent text-accent">
                      {formatCurrency(rate.outras)}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={Boolean(editingRate)} onOpenChange={(open) => !open && setEditingRate(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar item da tabela</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="rate-title">Nome</Label>
              <Input id="rate-title" value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="rate-capital">Valor Capital</Label>
                <Input id="rate-capital" type="number" min="0" step="0.01" value={capital} onChange={(event) => setCapital(event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate-outras">Valor Outras</Label>
                <Input id="rate-outras" type="number" min="0" step="0.01" value={outras} onChange={(event) => setOutras(event.target.value)} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingRate(null)}>Cancelar</Button>
            <Button onClick={handleSave} className="bg-gradient-primary hover:opacity-90 transition-smooth">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Como Funciona o Cálculo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Fórmula de Cálculo
            </h4>
            <div className="text-sm space-y-2 font-mono bg-background p-3 rounded border">
              <p>duracao_total = (chegada - saida) em horas</p>
              <p>diarias = inteiro(duracao_total / 24)</p>
              <p>resto = duracao_total % 24</p>
              <p className="text-primary font-bold">se resto ≥ 14 então diarias = diarias + 0.5</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Exemplo 1: Viagem de 2 dias e 10 horas</h4>
              <ul className="text-sm space-y-1">
                <li>• Duração total: 58 horas</li>
                <li>• Diárias inteiras: 2 (58 ÷ 24 = 2)</li>
                <li>• Resto: 10 horas (58 % 24 = 10)</li>
                <li>• Como 10 &lt; 14: <strong>2 diárias</strong></li>
              </ul>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Exemplo 2: Viagem de 2 dias e 16 horas</h4>
              <ul className="text-sm space-y-1">
                <li>• Duração total: 64 horas</li>
                <li>• Diárias inteiras: 2 (64 ÷ 24 = 2)</li>
                <li>• Resto: 16 horas (64 % 24 = 16)</li>
                <li>• Como 16 ≥ 14: <strong>2,5 diárias</strong></li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoPanel;
