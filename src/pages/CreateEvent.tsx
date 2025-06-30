
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    nom: '',
    date: '',
    heure: '',
    lieu: '',
    description: '',
    prix: '',
    quantiteDisponible: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulation de la création d'événement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Événement créé avec succès",
        description: `L'événement "${formData.nom}" a été créé.`,
      });
      
      navigate('/organisateur/events');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la création de l'événement",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/organisateur/events')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2" size={16} />
          Retour aux événements
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">Créer un Nouvel Événement</h1>
        <p className="text-gray-600">Remplissez les informations de votre événement</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar size={20} />
            <span>Détails de l'Événement</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom de l'événement *</Label>
                <Input
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Concert de Jazz..."
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lieu">Lieu *</Label>
                <Input
                  id="lieu"
                  name="lieu"
                  value={formData.lieu}
                  onChange={handleChange}
                  placeholder="Palais des Sports, Yaoundé"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="heure">Heure *</Label>
                <Input
                  id="heure"
                  name="heure"
                  type="time"
                  value={formData.heure}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Décrivez votre événement..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none h-24"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prix">Prix (FCFA) *</Label>
                <Input
                  id="prix"
                  name="prix"
                  type="number"
                  value={formData.prix}
                  onChange={handleChange}
                  placeholder="15000"
                  min="0"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantiteDisponible">Nombre de places *</Label>
                <Input
                  id="quantiteDisponible"
                  name="quantiteDisponible"
                  type="number"
                  value={formData.quantiteDisponible}
                  onChange={handleChange}
                  placeholder="500"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/organisateur/events')}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-ticket-gradient hover:opacity-90"
              >
                {isLoading ? 'Création...' : 'Créer l\'événement'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEvent;
