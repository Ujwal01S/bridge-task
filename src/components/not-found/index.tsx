import { Home, TriangleAlert } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center p-4 min-h-screen'>
      <div className='space-y-8 text-center flex flex-col justify-center items-center gap-5'>
        {/* Icon Container */}
        <div className='relative w-24'>
          <div className='absolute inset-0 rounded-full bg-red-100 dark:bg-red-950/50' />
          <div className='relative bg-red-100 dark:bg-red-950/50 p-6 rounded-full'>
            <TriangleAlert className='w-12 h-12 text-red-600 dark:text-red-400' />
          </div>
        </div>

        {/* Heading and Message */}
        <div className='space-y-4'>
          <h1 className='text-4xl md:text-5xl font-extrabold tracking-tighter'>
            404 Not Found !
          </h1>
          <p className='text-muted-foreground max-w-md mx-auto'>
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
        </div>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <Button size='lg' className='min-w-[140px] gap-2 rounded-lg' asChild>
            <Link to='/'>
              <Home className='w-4 h-4' />
              Go to Home
            </Link>
          </Button>
        </div>
      </div>

      {/* Background Gradient Effect */}
      <div className='fixed inset-0 -z-10 opacity-20 bg-[radial-gradient(circle_at_center,_#ef4444_0%,_transparent_70%)]' />
    </div>
  );
};

export default NotFound;
