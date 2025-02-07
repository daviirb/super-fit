export default function RecipePage() {
  return (
    <main className="p-4">
      <header>
        <h1 className="text-2xl font-bold">Receitas Fit</h1>
      </header>
      <section>
        <div className="grid grid-cols-2 gap-2 ">
          <div className="rounded-lg border p-2">
            <div className="h-32 w-full rounded-lg bg-slate-400"></div>
            <span className="flex justify-between px-2">
              <h2>Panqueca Fit</h2>
              <span>300 Cal</span>
            </span>
          </div>
          <div className="h-32 w-full border bg-slate-400"></div>
        </div>
      </section>
    </main>
  );
}
