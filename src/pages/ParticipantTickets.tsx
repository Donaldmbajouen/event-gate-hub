
import React, { useState } from 'react';
import { mockTickets, mockEvents, Ticket, Event } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, Calendar, MapPin, Download } from 'lucide-react';

const ParticipantTickets = () => {
  const { user } = useAuth();
  const [tickets] = useState<Ticket[]>(
    mockTickets.filter(ticket => ticket.participantId === user?.id)
  );

  const getEventById = (eventId: number): Event | undefined => {
    return mockEvents.find(event => event.id === eventId);
  };

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

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'valide':
        return 'bg-green-100 text-green-800';
      case 'utilise':
        return 'bg-gray-100 text-gray-800';
      case 'annule':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (statut: string) => {
    switch (statut) {
      case 'valide':
        return 'Valide';
      case 'utilise':
        return 'Utilisé';
      case 'annule':
        return 'Annulé';
      default:
        return statut;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mes Billets</h1>
        <p className="text-gray-600">Gérez vos billets et codes QR d'accès</p>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-12">
          <QrCode size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun billet</h3>
          <p className="text-gray-600 mb-4">Vous n'avez pas encore acheté de billets</p>
          <Button className="bg-ticket-gradient hover:opacity-90">
            Parcourir les événements
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => {
            const event = getEventById(ticket.evenementId);
            if (!event) return null;

            return (
              <Card key={ticket.id} className="ticket-card">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-1">{event.nom}</CardTitle>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <MapPin size={14} />
                        <span>{event.lieu}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(ticket.statut)}>
                      {getStatusText(ticket.statut)}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar size={14} />
                    <span>{formatDate(event.date)} à {event.heure}</span>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <QrCode size={32} className="text-gray-700" />
                    </div>
                    <p className="text-xs font-mono text-gray-600 mb-2">
                      {ticket.qrCode}
                    </p>
                    <p className="text-xs text-gray-500">
                      Présentez ce code à l'entrée
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Prix payé</span>
                    <span className="font-semibold">{formatPrice(ticket.prix)}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Date d'achat</span>
                    <span className="text-gray-900">
                      {new Date(ticket.dateAchat).toLocaleDateString('fr-FR')}
                    </span>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download size={14} className="mr-1" />
                      PDF
                    </Button>
                    <Button size="sm" className="flex-1 bg-ticket-gradient hover:opacity-90">
                      <QrCode size={14} className="mr-1" />
                      Agrandir QR
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ParticipantTickets;
