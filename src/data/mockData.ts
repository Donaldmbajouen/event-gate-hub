
export interface User {
  id: number;
  nom: string;
  email: string;
  role: 'organisateur' | 'participant' | 'administrateur';
}

export interface Event {
  id: number;
  nom: string;
  date: string;
  heure: string;
  lieu: string;
  organisateurId: number;
  description?: string;
  prix: number;
  quantiteDisponible: number;
  quantiteVendue: number;
  image?: string;
}

export interface Ticket {
  id: number;
  evenementId: number;
  participantId: number;
  qrCode: string;
  dateAchat: string;
  prix: number;
  statut: 'valide' | 'utilise' | 'annule';
}

export const mockUsers: Record<string, User> = {
  "organisateur@example.com": {
    id: 1,
    nom: "Jean Organisateur",
    email: "organisateur@example.com",
    role: "organisateur"
  },
  "participant@example.com": {
    id: 2,
    nom: "Marie Participante",
    email: "participant@example.com",
    role: "participant"
  },
  "admin@example.com": {
    id: 3,
    nom: "Admin Principal",
    email: "admin@example.com",
    role: "administrateur"
  }
};

export const mockCredentials = {
  "organisateur@example.com": "organisateur123",
  "participant@example.com": "participant123",
  "admin@example.com": "admin123"
};

export const mockEvents: Event[] = [
  {
    id: 1,
    nom: "Concert Urbain Yaoundé",
    date: "2025-08-15",
    heure: "19:00",
    lieu: "Palais des Sports, Yaoundé",
    organisateurId: 1,
    description: "Une soirée musicale exceptionnelle avec les meilleurs artistes urbains du Cameroun",
    prix: 15000,
    quantiteDisponible: 500,
    quantiteVendue: 234,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800"
  },
  {
    id: 2,
    nom: "Festival Jazz Douala",
    date: "2025-09-22",
    heure: "20:30",
    lieu: "Centre Culturel, Douala",
    organisateurId: 1,
    description: "Festival de jazz avec des musiciens internationaux et locaux",
    prix: 20000,
    quantiteDisponible: 300,
    quantiteVendue: 89,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800"
  },
  {
    id: 3,
    nom: "Conférence Tech Cameroun",
    date: "2025-07-10",
    heure: "09:00",
    lieu: "Hôtel Hilton, Yaoundé",
    organisateurId: 1,
    description: "La plus grande conférence technologique du Cameroun",
    prix: 50000,
    quantiteDisponible: 200,
    quantiteVendue: 156,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"
  }
];

export const mockTickets: Ticket[] = [
  {
    id: 1,
    evenementId: 1,
    participantId: 2,
    qrCode: "QR-CONCERT-001-789ABC",
    dateAchat: "2025-01-15T10:30:00Z",
    prix: 15000,
    statut: "valide"
  },
  {
    id: 2,
    evenementId: 3,
    participantId: 2,
    qrCode: "QR-TECH-003-456DEF",
    dateAchat: "2025-01-20T14:15:00Z",
    prix: 50000,
    statut: "valide"
  }
];

// Auth helpers
export const authenticateUser = (email: string, password: string): User | null => {
  if (mockCredentials[email] === password) {
    return mockUsers[email];
  }
  return null;
};

export const generateQRCode = (ticketId: number, eventId: number): string => {
  return `QR-${eventId.toString().padStart(3, '0')}-${ticketId.toString().padStart(3, '0')}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
};
