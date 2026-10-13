import { ShipDatabaseEntry } from '../types/shipDatabase';

interface BattleScreenProps {
  playerShips: ShipDatabaseEntry[];
  enemyShips: ShipDatabaseEntry[];
  onBack: () => void;
}

export default function BattleScreen({ playerShips, enemyShips, onBack }: BattleScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-cyan-300">⚔️ Бой</h1>
          <button onClick={onBack} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg">← Вернуться к выбору</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Игрок */}
          <div className="bg-slate-800/50 rounded-lg p-4 border-2 border-cyan-600">
            <h2 className="text-xl font-bold text-cyan-300 mb-4">🛡️ Ваш флот</h2>
            <div className="space-y-2">
              {playerShips.map(ship => (
                <div key={ship.id} className="p-3 bg-cyan-900/30 border border-cyan-500 rounded">
                  <div className="font-semibold">{ship.name}</div>
                  <div className="text-xs text-slate-400">{ship.class} • {ship.country}</div>
                  <div className="text-xs text-slate-500 mt-1">HP: {ship.maxHP} | Скорость: {ship.speed} | Дальность: {ship.range}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Противник */}
          <div className="bg-slate-800/50 rounded-lg p-4 border-2 border-red-600">
            <h2 className="text-xl font-bold text-red-300 mb-4">🎯 Флот противника</h2>
            <div className="space-y-2">
              {enemyShips.map(ship => (
                <div key={ship.id} className="p-3 bg-red-900/30 border border-red-500 rounded">
                  <div className="font-semibold">{ship.name}</div>
                  <div className="text-xs text-slate-400">{ship.class} • {ship.country}</div>
                  <div className="text-xs text-slate-500 mt-1">HP: {ship.maxHP} | Скорость: {ship.speed} | Дальность: {ship.range}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-600">
            <p className="text-lg text-slate-300">Бой в разработке...</p>
            <p className="text-sm text-slate-500 mt-2">Система боя будет добавлена в следующей версии</p>
          </div>
        </div>
      </div>
    </div>
  );
}
