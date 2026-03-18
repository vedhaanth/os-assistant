import { Mail, MapPin, Phone, Send, User, Eye, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error: dbError } = await supabase
        .from("contact_submissions")
        .insert({
          name: formData.name,
          email: formData.email,
          message: formData.message
        });

      if (dbError) throw dbError;

      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: formData
      });
      if (error) throw error;

      toast.success("Message sent! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-40 relative bg-white overflow-hidden">
      {/* Designer Background Decoration */}
      <div className="absolute top-0 right-0 w-[60%] h-full bg-slate-50 skew-x-[-15deg] translate-x-[25%] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-32 items-start">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900 text-white mb-12 shadow-2xl shadow-slate-900/10"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em]">Direct Connection</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-black mb-16 text-slate-900 tracking-tighter leading-[0.85]"
            >
              LET'S <br /> <span className="text-slate-200 italic">START</span> <br /> <span className="text-primary italic underline underline-offset-[16px] decoration-primary/20">TALKING</span>
            </motion.h2>

            <div className="space-y-12">
              {[
                { icon: Mail, label: "Transmission", value: "lsvedhaanth55@gmail.com", href: "mailto:lsvedhaanth55@gmail.com" },
                { icon: Phone, label: "Direct Line", value: "+91 95145 61616", href: "tel:9514561616" },
                { icon: MapPin, label: "Coordinates", value: "18th Floor, Prozone Palms, Coimbatore, India", href: null }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-center gap-8"
                >
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-soft border border-slate-100 flex items-center justify-center group-hover:bg-primary transition-all duration-500 group-hover:scale-110">
                    <item.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-2xl font-black text-slate-900 hover:text-primary transition-colors tracking-tight">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                        {item.value.split(',').map((part, index) => (
                           <span key={index}>{part}{index < 2 && <br />}</span>
                        ))}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white border border-slate-100 rounded-[4rem] p-12 lg:p-20 shadow-soft relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
            
            <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
              <div className="space-y-10">
                {[
                  { id: "name", label: "Identity", type: "text", placeholder: "Your name or organization", value: formData.name, setter: (v: string) => setFormData({...formData, name: v}) },
                  { id: "email", label: "Relay Address", type: "email", placeholder: "Where can I respond?", value: formData.email, setter: (v: string) => setFormData({...formData, email: v}) }
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 mb-3 block">
                      {field.label}
                    </label>
                    <input 
                      type={field.type} 
                      id={field.id} 
                      value={field.value} 
                      onChange={e => field.setter(e.target.value)} 
                      className="w-full px-0 py-5 bg-transparent border-b-2 border-slate-100 focus:border-primary transition-all outline-none font-black text-slate-900 placeholder:text-slate-200 text-2xl tracking-tighter" 
                      placeholder={field.placeholder} 
                      required 
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 mb-3 block">Perspective</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    value={formData.message} 
                    onChange={e => setFormData({...formData, message: e.target.value})} 
                    className="w-full px-0 py-5 bg-transparent border-b-2 border-slate-100 focus:border-primary transition-all outline-none font-black text-slate-900 placeholder:text-slate-200 text-2xl tracking-tighter resize-none leading-relaxed" 
                    placeholder="How can we collaborate?" 
                    required 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-8 pt-6">
                <motion.button 
                  type="submit" 
                  disabled={isSubmitting} 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between w-full p-8 bg-slate-900 text-white rounded-[2rem] font-black text-xs tracking-[0.3em] uppercase transition-all shadow-2xl hover:shadow-slate-900/10 disabled:opacity-50 group"
                >
                  <span className="relative z-10">
                    {isSubmitting ? "Initiating Uplink..." : "Send Submission"}
                  </span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500" />
                </motion.button>
                
                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                   <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                   Rapid Response Enabled
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;