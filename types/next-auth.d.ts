import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      email: string;
      name: string;
      image: string;
      id: string; // Add this line to include the id field
    };
  }
}
