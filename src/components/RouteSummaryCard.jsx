import React from 'react';
import { Car, Bike, Footprints, Clock, Fuel, Zap } from 'lucide-react';

export default function RouteSummaryCard({ metrics }) {
  if (!metrics || metrics.distanceKm === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6 animate-fade-in">
      {/* Car Option Card */}
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-900/90 border border-sky-500/30 hover:border-sky-500/70 p-6 rounded-3xl shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-sky-500/10 text-sky-400 rounded-2xl border border-sky-500/20">
            <Car size={26} />
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-sky-500/20 text-sky-300 rounded-full border border-sky-500/30">
            Car Drive
          </span>
        </div>
        <div className="text-3xl font-black text-white mb-1">
          PKR {metrics.car.cost.toLocaleString()}
        </div>
        <p className="text-xs text-slate-400 font-medium mb-5">Estimated Fuel Expense</p>

        <div className="space-y-2.5 border-t border-slate-800 pt-4 text-xs font-medium text-slate-300">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 text-slate-400"><Fuel size={14}/> Fuel Consumed:</span>
            <span className="font-bold text-white">{metrics.car.litres} Liters</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 text-slate-400"><Clock size={14}/> Estimated Time:</span>
            <span className="font-bold text-sky-400">{metrics.car.timeMin} Mins</span>
          </div>
        </div>
      </div>

      {/* Bike Option Card */}
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-900/90 border border-emerald-500/30 hover:border-emerald-500/70 p-6 rounded-3xl shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
            <Bike size={26} />
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
            Motorbike (Economical)
          </span>
        </div>
        <div className="text-3xl font-black text-white mb-1">
          PKR {metrics.bike.cost.toLocaleString()}
        </div>
        <p className="text-xs text-slate-400 font-medium mb-5">Estimated Fuel Expense</p>

        <div className="space-y-2.5 border-t border-slate-800 pt-4 text-xs font-medium text-slate-300">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 text-slate-400"><Fuel size={14}/> Fuel Consumed:</span>
            <span className="font-bold text-white">{metrics.bike.litres} Liters</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 text-slate-400"><Clock size={14}/> Estimated Time:</span>
            <span className="font-bold text-emerald-400">{metrics.bike.timeMin} Mins</span>
          </div>
        </div>
      </div>

      {/* Walk Option Card */}
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-900/90 border border-amber-500/30 hover:border-amber-500/70 p-6 rounded-3xl shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20">
            <Footprints size={26} />
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
            Walking (Zero Cost)
          </span>
        </div>
        <div className="text-3xl font-black text-white mb-1">
          {metrics.walk.steps.toLocaleString()}
        </div>
        <p className="text-xs text-slate-400 font-medium mb-5">Total Footsteps</p>

        <div className="space-y-2.5 border-t border-slate-800 pt-4 text-xs font-medium text-slate-300">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 text-slate-400"><Zap size={14}/> Calories Burned:</span>
            <span className="font-bold text-amber-400">{metrics.walk.calories} kcal</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 text-slate-400"><Clock size={14}/> Estimated Time:</span>
            <span className="font-bold text-white">{metrics.walk.timeMin} Mins</span>
          </div>
        </div>
      </div>
    </div>
  );
}