
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { authenticateUser } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = authenticateUser(email, password);
      
      if (user) {
        login(user);
        toast({
          title: "Connexion réussie",
          description: `Bienvenue ${user.nom} !`,
        });
      } else {
        toast({
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la connexion",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (role: 'organisateur' | 'participant' | 'administrateur') => {
    const credentials = {
      organisateur: { email: 'organisateur@example.com', password: 'organisateur123' },
      participant: { email: 'participant@example.com', password: 'participant123' },
      administrateur: { email: 'admin@example.com', password: 'admin123' }
    };
    
    setEmail(credentials[role].email);
    setPassword(credentials[role].password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-ticket-gradient rounded-full flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">🎫</span>
          </div>
          <CardTitle className="text-2xl font-bold bg-ticket-gradient bg-clip-text text-transparent">
            EventGate
          </CardTitle>
          <CardDescription>
            Connectez-vous à votre plateforme de billetterie
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>
          
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center">
              Comptes de démonstration :
            </p>
            <div className="grid gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fillDemoCredentials('organisateur')}
                className="text-xs"
              >
                🎪 Organisateur
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fillDemoCredentials('participant')}
                className="text-xs"
              >
                🎫 Participant
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fillDemoCredentials('administrateur')}
                className="text-xs"
              >
                👑 Administrateur
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
