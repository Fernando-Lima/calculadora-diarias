import { Building2, Calculator } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-primary text-primary-foreground shadow-elegant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Building2 className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">Calc Diárias</h1>
              <p className="text-sm text-primary-foreground/80">Sistema de Cálculo de Diárias</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calculator className="h-5 w-5" />
            <span className="text-sm font-medium">Setor Público</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;