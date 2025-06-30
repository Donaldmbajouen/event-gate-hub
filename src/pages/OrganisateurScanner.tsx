
import React, { useState } from 'react';
import { mockTickets, mockEvents } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QrCode, Scan, CheckCircle, XCircle, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const OrganisateurScanner = () => {
  const [qrInput, setQrInput] = useState('');
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const validateTicket = (qrCode: string) => {
    setIsScanning(true);
    
    // Simulation du scan
    setTimeout(() => {
      const ticket = mockTickets.find(t => t.qrCode === qrCode);
      
      if (ticket) {
        const event = mockEvents.find(e => e.id === ticket.evenementId);
        setScanResult({ ticket, event, valid: ticket.statut === 'valide' });
        
        if (ticket.statut === 'valide') {
          toast({
            title: "Billet valide",
            description: "L'accès est autorisé",
          });
        } else {
          toast({
            title: "Billet invalide",
            description: `Statut: ${ticket.statut}`,
            variant: "destructive",
          });
        }
      } else {
        setScanResult({ valid: false, error: 'Billet non trouvé' });
        toast({
          title: "Code QR invalide",
          description: "Ce billet n'existe pas dans notre système",
          variant: "destructive",
        });
      }
      
      setIsScanning(false);
    }, 1500);
  };

  const handleScan = () => {
    if (!qrInput.trim()) return;
    validateTicket(qrInput.trim());
  };

  const resetScan = () => {
    setScanResult(null);
    setQrInput('');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-CM', {
      style: 'currency',
      currency: 'XAF'
    }).format(price);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Scanner QR</h1>
        <p className="text-gray-600">Validez l'entrée des participants à vos événements</p>
      </div>

      <div className="max-w-2xl space-y-8">
        {/* Scanner Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <QrCode size={20} />
              <span>Scanner de Code QR</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Code QR du billet</label>
              <div className="flex space-x-2">
                <Input
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  placeholder="QR-CONCERT-001-789ABC"
                  className="flex-1"
                />
                <Button 
                  onClick={handleScan}
                  disabled={isScanning || !qrInput.trim()}
                  className="bg-ticket-gradient hover:opacity-90"
                >
                  <Scan className="mr-2" size={16} />
                  {isScanning ? 'Scan...' : 'Scanner'}
                </Button>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
                <QrCode size={32} className="text-gray-700" />
              </div>
              <p className="text-sm text-gray-600">
                Saisissez le code QR du billet ou utilisez un scanner
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Résultat du Scan */}
        {scanResult && (
          <Card className={`border-2 ${scanResult.valid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {scanResult.valid ? (
                  <CheckCircle size={20} className="text-green-600" />
                ) : (
                  <XCircle size={20} className="text-red-600" />
                )}
                <span className={scanResult.valid ? 'text-green-800' : 'text-red-800'}>
                  {scanResult.valid ? 'Billet Valide' : 'Billet Invalide'}
                </span>
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {scanResult.error ? (
                <div className="text-red-700">
                  <p className="font-medium">Erreur: {scanResult.error}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Événement:</span>
                      <p className="font-medium">{scanResult.event?.nom}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Lieu:</span>
                      <p className="font-medium">{scanResult.event?.lieu}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Date:</span>
                      <p className="font-medium">
                        {new Date(scanResult.event?.date).toLocaleDateString('fr-FR')} à {scanResult.event?.heure}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Prix payé:</span>
                      <p className="font-medium">{formatPrice(scanResult.ticket.prix)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={scanResult.valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {scanResult.ticket.statut}
                    </Badge>
                    <p className="text-xs text-gray-500">
                      Code: {scanResult.ticket.qrCode}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-2 mt-4">
                <Button onClick={resetScan} variant="outline" className="flex-1">
                  Nouveau scan
                </Button>
                {scanResult.valid && (
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <CheckCircle className="mr-2" size={16} />
                    Autoriser l'entrée
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Codes QR de test */}
        <Card>
          <CardHeader>
            <CardTitle>Codes QR de Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Utilisez ces codes pour tester le scanner:</p>
              <div className="space-y-1">
                {mockTickets.map(ticket => {
                  const event = mockEvents.find(e => e.id === ticket.evenementId);
                  return (
                    <div key={ticket.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                      <span className="font-mono">{ticket.qrCode}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">{event?.nom}</span>
                        <Badge variant={ticket.statut === 'valide' ? 'default' : 'secondary'}>
                          {ticket.statut}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganisateurScanner;
