import AdContainer from "@/components/Ad/AdContainer";

export const metadata = {
  title: "DealDone — Your Local Marketplace | Cinematic Commercial",
  description:
    "A cinematic 60 FPS advertisement showcasing DealDone, the modern local marketplace to buy, sell, discover, and connect.",
};

export default function Home() {
  return (
    <main className="w-full h-full min-h-screen bg-[#070b09]">
      <AdContainer />
    </main>
  );
}