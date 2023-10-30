import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "katex/dist/katex.min.css";
import React from "react";
import { InlineMath } from "react-katex";

export const MCQ: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto">
      <p>
        Given the function <InlineMath math="g(x)=\dfrac{e^x}{x^e}" />, find{" "}
        <InlineMath math="\dfrac{d g(x)}{dx}" />.
      </p>
      <form className="grid gap-4 mt-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-primary-dark border-zinc-300"
            name="radio"
            value="1"
          />
          <span className="ml-2">
            <InlineMath math="e^x x^{-1-e}(-e+x)" />
          </span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-primary-dark border-zinc-300"
            name="radio"
            value="2"
          />
          <span className="ml-2">
            <InlineMath math="e^x x^{1+e}(-e+x)" />
          </span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-primary-dark border-zinc-300"
            name="radio"
            value="3"
          />
          <span className="ml-2">
            <InlineMath math="e^{-x} x^{1+e}(-e+x)" />
          </span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-primary-dark border-zinc-300"
            name="radio"
            value="3"
          />
          <span className="ml-2">None of the above</span>
        </label>
        <div className="space-y-2 mt-2">
          <Button type="submit" name="check" className="w-full">
            Check
          </Button>
          <Button
            type="submit"
            name="skip"
            className="w-full"
            variant="secondary"
          >
            Skip
          </Button>
        </div>
      </form>
    </div>
  );
};

export const FRQ: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto">
      <p>
        Given the function <InlineMath math="g(x)=\dfrac{e^x}{x^e}" />, find{" "}
        <InlineMath math="\dfrac{d g(x)}{dx}" />.
      </p>
      <form>
        <Input placeholder="Answer" className="mt-4" />
        <div className="space-y-2 mt-2">
          <Button type="submit" name="check" className="w-full">
            Check
          </Button>
          <Button
            type="submit"
            name="skip"
            className="w-full"
            variant="secondary"
          >
            Skip
          </Button>
        </div>
      </form>
    </div>
  );
};
