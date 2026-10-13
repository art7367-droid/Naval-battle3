import { useState, useEffect } from 'react';
import { ShipDatabaseEntry } from '../types/shipDatabase';
import { loadDatabase } from '../utils/shipDatabase';

interface ShipSelectionScreenProps {
  onStartBattle: (playerShips: ShipDatabaseEntry[], enemyShips: ShipDatabaseEntry[]) => void;
  onBack: () => void;
}

export default function ShipSelectionScreen({ onStartBattle, onBack }: ShipSelectionScreenProps) {
  const [ships, setShips] = useState<ShipDatabaseEntry[]>([]);
  const [selectedPlayerShips, setSelectedPlayerShips] = useState<ShipDatabaseEntry[]>([]);
  const [selectedEnemyShips, setSelectedEnemyShips] = useState<ShipDatabaseEntry[]>([]);

  useEffect(() => {
    const db = loadDatabase();
    setShips(db.ships);
  }, []);

  const togglePlayerShip = (ship: ShipDatabaseEntry) => {
    if (selectedPlayerShips.find(s => s.id === ship.id)) {
      setSelectedPlayerShips(selectedPlayerShips.filter(s => s.id !== ship.id));
    } else {
      setSelectedPlayerShips([...selectedPlayerShips, ship]);
    }
  };

  const toggleEnemyShip = (ship: ShipDatabaseEntry) => {
    if (selectedEnemyShips.find(s => s.id === ship.id)) {
      setSelectedEnemyShips(selectedEnemyShips.filter(s => s.id !== ship.id));
    } else {
      setSelectedEnemyShips([...selectedEnemyShips, ship]);
    }
  };

  const handleStartBattle = () => {
    if (selectedPlayerShips.length === 0 || selectedEnemyShips.length === 0) {
      alert('Выберите хотя бы один корабль для каждой стороны!');
      return;
    }
    onStartBattle(selectedPlayerShips, selectedEnemyShips);
  };

  const isPlayerSelected = (ship: ShipDatabaseEntry) => {
    return selectedPlayerShips.some(s => s.id === ship.id);
  };

  const isEnemySelected = (ship: ShipDatabaseEntry) => {
    return selectedEnemyShips.some(s => s.id === ship.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-cyan-300">⚔️ Выбор кораблей для боя</h1>
          <button onClick={onBack} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg">← Назад в меню</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Игрок */}
          <div className="bg-slate-800/50 rounded-lg p-4 border-2 border-cyan-600">
            <h2 className="text-xl font-bold text-cyan-300 mb-4">🛡️ Ваш флот ({selectedPlayerShips.length})</h2>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {selectedPlayerShips.length === 0 ? (
                <div className="text-center text-slate-500 py-8">Выберите корабли из списка справа</div>
              ) : (
                selectedPlayerShips.map(ship => (
                  <div key={ship.id} className="p-3 bg-cyan-900/30 border border-cyan-500 rounded cursor-pointer hover:bg-cyan-800/40" onClick={() => togglePlayerShip(ship)}>
                    <div className="font-semibold">{ship.name}</div>
                    <div className="text-xs text-slate-400">{ship.class} • {ship.country}</div>
                    <div className="text-xs text-slate-500 mt-1">HP: {ship.maxHP} | Скорость: {ship.speed}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Доступные корабли */}
          <div className="bg-slate-800/50 rounded-lg p-4 border-2 border-slate-600">
            <h2 className="text-xl font-bold text-slate-300 mb-4">📚 Доступные корабли ({ships.length})</h2>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {ships.map(ship => {
                const playerSelected = isPlayerSelected(ship);
                const enemySelected = isEnemySelected(ship);
                return (
                  <div key={ship.id} className={`p-3 rounded border ${playerSelected ? 'bg-cyan-900/30 border-cyan-500' : enemySelected ? 'bg-red-900/30 border-red-500' : 'bg-slate-900/50 border-slate-700'}`}>
                    <div className="font-semibold">{ship.name}</div>
                    <div className="text-xs text-slate-400">{ship.class} • {ship.country} • {ship.year}</div>
                    <div className="text-xs text-slate-500 mt-1">HP: {ship.maxHP} | Скорость: {ship.speed} | Дальность: {ship.range}</div>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => togglePlayerShip(ship)}
                        className={`flex-1 px-2 py-1 rounded text-xs ${playerSelected ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-slate-700 hover:bg-slate-600'}`}
                      >
                        🛡️ Игрок
                      </button>
                      <button
                        onClick={() => toggleEnemyShip(ship)}
                        className={`flex-1 px-2 py-1 rounded text-xs ${enemySelected ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-700 hover:bg-slate-600'}`}
                      >
                        🎯 Враг
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Противник */}
          <div className="bg-slate-800/50 rounded-lg p-4 border-2 border-red-600">
            <h2 className="text-xl font-bold text-red-300 mb-4">🎯 Флот противника ({selectedEnemyShips.length})</h2>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {selectedEnemyShips.length === 0 ? (
                <div className="text-center text-slate-500 py-8">Выберите корабли из списка слева</div>
              ) : (
                selectedEnemyShips.map(ship => (
                  <div key={ship.id} className="p-3 bg-red-900/30 border border-red-500 rounded cursor-pointer hover:bg-red-800/40" onClick={() => toggleEnemyShip(ship)}>
                    <div className="font-semibold">{ship.name}</div>
                    <div className="text-xs text-slate-400">{ship.class} • {ship.country}</div>
                    <div className="text-xs text-slate-500 mt-1">HP: {ship.maxHP} | Скорость: {ship.speed}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleStartBattle}
            disabled={selectedPlayerShips.length === 0 || selectedEnemyShips.length === 0}
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed rounded-lg font-bold text-lg transition-all shadow-lg"
          >
            ⚔️ Начать бой!
          </button>
        </div>
      </div>
    </div>
  );
}
