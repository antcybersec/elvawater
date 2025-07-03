import { Droplet } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Droplet className="h-6 w-6 text-primary" />
      <span className="font-headline text-2xl font-bold">Elva</span>
    </div>
  );
}
