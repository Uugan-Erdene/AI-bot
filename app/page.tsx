import { Chat } from "./_components/chat";
import { TabsDemo } from "./_components/tabs";
export default function Home() {
  return (
    <div className="m-auto max-w-[1440px] px-4">
      <div className="w-360 h-14 border flex items-center border-[gray]">
        <h1 className="pl-12 font-medium text-lg">AI tools</h1>
      </div>
      <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center gap-6 mt-6">
        <div className="w-145 h-222 border ml-90">
          <TabsDemo />
        </div>
        <Chat />
      </div>
    </div>
  );
}
//pl-185 pt-200
