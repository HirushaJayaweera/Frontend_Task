import ShoppingList from "@/components/ShoppingList";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <h1 className="text-2xl text-center font-bold mb-4">
        Collaborative Shopping List
      </h1>
      <ShoppingList />
    </main>
  );
}
