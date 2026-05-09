import { motion } from "framer-motion";
import { Utensils, Leaf, Users, Heart } from "lucide-react";

interface ImpactStatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

const ImpactStat = ({ icon, value, label, color }: ImpactStatProps) => (
  <motion.div 
    whileHover={{ y: -2 }}
    className="bg-white p-2 px-3.5 rounded-lg flex items-center gap-2.5 shadow-[0_4px_15px_-10px_rgba(0,0,0,0.06)] border border-slate-50 min-w-[125px] h-[58px]"
  >
    <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center shrink-0`}>
      <div className="scale-65 flex items-center justify-center">
        {icon}
      </div>
    </div>
    <div className="flex flex-col justify-center">
      <div className="flex items-baseline gap-0.5">
        <span className="text-base font-black tracking-tight text-slate-900 leading-none">{value.split(' ')[0]}</span>
        {value.includes(' ') && <span className="text-[9px] font-black text-slate-900 leading-none">{value.split(' ')[1]}</span>}
      </div>
      <span className="text-[7px] font-black uppercase tracking-[0.05em] text-slate-400 leading-tight mt-0.5">{label}</span>
    </div>
  </motion.div>
);

const WeeklyImpactBanner = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full rounded-[1.2rem] p-4 md:p-6 overflow-hidden border border-[#eef7f1] bg-[#f9fdfb]"
    >
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Left Section: Illustration & CTA */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Illustration Container - Extra Compact */}
          <div className="relative w-36 h-28 shrink-0">
            <img 
              src="/banner2.png" 
              alt="Food Impact"
              className="w-full h-full object-contain select-none pointer-events-none"
            />
          </div>

          <div className="space-y-3 text-center md:text-left max-w-[260px]">
            <div className="space-y-0.5">
              <h2 className="text-lg md:text-xl font-black tracking-tighter text-[#1a1a1a] leading-tight">
                Reduce food waste. <br />
                Create a bigger impact.
              </h2>
              <p className="text-slate-400 font-black text-[9px] leading-tight uppercase tracking-widest opacity-80">
                Donate, support and help build a zero-hunger world.
              </p>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: "#00a348" }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-[#00b251] text-white rounded-md font-black text-[8px] uppercase tracking-[0.15em] transition-all shadow-md shadow-green-500/10 group"
            >
              MAKE A DONATION
              <Heart className="w-2.5 h-2.5 fill-white group-hover:scale-110 transition-transform" />
            </motion.button>
          </div>
        </div>

        {/* Right Section: Weekly Stats - Ultra Compact */}
        <div className="flex flex-col gap-2 w-full lg:w-auto self-end lg:self-center">
          <p className="text-[8px] font-black text-[#00b251] tracking-[0.2em] uppercase ml-1 opacity-70">
            THIS WEEK'S IMPACT
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <ImpactStat 
              icon={<Utensils className="w-5 h-5 text-[#00b251]" />}
              value="120"
              label="MEALS SAVED"
              color="bg-[#e8f9ee]"
            />
            <ImpactStat 
              icon={<Leaf className="w-5 h-5 text-[#00b251]" />}
              value="85 kg"
              label="FOOD RESCUED"
              color="bg-[#e8f9ee]"
            />
            <ImpactStat 
              icon={<Users className="w-5 h-5 text-[#00b251]" />}
              value="45"
              label="PEOPLE HELPED"
              color="bg-[#e8f9ee]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeeklyImpactBanner;



