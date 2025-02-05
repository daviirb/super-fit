export function DietInfo() {
  // Aqui você pode adicionar a lógica para buscar as informações da dieta com base no dia e refeição selecionados
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Informações da Dieta</h3>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <span>Ovos mexidos</span>
          <span>200 calorias</span>
        </li>
        <li className="flex justify-between">
          <span>Torrada integral</span>
          <span>80 calorias</span>
        </li>
        <li className="flex justify-between">
          <span>Suco de laranja</span>
          <span>120 calorias</span>
        </li>
      </ul>
      <div className="mt-4 pt-4 border-t">
        <p className="font-semibold">Total: 400 calorias</p>
      </div>
    </div>
  )
}

