import { Chat } from "./_components/chat";
import { TabsDemo } from "./_components/tabs";
export default function Home() {
  return (
    <div className="m-auto w-[1440px]">
      <div className="w-360 h-14 border flex items-center border-[gray]">
        <h1 className="pl-12 font-medium">AI tools</h1>
      </div>
      <div className="w-360 h-222 flex justify-center ">
        <div className="w-145 h-222 border ml-90">
          <TabsDemo />
        </div>
        <Chat />
      </div>
    </div>
  );
}
//pl-185 pt-200
