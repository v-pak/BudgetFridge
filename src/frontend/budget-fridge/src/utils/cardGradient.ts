const GRADIENTS = [
  'linear-gradient(145deg, #DDD6CB 0%, #C8BFB2 100%)',
  'linear-gradient(145deg, #D4CFC6 0%, #BFB8AB 100%)',
  'linear-gradient(145deg, #E0D8CD 0%, #D0C8BB 100%)',
  'linear-gradient(145deg, #C8C2BA 0%, #B5AFA8 100%)',
  'linear-gradient(145deg, #D8D2C8 0%, #C5BDB2 100%)',
];

export function cardGradient(name: string): string {
  const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return GRADIENTS[hash % GRADIENTS.length];
}