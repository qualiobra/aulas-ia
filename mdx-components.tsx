import type { MDXComponents } from "mdx/types";
import { AnalogiaObra } from "@/components/AnalogiaObra";
import { Callout } from "@/components/Callout";
import { ExercicioPratico } from "@/components/ExercicioPratico";
import { Checkpoint } from "@/components/Checkpoint";
import { FonteGratis } from "@/components/FonteGratis";
import { Glossario } from "@/components/Glossario";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    AnalogiaObra,
    Callout,
    ExercicioPratico,
    Checkpoint,
    FonteGratis,
    Glossario,
    ...components,
  };
}
