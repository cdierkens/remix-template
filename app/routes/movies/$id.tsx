import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import { TiEdit } from "react-icons/ti";
import { MovieDbClient } from "~/services/moviedb.server";
import { prisma } from "~/services/prisma.server";

export async function loader({ params }: LoaderArgs) {
  const id = params.id;

  if (!id) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }

  const movie = await prisma.movie.findFirst({ where: { id } });

  if (!movie) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }

  const movieDbData = await MovieDbClient.movieInfo(movie.themoviedbId);
  const movieViews = await prisma.movieView.findMany({
    where: {
      movieId: movie.id,
    },
  });

  return json({
    movieDbData,
    movie,
    movieViews,
  });
}

export default function MovieIdRoute() {
  const {
    movieDbData: { poster_path, title, tagline },
    movieViews,
  } = useLoaderData<typeof loader>();

  return (
    <div>
      <section className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={`https://image.tmdb.org/t/p/w185/${poster_path}`}
            alt="Movie poster"
          />
          <div>
            <h1 className="text-5xl font-bold">{title}</h1>
            <p className="py-6">{tagline}</p>
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section>
        <h2 className="text-4xl font-bold">Views</h2>

        <table className="table border border-base-300 w-full">
          <thead>
            <tr>
              <th>Event</th>
              <th>View Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movieViews.map((movieView) => {
              const { id, viewDateTime, eventId } = movieView;
              return (
                <tr key={id}>
                  <th>{eventId}</th>
                  <td>{format(new Date(viewDateTime), "PP pp")}</td>
                  <td className="flex gap-2">
                    <Link
                      to={{
                        pathname: "edit-movie-view",
                        search: `movieViewId=${id}`,
                      }}
                      className="btn-circle btn-sm btn-outline text-warning p-1"
                    >
                      <span className="sr-only">Edit</span>
                      <TiEdit className="w-full h-full" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-end p-2">
          <Link className="btn btn-primary" to="add-movie-view">
            Add Movie View
          </Link>
        </div>

        <Outlet />
      </section>
    </div>
  );
}
