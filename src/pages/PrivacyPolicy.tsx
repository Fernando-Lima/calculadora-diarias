import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Política de Privacidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-foreground">
              <p>
                Esta Política de Privacidade descreve como a aplicação Calc Diária trata as informações
                durante o seu uso. Ao utilizar a plataforma, você concorda com as práticas descritas abaixo.
              </p>

              <section className="space-y-2">
                <h2 className="font-semibold text-base">1. Coleta de dados</h2>
                <p>
                  A aplicação não coleta dados pessoais dos servidores nem dos usuários que utilizam a
                  plataforma. Não é necessário fornecer nome, CPF, e-mail ou qualquer outra informação
                  pessoal para realizar os cálculos.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-semibold text-base">2. Armazenamento</h2>
                <p>
                  As informações inseridas na calculadora (datas, horários e localidades) não são enviadas
                  para nenhum servidor nem armazenadas em banco de dados externo. Os valores das diárias
                  editados pelo usuário são salvos apenas localmente no próprio navegador (localStorage),
                  podendo ser apagados a qualquer momento pela limpeza dos dados do navegador.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-semibold text-base">3. Cookies e rastreamento</h2>
                <p>
                  A aplicação não utiliza cookies de rastreamento, ferramentas de publicidade ou
                  monitoramento de comportamento do usuário.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-semibold text-base">4. Responsabilidade</h2>
                <p>
                  O proprietário do projeto não se responsabiliza por eventuais erros de cálculo ou pelo
                  uso indevido das informações geradas. Recomenda-se sempre conferir os resultados com a
                  legislação e regulamentação interna aplicável ao seu órgão.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-semibold text-base">5. Contato</h2>
                <p>
                  Em caso de dúvidas sobre esta Política de Privacidade, entre em contato com:
                </p>
                <p>
                  Fernando Gomes Alves de Lima<br />
                  E-mail: fernandosupweb@gmail.com<br />
                  Blumenau/SC - Brasil
                </p>
              </section>

              <p className="text-muted-foreground text-xs pt-4">
                Última atualização: 19 de maio de 2026.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
