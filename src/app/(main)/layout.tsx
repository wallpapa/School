import LangBar from "@/components/layout/LangBar";
import BottomNav from "@/components/layout/BottomNav";
import ChatButton from "@/components/chat/ChatButton";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BottomNav />
      <div className="lg:pl-[220px]">
        <LangBar />
        <main className="animate-fade-up mx-auto max-w-[480px] px-5 pb-[100px] pt-5 md:max-w-[700px] md:px-8 lg:max-w-[960px] lg:px-10 lg:pb-8 lg:pt-8">
          {children}
        </main>
      </div>
      <ChatButton />
    </>
  );
}
