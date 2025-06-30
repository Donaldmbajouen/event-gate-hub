import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockEvents, Event } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, QrCode } from 'lucide-react';

const OrganisateurEvents = () => {
  const [events] = useState<Event[]>(mockEvents);
  const navigate = useNavigate();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
        <h1 className="text-3xl font-bold mb-2">Mes Événements</h1>
        <p className="text-gray-600">Gérez vos événements et suivez les ventes</p>
      </div>

      <div className="mb-6">
        <Button 
          className="bg-ticket-gradient hover:opacity-90"
          onClick={() => navigate('/organisateur/create-event')}
        >
          <Calendar className="mr-2" size={16} />
          Créer un nouvel événement
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="ticket-card">
            <div className="h-32 bg-gradient-to-br from-purple-400 to-blue-500 rounded-t-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{event.nom}</h3>
                <p className="text-sm opacity-90">{event.lieu}</p>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {formatDate(event.date)}
                  </Badge>
                  <span className="text-sm font-medium">{event.heure}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Prix</span>
                    <span className="font-semibold">{formatPrice(event.prix)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Vendus</span>
                    <span className="font-semibold text-green-600">
                      {event.quantiteVendue}/{event.quantiteDisponible}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-ticket-gradient h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.quantiteVendue / event.quantiteDisponible) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Users size={14} className="mr-1" />
                    Gérer
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <QrCode size={14} className="mr-1" />
                    Scanner
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun événement</h3>
          <p className="text-gray-600 mb-4">Commencez par créer votre premier événement</p>
          <Button className="bg-ticket-gradient hover:opacity-90">
            Créer un événement
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrganisateurEvents;
