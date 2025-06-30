
import React, { useState } from 'react';
import { mockEvents, Event } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock } from 'lucide-react';

const ParticipantEvents = () => {
  const [events] = useState<Event[]>(mockEvents);
  const [cart, setCart] = useState<number[]>([]);

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

  const addToCart = (eventId: number) => {
    setCart(prev => [...prev, eventId]);
  };

  const removeFromCart = (eventId: number) => {
    setCart(prev => prev.filter(id => id !== eventId));
  };

  const isInCart = (eventId: number) => cart.includes(eventId);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Événements Disponibles</h1>
        <p className="text-gray-600">Découvrez et réservez vos billets pour les meilleurs événements</p>
      </div>

      {cart.length > 0 && (
        <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-medium">
              {cart.length} billet{cart.length > 1 ? 's' : ''} dans le panier
            </span>
            <Button size="sm" className="bg-ticket-gradient hover:opacity-90">
              Procéder au paiement
            </Button>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="ticket-card group">
            <div className="relative">
              <div className="h-48 bg-gradient-to-br from-purple-400 via-blue-500 to-pink-400 rounded-t-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-xl mb-1">{event.nom}</h3>
                  <div className="flex items-center space-x-1 text-sm opacity-90">
                    <MapPin size={14} />
                    <span>{event.lieu}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">
                    {formatPrice(event.prix)}
                  </Badge>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{event.heure}</span>
                  </div>
                </div>

                {event.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {event.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Places disponibles</span>
                  <span className="font-semibold text-green-600">
                    {event.quantiteDisponible - event.quantiteVendue}
                  </span>
                </div>

                <div className="pt-2">
                  {isInCart(event.id) ? (
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => removeFromCart(event.id)}
                        className="flex-1"
                      >
                        Retirer du panier
                      </Button>
                      <Button size="sm" className="bg-ticket-gradient hover:opacity-90">
                        Acheter maintenant
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => addToCart(event.id)}
                      className="w-full bg-ticket-gradient hover:opacity-90"
                      disabled={event.quantiteDisponible <= event.quantiteVendue}
                    >
                      {event.quantiteDisponible <= event.quantiteVendue 
                        ? 'Complet' 
                        : 'Ajouter au panier'
                      }
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ParticipantEvents;
