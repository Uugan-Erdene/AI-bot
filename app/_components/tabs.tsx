import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageAnalysis } from "../feuters/image-analysis";
import { IngredientRecognition } from "../feuters/ingredient-recognition";
import { ImageCreator } from "../feuters/image-creator";
export const TabsDemo = () => {
  return (
    <div className="flex w-full  flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Image analysis</TabsTrigger>
          <TabsTrigger value="ingredient">Ingredient recognition</TabsTrigger>
          <TabsTrigger value="image">Image creator</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <ImageAnalysis />
        </TabsContent>
        <TabsContent value="ingredient">
          <IngredientRecognition />
        </TabsContent>
        <TabsContent value="image">
          <ImageCreator />
        </TabsContent>
      </Tabs>
    </div>
  );
};
