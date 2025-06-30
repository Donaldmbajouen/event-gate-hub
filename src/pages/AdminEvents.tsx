
import React, { useState } from 'react';
import { mockEvents, mockUsers, Event } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MapPin, Eye, Ban, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminEvents = () => {
  const [events] = useState<Event[]>(mockEvents);
  const { toast } = useToast();

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

  const getOrganizerName = (organizerId: number) => {
    const organizer = Object.values(mockUsers).find(user => user.id === organizerId);
    return organizer?.nom || 'Organisateur inconnu';
  };

  const getEventStatus = (event: Event) => {
    const today = new Date();
    const eventDate = new Date(event.date);
    
    if (eventDate < today) return 'terminé';
    if (event.quantiteVendue >= event.quantiteDisponible) return 'complet';
    return 'actif';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'actif':
        return 'bg-green-100 text-green-800';
      case 'complet':
        return 'bg-blue-100 text-blue-800';
      case 'terminé':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApproveEvent = (eventId: number) => {
    toast({
      title: "Événement approuvé",
      description: "L'événement a été approuvé avec succès",
    });
  };

  const handleSuspendEvent = (eventId: number) => {
    toast({
      title: "Événement suspendu",
      description: "L'événement a été suspendu",
      variant: "destructive",
    });
  };

  const stats = {
    total: events.length,
    actifs: events.filter(e => getEventStatus(e) === 'actif').length,
    termines: events.filter(e => getEventStatus(e) === 'terminé').length,
    revenus: events.reduce((total, event) => total + (event.quantiteVendue * event.prix), 0)
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gestion des Événements</h1>
        <p className="text-gray-600">Supervision et modération de tous les événements</p>
      </div>

      {/* Statistiques */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Événements</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Calendar className="text-gray-400" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Événements Actifs</p>
                <p className="text-2xl font-bold text-green-600">{stats.actifs}</p>
              </div>
              <CheckCircle className="text-green-400" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Terminés</p>
                <p className="text-2xl font-bold text-gray-600">{stats.termines}</p>
              </div>
              <span className="text-2xl">🏁</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus Totaux</p>
                <p className="text-2xl font-bold text-blue-600">{formatPrice(stats.revenus)}</p>
              </div>
              <span className="text-2xl">💰</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des événements */}
      <Card>
        <CardHeader>
          <CardTitle>Tous les Événements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {events.map((event) => {
              const status = getEventStatus(event);
              const organizerName = getOrganizerName(event.organisateurId);
              
              return (
                <div key={event.id} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{event.nom}</h3>
                        <Badge className={getStatusColor(status)}>
                          {status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{formatDate(event.date)} à {event.heure}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{event.lieu}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users size={14} />
                          <span>Par {organizerName}</span>
                        </div>
                      </div>

                      {event.description && (
                        <p className="text-gray-700 mb-3">{event.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-600">Prix:</span>
                      <p className="font-semibold">{formatPrice(event.prix)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Places vendues:</span>
                      <p className="font-semibold text-green-600">
                        {event.quantiteVendue}/{event.quantiteDisponible}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Taux de remplissage:</span>
                      <p className="font-semibold">
                        {Math.round((event.quantiteVendue / event.quantiteDisponible) * 100)}%
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Revenus:</span>
                      <p className="font-semibold text-blue-600">
                        {formatPrice(event.quantiteVendue * event.prix)}
                      </p>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-ticket-gradient h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.quantiteVendue / event.quantiteDisponible) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye size={14} className="mr-1" />
                      Détails
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleApproveEvent(event.id)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <CheckCircle size={14} className="mr-1" />
                      Approuver
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSuspendEvent(event.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Ban size={14} className="mr-1" />
                      Suspendre
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEvents;
