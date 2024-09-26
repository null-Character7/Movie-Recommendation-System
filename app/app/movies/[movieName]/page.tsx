import { Movie } from "@/app/components/Movie";

export default function movie({ params }: { params: { movieName: string } }) {
  const { movieName } = params; // Get the 'id' from the URL params
  console.log("slug = ",movieName)
  return (
    <div>
      <Movie moviename={movieName} />
    </div>
  );
}
