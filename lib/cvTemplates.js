export const cvTemplates = [
  {
    id: 'modern',
    name: 'Moderne',
    description: 'Design épuré et professionnel',
    free: true,
    color: '#3B82F6'
  },
  {
    id: 'creative',
    name: 'Créatif',
    description: 'Pour les métiers créatifs',
    free: true,
    color: '#8B5CF6'
  },
  {
    id: 'elegant',
    name: 'Élégant',
    description: 'Sobre et raffiné',
    free: true,
    color: '#10B981'
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Pour cadres supérieurs',
    free: false,
    color: '#EF4444'
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Pour développeurs',
    free: false,
    color: '#F59E0B'
  }
];

export const getTemplate = (id) => cvTemplates.find(t => t.id === id);
export const getFreeTemplates = () => cvTemplates.filter(t => t.free);
export const getPremiumTemplates = () => cvTemplates.filter(t => !t.free);
