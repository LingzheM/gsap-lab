import { BackLink } from "@/components/BackLink/BackLink";
import { AnimatedNumbers } from "@/components/AnimatedNumbers/AnimatedNumbers";

export default function Page() {
  return (
    <>
      <BackLink />;
      <AnimatedNumbers value="2025" />;
    </>
  )
}