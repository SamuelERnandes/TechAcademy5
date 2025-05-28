interface Movie {
  id: number;
  title: string;
  poster: string;
  rating?: number;
}

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-slate-900 rounded-lg shadow-md overflow-hidden">
      <img
        src={`http://localhost:3000/public/posters/${movie.poster}`}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg">{movie.title}</h3>
        <p className="text-sm text-gray-400">Nota: {movie.rating ?? '-'}/5</p>
      </div>
    </div>
  );
}
