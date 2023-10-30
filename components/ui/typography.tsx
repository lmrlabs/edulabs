import React from "react";

export const H1: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
};

export const H3: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
};

export const Muted: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <p className="text-sm text-zinc-500">{children}</p>;
};
