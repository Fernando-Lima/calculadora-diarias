import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Header from "@/components/Header";
import DailyAllowanceCalculator from "@/components/DailyAllowanceCalculator";
import InfoPanel from "@/components/InfoPanel";
import { Calculator, Info, Sparkles } from "lucide-react";
import { DailyAllowanceRate, DEFAULT_DAILY_ALLOWANCE_RATES } from "@/lib/dailyAllowance";

const STORAGE_KEY = "daily-allowance-rates";
const EDIT_FEATURE_POPUP_KEY = "hide-daily-allowance-edit-popup";

const Index = () => {
  const [hideEditPopup, setHideEditPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(
    () => localStorage.getItem(EDIT_FEATURE_POPUP_KEY) !== "true"
  );
  const [rates, setRates] = useState<DailyAllowanceRate[]>(() => {
    const storedRates = localStorage.getItem(STORAGE_KEY);

    if (!storedRates) {
      return DEFAULT_DAILY_ALLOWANCE_RATES;
    }

    try {
      return JSON.parse(storedRates) as DailyAllowanceRate[];
    } catch {
      return DEFAULT_DAILY_ALLOWANCE_RATES;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rates));
  }, [rates]);

  const handleUpdateRate = (updatedRate: DailyAllowanceRate) => {
    setRates((currentRates) =>
      currentRates.map((rate) => (rate.id === updatedRate.id ? updatedRate : rate))
    );
  };

  const handleEditPopupOpenChange = (open: boolean) => {
    if (!open && hideEditPopup) {
      localStorage.setItem(EDIT_FEATURE_POPUP_KEY, "true");
    }

    setShowEditPopup(open);
  };

  const handleCloseEditPopup = () => {
    if (hideEditPopup) {
      localStorage.setItem(EDIT_FEATURE_POPUP_KEY, "true");
    }

    setShowEditPopup(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <Dialog open={showEditPopup} onOpenChange={handleEditPopupOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center sm:text-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            <DialogTitle>Novidade na calculadora!</DialogTitle>
            <DialogDescription>
              Agora você pode atualizar os valores das diárias diretamente na aba Informações e usar os novos valores nos cálculos.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-md border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
            Edite o nome, Capital e Outras para manter a tabela ajustada à sua realidade antes de calcular.
          </div>
          <label className="flex items-center gap-3 text-sm text-foreground">
            <Checkbox
              checked={hideEditPopup}
              onCheckedChange={(checked) => setHideEditPopup(checked === true)}
            />
            Não aparecer novamente
          </label>
          <DialogFooter>
            <Button type="button" onClick={handleCloseEditPopup} className="w-full sm:w-auto">
              Entendi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="calculator" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Calculadora
              </TabsTrigger>
              <TabsTrigger value="info" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Informações
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculator" className="animate-fade-in">
              <DailyAllowanceCalculator rates={rates} />
            </TabsContent>
            
            <TabsContent value="info" className="animate-fade-in">
              <InfoPanel rates={rates} onUpdateRate={handleUpdateRate} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t border-border bg-muted/40 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          <p>Desenvolvido por Fernando Gomes Alves de Lima - 2026</p>
          <a
            href="https://github.com/Fernando-Lima/diaria-prefeitura"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block font-medium text-primary underline-offset-4 hover:underline"
          >
            https://github.com/Fernando-Lima/diaria-prefeitura
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
