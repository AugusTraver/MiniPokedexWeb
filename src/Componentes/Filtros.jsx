function Filtros({
  filtroNombre,
  setFiltroNombre,
  filtroTipo,
  setFiltroTipo,
}) {
  return (
    <div className="filtros">
      <input
        type="text"
        placeholder="Filtrar por nombre"
        value={filtroNombre}
        onChange={(e) => setFiltroNombre(e.target.value)}
      />

      <select
        value={filtroTipo}
        onChange={(e) => setFiltroTipo(e.target.value)}
      >
        <option value="">Todos los tipos</option>
        <option value="grass">Grass</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="electric">Electric</option>
        <option value="bug">Bug</option>
        <option value="normal">Normal</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="fairy">Fairy</option>
      </select>
    </div>
  );
}

export default Filtros;